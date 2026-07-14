const API = "https://codesathi-ai-qwex.onrender.com";




// =====================
// Send Message
// =====================

export async function sendMessage(data) {


  const response = await fetch(

    `${API}/chat`,

    {

      method:"POST",


      headers:{


        "Content-Type":"application/json"


      },



      body:JSON.stringify({


        message:data.message,


        file:data.file || null,


        user_id:data.user_id,


        mode:data.mode || "coding"


      })


    }

  );



  return await response.json();


}









// =====================
// Get History
// =====================


export async function getHistory(user_id) {


  const response = await fetch(


    `${API}/history?user_id=${user_id}`


  );



  return await response.json();


}









// =====================
// Signup
// =====================


export async function signupUser(data){


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


}









// =====================
// Login
// =====================


export async function loginUser(data){


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


}