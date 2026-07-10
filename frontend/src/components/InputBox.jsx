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

    const file = e.target.files[0];


    if(file){

      setSelectedFile(file);

    }

  }



  return (

    <div className="input-area">


      {/* Plus Button */}

      <button

        className="attach-btn"

        onClick={() => fileRef.current.click()}

      >

        +

      </button>




      <input

        ref={fileRef}

        type="file"

        style={{display:"none"}}

        accept=".pdf,.xlsx,.xls,.csv,.png,.jpg,.jpeg"

        onChange={handleFile}

      />






      <input

        type="text"

        placeholder="Ask CodeSathi AI anything..."

        value={message}

        onChange={(e)=>setMessage(e.target.value)}


        onKeyDown={(e)=>{

          if(e.key==="Enter"){

            sendMessage();

          }

        }}

      />





      <button

        onClick={sendMessage}

      >

        Send

      </button>



      {

        selectedFile && (

          <div className="selected-file">

            📎 {selectedFile.name}

          </div>

        )

      }


    </div>

  );

}