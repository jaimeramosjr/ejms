import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

import 'assets/css/index.css';
import 'assets/css/colors.css';
import 'assets/css/bootstrapious.css';
import 'assets/css/fontawesome/fontawesome.css';

import { App } from './components/App';

import * as serviceWorker from './assets/js/serviceWorker';

/* Block random "right overlay" logs from 'react-offcanvas' library. */
const _log = console.log;
console.log = function ()
{
  if([ ...arguments ].join(' ') === 'right overlay')
    return;

  _log.apply(console, arguments);
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();