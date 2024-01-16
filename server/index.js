const app = require("express");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "https://realtime-chat-drab.vercel.app/",
  },
});

const PORT = 3001;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

io.on("connection", (socket) => {
  console.log("Usuário conectado", socket.id);

  socket.on("disconnect", (reason) => {
    console.log("Usuário desconectado", socket.id);
  });

  socket.on("set_username", (username) => {
    socket.data.username = username;
    console.log(socket.data.username);
  });

  socket.on("message", (text) => {
    io.emit("receive_message", {
      text,
      authorId: socket.id,
      author: socket.data.username,
    });
  });
});

server.listen(PORT, () => console.log("🚀 Server Running"));
