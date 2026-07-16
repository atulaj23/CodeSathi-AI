import { useState } from "react";
import { sendMessage as sendMessageAPI } from "../services/api";
import { Link } from "react-router-dom";
import "./Healthcare.css";

export default function Healthcare(){

const [problem,setProblem]=useState("");
const [response,setResponse]=useState("");
const [loading,setLoading]=useState(false);

async function askAI(){

if(!problem.trim()) return;

setLoading(true);
setResponse("");

try{

const data=await sendMessageAPI({

message:problem,

user_id:JSON.parse(localStorage.getItem("user"))?.id,

mode:"healthcare"

});

setResponse(
data.reply ||
"Please consult a qualified healthcare professional."
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

{/* Background */}

<div className="health-bg">

<div className="blur one"></div>

<div className="blur two"></div>

<div className="grid"></div>

</div>

{/* Navbar */}

<header className="health-navbar">

<Link
to="/chat"
className="back-btn"
>

← Workspace

</Link>

<div className="health-logo">

<div className="logo-circle">

🩺

</div>

<div>

<h2>Healthcare AI</h2>

<p>Medical Intelligence Platform</p>

</div>

</div>

<Link
to="/chat"
className="dashboard-btn"
>

Dashboard

</Link>

</header>

{/* Hero */}

<section className="health-hero">

<div className="hero-left">

<div className="hero-chip">

<span className="pulse"></span>

Medical AI v3.0

</div>

<h1>

Healthcare

<span>

 Intelligence

</span>

For Everyone

</h1>

<p>

Understand symptoms,
medical reports,
medicine information
and healthcare topics
through an intelligent
AI assistant.

</p>

<div className="hero-actions">

<button
className="primary-health"
onClick={askAI}
>

Start Analysis

</button>

<button
className="secondary-health"
>

Explore Features

</button>

</div>

<div className="health-stats">

<div className="stat-box">

<h2>

24/7

</h2>

<p>

Always Available

</p>

</div>

<div className="stat-box">

<h2>

98%

</h2>

<p>

Reliable Guidance

</p>

</div>

<div className="stat-box">

<h2>

AI

</h2>

<p>

Medical Assistant

</p>

</div>

</div>

</div>

{/* Right */}

<div className="hero-right">

<div className="doctor-panel">

<div className="panel-header">

<div className="traffic">

<span className="red"></span>

<span className="yellow"></span>

<span className="green"></span>

</div>

<span>

Healthcare Workspace

</span>

</div>

<div className="doctor-avatar">

🧑‍⚕️

</div>

<div className="doctor-name">

Healthcare Sathi AI

</div>

<div className="doctor-status">

ONLINE

</div>

<div className="doctor-list">

<div>

❤️ Symptom Analysis

<span>

Ready

</span>

</div>

<div>

📄 Report Reading

<span>

Ready

</span>

</div>

<div>

💊 Medicine Guide

<span>

Ready

</span>

</div>

<div>

🧬 Health Knowledge

<span>

Ready

</span>

</div>

</div>

</div>

</div>

</section>

{/* Search */}

<section className="medical-search">

<h2>

How can I help today?

</h2>

<div className="search-box-health">

<input

value={problem}

onChange={(e)=>setProblem(e.target.value)}

placeholder="Describe your symptoms or ask a healthcare question..."

/>

<button
onClick={askAI}
>

{

loading

?

"Analyzing..."

:

"Ask AI"

}

</button>

</div>

</section>

      {/* AI RESPONSE */}

      {
        response && (

          <section className="ai-response-section">

            <div className="response-card">

              <div className="response-top">

                <div className="ai-icon">

                  🤖

                </div>

                <div>

                  <h3>

                    Healthcare AI Analysis

                  </h3>

                  <p>

                    AI Generated Guidance

                  </p>

                </div>

              </div>

              <div className="response-content">

                {response}

              </div>

              <div className="response-footer">

                <span>

                  🩺 Informational Guidance

                </span>

                <span>

                  ⏱ Generated Instantly

                </span>

              </div>

            </div>

          </section>

        )
      }

      {/* FEATURES */}

      <section className="medical-services">

        <div className="section-heading">

          <span>

            AI MEDICAL TOOLS

          </span>

          <h2>

            Everything In One Medical Workspace

          </h2>

        </div>

        <div className="service-grid">

          <div className="service-card">

            <div className="service-icon">

              ❤️

            </div>

            <h3>

              Symptom Checker

            </h3>

            <p>

              Understand possible causes based on symptoms and receive educational guidance.

            </p>

          </div>

          <div className="service-card">

            <div className="service-icon">

              📄

            </div>

            <h3>

              Report Analysis

            </h3>

            <p>

              Upload laboratory reports and understand common medical terms in simple language.

            </p>

          </div>

          <div className="service-card">

            <div className="service-icon">

              💊

            </div>

            <h3>

              Medicine Information

            </h3>

            <p>

              Learn about medicines, their common uses, precautions and general information.

            </p>

          </div>

          <div className="service-card">

            <div className="service-icon">

              🧬

            </div>

            <h3>

              Disease Library

            </h3>

            <p>

              Explore diseases, symptoms, prevention and health education.

            </p>

          </div>

          <div className="service-card">

            <div className="service-icon">

              👨‍⚕️

            </div>

            <h3>

              Specialist Guide

            </h3>

            <p>

              Learn which medical specialty generally deals with different health concerns.

            </p>

          </div>

          <div className="service-card">

            <div className="service-icon">

              🧠

            </div>

            <h3>

              Health Knowledge

            </h3>

            <p>

              Understand anatomy, nutrition, wellness and healthcare concepts with AI.

            </p>

          </div>

        </div>

      </section>

      {/* QUICK ACTIONS */}

      <section className="quick-actions">

        <div className="quick-card">

          🚑

          <h3>

            Emergency Guide

          </h3>

          <p>

            Learn immediate first-aid steps for common emergencies while waiting for professional help.

          </p>

        </div>

        <div className="quick-card">

          🩻

          <h3>

            Lab Reports

          </h3>

          <p>

            Understand CBC, Blood Sugar, Lipid Profile and other common reports.

          </p>

        </div>

        <div className="quick-card">

          🥗

          <h3>

            Nutrition

          </h3>

          <p>

            Healthy eating guidance, hydration tips and lifestyle recommendations.

          </p>

        </div>

      </section>

            {/* CTA */}

      <section className="health-cta">

        <div className="health-cta-card">

          <span className="cta-badge">

            🌍 Trusted AI Healthcare Assistant

          </span>

          <h2>

            Better Health Starts

            <span>

              With Better Information

            </span>

          </h2>

          <p>

            Healthcare Sathi AI helps you understand
            symptoms, reports, medicines and general
            medical topics. It is designed to educate
            and guide—not to replace licensed
            healthcare professionals.

          </p>

          <div className="cta-buttons">

            <button
              className="primary-health"
              onClick={()=>{
                document
                  .querySelector(".medical-search")
                  ?.scrollIntoView({
                    behavior:"smooth"
                  });
              }}
            >

              Ask Healthcare AI

            </button>

            <Link
              to="/chat"
              className="secondary-health"
            >

              Back To Workspace

            </Link>

          </div>

        </div>

      </section>

      {/* DISCLAIMER */}

      <section className="medical-disclaimer">

        <div className="warning-card">

          <div className="warning-icon">

            ⚠️

          </div>

          <div>

            <h3>

              Important Medical Disclaimer

            </h3>

            <p>

              Healthcare Sathi AI provides educational
              information only.

              It cannot diagnose diseases,
              prescribe medicines,
              or replace qualified doctors.

              If you have severe pain,
              breathing difficulty,
              chest pain,
              heavy bleeding,
              unconsciousness,
              seizures,
              or any medical emergency,

              immediately contact your local emergency
              medical services or visit the nearest hospital.

            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="health-footer">

        <div className="footer-left">

          <div className="footer-logo">

            🩺

          </div>

          <div>

            <h2>

              Healthcare Sathi AI

            </h2>

            <p>

              Intelligent Healthcare Information Platform

            </p>

          </div>

        </div>

        <div className="footer-links">

          <Link to="/chat">

            Workspace

          </Link>

          <Link to="/">

            Home

          </Link>

        </div>

      </footer>

    </div>

  );

}