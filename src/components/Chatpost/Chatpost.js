import "./Chatpost.css";
import { RiSendPlane2Line } from "react-icons/ri";
import { useState } from "react";

export default function Chatpost({ username }) {
  const [msg, setMsg] = useState("");
  const [city, setCity] = useState("");

  var current = new Date();
  var dateTimeMsg;

  let handleSubmit = async (e) => {
    e.preventDefault();

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("errror");
      }
    }

    async function showPosition(position) {
      await fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_MAP_API}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCity(data.address.town);
        });
    }

    getLocation();
    console.log(city);

    dateTimeMsg = current.getHours() + ":" + current.getMinutes();
    try {
      let res = await fetch(`${process.env.REACT_APP_CHAT_API}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          msg: msg,
          name: username,
          datetime: dateTimeMsg,
          city: city,
        }),
      });
    } catch (err) {
      console.log(err);
    }
    setMsg("");
  };

  return (
    <div className="input-wrapper">
      <form onSubmit={handleSubmit} className="form-wrapper">
        <input
          type="text"
          value={msg}
          placeholder="messagecse..."
          onChange={(e) => setMsg(e.target.value)}
        />

        <button type="submit">
          <RiSendPlane2Line className="send-icon" />
        </button>
      </form>
    </div>
  );
}
