import "./Chatpost.css";
import { RiSendPlane2Line } from "react-icons/ri";
import { useState, useEffect } from "react";

export default function Chatpost({ username }) {
  const [msg, setMsg] = useState("");
  const [city, setCity] = useState("fetching your location put another msg");
  const [location, setLocation] = useState("");
  const [executed, setExecuted] = useState(true);
  async function fetchStatus() {
    console.log("hello iam executing");
    setExecuted(false);
    await fetch(`${process.env.REACT_APP_STATUS_API}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        postStatus(parseInt(data.stats) + 1);
      });
  }
  async function postStatus(count) {
    try {
      let res = await fetch(`${process.env.REACT_APP_STATUS_API}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stats: count,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  }

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
          setLocation(data.display_name);
          if (data.address.town === undefined) {
            setCity(data.address.state_district + "," + data.address.state);
          } else {
            setCity(data.address.town + "," + data.address.state);
          }
        });
    }

    getLocation();

    dateTimeMsg =
      current.getDate() +
      "/" +
      current.getMonth() +
      "/" +
      current.getFullYear() +
      "," +
      current.getHours() +
      ":" +
      current.getMinutes() +
      ":" +
      current.getMilliseconds();
    try {
      let res = await fetch(`${process.env.REACT_APP_CHAT_API}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          msg: msg,
          name: username,
          datetime: dateTimeMsg,
          city: city,
          location: location,
          music: true,
          ping: navigator.connection.rtt,
          os: navigator.platform,
        }),
      });
    } catch (err) {
      console.log(err);
    }
    setMsg("");
  };
  useEffect(() => {
    if (navigator.onLine && executed) {
      fetchStatus();
    }
  }, []);

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
