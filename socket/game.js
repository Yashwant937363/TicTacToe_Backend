module.exports = (io, socket) => {
  const startGame = (player1name, roomid) => {
    const room = io.sockets.adapter.rooms.get(roomid);
    console.log(room);
    socket.to(roomid).emit("game:start", player1name);
  };
  const changeGameState = (roomid, gamestate) => {
    socket.to(roomid).emit("game:changestate", gamestate);
  };
  const restartGame = async (roomid) => {
    socket.to(roomid).emit("game:restartgame");
  };

  const restartGameConfirmation = (roomid, answer) => {
    socket.to(roomid).emit("game:restartconfirmation", answer);
  };
  const resultRestartGame = async (roomid) => {
    socket.to(roomid).emit("game:resultrestartgame");
  };

  const resultRestartGameConfirmation = (roomid, answer) => {
    socket.to(roomid).emit("game:resultrestartconfirmation", answer);
  };
  const exitGame = (roomid) => {
    socket.to(roomid).emit("game:exited");
    io.socketsLeave(roomid);
  };
  socket.on("game:startgame", startGame);
  socket.on("game:changestate", changeGameState);
  socket.on("game:restart", restartGame);
  socket.on("game:restartconfirmation", restartGameConfirmation);
  socket.on("game:resultrestart", resultRestartGame);
  socket.on("game:resultrestartconfirmation", resultRestartGameConfirmation);
  socket.on("game:exit", exitGame);
};
//something for commit
