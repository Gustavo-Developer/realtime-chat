import React, { useRef } from "react";

import io from "socket.io-client";

export default function Join({ setChatVisibility }) {
  const usenameRef = useRef();
  const handleSubmit = async () => {
    const username = usenameRef.current.value;

    if (!username.trim()) return;

    const socket = await io.connect("http://localhost:3001");
    setChatVisibility(true);
  };

  return (
    <div>
      <h1>Join</h1>
      <input type="text" ref={usenameRef} placeholder="Nome do usuário" />
      <button onClick={() => handleSubmit()}>Entrar</button>
    </div>
  );
}
