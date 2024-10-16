import {useState , useEffect , useContext}  from "react"  ; 
import { MyContext } from "../ContextApi/MyContext";
import {useNavigate}  from "react-router-dom"  ; 

const CreateRoom  = ()=>{

    const navigate = useNavigate()

    const {socket}  = useContext(MyContext)
    const [name, setname]  = useState("")

    const  createRoom = ()=>{
        socket.emit("createRoom"  , {name :  name})
        socket.on("createdRoomSuccessfully"  , (data)=>{
            const id = data.id 
            localStorage.setItem("iChatName" ,data.admin)
            localStorage.setItem("iChatSocketId"  , data.socketId)
            navigate(`/lobby/${id}`)
        })
    }
    return(
        <div className="w-full h-screen flex flex-row justify-center items-center "> 
        
            <input type='text'  className="w-[50%] rounded-l-md  border-r-0  py-3  px-2  border  border-1 border-black items-center   "  placeholder="Enter Your Name" value={name}  onChange={(e)=>{setname(e.target.value)}} /> 
            <button class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium  text-sm px-5 py-4  text-center me-2 rounded-r-md" onClick={createRoom}  >
                
                    Create    
            </button>
        
        </div> 
    )
}

export default CreateRoom ; 