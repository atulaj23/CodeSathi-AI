import { useEffect, useRef, useState } from "react";

import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import InputBox from "./InputBox";
import Header from "./Header";

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

  const [sidebarOpen,setSidebarOpen] = useState(false);



  const stopRef = useRef(false);



  const [messages,setMessages] = useState([

    {
      role:"ai",
      text:"Hi! Main CodeSathi AI hu 🚀\n\nAap coding, debugging aur projects me meri help le sakte ho."
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









  function typeAIResponse(text){


    const words=text.split(" ");

    let index=0;



    setMessages(prev=>[

      ...prev,

      {

        role:"ai",

        text:""

      }

    ]);




    stopRef.current=false;



    const interval=setInterval(()=>{


      if(

        stopRef.current ||

        index >= words.length

      ){


        clearInterval(interval);

        setLoading(false);

        return;

      }



      index += 5;



      setMessages(prev=>{


        const updated=[...prev];



        updated[updated.length-1]={


          role:"ai",

          text:words

          .slice(0,index)

          .join(" ")


        };


        return updated;


      });



    },25);



  }









  function stopGenerating(){


    stopRef.current=true;

    setLoading(false);


  }









  async function sendMessage(){


    if(!message.trim() && !selectedFile){

      return;

    }




    const userText =
    message || "Please analyze this file";




    setMessages(prev=>[

      ...prev,

      {

        role:"user",

        text:selectedFile

        ?

        `${userText} 📎 ${selectedFile.name}`

        :

        userText

      }

    ]);





    setMessage("");

    setLoading(true);







    try{


      let filePath=null;



      if(selectedFile){


        const formData=new FormData();


        formData.append(

          "file",

          selectedFile

        );




        const uploadResponse=await fetch(

          "https://codesathi-ai-qwex.onrender.com/upload",

          {

            method:"POST",

            body:formData

          }

        );




        const uploadData=

        await uploadResponse.json();



        if(uploadData.success){

          filePath=uploadData.file_path;

        }


      }







      const response=await sendMessageAPI({

        message:userText,

        user_id:user_id,

        file:filePath

      });






      typeAIResponse(

        response.reply || "No response"

      );




      setSelectedFile(null);



    }

    catch(error){


      console.log(error);



      setMessages(prev=>[

        ...prev,

        {

          role:"ai",

          text:"❌ Server error aa gaya"

        }

      ]);



      setLoading(false);


    }



  }









  async function regenerate(){


    const lastUser=[...messages]

    .reverse()

    .find(

      msg=>msg.role==="user"

    );



    if(!lastUser){

      return;

    }




    setLoading(true);



    const response=await sendMessageAPI({

      message:lastUser.text,

      user_id:user_id

    });



    typeAIResponse(

      response.reply || "No response"

    );


  }









  function newChat(){


    setMessages([

      {

        role:"ai",

        text:"New chat started 🚀"

      }

    ]);


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



      {
        sidebarOpen && (

          <div

            className="sidebar-overlay"

            onClick={()=>setSidebarOpen(false)}

          ></div>

        )
      }





      <div

        className={

          sidebarOpen

          ?

          "sidebar-wrapper open"

          :

          "sidebar-wrapper"

        }

      >


        <Sidebar


          onNewChat={()=>{

            newChat();

            setSidebarOpen(false);

          }}


          onSelectChat={(chat)=>{

            openChat(chat);

            setSidebarOpen(false);

          }}



          onClose={()=>setSidebarOpen(false)}


        />


      </div>







      <div className="chat-area">



        <Header

          openSidebar={()=>setSidebarOpen(true)}

        />






        <ChatWindow

          messages={messages}

          loading={loading}

          stopGenerating={stopGenerating}

          regenerate={regenerate}

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