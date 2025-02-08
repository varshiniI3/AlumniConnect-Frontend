import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './connect.css'
import Navbar from '../home/Navbar'
import ChatSpace from './ChatSpace'
import { MdAddComment } from "react-icons/md";
import Posts from './Posts';

function Connect() {
  const[showList, setShowList] = useState(false)
  const[showPosts, setShowPosts] = useState(true)
  const[reciever, setReciever] = useState(null)
  const[userList, setUserList] = useState([])
  const[filterUserList, setFilterUserList] = useState([])
  const[sender, setSender] = useState('')
  const navigate = useNavigate()

  const _id = Cookies.get('_id') || null
  if(_id === null){
    alert('login to continue');
    navigate('/login');
  }

  const filterProf = (val) => {
    const filtered = userList.filter(user => user.name.toLowerCase().includes(val.toLowerCase()))
    setFilterUserList(filtered)
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/getUsers`)
        setUserList(res.data.users.filter(user => user._id !== _id))
        setFilterUserList(res.data.users.filter(user => user._id !== _id))
        setSender(res.data.users.find(user => user._id === _id))
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [_id])

  return (
    <div className='connect'>
      <Navbar/>
      <div className="flex">
      {!showPosts && reciever !== null && <ChatSpace reciever={reciever} id={reciever._id} sender={sender} setShowPosts={setShowPosts}/>}
      {showPosts && <><Posts/></>}
      <div className="w-3/12 bg-white relative">
        <button onClick={() => setShowList(!showList)} className='text-4xl absolute bottom-5 right-5 text-green-400'><MdAddComment/></button>
      {
        showList ? 
        <input type="search" placeholder='Search by name'/>
        :
        <div className="userList"><br />
          <input type="search" className='searchUserChat ml-5 p-2' placeholder='Search' onChange={(e) => {filterProf(e.target.value)}}/>
          <div className="userChatList flex flex-col gap-2">{
            filterUserList.map((user, key) => 
              <div className="flex gap-2" key={key} onClick={() => {setReciever(user); setShowPosts(false)}}>
                <img src={user.imageUrl} alt="user" className="w-11 h-11 rounded-full"/>
                <p>{user.name}</p>
              </div>            
            )
          }</div>
        </div>
      }</div>
      </div>
    </div>
  )
}

export default Connect
