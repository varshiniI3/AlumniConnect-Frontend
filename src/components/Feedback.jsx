import React, { useState } from "react";
import "./feedback.css";
import Navbar from '../home/Navbar';

const Feedback = () => {
  
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() !== "" && rating > 0) {
      setSubmitted(true);
    }
  };

  return (
<div className="login-container">
      <Navbar/>
      <div className="info-section">
      <h2>Thank You for Your Valuable Feedback</h2>
      <h3 className="info-subtitle">Your voice matters to us</h3>
      
      <p>
      Thank you for taking the time to share your thoughts! 
      Your feedback helps us grow, improve, and make Alumni Connect better for everyone. 
      Every suggestion brings us closer to a stronger, more meaningful alumni network. 
      Stay connected, stay inspired, and keep empowering those around you—we’re always listening!
      
      </p>
      <pre>
      <br/>
      With gratitude,<br/>
      The Alumni Connect Team
      </pre>

      

      </div>

    
      <div className="feedback-container">
      <div className="feedback-box">
        <h2>We Value Your Feedback! 😊</h2>
        {submitted ? (
          <div className="thank-you">
            <h3>Thank You! 🎉</h3>
            <p>Your feedback helps us improve Alumni Connect.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>How would you rate your experience?</label>
            <div className="rating">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={`star ${num <= rating ? "selected" : ""}`}
                  onClick={() => setRating(num)}
                >
                  ★
                </span>
              ))}
            </div>

            <label>Share Your Thoughts:</label>
            <textarea
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="4"
            ></textarea>

            <button type="submit">Submit Feedback</button>
          </form>
        )}
      </div>
    </div>
      </div>
    
  );
};


export default Feedback;
