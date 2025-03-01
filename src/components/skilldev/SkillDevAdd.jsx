import React, { useState } from "react";
import "./skilldevadd.css";
import axios from "axios";
// import Navbar from '../home/Navbar';

const SkillDevAdd = () => {
  const [title, setTitle] = useState("");
  const [hostName, setHostName] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("Webinar");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/event/addEvent`, {title, description, hostName, eventType, date, time});
    alert(res.data.message);
    if(res.data.message === 'Event added successfully'){
      window.location.reload()
    }else{
      console.log(res.data.error)
    }
  }

  return (
    <div className="job-form-container">
      <h4>Skill Development Details Form</h4>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group two-columns">
          <input required type="text" placeholder="event Title" value={title} onChange={e=>setTitle(e.target.value)}/>
          <input required type="text" placeholder="host Name" value={hostName} onChange={e=>setHostName(e.target.value)}/>
        </div>

        <div className="form-group">
          <textarea required placeholder="Describe the event" rows="2" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
        </div>

        <div className="form-group three-columns">
          <select onChange={e=>setEventType(e.target.value)}>
            <option value={'Webinar'} >Webinar</option>
            <option value={'Workshop' }>Workshop</option>
            <option value={'Mock Interview'}>Mock Interview</option>
          </select>
        </div>
        <div className="form-group two-columns">
          <input required type="date" value={date} onChange={e=>setDate(e.target.value)}/>
          <input required type="time" value={time} onChange={e=>setTime(e.target.value)}/>
        </div>

        <button type="submit" className="apply-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SkillDevAdd;
