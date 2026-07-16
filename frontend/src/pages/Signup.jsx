import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupUser } from "../services/api";

export default function Signup(){

const navigate=useNavigate();

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const [error,setError]=useState("");
const [loading,setLoading]=useState(false);

async function handleSignup(e){

e.preventDefault();

setError("");

setLoading(true);

if(!name.trim()||!email.trim()||!password.trim()){

setError("Please fill all fields.");

setLoading(false);

return;

}

try{

const data=await signupUser({

name,
email,
password

});

if(data.success){

navigate("/login");

}

else{

setError(

data.message ||

"Signup failed."

);

}

}

catch(error){

console.log(error);

setError(

"Unable to connect server."

);

}

finally{

setLoading(false);

}

}

return(

<div className="login-page">

<div className="bg-grid"></div>

<div className="bg-blur blur1"></div>

<div className="bg-blur blur2"></div>

{/* LEFT */}

<div className="ai-showcase">

<div className="ai-core">

<div className="ring ring1"></div>

<div className="ring ring2"></div>

<div className="ring ring3"></div>

<div className="core-icon">

🚀

</div>

</div>

<p className="ai-badge">

CREATE YOUR ACCOUNT

</p>

<div className="showcase-text">

<h1>

Start Your

<span>

 AI Journey

</span>

</h1>

<p className="show-desc">

Join thousands of developers and learners using one intelligent workspace for Coding, Healthcare and AI productivity.

</p>

</div>

<div className="feature-list">

<div className="feature-item">

<div className="feature-icon">

🤖

</div>

<div>

<h3>

AI Coding

</h3>

<p>

Generate production-ready code instantly.

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

Understand reports and medical topics.

</p>

</div>

</div>

<div className="feature-item">

<div className="feature-icon">

🧠

</div>

<div>

<h3>

Smart Memory

</h3>

<p>

Continue conversations anytime.

</p>

</div>

</div>

<div className="feature-item">

<div className="feature-icon">

☁️

</div>

<div>

<h3>

Cloud Workspace

</h3>

<p>

Your chats stay synced securely.

</p>

</div>

</div>

</div>

</div>

{/* RIGHT */}

<div className="login-card">

<div className="login-top">

<div className="login-logo">

✨

</div>

<h2>

Create Account

</h2>

<p>

Welcome to CodeSathi AI

</p>

</div>

{

error &&

<div className="error-box">

⚠️ {error}

</div>

}

<form onSubmit={handleSignup}>

<div className="input-group">

<label>

Full Name

</label>

<input

type="text"

placeholder="John Doe"

value={name}

onChange={(e)=>setName(e.target.value)}

/>

</div>

<div className="input-group">

<label>

Email

</label>

<input

type="email"

placeholder="example@email.com"

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

placeholder="Create Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>

</div>

<button

className="login-btn"

type="submit"

disabled={loading}

>

{

loading

?

"Creating Account..."

:

"Create Account 🚀"

}

</button>

</form>

<div className="login-divider">

<span>

OR

</span>

</div>

<p className="signup-text">

Already have an account?

<Link

to="/login"

className="signup-link"

>

Login

</Link>

</p>

<div className="bottom-note">

🌟 AI Powered • Secure • Fast • Modern

</div>

</div>

</div>

);

}