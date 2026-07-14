import { useState } from "react";
import { sendMessage as sendMessageAPI } from "../services/api";
import { Link } from "react-router-dom";


export default function Healthcare(){


const [problem,setProblem]=useState("");

const [response,setResponse]=useState("");

const [loading,setLoading]=useState(false);





async function askAI(){


if(!problem.trim()) return;



setLoading(true);

setResponse("");



try{


const data = await sendMessageAPI({

message: problem,

user_id: JSON.parse(localStorage.getItem("user"))?.id,

mode: "healthcare"


});



setResponse(

data.reply || "Please consult a healthcare professional."

);


}

catch(error){


console.log(error);

setResponse(
"Something went wrong. Please try again."
);


}


setLoading(false);


}







return(


<div className="health-page">



<div className="health-header">


<Link to="/chat">

← Back

</Link>



<h1>

🩺 Healthcare Sathi AI

</h1>


<p>

Your calm healthcare information assistant

</p>


</div>








<div className="health-search">


<input


value={problem}


onChange={(e)=>setProblem(e.target.value)}


placeholder="Example: I have fever since 2 days..."



/>





<button onClick={askAI}>


{
loading
?
"Thinking..."
:
"Ask AI 🩺"
}


</button>



</div>








{

response && (


<div className="health-response">


<h2>

Healthcare Guidance

</h2>



<p>

{response}

</p>



</div>


)


}







<div className="health-grid">



<div className="health-card">

<h2>🚨 Emergency Guide</h2>

<p>
Understand what steps to take in urgent situations.
</p>

</div>



<div className="health-card">

<h2>📄 Report Analyzer</h2>

<p>
Understand medical reports in simple language.
</p>

</div>



<div className="health-card">

<h2>💊 Medicine Info</h2>

<p>
Learn medicine related information.
</p>

</div>



<div className="health-card">

<h2>👨‍⚕️ Doctor Guide</h2>

<p>
Know which specialist department may help.
</p>

</div>



</div>





<div className="health-note">

⚠️ Healthcare Sathi AI provides information and guidance.
It is not a replacement for a doctor.

</div>





</div>


);


}