import os
import PyPDF2



def read_file(file_path):


    try:


        extension = os.path.splitext(
            file_path
        )[1].lower()





        # PDF READER

        if extension == ".pdf":


            text = ""


            with open(
                file_path,
                "rb"
            ) as pdf:


                reader = PyPDF2.PdfReader(pdf)



                for page in reader.pages:


                    text += page.extract_text() or ""



            return text






        # TEXT FILE

        elif extension == ".txt":


            with open(

                file_path,

                "r",

                encoding="utf-8"

            ) as f:


                return f.read()






        return None





    except Exception as e:


        print(

            "FILE READ ERROR:",

            e

        )


        return None