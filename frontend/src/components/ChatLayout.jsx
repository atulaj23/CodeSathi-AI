import { useState } from "react";

import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import InputBox from "./InputBox";
import FileUpload from "./FileUpload";

import { sendMessage as sendMessageAPI } from "../services/api";


export default function ChatLayout() {


  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const user_id = user?.id;



  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);



  const [messages, setMessages] = useState([

    {
      role:"ai",
      text:"Hi! Main CodeSathi AI hu. Kya banana hai aaj? 🚀"
    }

  ]);





  const sendMessage = async()=>{


    if(!message.trim()) return;



    const userMessage = message;



    setMessages((prev)=>[

      ...prev,

      {
        role:"user",
        text:userMessage
      }

    ]);



    setMessage("");

    setLoading(true);




    try{


      const uploadedFile = localStorage.getItem(
        "uploadedFile"
      );




      const data = await sendMessageAPI({

        message:userMessage,

        file:uploadedFile,

        user_id:user_id

      });





      setMessages((prev)=>[

        ...prev,

        {

          role:"ai",

          text:data.reply || "No response"

        }

      ]);




    }

    catch(error){


      console.log(error);



      setMessages((prev)=>[

        ...prev,

        {

          role:"ai",

          text:"❌ Error aa gaya"

        }

      ]);

    }



    setLoading(false);


  };







  const openHistoryChat = (chat)=>{


    setMessages([

      {

        role:"user",

        text:chat.user_message

      },


      {

        role:"ai",

        text:chat.ai_response

      }

    ]);

  };







  const newChat = ()=>{


    setMessages([

      {

        role:"ai",

        text:"Hi! Main CodeSathi AI hu. Kya banana hai aaj? 🚀"

      }

    ]);

  };






  return (

    <div className="layout">


      <Sidebar

        onSelectChat={openHistoryChat}

        onNewChat={newChat}

      />



      <div className="chat-area">


        <FileUpload />



        <ChatWindow

          messages={messages}

          loading={loading}

        />



        <InputBox

          message={message}

          setMessage={setMessage}

          sendMessage={sendMessage}

          loading={loading}

        />


      </div>


    </div>

  );

}