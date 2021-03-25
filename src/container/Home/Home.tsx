/* eslint-disable arrow-parens */
import React, { useContext } from 'react';

import SocketContext from '../../hooks/Socket.context';
import styles from './Home.module.css';

function Home() {
  const { isConnected, sendPing, sendBroadcast, messages, clients } = useContext(SocketContext);

  console.log(isConnected);

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
        <button onClick={sendPing}>Send ping!</button>
        <button onClick={sendBroadcast}>Send Broadcast!</button>
        <br></br>
        <br></br>
        <p>Messages:</p>
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
