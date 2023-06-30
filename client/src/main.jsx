import React from 'react';
import App from './App.jsx';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import './index.css';

const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
