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
  }, []);
  return (
    <div>
      {array.map((msg) => (
        <h1>{msg}</h1>
      ))}
    </div>
  );
}
