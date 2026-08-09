import os
import time
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq
from pydantic import BaseModel, Field

load_dotenv()
my_api_key=os.getenv("GROQ_API_KEY")

if not my_api_key:
    raise ValueError("API key Not Found")

client=Groq(api_key=my_api_key)
model = "openai/gpt-oss-120b"
prompt= "explain how internet work"

message={
    "role": "user",
    "content": prompt
    }

messages=[message]
# response=client.chat.completions.create(model=model, messages=messages)
#  print(response)
# answer= response.choices[0].message.content
# print(answer)

stream=client.chat.completions.create(model=model, messages=messages,stream=True)

for chunk in stream:
    content = chunk.choices[0].delta.content
    if content:
       print(content, end="", flush=True)