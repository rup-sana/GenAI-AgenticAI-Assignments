import os
import pathlib
import time 
from groq import RateLimitError 
from typing import TypedDict

from dotenv import load_dotenv
from langgraph.graph import StateGraph, START, END
from langchain_groq import ChatGroq

load_dotenv()

MODEL_CATALOG = {
    "llama-3.3-70b-versatile": {
        "input_cost_per_million": 0.59,
        "output_cost_per_million": 0.79,
    },
    "llama-3.1-8b-instant": {
        "input_cost_per_million": 0.05,
        "output_cost_per_million": 0.08,
    },
    "openai/gpt-oss-20b": {
        "input_cost_per_million": 0.20,
        "output_cost_per_million": 0.20,
    },
}

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "").strip()
if not GROQ_API_KEY:
    raise EnvironmentError(
        "GROQ_API_KEY is not set. Set it in your environment or in a .env file."
    )
 
class QAAgentState(TypedDict):
    requirement: str
    analysis: str
    test_cases: str
    security_review: str
    review: str
 
 
def safe_text(value: str) -> str:
    return str(value).encode("cp1252", errors="replace").decode("cp1252")

def build_model(model_name: str) -> ChatGroq:
    return ChatGroq(
        model=model_name,
        temperature=0.2,
        max_tokens=1500,
        max_retries=2,
    )

def estimate_tokens(text: str) -> int:
    return max(1, len(text) // 4) 

def estimate_cost(model_name: str, input_text: str, output_text: str):
    input_tokens = estimate_tokens(input_text)
    output_tokens = estimate_tokens(output_text)

    pricing = MODEL_CATALOG[model_name]

    input_cost = (
        input_tokens / 1_000_000
    ) * pricing["input_cost_per_million"] 

    output_cost = (
        output_tokens / 1_000_000
    ) * pricing["output_cost_per_million"]

    return input_cost + output_cost

def score_quality(text: str) -> float:
    score = 0

    keywords = [
        "acceptance",
        "security",
        "boundary",
        "negative",
        "positive",
        "risk",
        "dependency",
        "priority",
        "test",
        "scenario", 
    ]

    text_lower = text.lower()

    for keyword in keywords:
        if keyword in text_lower:
            score += 1
            
    return score

def calculate_overall_score(quality, latency, cost):
    return (
        quality * 0.6
        - latency * 0.2
        - cost * 1000 * 0.2
    )

def evaluate_model(model_name, system_prompt, task):
    response, latency, cost, quality = call_specialist(
        model_name,
        system_prompt,
        task,
    )

    overall_score = calculate_overall_score(
        quality,
        latency,
        cost, 
    )

    return {
        "model": model_name,
        "response": response,
        "latency": latency,
        "cost": cost,
        "quality": quality,
        "overall_score": overall_score,
    }

def choose_best_model(results):
    return max(
        results, 
        key=lambda x:x["overall_score"]
    ) 


def call_specialist(model_name: str,system_prompt: str, task: str) -> str:
    model = build_model(model_name)

    start = time.perf_counter() 

    while True:
        try:
            response = model.invoke([
                ("system", system_prompt),
                ("human", task),
            ])
            break

        except RateLimitError:
            print("\nRate limit reached for {model_name}, Waiting 5 seconds...\n") 
            time.sleep(5)

    latency = time.perf_counter() - start 

    cost = estimate_cost(
        model_name, 
        system_prompt + task, 
        response.content
    )

    quality = score_quality(response.content)
    
    return response.content, latency, cost, quality 

 
 
def requirements_analyst(state: QAAgentState):
    results = []

    for model_name in MODEL_CATALOG:
        result = evaluate_model(
            model_name,
            "You are a senior QA requirements analyst. Identify actors, business rules, acceptance criteria, risks, dependencies, and ambiguous requirements. Be concise and do not invent missing facts.",
            f"Analyze this requirement for testing:\n\n{state['requirement']}",
        )
        results.append(result)
    best = choose_best_model(results)

    print("\n==== Requirements Benchmark ====")

    for r in results:
        print(
            f"{r['model']} | "
            f"Latency: {r['latency']:.2f}s | "
            f"Cost: ${r['cost']:.8f} | "
            f"Quality: {r['quality']} | "
            f"Overall: {r['overall_score']:.2f}"
        ) 
    print(f"\nSelected Model: {best['model']}\n")

    return {
        "analysis": best["response"] 
    }
 
def test_designer(state: QAAgentState):
    results = []

    for model_name in MODEL_CATALOG:
        result = evaluate_model(
            model_name,
            "You are a senior QA test designer. Produce structured test cases including positive, negative, boundary, security, and failure paths. Use markdown tables where useful.",
            f"Requirement:\n{state['requirement']}\n\nAnalysis:\n{state['analysis']}",
        )
        results.append(result)

    best = choose_best_model(results)

    print("\n==== Test Designer Benchmark ====")

    for r in results:
        print(
            f"{r['model']} | "
            f"Latency: {r['latency']:.2f}s | "
            f"Cost: ${r['cost']:.8f} | "
            f"Quality: {r['quality']} | "
            f"Overall: {r['overall_score']:.2f}"
        )

    print(f"\nSelected Model: {best['model']}\n")

    return {
        "test_cases": best["response"]
    }

 
 
def security_reviewer(state: QAAgentState):
    results = []

    for model_name in MODEL_CATALOG:
        result = evaluate_model(
            model_name,
            "You are an application security reviewer. Review the proposed tests and identify security gaps involving authentication, authorization, data protection, replay resistance, expiry, and generic error handling. Recommend additional security tests.",
            f"Requirement:\n{state['requirement']}\n\nTest Cases:\n{state['test_cases']}",
        )
        results.append(result)

    best = choose_best_model(results)

    print("\n==== Security Reviewer Benchmark ====")

    for r in results:
        print(
            f"{r['model']} | "
            f"Latency: {r['latency']:.2f}s | "
            f"Cost: ${r['cost']:.8f} | "
            f"Quality: {r['quality']} | "
            f"Overall: {r['overall_score']:.2f}"
        )

    print(f"\nSelected Model: {best['model']}\n")

    return {
        "security_review": best["response"]
    }
 
 
def qa_reviewer(state: QAAgentState):
    results = []

    for model_name in MODEL_CATALOG:
        result = evaluate_model(
            model_name,
            "You are a QA review lead. Review requirement coverage, missing edge cases, duplication, testability, business risk, and whether security findings were addressed. End with APPROVE or REVISE and justify.",
            f"""
Requirement:
{state['requirement']}

Analysis:
{state['analysis']}

Test Cases:
{state['test_cases']}

Security Review:
{state['security_review']}
""",
        )
        results.append(result)

    best = choose_best_model(results)

    print("\n==== QA Reviewer Benchmark ====")

    for r in results:
        print(
            f"{r['model']} | "
            f"Latency: {r['latency']:.2f}s | "
            f"Cost: ${r['cost']:.8f} | "
            f"Quality: {r['quality']} | "
            f"Overall: {r['overall_score']:.2f}"
        )

    print(f"\nSelected Model: {best['model']}\n")

    return {
        "review": best["response"]
    }
 
 
builder = StateGraph(QAAgentState)
builder.add_node("requirements_analyst", requirements_analyst)
builder.add_node("test_designer", test_designer)
builder.add_node("security_reviewer", security_reviewer)
builder.add_node("qa_reviewer", qa_reviewer)
builder.add_edge(START, "requirements_analyst")
builder.add_edge("requirements_analyst", "test_designer")
builder.add_edge("test_designer", "security_reviewer")
builder.add_edge("security_reviewer", "qa_reviewer")
builder.add_edge("qa_reviewer", END)
 
qa_agent_chain = builder.compile()
 
 
def main() -> None:
    requirements_path = pathlib.Path(__file__).parent / "requirements_doc.md"
    if not requirements_path.exists():
        raise FileNotFoundError(f"Requirement document not found: {requirements_path}")
 
    requirement_text = requirements_path.read_text(encoding="utf-8").strip()
    if not requirement_text:
        raise ValueError("Requirement document is empty.")
 
    print(f"Loaded requirement from {requirements_path}:\n\n{requirement_text}\n")
 
    result = qa_agent_chain.invoke({
        "requirement": requirement_text,
        "analysis": "",
        "test_cases": "",
        "security_review": "",
        "review": "",
    })
 
    sections = [
        ("REQUIREMENTS ANALYST", "analysis"),
        ("TEST DESIGNER", "test_cases"),
        ("SECURITY REVIEWER", "security_review"),
        ("QA REVIEWER", "review"),
    ]
 
    for heading, key in sections:
        print(f"\n{'=' * 20} {heading} {'=' * 20}\n")
        print(safe_text(result[key]))
 
 
if __name__ == "__main__":
    main()
