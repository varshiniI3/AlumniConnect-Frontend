import React, { useState } from "react";
import "./jobadd.css";
import axios from "axios";

const Jobadd = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experience, setExperience] = useState("Fresher");
  const [jobType, setJobType] = useState("Full-time");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [location, setLocations] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [link, setLink] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");

  const handleKeyPress = (event, type) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (type === "skill" && skillInput.trim() !== "") {
        setSkills([...skills, skillInput.trim()]);
        setSkillInput("");
      }
      if (type === "location" && locationInput.trim() !== "") {
        setLocations([...location, locationInput.trim()]);
        setLocationInput("");
      }
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/jobs/addJob`, {
      company: companyName,
      role: jobTitle,
      location: location.join(", "),
      salaryRange: { from: salaryFrom, to: salaryTo },
      jobType,
      applyLink: link,
      applyBefore: applicationDeadline,
      description: jobDescription,
      skills,
      experience
    });
    alert(res.data.message);
    if(res.data.message === 'Job added successfully'){
      window.location.reload();
    }
  };

  return (
    <div className="job-form-container">
      <h4>Job Details Form</h4>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group two-columns">
          <input type="text" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
          <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
        </div>

        <div className="form-group">
          <textarea placeholder="Describe the job/role" rows="2" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} required></textarea>
        </div>

        <div className="form-group two-columns">
          <select value={experience} onChange={(e) => setExperience(e.target.value)} required>
            <option value='Fresher'>Fresher</option>
            <option value='1-2 Years'>1-2 Years</option>
            <option value='5+ Years'>5+ Years</option>
          </select>
          <select value={jobType} onChange={(e) => setJobType(e.target.value)} required>
            <option value='Full-time'>Full-time</option>
            <option value='Internship'>Internship</option>
            <option value='Internship + PPO'>Internship + PPO</option>
          </select>
        </div>

        <h1>Salary range (CTC) in LPA </h1>
        <div className="form-group two-columns">
          <input type="number" placeholder="from" value={salaryFrom} onChange={(e) => setSalaryFrom(e.target.value)} required />
          <input type="number" placeholder="to" value={salaryTo} onChange={(e) => setSalaryTo(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input type="text" placeholder="location" value={location} onChange={(e) => setLocations(e.target.value)} onKeyDown={(e) => handleKeyPress(e, "location")} required />
        </div>

        <div className="form-group">
          <label>Skills Required:</label>
          <input type="text" placeholder="Add a skill" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => handleKeyPress(e, "skill")} required />
          <div className="skills-list">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill} <button onClick={() => removeSkill(index)}>x</button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="date">Last date for application: </label>
          <input type="date" id="date" value={applicationDeadline} onChange={(e) => setApplicationDeadline(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="apllyLink">Link for application: </label>
          <input type="text" id="applyLink" value={link} onChange={(e) => setLink(e.target.value)} required />
        </div>

        <button type="submit" className="apply-button">Submit</button>
      </form>
    </div>
  );
};

export default Jobadd;
