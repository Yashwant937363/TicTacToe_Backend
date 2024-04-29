require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const RegisterConnectionHandler = require("./socket/connection");
const RegisterGameHandler = require("./socket/game");
const PORT = process.env.PORT || 5000;
const io = new Server(server, {
  cors: process.env.CLIENT_URL,
});
const onConnection = (socket) => {
  RegisterConnectionHandler(io, socket);
  RegisterGameHandler(io, socket);
  socket.on("disconnect", (reason) => {
    console.log("Disconnected", socket.id);
    console.log("Reason", reason);
    console.log("Socket Rooms from Disconnected : ", socket.rooms);
  });
};

io.on("connection", onConnection);

app.get("/", (req, res) => {
  res.send("hello world");
});

server.listen(PORT, () => console.log("Server Running on PORT : " + PORT));
