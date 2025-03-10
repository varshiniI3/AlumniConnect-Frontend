import React, { useState } from "react";
import "./postadd.css";

const Postadd = () => {
  const [image, setImage] = useState(null);
  const [imageDescription, setImageDescription] = useState("");

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="post-form-container">
      <h4>Post Add Form</h4>
      <hr />
      <form>
        {/* Image Upload Section */}
        <div className="form-group row">
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {/* Image Description Section */}
        <div className="form-group row">
          <label>Content:</label>
          <textarea
            placeholder="content about post"
            rows="2"
            value={imageDescription}
            onChange={(e) => setImageDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="apply-button">
          Submit
        </button>
      </form>

      {/* Show Preview if an Image or Description is Added */}
      {(image || imageDescription) && (
        <div className="preview-section">
          <h4>Preview:</h4>
          {image && (
            <div className="image-preview">
              <img src={URL.createObjectURL(image)} alt="Uploaded Preview" />
            </div>
          )}
          {imageDescription && (
            <p className="preview-description"><strong>Content:</strong> {imageDescription}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Postadd;
