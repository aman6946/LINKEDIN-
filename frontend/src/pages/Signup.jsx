import React,{useContext, useState} from "react";
import logo from "../assets/logo.svg";
import {useNavigate} from "react-router-dom"
import { authDataContext } from "../context/AuthContext";
import axios from "axios"

function Signup() {

  let [show,setShow] = useState(false)
  let {serverUrl}=useContext(authDataContext)
  let navigate=useNavigate()
  let [firstName,setFirstName]=useState("")
  let [lastName,setLastName]=useState("")
  let [userName,setUserName]=useState("")
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")


  //to handle the signup we make a function 
  const handleSignUp=async (e)=>{
    e.preventDefault()
    try{
      let result = await axios.post(serverUrl+"/api/auth/signup",{
        firstName,
        lastName,
        userName,
        email,
        password

      },{withCredentials:true})
      console.log(result)
    } catch (error){
      console.log(error)

    }
  }
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      
      {/* Logo */}
      <div className="w-full max-w-6xl px-2 py-8">
        <img
          src={logo}
          alt="Logo"
          className="fixed w-28 lg:w-30"
        />
      </div>

      {/* Signup Card */}
     <form className='w-[90%] max-w-[400px] h-[600px] md:shadow-xl flex flex-col justify-center gap-[10px] p-[15px]' onSubmit={handleSignUp}>
      <h1 className="text-gray-800 text-[30px] font-semibold mb-[30px]">Sign Up</h1>
      <input type="text" placeholder='firstName' required className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md"value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
      <input type="text" placeholder="lastName" required className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
      <input type="text" placeholder="username" required className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
      <input type="text" placeholder="email" required className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <div className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px]  rounded-md relative " >
        <input type={show?"text":"password"} placeholder="password" required className="w-full h-full border-none
         text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md" value={password} onChange={(e)=>setPassword(e.target.value)}/>
         <span className="absolute right-[20px] top-[10px] text-[#24b2ff] cursor-pointer font-semibold "
         onClick={()=>setShow(prev=>!prev)}>{show?"hidden":"show"}</span>
      </div>

      <button className="w-[100%] h-[50px] rounded-full bg-[#24b2ff] text-white mt-[40px]">Sign Up</button>
      <p className="text-center cursor-pointer" onClick={()=>navigate("/login")}>Already have an account ? <span className='text-[#24b2ff]' >Sign In</span></p>

     </form>
    </div>
  );
}

export default Signup;