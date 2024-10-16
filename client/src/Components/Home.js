import {useState , useEffect}  from "react"  ; 
import {useNavigate}  from "react-router-dom"  ; 

const Home  = ()=>{


    const navigate = useNavigate()

    return(
        <div  className="w-full h-screen  flex justify-center items-center flex-col " > 
            
            <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5  text-center me-2 mb-2" onClick={()=>{navigate("/joinroom")}} >Join Room </button>
            <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5  text-center me-2 mb-2"  onClick={()=>{navigate("/createroom")}} >Create Room</button>
        </div> 
    )
}

export default Home ; 