import { Link } from "react-router-dom";
import AIAvatar from "../components/AIAvatar";


export default function Landing(){


return(


<div className="landing">



<div className="particles">

<span></span>
<span></span>
<span></span>
<span></span>
<span></span>

</div>





<nav className="landing-nav">


<div className="brand">

🤖

<h2>

CodeSathi AI

</h2>

</div>





<div className="nav-links">


<Link to="/login">

Login

</Link>



<Link

to="/signup"

className="nav-start"

>

Get Started

</Link>


</div>


</nav>









<section className="hero">





<div className="hero-content">



<p className="badge">

🚀 AI Powered Assistant

</p>





<h1>


Build Faster With


<span>

 CodeSathi AI

</span>


</h1>






<p className="hero-text">


Your AI coding and healthcare companion that helps you
build projects and explore knowledge in Hinglish.


</p>






<div className="hero-buttons">


<Link

to="/signup"

className="primary-btn"

>

Start Building 🚀

</Link>




<Link

to="/login"

className="secondary-btn"

>

Login

</Link>



</div>





<div className="stats">


<div>

<h2>

10x

</h2>

<p>

Faster Coding

</p>

</div>



<div>

<h2>

24/7

</h2>

<p>

AI Support

</p>

</div>



<div>

<h2>

🩺

</h2>

<p>

Healthcare

</p>

</div>


</div>



</div>









<div className="hero-card">



<AIAvatar/>




<h3>

CodeSathi AI

</h3>


<p>

Code assistant + Healthcare knowledge assistant.

</p>



<div className="glow"></div>


</div>





</section>









<section className="features">



<h2>

Powerful AI Features

</h2>





<div className="feature-grid">



<div className="feature-card">


<h3>

💻 Code Generation

</h3>


<p>

Create HTML, Python, JavaScript and more with AI.

</p>


</div>






<div className="feature-card">


<h3>

🐛 Debug Assistant

</h3>


<p>

Find coding errors and get solutions quickly.

</p>


</div>







<div className="feature-card">


<h3>

🧠 AI Memory

</h3>


<p>

Continue conversations and improve workflow.

</p>


</div>







<div className="feature-card healthcare-card">


<h3>

🩺 Healthcare AI

</h3>


<p>

Explore medicine information, diseases,
medical terms and healthcare knowledge.

</p>




<Link

to="/healthcare"

className="feature-btn"

>

Explore Health →

</Link>


</div>





</div>


</section>









<section className="workflow">


<h2>

How CodeSathi Works

</h2>



<div>

<span>

1

</span>

Ask your question


</div>



<div>

<span>

2

</span>

AI understands and responds


</div>




<div>

<span>

3

</span>

Build and learn faster


</div>



</section>









<section className="cta">


<h2>

One AI for Coding + Healthcare Knowledge

</h2>



<Link

to="/signup"

className="primary-btn"

>

Join CodeSathi AI 🚀

</Link>


</section>









<footer>


<p>

© 2026 CodeSathi AI. Built with ❤️

</p>


</footer>







</div>


);


}