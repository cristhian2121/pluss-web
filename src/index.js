import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

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
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);

// PWA off
// serviceWorker.unregister();
