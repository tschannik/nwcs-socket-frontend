import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
// const socket = io('ws://nwcs-backend.apollo.yzi.ch', {
//   transports: ['websocket'],
// });
const socket = io('ws://localhost:4000', {
  transports: ['websocket'],
});

function useSocket() {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [clients, setClients] = useState<string[]>([]);
  const [messages, setMessages] = useState<any>([]);
  const [pings, setPings] = useState<number>(0);
  const [pongs, setPongs] = useState<number>(0);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('client connected');
      socket.emit('control', 'client connected');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('client disconnected');
    });

    socket.on('broadClients', (pl: string[]) => {
      setClients(pl);
    });

    // socket.on('testpong', () => {
    //   console.log('recieved pong');
    //   setPings(pings + 1);
    // });
  }, []);

  const updateMessages = useCallback(
    (newMessage: { value: string }) => {
      setMessages([...messages, newMessage]);
    },
    [messages],
  );

  useEffect((): (() => void) => {
    socket.on('bc', (pl: any) => updateMessages({ value: pl }));
    return () => socket.removeListener('bc');
  }, [updateMessages]);

  const updatePongs = useCallback(() => {
    setPongs(pongs + 1);
  }, [pongs]);

  const updatePings = useCallback(() => {
    setPings(pings + 1);
  }, [pings]);

  useEffect((): (() => void) => {
    socket.on('ServerPong', (pl: any) => updatePongs());
    return () => socket.removeListener('ServerPong');
  }, [updatePongs]);

  const sendPing = () => {
    updatePings();
    socket.emit('Pang');
  };

  const sendBroadcast = () => {
    console.log('sendBC');
    socket.emit('sendBroadcast', new Date());
  };

  const resetStats = () => {
    setPings(0);
    setPongs(0);
  };

  return {
    clients,
    sendPing,
    isConnected,
    messages,
    sendBroadcast,
    pings,
    pongs,
    setPings,
    resetStats,
  };
}

export default useSocket;
