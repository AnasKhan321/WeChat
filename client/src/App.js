import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react"; 
import { io } from 'socket.io-client';
import { BrowserRouter, Routes, Route,useNavigate    } from 'react-router-dom';
import Home from "./Components/Home.js" ; 
import CreateRoom from "./Components/CreateRoom"; 
import JoinRoom from "./Components/JoinRoom.js"  ; 
import Lobby from "./Components/Lobby.js"  ; 
import {MyChatProvider}  from "./ContextApi/MyContext.js"
function App() {
  const [socket, setSocket] = useState(null); // Initialize as null
  const [message , setmessage]  = useState("")

  return (
    <BrowserRouter>
      <MyChatProvider> 
        <Routes>
           <Route  exact path='/' element= { <Home key="Home"/> } />
           <Route exact path="/createroom"  element={ <CreateRoom key="createroom " /> }  /> 
           <Route exact path="/lobby/:id"  element={ <Lobby  key="lobby" />  }  /> 
           <Route exact path="/joinroom"  element={  <JoinRoom   key="joinroom" />  } /> 
          
        </Routes>

        </MyChatProvider> 
 </BrowserRouter>
  );
}

export default App;
