import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import InputBox from "./InputBox";
import FileUpload from "./FileUpload";

import {
  sendMessage as sendMessageAPI,
  getHistory
} from "../services/api";



export default function ChatLayout(){


  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const user_id = user?.id;



  const [message,setMessage] = useState("");

  const [loading,setLoading] = useState(false);



  const [selectedFile,setSelectedFile] = useState(null);



  const [messages,setMessages] = useState([

    {

      role:"ai",

      text:"Hi! Main CodeSathi AI hu 🚀"

    }

  ]);






  useEffect(()=>{


    if(user_id){

      loadHistory();

    }


  },[]);







  async function loadHistory(){


    try{


      const data = await getHistory(user_id);



      if(data.success){


        let old=[];



        data.history.reverse().forEach(chat=>{


          old.push({

            role:"user",

            text:chat.user_message

          });



          old.push({

            role:"ai",

            text:chat.ai_response

          });



        });



        if(old.length){

          setMessages(old);

        }


      }



    }

    catch(error){

      console.log(error);

    }


  }








  async function sendMessage(){


    if(!message.trim() && !selectedFile){

      return;

    }




    const userText = message || 
    "Please analyze this file";




    setMessages(prev=>[

      ...prev,

      {

        role:"user",

        text:

        selectedFile

        ? `${userText} 📎 ${selectedFile.name}`

        : userText

      }

    ]);




    setMessage("");

    setLoading(true);






    try{


      let filePath = null;




      // upload file first

      if(selectedFile){



        const formData = new FormData();


        formData.append(
          "file",
          selectedFile
        );



        const uploadResponse = await fetch(

          "http://127.0.0.1:5000/upload",

          {

            method:"POST",

            body:formData

          }

        );



        const uploadData =
        await uploadResponse.json();



        if(uploadData.success){

          filePath =
          uploadData.file_path;

        }


      }






      const response =
      await sendMessageAPI({


        message:userText,


        user_id:user_id,


        file:filePath


      });







      setMessages(prev=>[

        ...prev,

        {

          role:"ai",

          text:

          response.reply ||

          "No response"

        }

      ]);




      // clear attachment

      setSelectedFile(null);



    }


    catch(error){


      console.log(error);



      setMessages(prev=>[

        ...prev,

        {

          role:"ai",

          text:"❌ Error aa gaya"

        }

      ]);

    }





    setLoading(false);


  }







  function newChat(){


    setMessages([

      {

        role:"ai",

        text:"New chat started 🚀"

      }

    ]);


    setSelectedFile(null);


  }






  function openChat(chat){


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


  }






  return (

    <div className="layout">


      <Sidebar

        onNewChat={newChat}

        onSelectChat={openChat}

      />



      <div className="chat-area">



        <ChatWindow

          messages={messages}

          loading={loading}

        />




        <InputBox


          message={message}


          setMessage={setMessage}


          sendMessage={sendMessage}


          selectedFile={selectedFile}


          setSelectedFile={setSelectedFile}


        />



      </div>


    </div>

  );

}