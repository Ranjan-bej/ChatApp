import React, { useEffect, useState } from 'react'
import { Link ,useNavigate} from "react-router-dom"
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';
const Login = () => {
  const [err,setErr]=useState({status:false,mssg:""});
  const navigate = useNavigate();
  const [phoneError, setphoneError] = useState({ isError: false, message: "" });
  const [passwordError, setpasswordError] = useState({ isError: false, message: "" });
  const [values, setValues] = useState({
    password: "",
    phone: ""
  })
  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/");
    }
  },[])
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { phone: values.phone, password: values.password }
      axios.post(loginRoute,data)
      .then(response=>{
        const {status,msg,user}=response.data;
        if(status==true){
          // const userData ={username:user.username,phone:user.phone}
          localStorage.setItem("chat-app-user",JSON.stringify(user))
          navigate("/")
        }
        if(status==false){
          setErr({status:true,mssg:msg});
        }
        else{
          setErr({status:false,mssg:""});
        }
      })
      .catch(err=>{
        console.log(err);
      })
    
  }
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }
  return (
    <div className='registerBox   place-content-center p-[2rem]'>
      <h1 className='text-sky-500 textAnimation font-bold text-7xl font-display mt-6'>Login</h1>
      <form className=' form mt-9 pt-9 flex flex-col gap-12' onSubmit={(e)=>{handleSubmit(e)}}>
        {err.status == true ? <span className='fixed left-10 top-[11rem] text-red-500 font-semibold font-display text-sm'>{err.mssg}</span> : ""}
        <input onChange={(event) => handleChange(event)} className='inputAnimation h-12 rounded-md pl-5 outline-none bg-blue-950 border-2 border-sky-700 shadow-[0_0_4px_3px_rgba(63,148,233,0.7)] text-sky-300 placeholder:text-sky-300' type="text" name='phone' placeholder='Enter your number' />
        <input onChange={(event) => handleChange(event)} className='inputAnimation h-12 rounded-md pl-5 outline-none bg-blue-950 border-2 border-sky-700 shadow-[0_0_4px_3px_rgba(63,148,233,0.7)] text-sky-300 placeholder:text-sky-300' type="password" name='password' placeholder='Enter the password' />
        <button type='Submit' className='inputAnimation border-2 border-sky-300 text-sky-200 h-14 rounded-xl '>Login</button>
        <p className='textAnimation text-sky-400 text-lg'>Don't have an account?<Link to="/register"> Register</Link></p>
      </form>
    </div>
  )
}

export default Login