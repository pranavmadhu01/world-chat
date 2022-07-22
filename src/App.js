import "./App.css";
import React, { useState, useEffect } from "react";
import Msgdisplay from "./components/Msgdisplay/Msgdisplay";
import Chatpost from "./components/Chatpost/Chatpost";
import imagetwo from "./images/undraw_world_re_768g.svg"

function App() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekquotes =[
    "Sunday clears away the rust of the whole week.",
    "Mondays are the start of the work week which offer new beginnings 52 times a year!",
    "Tuesday is the day to finish what’s left on Monday before Wednesday arrives.",
    "Wednesdays are like Mondays in the middle of the week!",
    "Thursday, the day gives us chances of being more productive",
    "Without Friday, the weekend would be half over already.",
    "Saturday is the mightiest day of the week. It's unshakably, overwhelmingly superior.",
  ]
  // const weekimages = [
  //   require(`./images/sunday.webp`),
  //   require(`./images/monday.jpg`),
  //   require(`./images/tuesday.jpg`),
  //   require(`./images/wednesday.jpg`),
  //   require(`./images/thursday.jpg`),
  //   require(`./images/friday.jpg`),
  //   require(`./images/saturday.webp`),
  // ]
  var current = new Date();

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
      <div className={`user-input-wrapper`} id="user-input">
        <img src={imagetwo} alt="" className="user-input-side-image"/>
        {/* <p>{"Hi today is" + " " + weekday[current.getDay()]}</p> */}
        {/* <img src={weekimages[current.getDay()]} alt="" /> */}
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
        {/* <p>{weekquotes[current.getDay()]}</p> */}
      </div>
      {userName !== "" && (
        <div className="App">
          <Msgdisplay username={userName} />
          <Chatpost username={userName} />
        </div>
      )}
    </>
  );
}

export default App;
