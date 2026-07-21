import os
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq
load_dotenv() 

my_api_key= os.getenv("GROQ_API_KEY") 
if not my_api_key: 
    raise ValueError("where is api key") 
client= Groq(api_key=my_api_key) 
model="llama-3.3-70b-versatile" 
role="user"

# // 3 prompts
prompt1 = "hi!"
prompt2 = "Explain quantum mechanics in deatil under 100 words"
prompt3 = "write 1000 word essay on machine learning"

prompts =[prompt1,prompt2,prompt3]
for prompt in prompts:
    message = { "role":role,
            "content":prompt
        }
    messages=[message] 
    response= client.chat.completions.create(model=model,messages=messages, max_tokens=5000) 
    usage=response.usage
    print(f"Prompt: {prompt} --> Your prompt tokens: {usage.prompt_tokens} Completion tokens: {usage.completion_tokens} Total tokens: {usage.total_tokens} Finish reason={response.choices[0].finish_reason}")

# prompt= "What is an Ai"
# message = { "role":role,
#             "content":prompt
#          }
# messages=[message] 
# response= client.chat.completions.create(model=model,messages=messages) 
# print(response)

# print("##########################")

# answer=response.choices[0].message.content
# print(answer)