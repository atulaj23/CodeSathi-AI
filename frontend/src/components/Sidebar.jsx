import { useEffect, useState } from "react";

import { getHistory } from "../services/api";

import logo from "../assets/logo.png";



export default function Sidebar({

  onSelectChat,

  onNewChat,

  onClose

}) {



  const [history,setHistory] = useState([]);



  const user = JSON.parse(

    localStorage.getItem("user")

  );


  const user_id = user?.id;







  useEffect(()=>{


    if(user_id){

      loadHistory();

    }


  },[]);








  async function loadHistory(){


    try{


      const data = await getHistory(user_id);



      if(data.success){


        setHistory(data.history);


      }



    }

    catch(error){


      console.log(

        "History Error:",

        error

      );


    }


  }








  return (



    <div className="sidebar">






      <div className="sidebar-brand">



        <img

          src={logo}

          className="sidebar-logo"

          alt="CodeSathi"

        />



        <h2>

          CodeSathi AI

        </h2>





        <button

          className="close-sidebar"

          onClick={onClose}

        >

          ✕

        </button>




      </div>









      <button


        className="new-chat-btn"


        onClick={onNewChat}


      >

        ＋ New Chat


      </button>









      <div className="history">



        <h3>

          Recent Chats

        </h3>







        {

          history.length===0

          ?


          (

            <p className="empty">

              No chats yet

            </p>


          )



          :



          history.map((chat)=>(


            <div


              key={chat.id}


              className="history-item"



              onClick={()=>onSelectChat(chat)}


            >



              💬 {


                chat.user_message

                ?

                chat.user_message.slice(0,35)

                :

                "New Conversation"


              }




            </div>



          ))



        }




      </div>






    </div>



  );

}