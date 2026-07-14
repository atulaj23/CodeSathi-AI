import { useNavigate } from "react-router-dom";


export default function Settings(){


  const navigate = useNavigate();


  const user = JSON.parse(
    localStorage.getItem("user")
  );



  function logout(){

    localStorage.removeItem("user");

    navigate("/login");

  }





  return (

    <div className="settings-page">


      <div className="settings-card">


        <h1>

          ⚙️ Settings

        </h1>



        <div className="profile-box">


          <div className="settings-avatar">


            {
              user?.name
              ?
              user.name[0].toUpperCase()
              :
              "U"
            }


          </div>




          <div>


            <h2>

              {user?.name || "User"}

            </h2>


            <p>

              {user?.email || "No email"}

            </p>


          </div>



        </div>






        <div className="setting-item">


          <h3>

            👤 Account

          </h3>


          <p>

            Manage your CodeSathi AI account

          </p>


        </div>






        <div className="setting-item">


          <h3>

            🌙 Theme

          </h3>


          <p>

            Dark mode enabled

          </p>


        </div>







        <button

        className="logout-btn"

        onClick={logout}

        >

          🚪 Logout

        </button>



      </div>


    </div>

  );


}