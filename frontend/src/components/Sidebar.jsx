import { useEffect, useState } from "react";
import { getHistory } from "../services/api";


export default function Sidebar({ onSelectChat, onNewChat }) {


  const [history, setHistory] = useState([]);



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


      const data = await getHistory(
        user_id
      );



      if(data.success){

        setHistory(
          data.history
        );

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



      <button

        className="new-chat-btn"

        onClick={onNewChat}

      >

        + New Chat

      </button>






      <div className="history">


        <h3>
          Chat History
        </h3>




        {

          history.length === 0 ? (


            <p>
              No chats yet
            </p>



          ) : (


            history.map((chat)=>(


              <div

                key={chat.id}

                className="history-item"

                onClick={()=>onSelectChat(chat)}

              >


                💬 {chat.user_message.slice(0,30)}


              </div>


            ))


          )

        }



      </div>


    </div>

  );

}