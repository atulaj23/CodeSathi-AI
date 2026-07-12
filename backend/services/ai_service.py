import requests
from google import genai

from config import Config
from services.file_reader import read_file



client = genai.Client(
    api_key=Config.GEMINI_API_KEY
)



SYSTEM_PROMPT = """
You are CodeSathi AI.

Always reply in Hinglish.

You are a helpful AI coding assistant.
Give working code when asked.

If user provides a file, analyze that file.
If no file is provided, answer normally.
"""




def gemini_call(message):

    response = client.models.generate_content(

        model="gemini-2.5-flash",

        contents=[
            SYSTEM_PROMPT,
            message
        ]

    )


    if response and response.text:

        return response.text


    return None






def openrouter_call(message):

    response = requests.post(

        "https://openrouter.ai/api/v1/chat/completions",

        headers={

            "Authorization":
            f"Bearer {Config.OPENROUTER_API_KEY}",

            "Content-Type":
            "application/json"

        },


        json={

            "model":
            "openai/gpt-3.5-turbo",

            "messages":[

                {
                    "role":"system",
                    "content":SYSTEM_PROMPT
                },

                {
                    "role":"user",
                    "content":message
                }

            ]

        }

    )


    data=response.json()

    return data["choices"][0]["message"]["content"]






def generate_response(message, file=None):


    final_message = message



    try:


        if file:


            file_text = read_file(file)


            if file_text:


                final_message=f"""

File Content:

{file_text[:8000]}


User Question:

{message}


Answer based on file.
"""



        result = gemini_call(final_message)



        if result:

            return result



    except Exception as e:

        print(
            "Gemini Error:",
            e
        )




    try:

        return openrouter_call(final_message)


    except Exception as e:

        print(
            "OpenRouter Error:",
            e
        )




    return "AI temporarily unavailable"