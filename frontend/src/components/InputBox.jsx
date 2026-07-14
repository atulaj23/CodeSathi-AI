import { useRef } from "react";


export default function InputBox({

  message,

  setMessage,

  sendMessage,

  setSelectedFile,

  selectedFile

}) {


  const fileRef = useRef();




  function handleFile(e){


    const file=e.target.files[0];


    if(file){

      setSelectedFile(file);

    }


  }






  function handleSend(){


    if(!message.trim() && !selectedFile){

      return;

    }


    sendMessage();


  }






  return (



    <div className="input-wrapper">



      <div className="input-area">






        <button


          className="attach-btn"


          onClick={()=>fileRef.current.click()}


          title="Attach file"


        >

          📎


        </button>






        <input


          ref={fileRef}


          type="file"


          hidden


          accept=".pdf,.xlsx,.xls,.csv,.png,.jpg,.jpeg,.txt,.py,.js"


          onChange={handleFile}


        />








        <textarea


          className="chat-input"


          placeholder="Ask CodeSathi AI anything..."


          value={message}



          rows="1"



          onChange={(e)=>setMessage(e.target.value)}






          onKeyDown={(e)=>{


            if(e.key==="Enter" && !e.shiftKey){


              e.preventDefault();


              handleSend();


            }


          }}



        />







        <button


          className="send-btn"


          onClick={handleSend}


        >

          🚀


        </button>






      </div>








      {

        selectedFile && (



          <div className="selected-file">


            <span>

              📎 {selectedFile.name}

            </span>





            <button


              className="remove-file"


              onClick={()=>setSelectedFile(null)}

            >

              ✕

            </button>




          </div>


        )


      }



    </div>



  );


}