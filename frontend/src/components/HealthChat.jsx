import { useState } from "react";
import HealthInput from "./HealthInput";
import { sendMessage } from "../services/api";


export default function HealthChat(){


    const [message,setMessage] = useState("");

    const [file,setFile] = useState(null);

    const [messages,setMessages] = useState([]);



    async function handleSend(){


        if(!message && !file) return;



        const userMessage = {


            role:"user",

            text:message


        };



        setMessages(prev=>[

            ...prev,

            userMessage

        ]);





        let response;



        try{


            response = await sendMessage({

                message,

                file,

                user_id:

                JSON.parse(

                    localStorage.getItem("user")

                )?.id


            });





            setMessages(prev=>[

                ...prev,


                {

                    role:"ai",

                    text:

                    response.reply ||

                    "Response nahi mila"

                }


            ]);




        }

        catch(error){


            console.log(error);



            setMessages(prev=>[

                ...prev,


                {

                    role:"ai",

                    text:

                    "Healthcare AI se connect nahi ho pa raha."

                }


            ]);

        }





        setMessage("");

        setFile(null);


    }







    return (

        <div className="health-chat">





            <div className="health-header">


                🩺 Healthcare Sathi AI


            </div>







            <div className="health-messages">



                {

                    messages.map((msg,index)=>(


                        <div

                        key={index}

                        className={

                            msg.role==="user"

                            ?

                            "user-message"

                            :

                            "ai-message"

                        }


                        >


                            {
                                msg.role==="ai"

                                ?

                                formatResponse(msg.text)

                                :

                                msg.text
                            }



                        </div>


                    ))

                }



            </div>








            <HealthInput


                message={message}

                setMessage={setMessage}

                sendMessage={handleSend}

                file={file}

                setFile={setFile}


            />





        </div>

    )

}







function formatResponse(text){


    if(!text) return "";



    return text.split("\n").map(

        (line,index)=>(

            <p key={index}>

                {line}

            </p>

        )

    );

}