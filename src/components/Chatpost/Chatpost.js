import "./Chatpost.css";
import { RiSendPlane2Line } from "react-icons/ri";
import { useState } from "react";

export default function Chatpost({ username }) {
  const [msg, setMsg] = useState("");

  var current = new Date();
  var dateTimeMsg;

  let handleSubmit = async (e) => {
    e.preventDefault();

    dateTimeMsg = current.getHours() + ":" + current.getMinutes();
    console.log(dateTimeMsg);
    try {
      let res = await fetch(`${process.env.REACT_APP_CHAT_API}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          msg: msg,
          name: username,
          datetime :dateTimeMsg
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
