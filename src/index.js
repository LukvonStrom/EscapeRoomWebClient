import React from 'react';
import ReactDOM from 'react-dom';
import './custom.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

window.$ = window.jQuery = require('jquery');

// Quickfix - collapses Nav via Jquery when navigation is done.
window.$(() => window.$(".navbar-collapse").on("click", "a:not([data-toggle])", null, () => window.$(".navbar-collapse").collapse('hide')));


ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
