import requests

from google import genai

from config import Config

from services.file_reader import read_file



client = genai.Client(
    api_key=Config.GEMINI_API_KEY
)





# ==========================
# CODING AI
# ==========================

SYSTEM_PROMPT = """

You are CodeSathi AI.

Always reply in Hinglish.

You are a helpful AI coding assistant.

Give working code when asked.

Analyze files when user uploads them.

"""


# ==========================
# HEALTHCARE AI
# ==========================

HEALTHCARE_PROMPT = """

You are Healthcare Sathi AI.

IMPORTANT:
You are NOT CodeSathi AI.
You are NOT a coding assistant.

In this mode only provide healthcare guidance.

Your role:
Help patients understand health situations calmly.

Rules:

- Never scare the patient.
- Never say the patient definitely has a disease.
- Never give final diagnosis.
- Never replace a doctor.
- Explain in simple Hinglish.
- Ask relevant questions.
- Suggest appropriate doctor department when useful.
- Give emergency guidance only when required.

Response style:

1. Understand the patient's concern.
2. Explain possible common reasons.
3. Ask follow-up questions.
4. Suggest next steps.

Example:

Patient:
"Mujhe fever hai"

Response:

"Samajh sakta hu ki fever se pareshaani ho sakti hai.
Fever ke kai common reasons ho sakte hain.

Thoda bataye:
- fever kitna hai?
- kab se hai?
- cough, cold ya body pain hai?
- koi medicine li hai kya?

Agar fever bahut zyada hai ya condition worsen ho rahi hai to doctor se consult karna better rahega."

"""







# ==========================
# GEMINI CODING
# ==========================

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







# ==========================
# GEMINI HEALTHCARE
# ==========================

def gemini_healthcare_call(message):


    response = client.models.generate_content(

        model="gemini-2.5-flash",

        contents=[

            HEALTHCARE_PROMPT,

            "Patient Query:\n" + message

        ]

    )


    if response and response.text:

        return response.text


    return None







# ==========================
# OPENROUTER CODING
# ==========================

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







# ==========================
# OPENROUTER HEALTHCARE
# ==========================

def openrouter_healthcare_call(message):


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

                    "content":HEALTHCARE_PROMPT

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







# ==========================
# CODING RESPONSE
# ==========================

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


        print("Gemini Error:",e)





    try:


        return openrouter_call(final_message)


    except Exception as e:


        print("OpenRouter Error:",e)





    return "AI temporarily unavailable"









# ==========================
# HEALTHCARE RESPONSE
# ==========================

def generate_healthcare_response(message):


    try:


        result = gemini_healthcare_call(message)


        if result:

            return result



    except Exception as e:


        print("Healthcare Gemini Error:",e)







    try:


        return openrouter_healthcare_call(message)



    except Exception as e:


        print("Healthcare OpenRouter Error:",e)





    return "Healthcare AI temporarily unavailable"