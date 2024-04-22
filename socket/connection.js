module.exports = (io, socket) => {
  const onConnection = async (returnRoomID) => {
    const { nanoid } = await import("nanoid");
    const roomid = nanoid(6);
    socket.join(roomid);
    if (socket.rooms.has(roomid)) {
      returnRoomID(roomid);
    } else {
      returnRoomID("Fail to Connect");
    }
  };

  const joinRoom = (roomid, playername, returnMessage) => {
    const room = io.sockets.adapter.rooms.get(roomid);
    if (!room) {
      returnMessage(false);
    } else if (room.size == 1) {
      io.to(roomid).emit("connect:opponentjoined", { playername });
      socket.join(roomid);
      console.log(io.sockets.adapter.rooms.get(roomid));
      returnMessage(true);
    } else {
      returnMessage(2);
    }
  };
  socket.on("connect:getroomid", onConnection);
  socket.on("connect:joinroom", joinRoom);
};
