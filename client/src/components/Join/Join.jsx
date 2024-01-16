import React, { useRef } from "react";
import io from "socket.io-client";
import style from "./Join.module.css";

import { Input, Button } from "@mui/material";

export default function Join({ setChatVisibility, setSocket }) {
  const usernameRef = useRef();

  const handleSubmit = async () => {
    const username = usernameRef.current.value;
    if (!username.trim()) return;
    const socket = await io.connect("https://realtime-chat-1hhx.vercel.app/");
    socket.emit("set_username", username);
    setSocket(socket);
    setChatVisibility(true);
  };

  return (
    <div className={style["join-container"]}>
      <h2>Chat em tempo real</h2>
      <Input
        sx={{
          fontFamily: "Inconsolata",
          padding: "10px",
          marginBottom: "15px",
          width: "100%",
          border: "1px solid #61dafb",
          borderRadius: "5px",
          outline: "none",
          color: "#fff",
          transition: "border-color 0.3s ease-in-out",
        }}
        inputRef={usernameRef}
        variant="outlined"
        placeholder="Nome de usuário"
      />
      <button sx={{ mt: 2 }} onClick={() => handleSubmit()} variant="contained">
        Entrar
      </button>
    </div>
  );
}
