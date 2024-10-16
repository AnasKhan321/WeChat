import {useParams}  from "react-router-dom"
import {useEffect , useState , useContext  } from "react" ; 
import {MyContext} from "../ContextApi/MyContext.js"; 
const Lobby = ()=>{

    const {socket  , messages  , message , setmessage}  = useContext(MyContext)
    const { id } = useParams();
    const [chat , setchat ]  = useState("")
    const [user ,setuser]  = useState("")
    const [socketId , setsocketId] = useState("")

    const onKeyChange = (e)=>{
            if(e.keyCode == 13){
                const data = {
                    id : id , 
                    message : message, 
                    user : user  , 
                    sid : socketId
                }
          
                socket.emit("sendmessage"  , data)
            }
    }

    useEffect(()=>{
        const name   = localStorage.getItem("iChatName")
        const sid = localStorage.getItem("iChatSocketId")
        setuser(name)
        setsocketId(sid)

    },[])



    return(
        <div className=" bg-gradient-to-r from-cyan-500 to-blue-500" > 
        <div className="w-[75%]   mx-auto h-screen  flex flex-col items-center justify-center " > 
            <div className="mb-4 font-bold text-2xl text-white" > Your room id is {id}</div>
            <div className=" h-[70%]  w-full  border-2 border-slate-300 overflow-y-scroll " >

                <div  >
                {
                    messages.map((data   , index )=>(
                        <div  className="flex flex-col " > 

                        {
                            data.message=="JoinedSuccessfully"? <div className="  my-4 py-2 px-2  text-white font-bold text-xl text-center  " >  {data.user}  Joined the Chat  </div>  :   <div className={`flex bg-gray-100 my-4 py-2 px-2  w-[50%]  ${data.admin?"self-end"  : "self-start"}`}  key={index}>
                          
                          
                            <div className="font-bold "> {data.admin? "You"  : data.user} :  </div> 
                            <div>   { data.message} </div> 
                         </div>  
                        }
                     </div>
                   
                    ))
                }
                 </div> 
                
            </div> 
            <input onChange={(e)=>{setmessage(e.target.value)}} value={message}  onKeyDown={onKeyChange} type="text" className="w-full border-2 mt-5  rounded-lg  py-3  px-2" placeholder="Enter Message" /> 

        </div> 
        </div>
    )
}

export default Lobby ; 