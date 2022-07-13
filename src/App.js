import "./App.css";
import React, { useState } from "react";
import Msgdisplay from "./components/Msgdisplay/Msgdisplay";
import Chatpost from "./components/Chatpost/Chatpost";

function App() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  function getName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setUserName(name);
    e.target.parentElement.classList.toggle("user-input-wrapper-inactive");
  }
  return (
    <>
      <div className="user-input-wrapper" id="user-input">
        <form className="user-input-form-wrapper" onSubmit={handleSubmit}>
          <label>Enter your name</label>
          <input
            type="text"
            className="name-input-textfield"
            placeholder="nameplss..."
            onChange={getName}
          />
          <button type="submit" className="user-input-submit-button">
            wroom..
          </button>
        </form>
      </div>
      {userName !== "" && (
        <div className="App">
          <Msgdisplay  username={userName}/>
          <Chatpost username={userName}/>
        </div>
      )}
    </>
  );
}

export default App;
