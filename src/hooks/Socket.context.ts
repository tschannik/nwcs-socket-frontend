import React from 'react';

const SocketContext = React.createContext({
  clients: [],
  sendPing: () => {},
  isConnected: false,
  messages: [],
  sendBroadcast: () => {},
});

export default SocketContext;
