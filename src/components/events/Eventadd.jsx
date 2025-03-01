import React, { useState } from "react";
import "./eventadd.css";
import axios from "axios";

const Eventadd = () => {
  const [points, setPoints] = useState([]);
  const [pointInput, setPointInput] = useState("");
  const [title, setTitle] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (pointInput.trim() !== "") {
        setPoints([...points, pointInput.trim()]);
        setPointInput(""); 
      }
    }
  };

  const handleRemovePoint = (index) => {
    setPoints(points.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/offEvent/addOffEvent`,
      {title, coordinator, description, location, email, phone, date, from, to, activities: points})
    alert(res.data.message)
    if(res.data.message === "Event successfully added")
      window.location.reload();
  }

  return (
    <div className="job-form-container">
      <h4>Event Details Form</h4>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group two-columns">
          <input required type="text" placeholder="Event Title" value={title} onChange={e=>setTitle(e.target.value)}/>
          <input required type="text" placeholder="Coordinator Name" value={coordinator} onChange={e=>setCoordinator(e.target.value)}/>
        </div>

        <div className="form-group">
          <textarea required placeholder="Describe the event" rows="2" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input required type="text" placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)}/>
        </div>

        <div className="form-group two-columns">
          <label>Email ID:</label>
          <input required type="email" placeholder="Email ID to contact" value={email} onChange={e=>setEmail(e.target.value)}/>
          <label>Phone No:</label>
          <input required type="phone" placeholder="Phone No to contact" value={phone} onChange={e=>setPhone(e.target.value)}/>
        </div>

        <div className="form-group row">
          <label>Date:</label>
          <input required type="date" value={date} onChange={e=>setDate(e.target.value)}/>
        </div>

        <div className="form-group two-columns">
          <label>From:</label>
          <input required type="time" value={from} onChange={e=>setFrom(e.target.value)}/>
          <label>To:</label>
          <input required type="time" value={to} onChange={e=>setTo(e.target.value)}/>
        </div>

        {/* 📌 Bullet Points Input */}
        <div className="form-group">
          <label>Key Highlights:</label>
          <input required
            type="text"
            placeholder="Enter a key point and press Enter"
            value={pointInput}
            onChange={(e) => setPointInput(e.target.value)}
            onKeyDown={handleKeyPress} // 👈 Adds on Enter
          />
        </div>

        {/* 📌 Display Bullet Points */}
        
        {points.length > 0 && (
          <div className="form-group">
            <div className="event-highlights-container">
            <h4>Event Highlights:</h4>
            <ul>
              {points.map((point, index) => (
                <li key={index}>
                  {point}{" "}
                  <button onClick={() => handleRemovePoint(index)}>X</button>
                </li>
              ))}
            </ul>
            </div>
          </div>
        )}

        <button type="submit" className="apply-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Eventadd;
