# Task 1 - Foundation Model Comparison

## Objective

Compare multiple Amazon Bedrock Foundation Models for a QA use case and evaluate their responses based on quality, latency, and suitability.

## Models Evaluated

- Claude 3 Sonnet
- Amazon Nova Lite
- Amazon Nova Pro
- Llama 3

## Evaluation Criteria

- Response Accuracy
- Response Quality
- Reasoning Ability
- Latency
- Cost Efficiency

## Outcome

Selected the most suitable model for building the QA RAG application.

## Foundation Model Comparison

| Feature | Claude 3 Sonnet | Amazon Nova Lite | Amazon Nova Pro | Llama 3 |
|---------|-----------------|------------------|-----------------|----------|
| Developer | Anthropic | Amazon | Amazon | Meta |
| Model Type | Large Language Model | Lightweight Foundation Model | Advanced Foundation Model | Open-weight Large Language Model |
| Response Quality | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ |
| Reasoning Ability | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ |
| Accuracy | High | High | Very High | High |
| Response Speed | Medium | Very Fast | Fast | Fast |
| Cost | High | Low | Medium | Medium |
| Context Handling | Excellent | Good | Excellent | Good |
| Best Use Cases | Complex reasoning, coding, analysis | Chatbots, Q&A, lightweight AI applications | Enterprise assistants, advanced RAG, multi-agent workflows | General-purpose chatbots, text generation, summarization |
| Strengths | Excellent reasoning and instruction following | Low latency, cost-effective, optimized for production | Strong reasoning with balanced speed and cost | Open-weight, flexible deployment, strong general performance |
| Limitations | Higher latency and cost | Less effective for complex reasoning | Higher cost than Nova Lite | Reasoning may be less consistent than Claude or Nova Pro |
| Overall Rating | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ |

## Conclusion

All four models were evaluated using Amazon Bedrock Playground.

- **Amazon Nova Lite** provided the fastest responses with low latency and cost, making it suitable for lightweight RAG applications and chatbots.
- **Amazon Nova Pro** delivered excellent reasoning and response quality while maintaining good performance, making it ideal for enterprise AI solutions and multi-agent systems.
- **Claude 3 Sonnet** produced the highest-quality responses with outstanding reasoning capabilities, making it the best choice for complex analytical tasks.
- **Llama 3** offered strong general-purpose performance and flexibility, making it suitable for a variety of conversational AI applications.

**Selected Model for this Assignment:** **Amazon Nova Lite**

**Reason:** Nova Lite provided the best balance of response quality, speed, and cost efficiency, making it well suited for the QA chatbot, AgentCore Memory Runtime, and Multi-Agent Framework implemented in this assignment.
