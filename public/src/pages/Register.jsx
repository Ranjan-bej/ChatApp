import React, { useState } from 'react'
import { Link ,useNavigate} from "react-router-dom"
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';
const Register = () => {
  const navigate = useNavigate();
  const [userExists,setUserExists]=useState({exists:false,mssg:""})
  const [nameError, setnameError] = useState({ isError: false, message: "" });
  const [phoneError, setphoneError] = useState({ isError: false, message: "" });
  const [passwordError, setpasswordError] = useState({ isError: false, message: "" });
  const [confirmpasswordError, setconfirmpasswordError] = useState({ isError: false, message: "" });
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phone: ""
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      let data = { username: values.username, phone: values.phone, password: values.password }
      axios
        .post(registerRoute, data)
        .then((response) => {
          const {status,User,msg}=response.data;
          if(status==true){
            // const userData = {username:User.username,phone:User.phone}
            delete User.password
            localStorage.setItem("chat-app-user",JSON.stringify(User))
            navigate("/")
          }
          else if(status==false){
            console.log(status,msg);
            setUserExists({exists:true,mssg:msg})
          }
          else{
            setUserExists({exists:false,mssg:""})
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
  const handleValidation = () => {
    const { username, password, confirmPassword, phone } = values;
    let user = handleUsername(username)
    let number = handlePhone(phone)
    let pass = handlePassword(password)
    let confirm = handleConfirm(password, confirmPassword)
    return user && number && pass && confirm;
  }
  const handleConfirm = (password, confirmpassword) => {
    if (password != confirmpassword) {
      setconfirmpasswordError({ isError: true, message: "*Password must be same" })
      return false;
    }
    else {
      setconfirmpasswordError({ isError: false, message: "" })
      return true;
    }
  }
  const handlePassword = (password) => {
    let regex1 = /[0-9]/g
    let regex2 = /[a-z][A-z]/g
    let regex3 = /[\[\$&\+,:;=?@#|'<>\.\-\^\*\(\)%!\]]/g
    if (!regex1.test(password)) {
      setpasswordError({ isError: true, message: "*Password must contain a digit" })
      return false;
    }
    else if (!regex2.test(password)) {
      setpasswordError({ isError: true, message: "*Password must contain a letter" })
      return false;
    }
    else if (!regex3.test(password)) {
      setpasswordError({ isError: true, message: "*Password must contain a special character" })
      return false;
    }
    else if (password.length < 8) {
      setpasswordError({ isError: true, message: "*Password length must greater than 8" })
      return false;
    }
    else {
      setpasswordError({ isError: false, message: "" })
      return true;
    }
  }
  const handlePhone = (phone) => {
    let regex = /[a-z][A-z]/g

    if (phone.length < 10 || phone.length > 10) {
      setphoneError({ isError: true, message: "*Number length must be 10" })
      return false
    }
    else if (regex.test(phone)) {
      setphoneError({ isError: true, message: "*Number must contain only digits" })
      return false
    }
    else {
      setphoneError({ isError: false, message: "" })
      return true
    }
  }
  const handleUsername = (username) => {
    let regex = /[0-9]/g;
    if (username.length < 3) {
      setnameError({ isError: true, message: "*Length must be greater than 3" })
      return false;
    }
    else if (regex.test(username)) {
      setnameError({ isError: true, message: "*Username must contain only letters" })
      return false;
    }
    else {
      setnameError({ isError: false, message: "" })
      return true;
    }
  }
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }
  return (
    <div className='registerBox   place-content-center p-[2rem]'>
      <h1 className='text-sky-500 textAnimation font-bold text-7xl font-display mt-6'>Register</h1>
      <form className=' form mt-9 pt-9 flex flex-col gap-12' onSubmit={handleSubmit}>
        {nameError.isError == true ? <span className='fixed left-10 top-44 text-red-500 font-semibold font-display text-sm'>{nameError.message}</span> : ""}
        {userExists.exists == true ? <span className='fixed left-10 top-44 text-red-500 font-semibold font-display text-sm'>{userExists.mssg}</span>:""}
        <input onChange={(event) => handleChange(event)} className='inputAnimation h-12 rounded-md pl-5 outline-none bg-blue-950 border-2 border-sky-700 shadow-[0_0_4px_3px_rgba(63,148,233,0.7)] text-sky-300 placeholder:text-sky-300' type="text" name='username' placeholder='Enter your name' />
        {phoneError.isError == true ? <span className='fixed left-10 top-[270px] text-red-500 font-semibold font-display text-sm'>{phoneError.message}</span> : ""}
        <input onChange={(event) => handleChange(event)} className='inputAnimation h-12 rounded-md pl-5 outline-none bg-blue-950 border-2 border-sky-700 shadow-[0_0_4px_3px_rgba(63,148,233,0.7)] text-sky-300 placeholder:text-sky-300' type="text" name='phone' placeholder='Enter your number' />
        {passwordError.isError == true ? <span className='fixed left-10 top-[23rem] text-red-500 font-semibold font-display text-sm'>{passwordError.message}</span> : ""}
        <input onChange={(event) => handleChange(event)} className='inputAnimation h-12 rounded-md pl-5 outline-none bg-blue-950 border-2 border-sky-700 shadow-[0_0_4px_3px_rgba(63,148,233,0.7)] text-sky-300 placeholder:text-sky-300' type="password" name='password' placeholder='Enter the password' />
        {confirmpasswordError.isError == true ? <span className='fixed left-10 top-1/2 text-red-500 font-semibold font-display text-sm'>{confirmpasswordError.message}</span> : ""}
        <input onChange={(event) => handleChange(event)} className='inputAnimation h-12 rounded-md pl-5 outline-none bg-blue-950 border-2 border-sky-700 shadow-[0_0_4px_3px_rgba(63,148,233,0.7)] text-sky-300 placeholder:text-sky-300' type="password" name='confirmPassword' placeholder='Confirm password' />
        <button type='Submit' className='inputAnimation border-2 border-sky-300 text-sky-200 h-14 rounded-xl '>Create User</button>
        <p className='textAnimation text-sky-400 text-lg'>Already have an account?<Link to="/login"> Login</Link></p>
      </form>
    </div>
  )
}

export default Register