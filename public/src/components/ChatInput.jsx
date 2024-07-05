import React,{useState} from 'react'
import EmojiPicker from 'emoji-picker-react';
import { IoMdSend } from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs"

const ChatInput = ({handleSendMsg}) => {
    const [showEmojiPicker,setShowEmojiPicker] = useState(false)
    const [msg,setMsg]=useState("")
    const handleEmojiPicker = ()=>{
        setShowEmojiPicker(!showEmojiPicker);
    }
    const handleEmojiClick = (emoji,event)=>{
        let  message = msg;
        message+=emoji.emoji
        setMsg(message);
    }
    const sendChat = (e)=>{
        e.preventDefault()
        if(msg.length>0){
            handleSendMsg(msg)
            setMsg("")
        }
    }
  return (
    <div className='inputBox absolute bottom-1 w-[25rem] flex items-end  justify-between p-1 h-14 gap-2'>
        <div className="btnContainer">
            <div className="emoji text-yellow-500 text-3xl pb-1">
                {showEmojiPicker && <EmojiPicker className='absolute bottom-4 '  onEmojiClick={(emoji,event)=>{handleEmojiClick(emoji,event)}}/>}
                <BsEmojiSmileFill  onClick={()=>handleEmojiPicker()}/>
            </div>
        </div>
        <form onSubmit={(e)=>sendChat(e)} className='input-container fixed left-[3rem] w-[22rem] h-14 pt-3 flex gap-3'>
            <input value={msg} onChange={(e)=>setMsg(e.target.value)} type="text" placeholder='Enter your message' className='h-[3rem] w-[20rem] rounded-lg pl-3 bg-transparent border-4 border-[#394775] text-white outline-none text-xl '/>
            <button className="submit text-white text-3xl flex items-center justify-center rounded-full h-[3rem] w-[3rem] pl-2 bg-[#394775]" >
                <IoMdSend/>
            </button>
        </form>
    </div>
  )
}

export default ChatInput