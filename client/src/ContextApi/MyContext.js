import React, { createContext, useState  , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
const MyContext = createContext();

const MyChatProvider = ({children})=>{

    const [socket, setSocket] = useState(null); 
    const [messages , setmessages]  = useState([])
    const navigate = useNavigate()
    const [message , setmessage]  = useState("")
    useEffect(() => {
      const _socket = io("http://localhost:8000", {
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        randomizationFactor: 0.5
      });
  
      setSocket(_socket);
  
      return () => {
        _socket.disconnect();
        
      };
    }, []);
  
    useEffect(() => {
      if (socket) {
        socket.on("messagereceived", (data) => {
       
          setmessages((prevMessages) => [...prevMessages, data]);
          setmessage("")
        });
  
      
      }
    }, [socket]);




    return (
        <MyContext.Provider value={{socket  , messages  , message , setmessage}}>
          {children}
        </MyContext.Provider>
      );
}

export {MyContext , MyChatProvider}