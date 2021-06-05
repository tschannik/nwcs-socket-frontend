import React from 'react';
import { Route } from 'react-router-dom';

import Home from './container/Home/Home';

// import useSocket from './hooks/useSocket';
// import SocketContext from './hooks/Socket.context';

function App() {
  // const socket = useSocket();
  return (
    <>
      {/* @ts-ignore */}
      {/* <SocketContext.Provider value={socket}> */}
      <Route path="/" component={Home} exact />
      {/* </SocketContext.Provider> */}
    </>
  );
}

export default App;
