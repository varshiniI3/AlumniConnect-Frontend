import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './connect.css'
import Navbar from '../home/Navbar'
import ChatSpace from './ChatSpace'

function Connect() {
  const[showList, setShowList] = useState(false)
  const[reciever, setReciever] = useState(null)
  const[userList, setUserList] = useState([])
  const navigate = useNavigate()
  setShowList(false)
  const name = Cookies.get('name') || null
  if(name === null){
    navigate('/login');
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/getUsers`)
        setUserList(res.data.users.filter(user => user.name !== name))
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [name])

  return (
    <div className='connect'>
      <Navbar/>
      <div className="flex">
      <div className="w-3/12 bg-white ">{
        showList ? 
        <input type="search" placeholder='Search by name'/>
        :
        <div>
          <input type="search" placeholder='Search by name'/>
          <div className="flex flex-col gap-2">{
            userList.map((user, key) => 
              <div className="flex gap-2" key={key} onClick={() => {setReciever(user)}}>
                <img src={user.imageUrl} alt="user" className="w-12 h-12 rounded-full"/>
                <p>{user.name}</p>
              </div>            
            )
          }</div>
        </div>
      }</div>
        {reciever !== null && <ChatSpace reciever={reciever}/>}
      </div>
    </div>
  )
}

export default Connect
