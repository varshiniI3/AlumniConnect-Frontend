import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import './profile.css'
import Navbar from '../home/Navbar'
import { FaEdit, FaSave  } from "react-icons/fa";
import Bronze from '../../assets/ab.png'
import Silver from '../../assets/as.png'
import Gold from '../../assets/ag.png'
import axios from 'axios'

function Profile({mail}) {
  const [isEdit, setIsEdit] = useState(false)
  const cookieEmail = Cookies.get('email')
  const email = mail || cookieEmail
  const [userProf, setUserProf] = useState()
  const [isPicUpdt, setIsPicUpdt] = useState(false)
  const [file, setFile] = useState(null)

  const posts = [
    {imgUrl: 'https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg', title: 'Webinar on React', date: '12/12/2021', time: '10:00 AM', desc: 'This is a webinar on React'},
  ]

  useEffect(()=>{
    const getProfile = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/profile/${email}`)
        setUserProf(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getProfile()
  }, [cookieEmail])

  const handleUserUpdateSubmit = async (e) => {
    e.preventDefault()
    if(isEdit)
      return
    try{
      const res = await axios.patch(`${process.env.REACT_APP_BASE_URL}/user/updateProfile`, userProf)
      alert(res.data.message)
    }catch (err){
      console.log(err)
      alert('Something went wrong in updating profile')
    } finally{
      window.location.reload()
    }
  }

  const profilePicUpload = async (e) => {
    e.preventDefault()
    try {
      axios.post(`${process.env.REACT_APP_BASE_URL}/user/profilepicUpload`, {uname: userProf.name, file: file}, {
        headers : { 'Content-Type' : 'multipart/form-data', },
      })
      alert('Profile image updated successfully')
    } catch (error) {
      console.log(error)
      alert('Unexpected error in updating image')
    } finally{
      window.location.reload()
    }
  }

  const logout  = () => {
    Cookies.remove('email')
    Cookies.remove('role')
    Cookies.remove('_id')
    window.location.reload()
  }

  return (
    <>
    <Navbar/><br />
    <div className='profile'>
      {userProf && 
        <div className="flex p-4 pl-20 pr-20 gap-20 relative" id='profileContent'>
        <span className='p-3 rounded-2xl sticky top-0 h-full'>
          { userProf.email === cookieEmail &&
            <span>
            <form onSubmit={profilePicUpload}>
              {isPicUpdt ? <input type='file' accept='image/*' required onChange={e => setFile(e.target.files[0])}/> : <img src={userProf.imageUrl} alt="user" className='w-72 h-72 rounded-full'/>}
              {isPicUpdt && <center><button className='m-3 pt-1 text-xl font-bold hover:bg-white duration-200 origin- pb-1 p-3 border-solid border-black border-2' >Submit</button></center>}
            </form>
            {!isPicUpdt && <center><button className='m-3 pt-1 text-xl font-bold hover:bg-white duration-200 pb-1 p-3 border-solid border-black border-2' onClick={() => {setIsPicUpdt(true)}}>Update profile image</button></center>}
            <center><button className='m-3 pt-1 text-xl font-bold hover:bg-white duration-200 pb-1 p-3 border-solid border-black border-2' onClick={logout}>Logout</button></center>
            </span>
          }
          {
            userProf.email !== cookieEmail &&
            <center><button className='m-3 pt-1 text-xl font-bold hover:bg-white duration-200 pb-1 p-3 border-solid border-black border-2'>Connect</button></center>
          }
        </span>
        <div className='flex flex-col w-4/6 gap-10'>
          <div className='userDetailsCard w-5/6 text-2xl flex'>
            <span className='w-1/3 flex-col gap-9 flex font-semibold'>
              <p>Name</p> 
              {/* <hr /> */}
              <p>Email</p>
              {/* <hr /> */}
              <p>Roll number</p>
              {/* <hr /> */}
              { userProf.role === 'alumni' && <><p>Branch</p><hr/></>}
              { userProf.role === 'alumni' && <><p>Y.O.P</p><hr/></>}
              { userProf.role === 'alumni' && <><p>Company</p><hr/></>}
              { userProf.role === 'alumni' && <><p>Designation</p><hr/></>}
              <p>Role</p>
            </span>
            <form className='flex-col gap-8 flex w-full relative' onSubmit={handleUserUpdateSubmit}>
              <input type="text" value={userProf.name} disabled={!isEdit} onChange={(e) => setUserProf(() => ({...userProf,name: e.target.value}))}/> 
              {/* <hr/> */}
              <input type="text" value={userProf.email} disabled={!isEdit} onChange={(e) => setUserProf(() => ({...userProf,email: e.target.value}))}/>
              {/* <hr/> */}
              <input type="text" value={userProf.regId} disabled={!isEdit} onChange={(e) => setUserProf(() => ({...userProf,regId: e.target.value}))}/>
              {/* <hr/> */}
              { userProf.role === 'alumni' && <><input type="text" value={userProf.branch} disabled={!isEdit} onChange={(e) => setUserProf(() => ({...userProf,branch: e.target.value}))}/><hr/></>}
              { userProf.role === 'alumni' && <><input type="number" value={userProf.yop} disabled={!isEdit} onChange={(e) => setUserProf(() => ({...userProf,yop: e.target.value}))}/><hr/></>}
              { userProf.role === 'alumni' && <><input type="text" value={userProf.company} disabled={!isEdit} onChange={(e) => setUserProf(() => ({...userProf,company: e.target.value}))}/><hr/></>}
              { userProf.role === 'alumni' && <><input type="text" value={userProf.designation} disabled={!isEdit} onChange={(e) => setUserProf(() => ({...userProf,designation: e.target.value}))}/><hr/></>}
              <p className='first-letter:uppercase pl-3'>{userProf.role}</p>
              <button type='submit' className='absolute bottom-1 right-1' onClick={()=>setIsEdit(!isEdit)}>{isEdit ? <FaSave /> : <FaEdit/> }</button>
            </form>
          </div>
          <div className='w-5/6 rounded-2xl p-5'>
            <h1 className='text-2xl mb-5 font-bold'>About</h1>
            <span className="badgeHolder gap-5">
              <p>{userProf.about}</p>
            </span>
          </div>
          <div className='w-5/6 rounded-2xl p-5'>
            <h1 className='text-2xl mb-5 font-bold'>Badges</h1>
            <span className="badgeHolder gap-5">
              <img src={Bronze} alt="bronzeBadge" data-cont = "Bronze" />
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
          <div className='w-5/6 rounded-2xl p-5'>
          <h1 className="text-2xl font-bold">Posts</h1>
          <span className="profPosts">
          {
            posts.map((post, index) => 
              <img src={post.imgUrl} alt="post" key={index}/>
            )
          }
          </span><br />
          <div className="flex justify-between"><a href="/connect">View all posts</a><a href="/connect">Add new post</a></div>
          </div>
        </div>
      </div>}
    </div>
    </>
  )
}

export default Profile
