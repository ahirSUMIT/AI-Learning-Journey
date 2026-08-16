import os
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq
import numpy as np
from sentence_transformers import SentenceTransformer
import sys
model = SentenceTransformer("all-MiniLM-L6-v2") #384
load_dotenv()
my_api_key=os.getenv("GROQ_API_KEY")

if not my_api_key:
    raise ValueError("API key kaha hai bhai")

client=Groq(api_key=my_api_key)
groqmodel="llama-3.3-70b-versatile"

documents = [
    "Employees receive 24 days of paid leave per year.",
   
    "Employees work from the office on Tuesday, Wednesday and Thursday. "
    "Monday and Friday are optional work-from-home days.",
   
    "Employees receive Rs 3000 per month for gym reimbursement.",
   
    "Employees can claim Rs 2000 per month for home internet.",
   
    "Employees have a 90 day notice period."
]

document_embeddings = model.encode(documents)

print(sys.getsizeof(document_embeddings))

def cosine_similarity(a, b):
    return np.dot(a, b) / (
        np.linalg.norm(a) * np.linalg.norm(b)
    )

SIMILARITY_THRESHOLD = 0.35  

def retrieve(qembedding):
    scores = []
    for i, document in enumerate(document_embeddings):
        score = cosine_similarity(qembedding, document)
        scores.append((float(score), documents[i]))

    scores.sort(key=lambda x: x[0], reverse=True)
    best_score, best_document = scores[0]

    if best_score < SIMILARITY_THRESHOLD:
        return best_score, None   # nothing relevant enough

    return best_score, best_document

def ask_llm(question,context):

    sys_prompt=f"""answer in one line only. Answer only based on this context. do not hallucinate. Context: {context}"""
    system_message={
        "role": "system",
        "content": sys_prompt

    }
    message={
        "role": "user",
        "content": question
    }
    messages=[system_message, message]
    response=client.chat.completions.create(model=groqmodel, messages=messages)
    answer=response.choices[0].message.content
    return answer

test_queries = [
    "How much vacation do I get?",           # relevant -> leave policy
    "Can I work from home on Monday?",       # relevant -> WFH policy
    "How much is the gym allowance?",        # relevant -> gym reimbursement
    "What's the notice period if I resign?", # relevant -> notice period
    "What is the capital of France?",        # irrelevant
    "Can you recommend a good pizza place?", # irrelevant
    "What's the weather like today?",        # irrelevant
]
 
for query in test_queries:
    qembedding = model.encode(query)
    score, context = retrieve(qembedding)
 
    print(f"\nQuery: {query}")
    print(f"Best similarity score: {score:.3f}")
 
    if context is None:
        print("Result: No information found.")
    else:
        answer = ask_llm(query, context)
        print(f"Result: {answer}")