const socketState = () => {
  let socket = null;
  return {
    setSocket: (socketConnection) => {
      socket = socketConnection;
    },
    getSocket: () => socket,
  };
};

export const { setSocket, getSocket } = socketState();
