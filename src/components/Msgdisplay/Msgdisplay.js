import React, { useState, useEffect, useRef } from "react";
import "./Msgdisplay.css";
import {
  TbArrowBottomCircle,
  TbCurrentLocation,
} from "react-icons/tb";

export default function Msgdisplay({ username }) {
  const [message, setMessage] = useState([]);
  const [ourtext, setOurText] = useState("message arrived");
  const [arrayLength, setArrayLength] = useState(0);
  const messagesEndRef = useRef(null);
  const msg = new SpeechSynthesisUtterance();

  const speechHandler = (msg) => {
    msg.text = ourtext;
    window.speechSynthesis.speak(msg);
  };
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
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
  const arrayPing = [];
  Object.keys(message).map(function (key, index) {
    array.push(message[key].msg);
    arrayName.push(message[key].name);
    arrayTime.push(message[key].datetime);
    arrayCity.push(message[key].city);
    arrayMusic.push(message[key].music);
    arrayPing.push(message[key].ping);
  });
  if (array.length > arrayLength) {
    setArrayLength(array.length);
    setOurText("message arrived");
    if (
      arrayMusic[array.length - 1] &&
      arrayName[array.length - 1] !== username
    ) {
      speechHandler(msg);
    }
    scrollToBottom();
    scrollToBottom();
  }

  useEffect(() => {
    setInterval(fetchData, 1000);
  }, []);

  return (
    <div className="message-display-wrapper">
      <div className="message-display-inner-wrapper">
        {array.map((msg, index) => (
          <div
            className={`single-message-wrapper + ${
              arrayName[index] === username
                ? "single-message-wrapper-user-specific"
                : ""
            }`}
          >
            <div
              className={`${
                arrayName[index] === username
                  ? "message-user-specific"
                  : "message"
              }`}
            >
              <span className="username-name">{arrayName[index] + ":~>"}</span>
              <span className="usermessage-message">
                {msg.includes("https://") || msg.includes("http://") ? (
                  <a href={msg} target="_blank_">
                    {msg}
                  </a>
                ) : (
                  msg
                )}
              </span>
              <span className="userdate-date">{arrayTime[index]}</span>
              <small
                className={`userlocation-location + ${
                  arrayName[index] === username
                    ? "userlocation-location-specific"
                    : ""
                }`}
              >
                <TbCurrentLocation  className="current-location-icon"/>
                {arrayCity[index]}
              </small>
              <small className="userdate-date">
                {arrayPing[index] !== undefined ? arrayPing[index] + "ms" : ""}
              </small>
            </div>
            <div></div>
          </div>
        ))}
        <span>
          <a href="#tobottom" className="bottom-link">
            <TbArrowBottomCircle className="bottom-icon" />
          </a>
        </span>
      </div>
      <span id="tobottom" ref={messagesEndRef}></span>
    </div>
  );
}
