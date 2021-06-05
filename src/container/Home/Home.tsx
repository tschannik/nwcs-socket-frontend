/* eslint-disable arrow-parens */
import React, { useContext, useState } from 'react';

import SocketContext from '../../hooks/Socket.context';
import styles from './Home.module.css';

function Home() {
  const { isConnected, sendPing, sendBroadcast, messages, clients, pongs, resetStats } =
    useContext(SocketContext);

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [active, setActive] = useState(false);

  let interval: NodeJS.Timeout;
  let iterations = 0;

  const startPing = () => {
    resetStats();
    setActive(true);
    interval = setInterval(() => {
      iterationPing(interval);
    }, 1000);
    setIntervalId(interval);
  };

  const iterationPing = (intervalIdentifier: NodeJS.Timeout) => {
    sendPing();
    iterations = iterations + 1;
    if (iterations >= 25) {
      if (intervalIdentifier) {
        setActive(false);
        clearInterval(intervalIdentifier);
      }
    }
  };

  const stopInterval = () => {
    setActive(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  return (
    <>
      <div>
        <p>
          Status:{' '}
          <span className={styles.clientNames}>
            Websocket {isConnected ? 'connected' : 'disconnected'}
          </span>
        </p>
        <p>Connected clients: </p>
        {clients.map((client: string) => {
          return (
            <p key={client} className={styles.clientNames}>
              ::{client}::
            </p>
          );
        })}
        <div>
          <button disabled={active} onClick={startPing}>
            Send ping!
          </button>
          <button disabled={!active} onClick={stopInterval}>
            Stop ping!
          </button>
          <button onClick={sendBroadcast}>Send Broadcast!</button>
          <br></br>
          <br></br>
          <p>Sending Pings: {active ? 'Yes' : 'No'}</p>
          <p>Received Pongs: {pongs}</p>
        </div>
        {messages.length !== 0 && <p>Messages:</p>}
        {messages.map((msg: any) => {
          return (
            <p key={msg.value} className={styles.clientNames}>
              {msg.value}
            </p>
          );
        })}
      </div>
    </>
  );
}

export default Home;
