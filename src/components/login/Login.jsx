import React, { useState } from "react";
import "./login.css";
import LinkedIn from '../../assets/linkedIn.png';
import Google from '../../assets/google.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Submitted:", formData);
  };

  return (
    <div>
    <div className="login-container">
      {/* Alumni Connect Info Section */}
      <div className="info-section">
      <h1>Welcome to Alumni Connect</h1>
      <h3 className="info-subtitle">Reconnect • Inspire • Empower</h3>
      
      <p>
        Welcome home! This is more than a network—it’s your community. Reconnect with lifelong friends, 
        rediscover shared memories, and build new opportunities together. Whether you're looking to grow your career, 
        give back, or simply stay in touch, Alumni Connect keeps you connected—always.
      </p>
    </div>


      {/* Login Form Section */}
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">Login</button>

          <div className="social-login">
            <button className="google-btn">
              <img src={Google} alt="Google" />
              Sign in with Google
            </button>
            <button className="linkedin-btn">
              <img src={LinkedIn} alt="LinkedIn" />
              Sign in with LinkedIn
            </button>
          </div>

          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
