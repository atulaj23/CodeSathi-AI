import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ProfileMenu(){


  const [open,setOpen]=useState(false);

  const menuRef = useRef();

  const navigate=useNavigate();



  const user=JSON.parse(
    localStorage.getItem("user")
  );




  useEffect(()=>{


    function closeMenu(e){

      if(
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ){

        setOpen(false);

      }

    }


    document.addEventListener(
      "mousedown",
      closeMenu
    );


    return()=>{

      document.removeEventListener(
        "mousedown",
        closeMenu
      );

    }


  },[]);







  function logout(){


    localStorage.removeItem("user");

    navigate("/login");


  }







  return(


    <div 
    className="profile-wrapper"
    ref={menuRef}
    >





      <button

      className="profile-btn"

      onClick={()=>setOpen(!open)}

      >



        <div className="profile-avatar">


        {

          user?.name

          ?

          user.name[0].toUpperCase()

          :

          "U"

        }


        </div>



      </button>









      {

      open && (


      <div className="profile-dropdown">


        <div className="profile-top">


          <div className="big-avatar">

          {
            user?.name
            ?
            user.name[0].toUpperCase()
            :
            "U"
          }

          </div>



          <div>


          <h3>

          {
            user?.name || "User"
          }

          </h3>


          <p>

          {
            user?.email || "No email"
          }

          </p>


          </div>



        </div>






        <hr/>





        <button

        onClick={()=>navigate("/settings")}

        >

        ⚙️ Settings

        </button>





        <button

        onClick={logout}

        >

        🚪 Logout

        </button>





      </div>


      )

      }







    </div>


  );


}