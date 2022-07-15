import React, { useState, useEffect } from "react";
import "./Msgdisplay.css";
import { RiUserLocationFill } from "react-icons/ri";
import {TbArrowBottomCircle} from "react-icons/tb";

export default function Msgdisplay({ username }) {
  const [message, setMessage] = useState([]);
  const [ourtext, setOurText] = useState("message arrived");
  const [arrayLength, setArrayLength] = useState(0);
  const msg = new SpeechSynthesisUtterance();

  const speechHandler = (msg) => {
    msg.text = ourtext;
    window.speechSynthesis.speak(msg);
  };

  async function fetchData() {
    await fetch(`${process.env.REACT_APP_CHAT_API}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMessage(data);
      });
  }
  const array = [];
  const arrayName = [];
  const arrayTime = [];
  const arrayCity = [];
  const arrayMusic = [];
  Object.keys(message).map(function (key, index) {
    array.push(message[key].msg);
    arrayName.push(message[key].name);
    arrayTime.push(message[key].datetime);
    arrayCity.push(message[key].city);
    arrayMusic.push(message[key].music);
  });
  if (array.length > arrayLength) {
    setArrayLength(array.length);
    console.log(array[array.length - 1]);
    setOurText('message arrived')
    console.log(arrayMusic[array.length - 1]);
    if (arrayMusic[array.length - 1] && arrayName[array.length-1] !== username) {
      speechHandler(msg);
    }
  }

  useEffect(() => {
    setInterval(fetchData, 1000);
  }, []);

  return (
    <div className="message-display-wrapper">
      <div className="message-display-inner-wrapper">
        {array.map((msg, index) => (
          <div className="single-message-wrapper">
            <div
              className={`message + ${
                arrayName[index] === username ? "message-user-specific" : ""
              }`}
            >
              <span className="username-name">{arrayName[index]}:</span>
              <span
                className="usermessage-message"
                style={{ color: "#3e97c9" }}
              >
                {msg}
              </span>
              <small
                className={`userlocation-location + ${
                  arrayName[index] === username
                    ? "userlocation-location-specific"
                    : ""
                }`}
              >
                <RiUserLocationFill />
                {arrayCity[index]}
              </small>
              <span className="userdate-date">{arrayTime[index]}</span>
            </div>
          </div>
        ))}
        <span><a href="#tobottom" className="bottom-link"><TbArrowBottomCircle className="bottom-icon"/></a></span>
        <span id="tobottom"></span>
      </div>
      
    </div>
  );
}
