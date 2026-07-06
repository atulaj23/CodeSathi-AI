import requests
from google import genai
from config import Config

client = genai.Client(api_key=Config.GEMINI_API_KEY)

SYSTEM_PROMPT = """
You are CodeSathi AI.
Always reply in Hinglish.
Give working code when asked.
"""


def gemini_call(message):
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[SYSTEM_PROMPT, message]
    )

    return response.text if response and response.text else None


def openrouter_call(message):
    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {Config.OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": "openai/gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": message}
            ]
        }
    )

    data = response.json()
    return data["choices"][0]["message"]["content"]


def generate_response(message):

    try:
        result = gemini_call(message)
        if result:
            return result
    except:
        pass

    try:
        return openrouter_call(message)
    except:
        pass

    return "⚠️ AI temporarily busy hai, thodi der baad try karo."