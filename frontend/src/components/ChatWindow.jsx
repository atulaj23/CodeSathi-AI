import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";



export default function ChatWindow({

  messages,

  loading,

  stopGenerating,

  regenerate

}) {



  const bottomRef=useRef();




  useEffect(()=>{


    bottomRef.current?.scrollIntoView({

      behavior:"smooth"

    });


  },[messages,loading]);






  return (



    <div className="messages">





      {

        messages.map((msg,index)=>(


          <MessageBubble


            key={index}


            role={msg.role}


            text={msg.text}


          />


        ))

      }







      {

        loading && (



          <div className="typing-container">


            <div className="typing">


              <span></span>

              <span></span>

              <span></span>


            </div>





            <button


              className="stop-btn"


              onClick={stopGenerating}


            >

              ⛔ Stop


            </button>



          </div>


        )


      }







      {

        !loading && messages.length>1 && (



          <button


            className="regenerate-btn"


            onClick={regenerate}


          >

            🔄 Regenerate


          </button>


        )


      }







      <div ref={bottomRef}></div>




    </div>


  );

}