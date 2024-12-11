import React, { useState } from 'react'
import './login.css'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";


function Login() {

  const[pass, setPass] = useState('')
  const[email, setEmail] = useState('')
  const[showPass, setShowPass] = useState(true)

  return (
    <div className="login flex justify-center items-center text-2xl">
      <div className="formContainer relative flex justify-center items-center before:right-0">
        <form action="" className='relative p-3'>
          <center><h3 className='text-4xl font-semibold'>SignIn</h3></center>
          <span>
            <label htmlFor="email">Email</label><br />
            <input type="email" id='email' required className='w-72 text-xl' value={email} onChange={(e)=>setEmail(e.target.value)} /><br />
          </span>
          <span><br />
            <label htmlFor="pass">Password</label><br />
            <span>
              <input type={showPass ? 'password' : 'text'} id='pass' required className='pr-8 pl-2' value={pass} onChange={(e)=>setPass(e.target.value)} />
              {showPass ? <IoMdEye onClick={()=>setShowPass(!showPass)} className='absolute top-1 right-2 text-black' /> : <IoMdEyeOff onClick={()=>setShowPass(!showPass)} className='absolute top-1 right-2 text-black' />}
            </span><br /><br />
          </span>
          <center><button type="submit" className='mr-4'>Login</button><br /></center>
          <span className='text-xl' id='loginFooter'>
            <input type="checkbox" name="" id="remMe" className='scale-150' /><label htmlFor="remMe">Remember me</label>
            &nbsp;&nbsp;&nbsp;&nbsp;<a href="/">Forgot password</a>
          </span>
        </form>
        <span className='p-14 z-10'>
          <h1>Welcome</h1>
          <p>don't have an account </p>
          <button className='m-5 mt-10 font-semibold p-3 rounded-lg' style={{background: '#669bbc', color: 'purple', width: '80%'}}>SignUp</button>
        </span>
      </div>
    </div>
  )
}

export default Login
