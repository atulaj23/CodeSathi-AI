import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Scene3D from "../components/Scene3D";
import { loginUser } from "../services/api";


export default function Login() {

  const navigate = useNavigate();


  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");



  const handleLogin = async () => {


    setError("");



    try {


      const data = await loginUser({

        email,

        password

      });



      if(data.success){


        // save user info

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );



        navigate("/chat");


      } 
      else {


        setError(
          data.message || "Login failed"
        );


      }



    } catch(error){


      console.log(error);


      setError(
        "Server error. Backend check karo."
      );


    }


  };





  return (

    <div className="login-page">


      <div className="bg-blur blur1"></div>

      <div className="bg-blur blur2"></div>




      <div className="robot-area">

        <Scene3D />

      </div>





      <div className="login-card">


        <h1>
          🤖 CodeSathi AI
        </h1>


        <p>
          Your Intelligent Coding Partner
        </p>




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




        {
          error && (

            <p className="error">
              {error}
            </p>

          )
        }





        <button onClick={handleLogin}>

          Login

        </button>





        <span>

          Don't have an account?{" "}

          <Link to="/signup">

            Sign Up

          </Link>


        </span>



      </div>



    </div>

  );

}