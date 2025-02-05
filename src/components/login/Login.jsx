import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import linkedIn from '../../assets/linkedIn.png'
import google from '../../assets/google.png'
import Navbar from '../home/Navbar';


function Login() {
  const navigate = useNavigate()
  const[pass, setPass] = useState('')
  const[email, setEmail] = useState('')
  const [remember, setRemember] = useState(false)
  
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/user/login`, {email, pass})
      if(result.data.message === 'Successfull'){
        if(remember){
          Cookies.set('email', email, {expires: 1})
          Cookies.set('role', result.data.role, {expires: 1})
          Cookies.set('id', result.data._id, {expires: 1})
        }
        else{
          Cookies.set('email', email, {expires: 7})
          Cookies.set('role', result.data.role, {expires: 7})
          Cookies.set('id', result.data._id, {expires: 7})
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
    <div className="login-container">
      <Navbar/>
      <div className="info-section">
      <h1>Welcome to Alumni Connect</h1>
      <h3 className="info-subtitle">Reconnect • Inspire • Empower</h3>
      
      <p>
        Welcome home! This is more than a network—it’s your community. Reconnect with lifelong friends, 
        rediscover shared memories, and build new opportunities together. Whether you're looking to grow your career, 
        give back, or simply stay in touch, Alumni Connect keeps you connected—always.
      </p>
      </div>
    
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={pass}
              onChange={e=>setPass(e.target.value)}
              required
            />
          </div>
          
          <div className="options">
            <label>
              <input
                type="checkbox"
                name="remember"
                checked={remember}
                onChange={()=>setRemember(!remember)}
              />
              Remember Me
            </label>
            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
          </div>
          
          <button type="submit" className="login-btn">Login</button> 
          </form>
          <div className="social-login" onClick={handleGoogleSignup}>
            <button className="google-btn">
              <img src={google} alt="Google" />
              Sign in with Google
            </button>
            <button className="linkedin-btn" onClick={handleLinkedInSignup}>
              <img src={linkedIn} alt="LinkedIn" />
              Sign in with LinkedIn
            </button>
          </div>

          <p className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
          </p>
      </div>
      </div>
    
  );
};

export default Login;
