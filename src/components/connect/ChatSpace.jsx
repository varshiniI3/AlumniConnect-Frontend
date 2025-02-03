import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { IoCloseCircleSharp } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import './connect.css'

function ChatSpace({reciever, id, sender, setShowPosts}) {
  const navigate = useNavigate()
  const [chat, setChat] = useState([])
  const [msg, setMsg] = useState('')
  const email = Cookies.get('email')
  if(email === null){alert('login to continue'); navigate('/login')}
  const socket = io(process.env.REACT_APP_BASE_URL)
  socket.on('registerUser', sender._id)

  useEffect(() => {
    const sid = sender._id.toString();  
    const rid = reciever._id.toString();  
    const chatId = sid < rid ? `${sid}-${rid}` : `${rid}-${sid}`;
    const getData = async () => {
      try {
        const res = await axios.patch(`${process.env.REACT_APP_BASE_URL}/chat/${chatId}`)
        setChat(res.data.chat)
      } catch (error) {
        console.log(error)
      }
    } 
    if(chatId !== null){getData()}
  },[sender, reciever, id])

  socket.on('message', (data) => {
    setChat(data.chat)
  })

  const sendMessage = () => {
    if(msg === ``){return}
    socket.emit('chatmessage', sender, reciever, msg)
    setMsg('')
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      sendMessage()
    }
  }

  return (
    <div className='chatspace w-9/12 relative border-solid h-screen mt-1 pr-2'>
      <span className="flex fixed justify-between w-9/12 p-2 z-20 bg-gray-500">
        <span className='flex gap-5'>       
          <img src={reciever.imageUrl} alt="user" className="w-12 h-12 rounded-full"/>
          <center><h1 className='font-semibold text-3xl'>{reciever.name}</h1></center>   
        </span>
        <button className="absolute right-2 text-3xl" onClick={()=>{setShowPosts(true)}}><IoCloseCircleSharp /></button>
      </span><br /><br /><br />
      <div className="msgHolder w-full flex flex-col gap-2 p-2 h-full">{
        chat.length > 0 && chat.map((msg, key) => 
          <div key={key} className={msg.sender === sender._id ? 'justify-end w-full flex' : 'justify-start w-full flex'}>
            <span  className='bg-gray-200 rounded-lg p-2 pb-4 w-fit relative mr-2 z-0'>
              <p className='test-xl'>{msg.message}</p>
              <p className={`absolute bottom-0 ${msg.sender === sender._id ? 'right-1' : 'left-1'}`} style={{ fontSize: '9px' }}>
                {new Date(msg.sentTime).toLocaleTimeString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </p>
            </span>
          </div>)
      }</div>
      <center>
      <input type="text" id='msg-input' className='msg pl-5 pr-5' value={msg} onChange={(e) => setMsg(e.target.value)} placeholder='Type a message' onKeyDown={e=>handleKeyDown(e)}/>
      <label htmlFor="msg-input"><button onClick={sendMessage} className='absolute text-3xl ml-2 mb-2'><IoIosSend/></button></label>
      </center>
    </div>
  )
}

export default ChatSpace
