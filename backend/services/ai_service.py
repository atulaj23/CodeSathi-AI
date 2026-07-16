import requests
import json
import os

from google import genai

from config import Config

from services.file_reader import read_file



client = genai.Client(
    api_key=Config.GEMINI_API_KEY
)





# ==========================
# MEDICINE DATABASE
# ==========================


MEDICINE_FILE = os.path.join(
    "data",
    "medicines.json"
)


medicines = {}


try:

    with open(MEDICINE_FILE, "r") as f:

        medicines = json.load(f)


except Exception as e:

    print(
        "Medicine database error:",
        e
    )







# ==========================
# CODING AI
# ==========================


SYSTEM_PROMPT = """

You are CodeSathi AI.

Always reply in Hinglish.

You are a coding assistant.

Help with:

- Programming
- Debugging
- Projects
- Development

Give working solutions.

"""







# ==========================
# HEALTHCARE AI
# ==========================


HEALTHCARE_PROMPT = """

You are Healthcare Sathi AI.

You help patients understand health situations.

Rules:

- Never scare patients.
- Never confirm disease.
- Never replace doctor.
- Explain in simple Hinglish.
- Ask important questions.
- Suggest doctor department when required.
- Give emergency guidance if needed.

For medicines:
Give only general information.
Do not prescribe dosage.

"""








# ==========================
# HEALTH ROUTER
# ==========================


def health_router(message):


    text = message.lower()



    emergency_words = [

        "chest pain",
        "chest dard",
        "saans nahi",
        "breathing problem",
        "behosh",
        "unconscious",
        "heart attack",
        "severe bleeding",
        "accident"

    ]



    medicine_words = [

        "medicine",
        "tablet",
        "dawai",
        "drug",
        "paracetamol",
        "ibuprofen",
        "cetirizine",
        "omeprazole"

    ]



    doctor_words = [

        "doctor",
        "kis doctor",
        "specialist",
        "department"

    ]




    if any(word in text for word in emergency_words):

        return "emergency"



    elif any(word in text for word in medicine_words):

        return "medicine"



    elif any(word in text for word in doctor_words):

        return "doctor"



    return "general"









# ==========================
# MEDICINE SEARCH
# ==========================


def medicine_lookup(message):


    text = message.lower()



    for key, data in medicines.items():


        if key.lower() in text:


            return f"""

💊 Medicine Information


Name:
{data['name']}


Category:
{data['category']}


Common Use:
{data['use']}


Precaution:
{data['precaution']}



Note:
Ye general information hai.
Medicine use karne se pehle doctor/pharmacist se confirm karna better hota hai.

"""



    return None







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
# GEMINI HEALTH
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
# OPENROUTER
# ==========================


def openrouter_call(message, prompt):


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

                    "content":prompt

                },


                {

                    "role":"user",

                    "content":message

                }


            ]

        }

    )


    data = response.json()


    return data["choices"][0]["message"]["content"]











# ==========================
# CODING RESPONSE
# ==========================


def generate_response(message, file=None):


    final_message = message



    try:


        if file:


            file_text = read_file(file)


            final_message = f"""

File Content:

{file_text[:8000]}


User Question:

{message}

"""



        result = gemini_call(final_message)



        if result:

            return result



    except Exception as e:


        print(
            "Coding AI Error:",
            e
        )





    try:


        return openrouter_call(

            final_message,

            SYSTEM_PROMPT

        )


    except Exception as e:


        print(
            "OpenRouter Error:",
            e
        )




    return "AI temporarily unavailable"









# ==========================
# HEALTHCARE RESPONSE
# ==========================


def generate_healthcare_response(message):


    category = health_router(message)





    # Medicine

    if category == "medicine":


        info = medicine_lookup(message)



        if info:

            return info







    # Emergency


    if category == "emergency":


        return """

🚨 Aapke symptoms important ho sakte hain.


Mujhe thoda aur bataye:

- Ye problem kab se hai?
- Age kitni hai?
- Pain kitna hai?
- Saans lene me dikkat hai?
- Chakkar ya weakness hai?


Agar chest pain, breathing problem, behoshi ya severe symptoms hain to delay na kare aur emergency medical help le.

"""







    # Doctor suggestion


    if category == "doctor":


        return """

Doctor department symptoms ke according decide hota hai.


Examples:

❤️ Chest pain:
General Physician / Cardiologist


🧠 Head, nerves, weakness:
Neurologist


🦴 Bone/joint pain:
Orthopedic


👶 Child related:
Pediatrician


Aap apne symptoms detail me bataye, mai appropriate department samjhane me help karunga.

"""








    # Normal healthcare AI


    try:


        result = gemini_healthcare_call(message)



        if result:

            return result



    except Exception as e:


        print(
            "Healthcare Gemini Error:",
            e
        )







    try:


        return openrouter_call(

            message,

            HEALTHCARE_PROMPT

        )


    except Exception as e:


        print(
            "Healthcare OpenRouter Error:",
            e
        )




    return "Healthcare AI temporarily unavailable"