import { useState } from "react";

export default function FileUpload() {

  const [fileName, setFileName] = useState("");



  async function uploadFile(e) {


    const file = e.target.files[0];


    if(!file) return;



    setFileName(file.name);



    const formData = new FormData();

    formData.append(
      "file",
      file
    );



    try {


      const response = await fetch(

        "http://127.0.0.1:5000/upload",

        {

          method:"POST",

          body:formData

        }

      );



      const data = await response.json();



      console.log(
        "UPLOAD:",
        data
      );



      if(data.success){


        // sirf current uploaded file save hogi

        localStorage.setItem(

          "uploadedFile",

          data.file_path

        );


      }



    }

    catch(error){


      console.log(
        "Upload Error:",
        error
      );


    }

  }





  function removeFile(){


    localStorage.removeItem(
      "uploadedFile"
    );


    setFileName("");

  }





  return (

    <div className="file-upload">


      <input

        type="file"

        onChange={uploadFile}

      />



      {

        fileName && (

          <div>

            📎 {fileName}


            <button

              onClick={removeFile}

            >

              ❌

            </button>


          </div>

        )

      }


    </div>

  );

}