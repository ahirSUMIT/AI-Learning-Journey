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


#structure it
from pydantic import BaseModel
class Ticket(BaseModel):
    name:str
    email:str
    issue:str

schema= Ticket.model_json_schema()

response_format={
    "type": "json_object"
}

system_prompt= f"""
Extract the personal imformation from the ticket strictly based on this schema. And give a json output.
{schema}
"""
message_system={
    "role":"system",
    "content":system_prompt
}

text=" hello my name is Ahir Sumit and i bought an iphone 14 pro max from your store two days ago which is not working at all.my address is Bihar. My emain is abcd@gmail.com . my contact is 12345678."
prompt=f"""
this is a customer ticket. please extract the personal detail from this.
{text}
"""

message = { "role":role, "content":prompt }

messages=[message_system,message] 

response= client.chat.completions.create(model=model,messages=messages,response_format=response_format ) 


answer=response.choices[0].message.content
print(answer)

#how to read it 
import json 
raw_json=answer
data_file=json.loads(raw_json)
ticket=Ticket(**data_file)

print(ticket.name)
print(ticket.email)
print(ticket.issue)