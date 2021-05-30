import React from 'react';

const SocketContext = React.createContext({
  clients: [],
  sendPing: () => {},
  isConnected: false,
  messages: [],
  sendBroadcast: () => {},
  pings: 0,
  pongs: 0,
  setPings: (pings: number) => {},
  resetStats: () => {},
});

export default SocketContext;
