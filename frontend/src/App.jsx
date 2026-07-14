import { BrowserRouter, Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar";

import ChatLayout from "./components/ChatLayout";

import Landing from "./pages/Landing";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import Settings from "./pages/Settings";

import Healthcare from "./pages/Healthcare";


export default function App(){


return(


<BrowserRouter>


<Routes>

<Route
 path="/healthcare"
 element={<Healthcare />}
/>



<Route
 path="/settings"
 element={<Settings />}
/>

<Route

path="/"

element={<Landing />}

/>





<Route

path="/login"

element={<Login />}

/>





<Route

path="/signup"

element={<Signup />}

/>






<Route

path="/chat"

element={

<>

<Navbar />

<ChatLayout />

</>

}

/>




</Routes>


</BrowserRouter>


);


}