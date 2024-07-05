import React, { useEffect, useState } from 'react'
import ChatContainer from './ChatContainer'
import {context} from "../context/Context.js"
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
const Contacts = ({ contacts, currUser }) => {
  const [currUserName, setCurrUserName] = useState(undefined)
  const [currUserImage, setCurrUserImage] = useState(undefined)
  const [currSelected, setCurrSelected] = useState(undefined)
  const [chatContact, setChatContact] = useState(undefined)
  const navigate = useNavigate()
  const [change, setChange] = useState(false)
  useEffect(() => {
    if (currUser) {
      setCurrUserImage(currUser.avatarImage)
      setCurrUserName(currUser.username)
    }
  }, [currUser])
  const changeCurrChat = (index, contact) => {
    setChange(true)
    setCurrSelected(index)
    setChatContact(contact)
  }
  const handleLogOut =()=>{
    console.log("clicked");
    localStorage.removeItem("chat-app-user")
    navigate("/login")
  }
  return (
    <>
    {change==true?<context.Provider value={{change,setChange}}><ChatContainer currChat={chatContact} currUser={currUser}/></context.Provider> :<>
    {currUserName && currUserImage && (
      <div className="contactsBox p-[2rem] bg-[#131324] h-screen">
        <h3 className='font-bold text-white text-4xl'>Chat App</h3>
        <button onClick={()=>{handleLogOut()}} className='text-white text-3xl fixed right-10 top-9 border-2 border-[#fff] rounded-full h-[3rem] w-[3rem] flex items-center justify-center pl-2'>
          <IoIosLogOut/>
        </button>
        <div className="contacts mt-6 h-[44rem] flex flex-col gap-2 p-1  overflow-x-auto border-2 border-[#3d3a7e] rounded-xl ">
          {
            contacts.map((contact, index) => {
              return (
                <div className={`border-4  flex gap-4 border-[#3d3a7e] p-1 h-20 pl-4 rounded-lg contact ${index === currSelected ? "seleted bg-[#9186f3]" : "bg-[#0b0127]"}`} key={index} onClick={()=>changeCurrChat(index,contact)}>
                  <div className="avatar  h-[4rem] w-[4rem] ">
                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                  </div>
                  <div className="username  text-white flex items-center justify-center w-48">
                    <h3 className='font-bold text-3xl'>{contact.username}</h3>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="current-user flex gap-4 absolute bottom-2">
          <div className="avatar h-[6rem] w-[6rem] ">
            <img src={`data:image/svg+xml;base64,${currUserImage}`} alt="avatar" />
          </div>
          <div className="username text-white flex items-center justify-center w-48">
            <h3 className='font-bold text-3xl'>{currUserName}</h3>
          </div>
        </div>
      </div>
    )}
    </>
  }
  </>
  )
}

export default Contacts