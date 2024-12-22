import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import './profile.css'
import Navbar from '../home/Navbar'
import { FaEdit, FaSave  } from "react-icons/fa";
import Bronze from '../../assets/Bronze.png'
import Silver from '../../assets/Silver.png'
import Gold from '../../assets/Gold.png'
import axios from 'axios'

function Profile() {
  const [isEdit, setIsEdit] = useState(false)
  const cookieEmail = Cookies.get('email')
  const [userProf, setUserProf] = useState()

  useEffect(()=>{
    const getProfile = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/profile/${cookieEmail}`)
        setUserProf(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getProfile()
  }, [cookieEmail])

  const handleUserUpdateSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <div className='profile'>
      <Navbar/>
      {userProf && 
        <div className="flex p-4 pl-20 pr-20 gap-20 relative" id='profileContent'>
        <span className='p-3 rounded-2xl sticky top-0 h-full'>
          <img src={userProf.imageUrl} alt="user" className='w-72 h-72 rounded-full' />
          {userProf.email !== cookieEmail && <button>Message</button> }
        </span>
        <div className='flex flex-col w-4/6 gap-10'>
          <div className='userCard w-5/6 text-2xl flex'>
            <span className='w-1/3 flex-col gap-4 flex font-semibold'>
              <p>Name</p><hr />
              <p>Email</p><hr />
              <p>Roll number</p><hr />
              <p>Role</p>
            </span>
            <form className='flex-col gap-4 flex w-full relative' onSubmit={handleUserUpdateSubmit}>
              <input type="text" value={userProf.name} disabled={!isEdit} onChange={(e) => setUserProf(() => ({...userProf,name: e.target.value}))}/><hr/>
              <input type="text" value={userProf.email} disabled onChange={(e) => setUserProf(() => ({...userProf,email: e.target.value}))}/><hr/>
              <input type="text" value={userProf.regId} disabled={!isEdit} onChange={(e) => setUserProf(() => ({...userProf,regId: e.target.value}))}/><hr/>
              <p className='first-letter:uppercase pl-3'>{userProf.role}</p>
              <button type='submit' className='absolute bottom-1 right-1' onClick={()=>setIsEdit(!isEdit)}>{isEdit ? <FaSave /> : <FaEdit/> }</button>
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
              <span><p className='eventCountHolder'>{userProf.participated.webinars+userProf.participated.mockInterviews+userProf.participated.workshops}</p><p>Total Events</p></span>
              <div className='flex gap-3 text-xl'>
                <span>
                  <p>Webinars :</p>
                  <p>Mock Interviews : </p>
                  <p>WorkShops : </p>
                </span>
                <span>
                  <p>{userProf.participated.webinars}</p>
                  <p>{userProf.participated.mockInterviews}</p>
                  <p>{userProf.participated.workshops}</p>
                </span>
              </div>
            </div>
          </div>
          {userProf.role !== 'Student' && <div className="p-5 w-5/6 rounded-2xl font-semibold text-xl">
            <h1 className="text-2xl font-bold">Events Conducted</h1>
            <div className="flex justify-around">
              <span><p className='eventCountHolder'>{userProf.conducted.webinars+userProf.conducted.mockInterviews+userProf.conducted.workshops}</p><p>Total Events</p></span>
              <div className='flex gap-3 text-xl'>
                <span>
                  <p>Webinars :</p>
                  <p>Mock Interviews : </p>
                  <p>WorkShops : </p>
                </span>
                <span>
                  <p>{userProf.conducted.webinars}</p>
                  <p>{userProf.conducted.mockInterviews}</p>
                  <p>{userProf.conducted.workshops}</p>
                </span>
              </div>
            </div>
          </div>}
        </div>
      </div>}
    </div>
  )
}

export default Profile
