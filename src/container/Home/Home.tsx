/* eslint-disable arrow-parens */
import React, { useContext, useEffect, useState } from 'react';

import SocketContext from '../../hooks/Socket.context';
import styles from './Home.module.css';

function Home() {
  const { isConnected, sendPing, sendBroadcast, messages, clients, pongs, resetStats } =
    useContext(SocketContext);

  const [active, setActive] = useState(false);
  const [iterations, setIterations] = useState(0);
  const iterationCount = 25;

  const startPing = () => {
    resetStats();
    setIterations(0);
    setActive(true);
  };

  useEffect(() => {
    if (active && iterations < iterationCount) {
      sendPing();
      setIterations(iterations + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pongs, active]);

  useEffect(() => {
    if (iterations >= iterationCount) {
      setActive(false);
    }
  }, [iterations]);

  const stopInterval = () => {
    setActive(false);
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
