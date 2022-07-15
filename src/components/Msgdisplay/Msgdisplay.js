import React, { useState, useEffect } from "react";
import "./Msgdisplay.css";
import { RiUserLocationFill } from "react-icons/ri";

import useSound from "use-sound";

import sound from "../../music/Message Coming.mp3";

export default function Msgdisplay({ username }) {
  const [message, setMessage] = useState([]);

  const [play] = useSound(sound);

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
  useEffect(() => {
    setInterval(fetchData, 1000);

    if(arrayMusic[arrayMusic.length-1] && arrayName[arrayName.length-1] !==username)
    {
      play()
    }
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
      </div>
    </div>
  );
}
