import React from 'react';
import { Route } from 'react-router-dom';

import Home from './container/Home/Home';

import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { JSX } from '@swisscom/sdx/dist/js/webcomponents/loader';
import useSocket from './hooks/useSocket';
import SocketContext from './hooks/Socket.context';
type StencilProps<T> = {
  [P in keyof T]?: Omit<T[P], 'ref'> | HTMLAttributes<T>;
};
type ReactProps<T> = {
  [P in keyof T]?: DetailedHTMLProps<HTMLAttributes<T[P]>, T[P]>;
};
type StencilToReact<T = JSX.IntrinsicElements, U = HTMLElementTagNameMap> = StencilProps<T> &
  ReactProps<U>;
declare global {
  export namespace JSX {
    interface IntrinsicElements extends StencilToReact {}
  }
}

function App() {
  const socket = useSocket();
  return (
    <>
      {/* @ts-ignore */}
      <SocketContext.Provider value={socket}>
        <Route path="/" component={Home} exact />
      </SocketContext.Provider>
    </>
  );
}

export default App;
