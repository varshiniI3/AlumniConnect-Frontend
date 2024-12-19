import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function Signup (){
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('id')
    if(token){
        axios.post(`${process.env.REACT_APP_BASE_URL}/user/verifyToken`, {token})
        .then((res) => {
          setName(res.data.name)
          setEmail(res.data.email)
          setImageUrl(res.data.imageUrl)
        })
        .catch((error) => {
          console.error('Invalid token:', error);
        })
    }else{
        navigate(-1);
    }
    Cookies.set('email', email)
  }, [location, navigate, email, imageUrl, name]);

  return(
    <div className="signup">
        <p>{name}</p>
        <p>{email}</p>
        <img src={imageUrl} alt="user" />
    </div>
  )};

export default Signup
