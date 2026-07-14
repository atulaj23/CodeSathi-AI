import ProfileMenu from "./ProfileMenu";


export default function Header({openSidebar}){


return(


<header className="app-header">



<button

className="menu-btn"

onClick={openSidebar}

>

☰

</button>





<div className="header-brand">


<div className="header-logo">

🤖

</div>



<div>

<h2>

CodeSathi AI

</h2>


<span>

AI Coding Partner

</span>

</div>



</div>







<div className="header-actions">


<button className="upgrade-btn">

⚡ Pro

</button>



<ProfileMenu/>


</div>





</header>


);


}