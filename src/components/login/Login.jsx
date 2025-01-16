import React, { useState } from 'react'
import './login.css'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import linkedIn from '../../assets/linkedIn.png'
import google from '../../assets/google.png'


function Login() {
  const navigate = useNavigate()
  const[pass, setPass] = useState('')
  const[email, setEmail] = useState('')
  const[showPass, setShowPass] = useState(true)
  const [remember, setRemember] = useState(false)
  
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/user/login`, {email, pass})
      if(result.data.message === 'Successfull'){
        if(remember){
          Cookies.set('email', email, {expires: 1})
          Cookies.set('role', result.data.role, {expires: 1})
          Cookies.set('name', result.data._id, {expires: 1})
        }
        else{
          Cookies.set('email', email, {expires: 7})
          Cookies.set('role', result.data.role, {expires: 7})
          Cookies.set('name', result.data._id, {expires: 7})
        }
        navigate('/')
      }
      alert(result.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoogleSignup = () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/user/signinWithGoogle`;
  };

  const handleLinkedInSignup = () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/user/signinWithLinkedIn`;
  };

  return (
    <div className="login flex justify-center items-center text-2xl">
      <div className="formContainer relative flex justify-center items-center before:right-0">
        <form onSubmit={handleLogin} className='relative p-3'>
          <center><h3 className='text-4xl font-semibold'>SignIn</h3></center>
          <span>
            <label htmlFor="email">Email</label><br />
            <input type="email" id='email' required className='w-72 text-xl' value={email} onChange={(e)=>setEmail(e.target.value.replace(/\s+/g, ''))} /><br />
          </span>
          <span><br />
            <label htmlFor="pass">Password</label><br />
            <span>
              <input type={showPass ? 'password' : 'text'} id='pass' required className='pr-8 pl-2' value={pass} onChange={(e)=>setPass(e.target.value.trim())} />
              {showPass ? <IoMdEye onClick={()=>setShowPass(!showPass)} className='absolute top-1 right-2 text-black' /> : <IoMdEyeOff onClick={()=>setShowPass(!showPass)} className='absolute top-1 right-2 text-black' />}
            </span><br /><br />
          </span>
          <center><button type="submit" className={pass !=='' && email !== '' ? 'mr-4 bg-sky-600' :'mr-4 bg-gray-600 cursor-not-allowed'} disabled={pass === '' || email === ''}>Login</button><br /></center>
          <span className='text-xl' id='loginFooter'>
            <input type="checkbox" name="" id="remMe" className='scale-150' onChange={() => {setRemember(!remember)}}/><label htmlFor="remMe">Remember me</label>
            &nbsp;&nbsp;&nbsp;&nbsp;<a href="/">Forgot password</a>
          </span>
        </form>
        <span className='p-5 z-10'>
          <center>
          <h1>Don't have an account?</h1><br />
          <button className='signupBtn' onClick={handleGoogleSignup} ><img src={google} alt="google Logo" />SignIn with Google</button><br />       
          <button className='signupBtn' onClick={handleLinkedInSignup}><img src={linkedIn} alt="linkedIn Logo" />SignIn with LinkedIn</button>          
          </center>
        </span>
      </div>
    </div>
  )
}

export default Login
