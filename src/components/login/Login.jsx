import React, { useState } from 'react'
import './login.css'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate()
  const[pass, setPass] = useState('')
  const[email, setEmail] = useState('')
  const[showPass, setShowPass] = useState(true)
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/user/login`, {email, pass})
      if(result.data.message === 'Successfull'){
        Cookies.set('email', email, {expires: 7})
        Cookies.set('role', result.data.role, {expires: 7})
        navigate('/')
      }
      alert(result.data.message)
    } catch (error) {
      console.log(error)
    }
  }

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
            <input type="checkbox" name="" id="remMe" className='scale-150' /><label htmlFor="remMe">Remember me</label>
            &nbsp;&nbsp;&nbsp;&nbsp;<a href="/">Forgot password</a>
          </span>
        </form>
        <span className='p-14 z-10'>
          <center>
          <h1>Welcome to Login</h1><br />
          <p>Don't have an account?</p>
          <button className='m-5 mt-10 font-semibold p-3 pl-5 pr-5 rounded-full hover:bg-white hover:text-red-700 hover:shadow-sm bg-transparent' style={{ border: '1px solid white', transition: 'ease-in-out .2s'}}>SignUp</button>          
          </center>
        </span>
      </div>
    </div>
  )
}

export default Login
