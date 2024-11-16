// src/popup/Popup.jsx

import React from 'react';
import ReactDOM from 'react-dom';

function Popup() {
  const handleFillForm = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "fillForm" }, (response) => {
        if (response && response.status === "Form filled") {
          console.log("Form fields have been filled.");
        }
      });
    });
  };

  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>Auto-Fill Extension</h2>
      <button onClick={handleFillForm}>Fill Form Fields</button>
    </div>
  );
}

ReactDOM.render(<Popup />, document.getElementById('root'));
