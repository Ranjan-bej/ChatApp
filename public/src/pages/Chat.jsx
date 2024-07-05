import React, { useEffect, useState ,useRef} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { allUsersRoute , host} from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
const Chat = () => {
  const socket = useRef()
  const [contacts,setContacts]=useState([]);
  const[currUser,setCurrUser]=useState(undefined);
  const navigate = useNavigate();
  useEffect(()=>{
    async function fetchData(){
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login")
    }
    else{
      setCurrUser(await JSON.parse(localStorage.getItem("chat-app-user")))
    }
  }
  fetchData();
  },[])
  useEffect(()=>{
    async function getData(){
      if(currUser){
        if(currUser.isAvatarSet){
        const {data} = await axios.post(`${allUsersRoute}`,{id:currUser._id})
          setContacts(data);
        }
        else{
          navigate("/setAvatar")
        }
      }
  }
  getData()
  },[currUser])
  return (
    <div className="chatBox">
      <Contacts contacts={contacts} currUser={currUser}/>
    </div>
  )
}

export default Chat