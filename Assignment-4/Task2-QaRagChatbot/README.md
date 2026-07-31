# Task 2 – QA RAG Chatbot using Amazon Bedrock

## Objective

Build a Retrieval-Augmented Generation (RAG) chatbot capable of answering questions from uploaded documents using Amazon Bedrock Knowledge Bases. The solution integrates AWS Lambda and API Gateway to expose the chatbot as a REST API.

---

## Architecture

```
User
   │
   ▼
API Gateway
   │
   ▼
AWS Lambda
   │
   ▼
Amazon Bedrock Agent
   │
   ▼
Knowledge Base
   │
   ▼
OpenSearch Serverless
   ▲
   │
Titan Text Embeddings V2
   ▲
   │
Amazon S3 (QA Documents)
```

---

## AWS Services Used

| Service | Purpose |
|---------|---------|
| Amazon S3 | Store QA documents |
| Amazon Bedrock | Foundation model inference |
| Bedrock Knowledge Base | Retrieval-Augmented Generation |
| Titan Text Embeddings V2 | Generate vector embeddings |
| OpenSearch Serverless | Store document embeddings |
| Bedrock Agent | Process user queries |
| AWS Lambda | Backend API logic |
| API Gateway | Expose chatbot as REST API |

---

## Workflow

1. Upload QA documents to Amazon S3.
2. Create a Bedrock Knowledge Base.
3. Generate vector embeddings using Titan Text Embeddings V2.
4. Store embeddings in OpenSearch Serverless.
5. Configure a Bedrock Agent with the Knowledge Base.
6. Invoke the Bedrock Agent through AWS Lambda.
7. Expose Lambda using API Gateway.
8. Test the chatbot using Postman.

---

## Features

- Retrieval-Augmented Generation (RAG)
- Document-based Question Answering
- REST API Integration
- Serverless Architecture
- Semantic Search
- AWS Bedrock Agent Integration

---

## Project Structure

```
Task-2-QA-RAG-Chatbot/
│
├── README.md
├── lambda_function.py
├── screenshots/
└── postman_collection.json
```

---

## Screenshots

### Amazon S3 Upload

![S3](<Screenshot 2026-07-31 001218.png>)

![S3](<Screenshot 2026-07-31 001236.png>)

---

### Bedrock Knowledge Base

![Knowledge Base](<Screenshot 2026-07-31 001112.png>)

![Knowledge Base Data Source](<Screenshot 2026-07-31 001125.png>)

---

### Bedrock Agent

![Agent Builder](<Screenshot 2026-07-31 000943.png>)

![Knowledge Base Added](<Screenshot 2026-07-31 001002.png>)

![Agent Prepared](<Screenshot 2026-07-31 001026.png>)


---

### RAG BOT Testing

![RAG BOT Test](<Screenshot 2026-07-31 000815.png>)

---

### Lambda Function

![Lambda](<Screenshot 2026-07-31 001530.png>)

![Policy](<Screenshot 2026-07-31 002631.png>)

![Test Event](<Screenshot 2026-07-31 002943.png>)

![Result](<Screenshot 2026-07-31 002928.png>)

---

### API Gateway

![API Gateway](<Screenshot 2026-07-31 004145.png>)

---

### Postman Testing

![Postman](<Screenshot 2026-07-31 005625.png>)

---

## Outcome

Successfully developed and deployed a Retrieval-Augmented Generation (RAG) chatbot using Amazon Bedrock. The chatbot retrieves relevant information from uploaded documents through a Bedrock Knowledge Base and returns accurate responses via a REST API powered by AWS Lambda and API Gateway.
