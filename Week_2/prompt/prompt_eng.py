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

def llm_answer(prompt):

    message = {
        "role": "user",
        "content": prompt
    }
    messages = [message]
    response= client.chat.completions.create(model=model, messages=messages)
    ans=response.choices[0].message.content
    return ans

ex_prompt=""""
#role:
you are a sopport assistant at mobile/laptop company
#Task:
you have to classify the issue in a category
#CONSTRAINTS:
you have to classify the issue in one of the category. billing,technical,return
#OUTPUT_FORMAT:
your answer should m=be in one work only. the one work should be one of the categories given in the constraints
#EXAMPLE:
for instance if he wants a refund then the category is return
#FALLBACK
if the issue is unrelated to any of the category mentioned in the constraints then return "Others"
this is the user comlaints:
my laptop is not working.

"""
print(llm_answer(ex_prompt))