import React, { useState } from "react";
import "./jobadd.css";

const Jobadd = () => {
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [locations, setLocations] = useState([]);
  const [locationInput, setLocationInput] = useState("");

  const handleKeyPress = (event, type) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (type === "skill" && skillInput.trim() !== "") {
        setSkills([...skills, skillInput.trim()]);
        setSkillInput("");
      }
      if (type === "location" && locationInput.trim() !== "") {
        setLocations([...locations, locationInput.trim()]);
        setLocationInput("");
      }
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const removeLocation = (index) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  return (
    <div className="job-form-container">
      <h4>Job Details Form</h4>
      <hr />
      <form>
        <div className="form-group two-columns">
          <input type="text" placeholder="Job Title" />
          <input type="text" placeholder="Company Name" />
        </div>

        <div className="form-group">
          <textarea placeholder="Describe the job/role" rows="2"></textarea>
        </div>

        <div className="form-group three-columns">
          <select>
            <option>Fresher</option>
            <option>1-2 Years</option>
            <option>5+ Years</option>
          </select>

          <select>
            <option>Full-time</option>
            <option>Internship</option>
            <option>Internship + PPO</option>
          </select>

          <input type="text" placeholder="CTC / Salary" />
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            placeholder="Add a location"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, "location")}
          />
          <div className="locations-list">
            {locations.map((location, index) => (
              <span key={index} className="location-tag">
                {location} <button onClick={() => removeLocation(index)}>x</button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Skills Required:</label>
          <input
            type="text"
            placeholder="Add a skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, "skill")}
          />
          <div className="skills-list">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill} <button onClick={() => removeSkill(index)}>x</button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-group two-columns">
          <input type="date" />
          <input type="time" />
        </div>

        <button type="submit" className="apply-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Jobadd;
