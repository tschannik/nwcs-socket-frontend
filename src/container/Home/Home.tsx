/* eslint-disable arrow-parens */
import React, { useEffect, useState } from 'react';

import usePing from '../../hooks/usePing';

function Home() {
  const { ping } = usePing();
  const [pings, setPings] = useState<number>(0);
  const [pongs, setPongs] = useState<number>(0);
  const [active, setActive] = useState(false);

  const iterationCount = 20;

  const resetStats = () => {
    setPings(0);
    setPongs(0);
  };

  const startPing = async () => {
    resetStats();
    setActive(true);
  };

  useEffect(() => {
    const fetchdata = async () => {
      for (let i: number = 0; i <= iterationCount; i++) {
        if (active) {
          setPings(i);
          await ping();
          setPongs(i);
          if (iterationCount === i) {
            setActive(false);
          }
        }
      }
    };
    fetchdata();
  }, [active]);

  const stopInterval = () => {
    setActive(false);
  };

  return (
    <>
      <div>
        <div>
          <button disabled={active} onClick={startPing}>
            {!active ? 'Send ping!' : 'Runnging'}
          </button>
          <br></br>
          <br></br>
          <p>Sending Pings: {active ? 'Yes' : 'No'}</p>
          <p>Pings sent: {pings}</p>
          <p>Received Pongs: {pongs}</p>
        </div>
      </div>
    </>
  );
}

export default Home;
