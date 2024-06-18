import React, { useState } from "react";
import "./ConfirmationPopup.css"; // Import CSS file for styling

const ConfirmationPopup = ({ onConfirm, onCancel }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      onConfirm(inputValue);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="confirmation-popup-overlay">
        <div className="confirmation-popup-content">
          <p>Are you sure you want to proceed?</p>
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter reason to confirm"
            minLength={15} // Minimum character limit
            maxLength={200} // Maximum character limit
            style={{
              marginBottom: "10px",
              padding: "8px", // Adjusted padding
              fontSize: "16px", // Adjusted font size
              width: "100%", // Set the width to fill the container
              minHeight: "100px", // Set a minimum height to prevent it from collapsing
              resize: "vertical", // Allow vertical resizing
              boxSizing: "border-box", // Include padding and border in the width calculation
            }}
            required
          ></textarea>
          <div className="button-container">
            <button
              type="submit"
              disabled={inputValue.trim() === ""}
              style={{
                marginLeft: "60px",
                padding: "6px",
                background: inputValue.trim() === "" ? "gray" : "#594c91",
                cursor: inputValue.trim() === "" ? "default" : "pointer"
              }}
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={onCancel}
              style={{
                marginRight: "10px",
                background: "#594c91",
                padding: "6px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ConfirmationPopup;
