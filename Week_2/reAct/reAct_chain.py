import os
import re
from time import sleep
from dotenv import load_dotenv
from groq import Groq

load_dotenv()
my_api_key = os.getenv("GROQ_API_KEY")

if not my_api_key:
    raise ValueError("API key kaha hai bhai")

client = Groq(api_key=my_api_key)
model = "llama-3.3-70b-versatile"

#TOOLS

# Real market prices (India, 256GB base variant, as of July 2026)
PRODUCT_PRICES = {
    "iphone 17": 82900,
    "iphone 15": 49900,   # discounted 2026 price
}

def get_product_price(product):
    price = PRODUCT_PRICES.get(product.strip().lower())
    if price is None:
        return "Product not found"
    return price


def calculator(expression):
    try:
        return eval(expression)
    except:
        return "calc error!"


def check_affordability(price, budget):
    """
    Decides if the user can buy the product outright, needs EMI, or can't afford it.
    price, budget come in as strings from the LLM -> convert safely.
    """
    try:
        price = float(price)
        budget = float(budget)
    except ValueError:
        return "Invalid numbers passed to check_affordability"

    if budget >= price:
        leftover = round(budget - price, 2)
        return f"AFFORDABLE: You can buy it outright. Money left: ₹{leftover}"

    shortfall = price - budget
    min_down_payment_ratio = 0.20  # typical min down payment for no-cost EMI plans

    if budget >= price * min_down_payment_ratio:
        tenures = [3, 6, 9, 12]
        options = []
        for months in tenures:
            emi = round(shortfall / months, 2)
            options.append(f"{months} months: ₹{emi}/month")
        options_str = "; ".join(options)
        return (
            f"EMI_POSSIBLE: You can pay ₹{budget} upfront as down payment "
            f"and finance the remaining ₹{shortfall} via EMI. Options -> {options_str}"
        )
    else:
        return (
            f"NOT_AFFORDABLE: Your budget ₹{budget} is too low compared to price ₹{price} "
            f"(shortfall ₹{shortfall}). Even EMI isn't practical since you can't cover "
            f"the minimum down payment. Suggest a cheaper alternative or saving more."
        )


tools = {
    "get_product_price": get_product_price,
    "calculator": calculator,
    "check_affordability": check_affordability,
}

# SYSTEM PROMPT 

system_prompt = """
You are a shopping assistant.

You have these tools:

get_product_price(product)
calculator(expression)
check_affordability(price, budget)

IMPORTANT:
Call tools exactly like these examples:

Action: get_product_price("iPhone 17")
Action: calculator("5000 - 1000")
Action: check_affordability(82900, 5000)

Never write named arguments like product="iPhone 17".

Rules:
1. First get the product's real price using get_product_price.
2. Then, to decide whether the user can afford it, ALWAYS call check_affordability(price, budget)
   instead of doing the math yourself.
3. Use check_affordability's result to decide your final answer:
   - If it says AFFORDABLE -> tell the user they can buy it and how much money is left.
   - If it says EMI_POSSIBLE -> tell the user the exact EMI options given.
   - If it says NOT_AFFORDABLE -> tell the user clearly they cannot buy this product with
     their current budget, even on EMI, and suggest a cheaper alternative.
4. Call ONLY ONE tool at a time. After writing an Action, STOP immediately.
5. Never guess or invent a tool result. Wait for the Observation.
6. When done, give the Final Answer.

Format:
Thought: what you need to do
Action: tool_name(argument1, argument2)

When finished:
Final Answer: your answer
"""

# AGENT LOOP  

def run_agent(question):
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": question},
    ]

    for step in range(6):
        print("\n------------------")
        print("STEP", step + 1)
        print("------------------")

        response = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=0,
        )

        answer = response.choices[0].message.content
        print(answer)

        if "Final Answer:" in answer:
            break

        # Match tool_name(arg1, arg2, ...) - handles 1 or more args
        match = re.search(r"Action:\s*(\w+)\((.*)\)", answer)

        if match:
            tool_name = match.group(1)
            raw_args = match.group(2)

            # Split on commas that are NOT inside quotes
            args = re.findall(r'"[^"]*"|[^,]+', raw_args)
            args = [a.strip().strip('"').strip() for a in args if a.strip()]

            if tool_name in tools:
                tool = tools[tool_name]
                try:
                    observation = tool(*args)
                except Exception as e:
                    observation = f"Tool error: {e}"
            else:
                observation = "Tool not found"

            print("Observation:", observation)

            # Add LLM response to memory
            messages.append({
                "role": "assistant",
                "content": answer
            })


            # Give tool result back to LLM
            messages.append({
                "role": "user",
                "content": "Observation: " + str(observation)
            })
            sleep(5)
        else:
            # No action found and no final answer -> avoid infinite silent loop
            break

prompt = """
I have 50000 rupees. What is the price of an iPhone 17?
Can I buy it, and if not, is EMI possible?
"""
run_agent(prompt)