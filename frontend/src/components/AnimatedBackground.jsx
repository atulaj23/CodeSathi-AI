import { useEffect, useRef } from "react";
import "./AnimatedBackground.css";

export default function AnimatedBackground() {

  const canvasRef = useRef(null);


  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    let animationId;


    const mouse = {
      x: null,
      y: null
    };


    const resize = () => {

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;


      particles = [];


      for (let i = 0; i < 180; i++) {

        particles.push({

          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,

          size: Math.random() * 3 + 1,

          speedX: (Math.random() - 0.5) * 0.6,
          speedY: (Math.random() - 0.5) * 0.6

        });

      }

    };


    const handleMouseMove = (e) => {

      mouse.x = e.clientX;
      mouse.y = e.clientY;

    };


    resize();


    window.addEventListener(
      "resize",
      resize
    );


    window.addEventListener(
      "mousemove",
      handleMouseMove
    );



    const animate = () => {


      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );


      particles.forEach((particle) => {


        particle.x += particle.speedX;
        particle.y += particle.speedY;



        if (
          particle.x <= 0 ||
          particle.x >= canvas.width
        ) {

          particle.speedX *= -1;

        }



        if (
          particle.y <= 0 ||
          particle.y >= canvas.height
        ) {

          particle.speedY *= -1;

        }



        // Mouse interaction

        if (
          mouse.x !== null &&
          mouse.y !== null
        ) {


          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;


          const distance = Math.sqrt(
            dx * dx + dy * dy
          );



          if (distance < 150) {

            particle.x += dx / 40;
            particle.y += dy / 40;

          }

        }



        // Draw particle

        ctx.beginPath();


        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );


        ctx.fillStyle =
        "rgba(147,197,253,0.9)";


        ctx.fill();


      });



      animationId = requestAnimationFrame(
        animate
      );


    };


    animate();



    return () => {


      window.removeEventListener(
        "resize",
        resize
      );


      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );


      cancelAnimationFrame(
        animationId
      );


    };


  }, []);



  return (

    <div className="animated-bg">

      <canvas ref={canvasRef}></canvas>


      <div className="glow blue"></div>


      <div className="glow purple"></div>


    </div>

  );

}