import {useState , useEffect  , useContext} from "react"
import {MyContext} from "../ContextApi/MyContext.js"
import {useNavigate}  from "react-router-dom"  ; 
const JoinRoom  = ()=>{
    const navigate = useNavigate()
    const {socket}  = useContext(MyContext)
    const [id ,setid ]  = useState("")
    const [name , setname]  = useState("")

    const joinRoom = ()=>{
      if(id.length == 15){
        socket.emit("joinRoom"  , {id : id  , name : name})

        socket.on("joinRoomSuccessfully"  , (data)=>{
            const id = data.id 
            localStorage.setItem("iChatName"  , data.name)
            localStorage.setItem("iChatSocketId"  , data.socketId)
            navigate(`/lobby/${id}`)
        })
      }

    }

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center space-y-3 "> 
         <input type='text'  className="w-[50%] rounded-md   py-3  px-2  border  border-1 border-black items-center   "  placeholder="Enter Name" value={name}  onChange={(e)=>{setname(e.target.value)}} /> 
        
        <input type='text'  className="w-[50%]  rounded-md   py-3  px-2  border  border-1 border-black items-center   "  placeholder="Enter id" value={id}  onChange={(e)=>{setid(e.target.value)}} /> 
        <button class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium  text-sm px-5 py-2  w-[50%]  text-center me-2 " onClick={joinRoom}  >
            
                Join    
        </button>
    
    </div> 
    )
}

export default JoinRoom ; 