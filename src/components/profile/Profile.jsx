import React, { useState } from 'react'
import Cookies from 'js-cookie'
import './profile.css'
import Navbar from '../home/Navbar'
import { FaEdit, FaSave  } from "react-icons/fa";
import Bronze from '../../assets/Bronze.png'
import Silver from '../../assets/Silver.png'
import Gold from '../../assets/Gold.png'

function Profile() {
  const [isEdit, setIsEdit] = useState(false)
  const cookieEmail = Cookies.get('email')
  const [userProf, setUSerProf] = useState({
    name: 'Username', imageUrl: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460', 
    email: 'email@example.com', role: 'Alumni', regId: '21501A05XY'
  })

  const handleUserUpdateSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <div className='profile'>
      <Navbar/>
      <div className="flex p-4 pl-20 pr-20 gap-20 relative" id='profileContent'>
        <span className='p-3 rounded-2xl sticky top-0 h-full'>
          <img src={userProf.imageUrl} alt="user" className='w-72 rounded-full' />
          {userProf.email !== cookieEmail && <button>Message</button> }
        </span>
        <div className='flex flex-col w-4/6 gap-10'>
          <div className='userCard w-5/6 text-2xl flex'>
            <span className='w-1/3 flex-col gap-4 flex font-semibold'>
              <p>Name</p><hr />
              <p>Email</p><hr />
              <p>Roll number</p><hr />
              <p>{userProf.role}</p>
            </span>
            <form className='flex-col gap-4 flex w-full relative' onSubmit={handleUserUpdateSubmit}>
              <input type="text" value={userProf.name} disabled={!isEdit} onChange={(e) => setUSerProf(() => ({...userProf,name: e.target.value}))}/><hr/>
              <input type="text" value={userProf.email} disabled={!isEdit} onChange={(e) => setUSerProf(() => ({...userProf,email: e.target.value}))}/><hr/>
              <input type="text" value={userProf.regId} disabled={!isEdit} onChange={(e) => setUSerProf(() => ({...userProf,regId: e.target.value}))}/><hr/>
              <button type='submit' className='absolute top-1 right-1' onClick={()=>setIsEdit(!isEdit)}>{isEdit ? <FaSave /> : <FaEdit/> }</button>
            </form>
          </div>
          <div className='w-5/6 rounded-2xl p-5'>
            <h1 className='text-2xl mb-5 font-bold'>Badges</h1>
            <span className="badgeHolder gap-5">
              <img src={Bronze} alt="bronzeBadge" />
              <img src={Silver} alt="silverBadge" />
              <img src={Gold} alt="goldBadge" />
            </span>
          </div>
          <div className="p-5 w-5/6 rounded-2xl font-semibold text-xl">
            <h1 className="text-2xl font-bold">Events Participated</h1>
            <div className="flex justify-around">
              <span><p className='eventCountHolder'>88</p><p>Total Events</p></span>
              <div className='flex gap-3 text-xl'>
                <span>
                  <p>Webinars :</p>
                  <p>Mock Interviews : </p>
                  <p>WorkShops : </p>
                </span>
                <span>
                  <p>0</p>
                  <p>0</p>
                  <p>0</p>
                </span>
              </div>
            </div>
          </div>
          {userProf.role !== 'Student' && <div className="p-5 w-5/6 rounded-2xl font-semibold text-xl">
            <h1 className="text-2xl font-bold">Events Conducted</h1>
            <div className="flex justify-around">
              <span><p className='eventCountHolder'>88</p><p>Total Events</p></span>
              <div className='flex gap-3 text-xl'>
                <span>
                  <p>Webinars :</p>
                  <p>Mock Interviews : </p>
                  <p>WorkShops : </p>
                </span>
                <span>
                  <p>0</p>
                  <p>0</p>
                  <p>0</p>
                </span>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Profile
