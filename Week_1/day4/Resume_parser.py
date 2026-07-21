import os
from dotenv import load_dotenv
from groq import Groq
from pydantic import BaseModel
import json

load_dotenv()

my_api_key = os.getenv("GROQ_API_KEY")

if not my_api_key:
    raise ValueError("Where is API Key")

client = Groq(api_key=my_api_key)

model = "llama-3.3-70b-versatile"
role = "user"


# -------------------------
# Pydantic Structure
# -------------------------

class Resume(BaseModel):
    name: str
    email: str
    experience: str
    skills: list[str]
    projects: list[str]
    match_percentage: int
    matching_skills: list[str]
    missing_skills: list[str]

schema = Resume.model_json_schema()

response_format = {
    "type": "json_object"
}


# -------------------------
# System Prompt
# -------------------------

system_prompt = f"""
You are an AI Resume Parser.

Extract the following information from the Resume.

Also compare the Resume with the Job Description.

Return ONLY JSON according to this schema.

Schema:

{schema}
"""

message_system = {
    "role": "system",
    "content": system_prompt
}


# -------------------------
# Resume
# -------------------------

resume = """
Name: Sumit Ahir

Email: sumit@gmail.com

Experience:
6 months internship in Data Analytics.

Skills:
Python
Java
SQL
React
Machine Learning

Projects:
House Price Prediction
Student Management System
AI Resume Parser
"""


# -------------------------
# Job Description
# -------------------------

job_description = """
Role: Data Analyst

Required Skills:
Python
SQL
Machine Learning
Power BI

Experience:
Minimum 6 months

Projects:
Machine Learning
Data Analytics
"""


prompt = f"""
Resume

{resume}

----------------------------

Job Description

{job_description}

Extract the details.

Compare the Resume with the Job Description.

Calculate the match percentage.
"""

message = {
    "role": role,
    "content": prompt
}

messages = [message_system, message]

response = client.chat.completions.create(
    model=model,
    messages=messages,
    response_format=response_format
)

answer = response.choices[0].message.content

# print(answer)


# -------------------------
# Read JSON
# -------------------------
import json

data_file = json.loads(answer)

resume = Resume(**data_file)

print("\nCandidate Name :", resume.name)
print("Email :", resume.email)
print("Experience :", resume.experience)
print("Skills :", resume.skills)
print("Projects :", resume.projects)
print("Match Percentage :", resume.match_percentage)
print("Matching Skills :", resume.matching_skills)
print("Missing Skills :", resume.missing_skills)