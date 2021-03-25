import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
// const socket = io('ws://192.168.1.20:4000', {
//   transports: ['websocket'],
// });
const socket = io('ws://localhost:4000', {
  transports: ['websocket'],
});

function useSocket() {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [clients, setClients] = useState<string[]>([]);
  const [messages, setMessages] = useState<any>([{}]);

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

    socket.on('testpong', () => {
      console.log('recieved pong');
    });
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

  const sendPing = () => {
    socket.emit('pang');
  };

  const sendBroadcast = () => {
    console.log('sendBC');
    socket.emit('sendBroadcast', new Date());
  };

  return {
    clients,
    sendPing,
    isConnected,
    messages,
    sendBroadcast,
  };
}

export default useSocket;
