import "./App.css";
import React, { useState, useEffect } from "react";
import Msgdisplay from "./components/Msgdisplay/Msgdisplay";
import Chatpost from "./components/Chatpost/Chatpost";

function App() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");

  let cachedItem;
  let userInput = document.getElementById("user-input");

  const getSingleCacheData = async (cacheName, url) => {
    if (typeof caches === undefined) return false;

    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);
    if (!cachedResponse || !cachedResponse.ok) {
      console.log("Fetched failed!");
    }

    return cachedResponse.json().then((item) => {
      cachedItem = item;
      userInput.classList.add("user-input-wrapper-inactive");
    });
  };

  const cacheToFetch = {
    cacheName: "csechatter",
    url: "http://localhost:3000/",
  };

  getSingleCacheData(cacheToFetch.cacheName, cacheToFetch.url);

  function getName(e) {
    setName(e.target.value);
  }
  let pranav;

  function handleSubmit(e) {
    e.preventDefault();
    setUserName(name);
    e.target.parentElement.classList.toggle("user-input-wrapper-inactive");
    addDataIntoCache("csechatter", "http://localhost:3000/", name);
  }

  const addDataIntoCache = (cacheName, url, response) => {
    const data = new Response(JSON.stringify(response));

    if ("caches" in window) {
      caches.open(cacheName).then((cache) => {
        cache.put(url, data);
      });
    }
  };

  return (
    <>
      <div className={`user-input-wrapper`} id="user-input">
        <form className="user-input-form-wrapper" onSubmit={handleSubmit}>
          <label>Enter your name</label>
          <input
            type="text"
            className="name-input-textfield"
            placeholder="nameplss..."
            onChange={getName}
          />
          <button type="submit" className="user-input-submit-button">
            wroom..
          </button>
        </form>
      </div>
      {cachedItem !== "" && (
        <div className="App">
          <Msgdisplay username={userName} />
          <Chatpost username={userName} />
        </div>
      )}
    </>
  );
}

export default App;
