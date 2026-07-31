# Task 4 – Multi-Agent Framework using Amazon Bedrock AgentCore

## Objective

Develop and deploy a Multi-Agent AI application using Amazon Bedrock AgentCore Runtime and LangChain. The application utilizes specialized AI agents coordinated by a Supervisor Agent to answer questions, analyze test coverage, and assist in defect analysis based on QA documentation.

---

## Architecture

```
                         User
                           │
                           ▼
                  Supervisor Agent
                           │
      ┌────────────────────┼────────────────────┐
      │                    │                    │
      ▼                    ▼                    ▼
Retrieval Agent     Coverage Agent      Defect Agent
      │                    │                    │
      └────────────── Reads QA Guidelines PDF ──────────────┘
```

---

## Technologies Used

| Technology | Purpose |
|------------|---------|
| Amazon Bedrock AgentCore Runtime | Deploy and host the multi-agent application |
| LangChain | Agent orchestration |
| Amazon Nova Lite | Foundation Model |
| PyPDF | Read PDF documents |
| Recursive Character Text Splitter | Split PDF into searchable chunks |
| Python | Application implementation |

---

## Agent Responsibilities

| Agent | Responsibility |
|--------|----------------|
| Supervisor Agent | Routes user requests to the appropriate agent |
| Retrieval Agent | Retrieves information from QA Guidelines |
| Coverage Agent | Analyzes test coverage and identifies missing scenarios |
| Defect Agent | Assists in defect analysis and debugging |

---

## Workflow

1. Load QA Guidelines PDF.
2. Extract text from the document.
3. Split the content into smaller chunks.
4. Initialize specialized agents.
5. Supervisor analyzes the user request.
6. Route the request to the appropriate agent.
7. Generate a response using Amazon Nova Lite.
8. Return the final response to the user.

---

## Features

- Multi-Agent Architecture
- Intelligent Task Routing
- Document-Based Question Answering
- Test Coverage Analysis
- Defect Analysis
- Amazon Bedrock AgentCore Deployment
- LangChain Agent Orchestration

---

## Project Structure

```
Task-4-Multi-Agent-Framework/
│
├── README.md
├── multi_agent_runtime.py
├── requirements.txt
├── uat_documents/
│   └── QA_Guidelines.pdf
└── screenshots/
```

---

## Screenshots

### AgentCore Runtime Configuration

![Configuration](<Screenshot 2026-07-31 143704.png>)

---

### Deployment Successful

![Deployment](<Screenshot 2026-07-31 143758.png>)

---

### Successful Invocation

![Invoke](<Screenshot 2026-07-31 143947.png>)

---

### Retrieval Agent

![Retrieva](<Screenshot 2026-07-31 143914-1.png>)

---

### Coverage Agent

![Coverage](<Screenshot 2026-07-31 144350.png>)

---

## Sample Queries

| User Query | Expected Agent |
|------------|----------------|
| What is the password policy? | Retrieval Agent |
| Which test cases are missing for login functionality? | Coverage Agent |

---

## Outcome

Successfully developed and deployed a Multi-Agent AI application using Amazon Bedrock AgentCore Runtime. The Supervisor Agent intelligently routed user requests to specialized agents, enabling efficient document retrieval, test coverage analysis, and defect investigation using QA Guidelines.