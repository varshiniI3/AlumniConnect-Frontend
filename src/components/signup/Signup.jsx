import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function Signup (){
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [uname, setUname] = useState('')
  const [rno, setRno] = useState('')
  const [role, setRole] = useState('')
  const [company, setCompany] = useState('')
  const [file, setFile] = useState(null)
  const [designation, setDesignation] = useState('')
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
  }, [location, navigate, email, imageUrl]);

  const handleFileChange = (e) => {
    const temp = e.target.files[0];
    setFile(temp)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('file', file);
    formData.append('uname', uname);
    axios.patch(`${process.env.REACT_APP_BASE_URL}/user/checkUsername`, {username : uname})
    .then((res) => {
      if(res.data.message !== 'valid'){
        alert(res.data.message)
        return 
      }
      axios.post(`${process.env.REACT_APP_BASE_URL}/user/profilepicUpload`, formData, {
        headers : { 'Content-Type' : 'multipart/form-data', },
      })
      .then((imgRes) => {
        console.log(imgRes)
      })
    })
  }

  return(
    <div className="signup flex gap-4 justify-center items-center h-screen w-screen">
      <div className='flex flex-col'>
        <label htmlFor="name">Name</label>
        <label htmlFor="uname">Userame</label>
        <label htmlFor="email">Email</label>
        <label htmlFor="rno">Roll number</label>
        <label htmlFor="role">Role</label>
        {role && role === 'alumni' && <label htmlFor="comp">Company</label>}
        {role && role === 'alumni' && <label htmlFor="desg">Designation</label>}
        <label htmlFor="imgFile">ulpoad ur image</label>
      </div>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input type="text" id='name' value={name} onChange={(e) => {setName(e.target.value)}} required/>
        <input type="text" id='name' value={uname} onChange={(e) => {setUname(e.target.value)}} required/>
        <input type="email" id='email' value={email} disabled/>
        <input type="text" id='rno' value={rno} onChange={(e) => {setRno(e.target.value)}} required/>
        <select id="role" value={role} onChange={(e) => {setRole(e.target.value)}}>
          <option value="student">student</option>
          <option value="alumni">alumni</option>
        </select>
        {role && role === 'alumni' && <input type="text" id='comp' value={company} onChange={e => setCompany(e.target.value)} required />}
        {role && role === 'alumni' && <input type="text" id='desg' value={designation} onChange={e => setDesignation(e.target.value)} required />}
        <input type="file" name="" accept='image/*' id="imgFile" onChange={handleFileChange} required/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )};

export default Signup
