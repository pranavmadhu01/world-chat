import "./App.css";
import React, { useState } from "react";
import Msgdisplay from "./components/Msgdisplay/Msgdisplay";
import Chatpost from "./components/Chatpost/Chatpost";

function App() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  console.log(name)

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
  // console.log(userName);

  if (pranav == 1) {
    console.log(pranav);
  }

  //
  // const getSingleCacheData = async (cacheName, url) => {
  // if (typeof caches === "undefined") return false;
  //
  // const cacheStorage = await caches.open(cacheName);
  // console.log(url)
  // const cachedResponse = await cacheStorage.match(url);
  //
  // if (!cachedResponse || !cachedResponse.ok) {
  // console.log("Fetched failed!");
  // }
  //
  // return cachedResponse.json().then((item) => {
  // console.log(item);
  // });
  // };
  //
  // const cacheToFetch = { cacheName: "csechatter", url: "https://localhost:3000" };
  //
  // getSingleCacheData(cacheToFetch.cacheName, cacheToFetch.url);

  return (
    <>
      <div className="user-input-wrapper" id="user-input">
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
      {userName !== "" && (
        <div className="App">
          <Msgdisplay username={userName} />
          <Chatpost username={userName} />
        </div>
      )}
    </>
  );
}

export default App;
