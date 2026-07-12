const API = "https://codesathi-ai-qwex.onrender.com";


// ================= SEND MESSAGE =================

export async function sendMessage(data) {

  try {

    const response = await fetch(
      `${API}/chat`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          message: data.message,

          file: data.file || null,

          user_id: data.user_id

        })
      }
    );


    const result = await response.json();


    console.log("CHAT RESPONSE:", result);


    return result;


  } catch (error) {

    console.log("SEND MESSAGE ERROR:", error);


    return {

      success:false,

      error:error.message

    };

  }

}





// ================= GET HISTORY =================

export async function getHistory(user_id) {

  try {

    const response = await fetch(

      `${API}/history?user_id=${user_id}`

    );


    const result = await response.json();


    console.log("HISTORY RESPONSE:", result);


    return result;


  } catch(error) {


    console.log("HISTORY ERROR:", error);


    return {

      success:false,

      error:error.message

    };

  }

}





// ================= SIGNUP =================

export async function signupUser(data) {


  try {


    const response = await fetch(

      `${API}/signup`,

      {

        method:"POST",

        headers:{

          "Content-Type":"application/json"

        },

        body:JSON.stringify(data)

      }

    );


    return await response.json();



  } catch(error){


    return {

      success:false,

      error:error.message

    };


  }


}






// ================= LOGIN =================

export async function loginUser(data) {


  try {


    const response = await fetch(

      `${API}/login`,

      {

        method:"POST",

        headers:{

          "Content-Type":"application/json"

        },


        body:JSON.stringify(data)


      }

    );


    return await response.json();



  } catch(error){


    return {

      success:false,

      error:error.message

    };


  }


}