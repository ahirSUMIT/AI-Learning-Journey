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
prompt= "Suggest a name for my food company"

#systemRole
message_system={
    "role":"system",
    "content": "you are a brand manager who suggest name for my food company and name should be one word.suggest only one name"
}
# message me role and content
message = { "role":role, "content":prompt }


messages=[message_system, message] 
#temperature is default 0 meaning safe and range is [0,2]
response= client.chat.completions.create(model=model,messages=messages,temperature=2) 
#print(response)

print("##########################")

answer=response.choices[0].message.content
print(answer)