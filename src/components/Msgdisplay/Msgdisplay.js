import React, { useState, useEffect } from "react";
import "./Msgdisplay.css";

export default function Msgdisplay({ username }) {
  const [message, setMessage] = useState([]);
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
  Object.keys(message).map(function (key, index) {
    array.push(message[key].msg);
    arrayName.push(message[key].name);
  });
  useEffect(() => {
    // setInterval(fetchData, 200);
    fetchData();
  }, []);
  return (
    <div className="message-display-wrapper">
      <div className="message-display-inner-wrapper">
        {array.map((msg, index) => (
          <div className="single-message-wrapper">
            {console.log(username)}
           {console.log()}
            <div className={`message + ${arrayName[index]===username?"message-user-specific":"andi"}`}>
              <span className="username-name">{arrayName[index]}:</span>
              <span
                className="usermessage-message"
                style={{ color: "#3e97c9" }}
              >
                {msg}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
