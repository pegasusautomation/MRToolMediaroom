import React, { useState, useEffect, useRef } from "react";
import "./ConfirmationPopup.css"; // Import CSS file for styling

const ConfirmationPopup = ({ onConfirm, onCancel }) => {
  const [inputValue, setInputValue] = useState(""); // State for input value
  const [selectedOption, setSelectedOption] = useState(""); // State for selected option
  const editableDivRef = useRef(null);

  const handleDropdownChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    setInputValue(option);
  };

  const handleInputChange = () => {
    const div = editableDivRef.current;
    const text = div.innerText;
    if (!text.startsWith(selectedOption)) {
      setInputValue(selectedOption);
      return;
    }
    const extraText = text.slice(selectedOption.length).trim();
    setInputValue(selectedOption + " " + extraText);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      onConfirm(inputValue);
    }
  };

  useEffect(() => {
    const div = editableDivRef.current;
    if (div) {
      const extraText = inputValue.slice(selectedOption.length).trim();
      div.innerHTML = `<span style='font-weight: bold;'>${selectedOption}</span> ${extraText}`;
      placeCaretAtEnd(div);
    }
  }, [inputValue, selectedOption]);

  const placeCaretAtEnd = (el) => {
    el.focus();
    if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="confirmation-popup-overlay" style={{zIndex:"1"}}>
        <div className="confirmation-popup-content">
          <p>Are you sure you want to proceed?</p>
          {/* Dropdown for options */}
          <select
            value={selectedOption}
            onChange={handleDropdownChange}
            style={{ marginBottom: "10px" ,height:"30px"}}
          >
            <option value="">Select an option</option>
            <option value="Hardware maintenance">Hardware maintenance</option>
            <option value="Change Management">Change Management</option>
            <option value="Break fix action">Break fix action</option>
            <option value="">others</option>
          </select>
          {/* Editable div */}
          <div
            ref={editableDivRef}
            contentEditable
            onInput={handleInputChange}
            style={{
              marginBottom: "10px",
              padding: "8px",
              fontSize: "16px",
              width: "300px",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              minHeight: "100px",
              maxHeight: "100px", // Set a max height
              overflowY: "auto", // Enable vertical scrollbar
              whiteSpace: "pre-wrap",
            }}
          ></div>
          <div className="button-container">
            <button
              type="submit"
              disabled={inputValue.trim() === ""}
              style={{
                marginLeft: "60px",
                padding: "6px",
                background: inputValue.trim() === "" ? "gray" : "#594c91",
                cursor: inputValue.trim() === "" ? "default" : "pointer",
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