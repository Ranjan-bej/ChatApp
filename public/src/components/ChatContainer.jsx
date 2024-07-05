import React, { useEffect, useState } from 'react'
import { context } from '../context/Context.js'
import { useContext } from 'react'
import axios from "axios"
import ChatInput from './ChatInput.jsx'
import Messages from "../components/Messages.jsx"
import { IoIosArrowBack } from "react-icons/io";
import { getAllMsgRoute, msgRoute } from '../utils/APIRoutes.js'
const ChatContainer = ({ currChat,currUser }) => {
  const data = useContext(context);
  const [msgs,setMsgs]=useState([])

  useEffect(()=>{
    async function fetchMsg(){
      const response = await axios.post(getAllMsgRoute,{
        from:currUser._id,
        to:currChat._id
      })
      setMsgs(response.data)
    }
    fetchMsg();
  },[msgs])
  const changechat = () => {
    data.setChange(false)
  }
  const handleSendMsg = async (msg) => { 
    await axios.post(msgRoute,{
      from:currUser._id,
      to:currChat._id,
      message:msg
    })
  };
  return (
    <div className='chatContainerBox h-screen bg-[#131324] p-1' >
      <div className="chat-header h-20 flex gap-6 p-2  bg-[#20203e] rounded-xl"  >
        <div className="backBtn w-[3rem] flex items-center justify-center text-white text-3xl" onClick={()=>changechat()}>
          <IoIosArrowBack/>
        </div>
        <div className="avatar w-[4rem]">
          <img src={`data:image/svg+xml;base64,${currChat.avatarImage}`} alt="avatar" />
        </div>
        <div className="username flex items-center justify-center pl-6 font-bold text-4xl">
          <h3 className='text-white'>{currChat.username}</h3>
        </div>
      </div>
      {/* <Messages /> */}
      <div className="chat-msgs overflow-x-auto h-[48.4rem]">
        {
          msgs.map((message,index)=>{
            return (
              <div key={index} className={`p-1 mb-1 flex ${message.fromSelf?"justify-end":"justify-start"}`}>
                <div className={`message text-white font-display max-w-[15rem] border-2 border-[#314d77] w-fit p-3  rounded-xl ${message.fromSelf?"sended right-2 bg-[#232f50]":"received left-2 bg-[#010f36]"}`}>
                  <div className="content">
                    <p>
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  )
}

export default ChatContainer