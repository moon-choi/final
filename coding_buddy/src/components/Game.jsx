import React from "react";
import Canvas from "./Canvas";
import "./Game.scss";

import Chat from "./Chat";
import { useLocation } from "react-router-dom";
import { useState, useCallback, useRef } from "react";

export default function Game(props) {

  const sendMessage = props.sendMessage
  const sendPrivateMessage = props.sendPrivateMessage
  const location = useLocation();

  // console.log('inside game',location.state)  //username
  // console.log('inside game',location.state.userName)  //username
  console.log("LOCATION", location)
  console.log("LOCATION.STATE", location.state)

  const prevNickname = useRef(null); 
  const [nickname, setNickname] = useState(props.username);
  const handleSubmitNickname = useCallback(newNickname => {
    prevNickname.current = nickname;
    setNickname(newNickname);
  }, [nickname]);
  return (
    <>
      {/* <Layout /> */}
      <div className="main-container">
        <Canvas username={location.state?.[0] || 'heesoo'} avatar={location.state?.[1] || 1} sendMessage={sendMessage} sendPrivateMessage={sendPrivateMessage} room={props.room} />
        <Chat username={location.state} room={props.room} handleSubmitNickname={handleSubmitNickname} nickname={nickname} />
      </div>
    </>
  );
}
