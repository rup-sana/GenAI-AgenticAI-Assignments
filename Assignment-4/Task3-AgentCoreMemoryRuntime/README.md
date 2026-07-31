# Task 3 – AgentCore Memory Runtime

## Objective

Build and deploy an Amazon Bedrock AgentCore Runtime integrated with AgentCore Memory to enable persistent, context-aware conversations. The runtime stores and recalls previous interactions, allowing the AI assistant to maintain conversational context across multiple requests.

---

## Sample Interaction

**User:** My favorite programming language is Python.

**Assistant:** I'll remember that your favorite programming language is Python.

**User:** What is my favorite programming language?

**Assistant:** Your favorite programming language is **Python**.


## Architecture

```
User
   │
   ▼
Amazon Bedrock AgentCore Runtime
   │
   ▼
LangChain Application
   │
   ▼
Amazon Nova Lite
   │
   ▼
AgentCore Memory
```

---

## Technologies Used

| Technology | Purpose |
|------------|---------|
| Amazon Bedrock AgentCore Runtime | Deploy and host the AI application |
| AgentCore Memory | Store and retrieve conversation history |
| Amazon Nova Lite | Foundation Model for generating responses |
| LangChain | Build the conversational workflow |
| Python | Runtime implementation |

---

## Workflow

1. Configure an AgentCore Runtime.
2. Enable AgentCore Memory.
3. Deploy the runtime.
4. Invoke the runtime with a user prompt.
5. Store the conversation in memory.
6. Ask follow-up questions.
7. Retrieve previous context from memory to generate context-aware responses.

---

## Features

- Persistent conversational memory
- Context-aware responses
- Actor-based memory storage
- Session-based conversations
- AgentCore Runtime deployment
- Amazon Nova Lite integration

---

## Project Structure

```
Task-3-AgentCore-Memory/
│
├── README.md
├── agentcore_memory_runtime.py
├── requirements.txt
└── screenshots/
```

---

## Screenshots

### AgentCore Memory Created

![Memory](<Screenshot 2026-07-31 142058.png>)

---

### Deployment Successful

![Deployment](<Screenshot 2026-07-31 142557.png>)

---

### Invocation

![First Invoke](<Screenshot 2026-07-31 142902.png>)

![Second Invoke](<Screenshot 2026-07-31 142950.png>)

![Third Invoke](<Screenshot 2026-07-31 143030.png>)

---

## Outcome

Successfully deployed an Amazon Bedrock AgentCore Runtime integrated with AgentCore Memory. The application demonstrated persistent memory by storing conversation history and generating context-aware responses across multiple interactions.