import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Cookies from 'js-cookie'
import axios from 'axios'

function ChatSpace({reciever}) {
  const [sender, setSender] = useState('')
  const [chatId, setChatId] = useState('')
  const [chat, setChat] = useState(null)
  const [msg, setMsg] = useState('')
  const email = Cookies.get('email')

  useEffect(() => {
    const getData = async () => {
      try {
        const res1 = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/profile/${email}`)
        setSender(res1.data)
        const sid = res1.data._id.toString();  
        const rid = reciever._id.toString();  
        setChatId(sid < rid ? `${sid}-${rid}` : `${rid}-${sid}`);
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  },[email, reciever])

  useEffect(() => {
    const getData = async () => {
      try {
        console.log(chatId)
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/chat/getChat/${chatId}`)
        setChat(res.data)
      } catch (error) {
        console.log(error)
      }
    } 
    getData()
  }, [chatId])

  // const socket = io(process.env.REACT_APP_BASE_URL)
  // {sender !== '' && socket.on('registerUser', sender._id)}

  const sendMessage = () => {
    // socket.emit('chatmessage', sender, reciever, msg)
    setMsg('')
  }

  return (
    <div className='w-9/12 relative bg-black text-white border-solid border-2 border-gray-200 '>
      <div className="relative ">
        <div className="msgHolder">{
          chat !== null && chat.map((msg, key) => 
            <div key={key} className={msg.sender === sender.name ? 'sender' : 'reciever'}>
              <p>{msg.message}</p>
            </div>)
        }</div>
        <input type="text" className='border-solid border-4 border-black text-black' value={msg} onChange={(e) => setMsg(e.target.value)}/>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default ChatSpace
