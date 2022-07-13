import React, { useState, useEffect } from "react";
import "./Msgdisplay.css";

export default function Msgdisplay() {
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
  Object.keys(message).map(function (key, index) {
    array.push(message[key].msg);
  });
  useEffect(() => {
    setInterval(fetchData, 200);
    // fetchData();
  }, []);
  return (
    <div className="message-display-wrapper">
      {array.map((msg) => (
        <span className="message">{msg}</span>
      ))}
    </div>
  );
}
