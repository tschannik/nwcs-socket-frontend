// eslint-disable-next-line
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/_index.css';
import * as serviceWorker from './serviceWorker';
import SocketContext from './hooks/Socket.context';
import useSocket from './hooks/useSocket';

ReactDOM.render(
  <Router>
    <Suspense >
      <App />
    </Suspense>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();