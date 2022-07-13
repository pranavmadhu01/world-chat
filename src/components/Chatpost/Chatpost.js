import "./Chatpost.css";
import { GrSend } from "react-icons/gr";
import { useState } from "react";

export default function Chatpost() {
  const [msg, setMsg] = useState(" ");
  const [message, setMessage] = useState("");
  console.log();

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_CHAT_API}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          msg: msg,
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
          <GrSend />
        </button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}
