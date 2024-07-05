import React, { useEffect, useState } from 'react'
import { Link ,useNavigate} from "react-router-dom"
import axios from "axios";
import { setAvatarRoute } from '../utils/APIRoutes';
import loader from "../assets/loader.gif"
import {Buffer} from "buffer";
const SetAvatar = () => {
  const apiData=["https://api.multiavatar.com/06a0d4f7b8e76c51ca.svg","https://api.multiavatar.com/096281f99911d7728a.svg","https://api.multiavatar.com/Neurostatic.svg","https://api.multiavatar.com/6cd1bb.svg","https://api.multiavatar.com/Joker.svg","https://api.multiavatar.com/Scareblow.svg"]
  const navigate = useNavigate();
  const [avatars,setAvatars]=useState([]);
  const [selectedAvatar,setSelectedAvatar]=useState(undefined);
  const [isLoading , setisLoading]=useState(true);
  const setProfilePicture = async ()=>{
    if(setAvatars!==undefined){
      const user = JSON.parse(localStorage.getItem("chat-app-user"));
      const {data} = await axios.post(`${setAvatarRoute}`,{
        image:avatars[selectedAvatar],
        id:user._id
      })
      if(data.isSet){
        user.isAvatarSet=true;
        user.avatarImage=data.image;
        localStorage.setItem("chat-app-user",JSON.stringify(user));
        navigate("/");
      }
    }
  }
  useEffect(()=>{
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login")
    }
  },[])
  useEffect( ()=>{
    async function fetchData(){
    const data =[];
    for(let i=0;i<6;i++){
      const image = await axios.get(apiData[i]);
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"))
    }
    setAvatars(data);
    setisLoading(false);
  }
  fetchData();
  },[])
  return (
    <>
    {
      isLoading == true? <div className='h-screen  bg-[#131324] flex items-center justify-center'>
        <div className='border-8 border-x-slate-100 border-y-[#131324] h-[6rem] w-[6rem]  rounded-full animate-spin'></div>
      </div>:(
    <div className="setavatar  h-screen p-[2rem] bg-[#131324]">
      <h1 className='text-white font-display text-xl font-bold mb-12 md:text-4xl'>Pick an avatar as your profile picture</h1>
      <div className="avatars grid grid-cols-2 h-[40rem] p-3 gap-9 gap-x-10 md:grid-cols-4 md:grid-rows-2">
        {
          avatars.map((item,index)=>{
            return (
              <div className={`avatar h-[10rem] w-[10rem] p-5 rounded-full transition-all ${selectedAvatar === index?"selected border-4 border-blue-500 ":"" }`} key={index}>
                <img className='rounded-full' src={`data:image/svg+xml;base64,${item}`} alt="avatar" onClick={()=>setSelectedAvatar(index)}/>
              </div>
            )
          })
        }
      </div>
      <button className="submitBtn text-white border-2 border-blue-400 h-14 w-36 mt-4 rounded-lg font-bold text-lg" onClick={setProfilePicture}>Select</button>
    </div>
    )}
    </>
  )
}

export default SetAvatar