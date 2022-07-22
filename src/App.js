import "./App.css";
import React, { useState, useEffect } from "react";
import Msgdisplay from "./components/Msgdisplay/Msgdisplay";
import Chatpost from "./components/Chatpost/Chatpost";
import Loading from "./Loading";
import imagetwo from "./images/undraw_world_re_768g.svg";

function App() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, isLoading] = useState(true);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var current = new Date();

  function getName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setUserName(name);
    e.target.parentElement.classList.toggle("user-input-wrapper-inactive");
  }
  useEffect(() => {
    setTimeout(() => isLoading(false), 3000);
  }, []);
  return (
    <>
      {loading === false ? (
        <>
          <div className={`user-input-wrapper`} id="user-input">
            <img src={imagetwo} alt="" className="user-input-side-image" />
            <p>{"Hi today is" + " " + weekday[current.getDay()]}</p>
            <form className="user-input-form-wrapper" onSubmit={handleSubmit}>
              <label>Enter your name</label>
              <input
                type="text"
                className="name-input-textfield"
                placeholder="nameplss..."
                onChange={getName}
                required={true}
              />
              <button type="submit" className="user-input-submit-button">
                wroom..
              </button>
            </form>
          </div>
          {userName !== "" && (
            <div className="App">
              <Msgdisplay username={userName} />
              <Chatpost username={userName} />
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
