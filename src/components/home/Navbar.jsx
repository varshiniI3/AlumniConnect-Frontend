import React from 'react';
import Cookies from 'js-cookie';
import './home.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const email = Cookies.get('email') || null;

  return (
    <>
      <div
        className="navbar-container flex gap-10 justify-between items-center text-white font-medium fixed top-0 w-full z-10"
        style={{
          background: '#8C1515',
          color: '#FFFFFF',
          padding: '15px 30px', // Increased padding for a larger navbar
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)', // Slightly stronger shadow for emphasis
        }}
      >
        {/* Increased font size for "Alumni Connect" */}
        <span
          className="text-lg font-bold cursor-pointer"
          onClick={() => navigate('/')}
          style={{ fontFamily: 'Lobster, cursive', color: '#FFFFFF', fontSize: '2.8rem', fontWeight:'100' }} // Increased font size
        >
          Alumni Connect
        </span>

        {/* Navigation Links */}
        <div className="nav-links flex gap-8">
          <a
            href="/events"
            className="nav-link"
            data-content="Events"
            style={linkStyle}
          >
            Events
          </a>
          <a
            href="/jobOpportunities"
            className="nav-link"
            data-content="Job Opportunities"
            style={linkStyle}
          >
            Job Opportunities
          </a>
          <a
            href="/skilldev"
            className="nav-link"
            data-content="Skill Development"
            style={linkStyle}
          >
            Skill Development
          </a>
          <a
            href="/connect"
            className="nav-link"
            data-content="Connect"
            style={linkStyle}
          >
            Connect
          </a>
          {email === null ? (
            <a
              href="/login"
              className="nav-link"
              data-content="Login"
              style={linkStyle}
            >
              Login
            </a>
          ) : (
            <a
              href="/profile"
              className="nav-link"
              data-content="Profile"
              style={linkStyle}
            >
              Profile
            </a>
          )}
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}

const linkStyle = {
  color: '#FFFFFF',
  fontSize: '18px', // Larger font size
  textTransform: 'uppercase',
  fontFamily: 'Arial, sans-serif',
  padding: '8px 15px',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease, color 0.3s ease',
};

export default Navbar;