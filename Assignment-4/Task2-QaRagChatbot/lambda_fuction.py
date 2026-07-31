import json
import os
import boto3

bedrock_agent_runtime = boto3.client("bedrock-agent-runtime")

AGENT_ID = os.environ["AGENT_ID"]
AGENT_ALIAS_ID = os.environ["AGENT_ALIAS_ID"]


def lambda_handler(event, context):

    question = event.get("question", "What is the password policy?")

    response = bedrock_agent_runtime.invoke_agent(
        agentId=AGENT_ID,
        agentAliasId=AGENT_ALIAS_ID,
        sessionId="session-1",
        inputText=question
    )

    answer = ""

    for event_stream in response["completion"]:
        chunk = event_stream.get("chunk")
        if chunk:
            answer += chunk["bytes"].decode("utf-8")

    return {
        "statusCode": 200,
        "body": json.dumps({
            "question": question,
            "answer": answer
        })
    }