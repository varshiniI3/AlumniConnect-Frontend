import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ChatSpace({reciever, id, sender}) {
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
    socket.emit('chatmessage', sender, reciever, msg)
    setMsg('')
  }

  return (
    <div className='w-9/12 relative bg-black text-white border-solid border-2 border-gray-200 '>
      <div className="msgHolder w-11/12 flex flex-col gap-2 p-2 h-full">{
        chat.length > 0 && chat.map((msg, key) => 
          <div key={key} className={msg.sender === sender.name ? 'text-right w-full' : 'text-left w-full'}>
            <p>{msg.message}</p>
          </div>)
      }</div>
      <center>
      <input type="text" className='border-solid border-4 border-black text-black w-9/12' value={msg} onChange={(e) => setMsg(e.target.value)}/>
      <button onClick={sendMessage}>Send</button>
      </center>
    </div>
  )
}

export default ChatSpace
