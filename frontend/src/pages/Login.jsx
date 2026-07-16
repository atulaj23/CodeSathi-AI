import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/api";

export default function Login() {

  const navigate = useNavigate();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  async function handleLogin(){

    setError("");
    setLoading(true);

    try{

      const data=await loginUser({

        email,
        password

      });

      if(data.success){

        localStorage.setItem(

          "user",

          JSON.stringify(data.user)

        );

        navigate("/chat");

      }

      else{

        setError(

          data.message ||

          "Invalid email or password."

        );

      }

    }

    catch(error){

      console.log(error);

      setError(

        "Unable to connect to server."

      );

    }

    finally{

      setLoading(false);

    }

  }

  return(

<div className="login-page">

<div className="bg-blur blur1"></div>

<div className="bg-blur blur2"></div>

<div className="bg-grid"></div>

{/* LEFT */}

<div className="ai-showcase">

<div className="ai-core">

<div className="ring ring1"></div>

<div className="ring ring2"></div>

<div className="ring ring3"></div>

<div className="core-icon">

✨

</div>

</div>

<div className="showcase-text">

<p className="ai-badge">

NEXT GENERATION AI

</p>

<h1>

Welcome To

<span>

 CodeSathi AI

</span>

</h1>

<p className="show-desc">

One intelligent workspace for

Coding,

Healthcare,

Debugging,

Report Analysis,

and AI Productivity.

</p>

</div>

<div className="feature-list">

<div className="feature-item">

<div className="feature-icon">

⚡

</div>

<div>

<h3>

Ultra Fast AI

</h3>

<p>

Lightning-fast intelligent responses.

</p>

</div>

</div>

<div className="feature-item">

<div className="feature-icon">

💻

</div>

<div>

<h3>

Coding Assistant

</h3>

<p>

Generate, explain and debug code.

</p>

</div>

</div>

<div className="feature-item">

<div className="feature-icon">

🩺

</div>

<div>

<h3>

Healthcare AI

</h3>

<p>

Medical knowledge and report guidance.

</p>

</div>

</div>

<div className="feature-item">

<div className="feature-icon">

🔒

</div>

<div>

<h3>

Secure Workspace

</h3>

<p>

Private conversations and cloud history.

</p>

</div>

</div>

</div>

</div>

{/* LOGIN CARD */}

<div className="login-card">

<div className="login-top">

<div className="login-logo">

🤖

</div>

<h2>

Welcome Back

</h2>

<p>

Login to continue your AI workspace.

</p>

</div>

{

error &&

<div className="error-box">

⚠️ {error}

</div>

}

<div className="input-group">

<label>

Email Address

</label>

<input

type="email"

placeholder="Enter your email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>

</div>

<div className="input-group">

<label>

Password

</label>

<input

type="password"

placeholder="Enter your password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>

</div>

<button

className="login-btn"

onClick={handleLogin}

disabled={loading}

>

{

loading

?

"Signing In..."

:

"Login"

}

</button>

<div className="login-divider">

<span>

OR

</span>

</div>

<p className="signup-text">

Don't have an account?

<Link

to="/signup"

className="signup-link"

>

Create Account

</Link>

</p>

<div className="bottom-note">

✨ Secure Login • AI Powered • Fast Access

</div>

</div>

</div>

);

}