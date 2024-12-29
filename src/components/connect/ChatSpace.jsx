import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Cookies from 'js-cookie'
import axios from 'axios'

function ChatSpace({reciever}) {
  const [sender, setSender] = useState('')
  const [chatId, setChatId] = useState(null)
  const [chat, setChat] = useState(null)
  const [msg, setMsg] = useState('')
  const email = Cookies.get('email')
  const socket = io(process.env.REACT_APP_BASE_URL)

  useEffect(() => {
    const getData = async () => {
      try {
        const res1 = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/profile/${email}`)
        setSender(res1.data)
        const sid = res1.data._id.toString();  
        const rid = reciever._id.toString();  
        setChatId(sid < rid ? `${sid}-${rid}` : `${rid}-${sid}`);
        socket.on('rgisterUseer', res1.data._id)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  },[email, reciever, socket])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/chat/getChat/${chatId}`)
        setChat(res.data.chat)
      } catch (error) {
        console.log(error)
      }
    } 
    if(chatId !== null){getData()}
  }, [chatId])

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
        chat !== null && chat.map((msg, key) => 
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
