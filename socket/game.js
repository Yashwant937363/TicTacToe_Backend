module.exports = (io, socket) => {
  const startGame = (player1name, roomid) => {
    const room = io.sockets.adapter.rooms.get(roomid);
    console.log(room);
    socket.to(roomid).emit("game:start", player1name);
  };
  const changeGameState = (roomid, index) => {
    socket.to(roomid).emit("game:changestate", index);
  };
  const restartGame = async (response, roomid) => {
    socket.to(roomid).emit("game:restartgame", (answer) => {
      response(answer);
    });
  };
  socket.on("game:startgame", startGame);
  socket.on("game:changestate", changeGameState);
  socket.on("game:restart", restartGame);
};
