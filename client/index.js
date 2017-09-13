/*global localStorage */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from "redux-thunk";

import 'normalize.css';
import './styles/styles.less';

import { USER_AUTH } from "./actiontypes/";

import App from "./components/app";
import Landing from "./containers/Landing/Landing";

import reducers from "./reducers";

// These lines allow using Redux DevTools on Chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
));

const token = localStorage.getItem('token');
if(token){
    store.dispatch({
        type: USER_AUTH,
        payload: {
            authenticated : true,
            isAdmin : localStorage.getItem('isAdmin'),
            canWrite : localStorage.getItem('canWrite'),
            canDelete : localStorage.getItem('canDelete'),
        }
    });
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="container">
                <Switch>
                    <Route path ="/app" component={App} />
                    <Route path="/" component={Landing} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));