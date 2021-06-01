import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// REDUX
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'

import reducers from './reducers'
// Create storage app
const store = createStore(
    reducers, // todos redux
    {}, // estado inicial
    applyMiddleware(reduxThunk)
);

// all in store, app can use
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

process.on('exit', function(code) {
  // do *NOT* do this
  setTimeout(function() {
    console.log('This will not run ***************************');
  }, 0);
  console.log('About to exit with code: ***********************', code);
});
// PWA off
// serviceWorker.unregister();
