import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupUser } from "../services/api";


export default function Signup() {

  const navigate = useNavigate();


  const [name,setName] = useState("");

  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [error,setError] = useState("");



  const handleSignup = async()=>{


    try{


      const data = await signupUser({

        name,

        email,

        password

      });



      if(data.success){


        alert("Account created successfully 🚀");


        navigate("/");


      }
      else{


        setError(
          data.message
        );


      }



    }
    catch(err){


      console.log(err);


      setError(
        "Server error"
      );


    }


  };





  return (

    <div className="signup-page">


      <div className="bg-blur signup-blur1"></div>

      <div className="bg-blur signup-blur2"></div>



      <div className="signup-card">


        <h1>
          🚀 Join CodeSathi AI
        </h1>


        <p>
          Create your AI coding partner
        </p>




        <input

          type="text"

          placeholder="Full Name"

          value={name}

          onChange={(e)=>setName(e.target.value)}

        />



        <input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e)=>setEmail(e.target.value)}

        />



        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e)=>setPassword(e.target.value)}

        />




        <h3>
          Choose your AI Theme
        </h3>



        <div className="theme-options">


          <label>

            <input 
              type="radio"
              name="theme"
              value="blue"
            />

            🤖 Cyber Blue

          </label>




          <label>

            <input 
              type="radio"
              name="theme"
              value="pink"
            />

            🌸 Nova Pink

          </label>



        </div>




        {
          error && (

            <p className="error">
              {error}
            </p>

          )
        }




        <button onClick={handleSignup}>

          Create Account

        </button>




        <span>

          Already have an account?{" "}

          <Link to="/">

            Login

          </Link>


        </span>



      </div>


    </div>

  );

}