'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from "redux-thunk";

import 'normalize.css';
import './styles/styles.less';

import App from "./components/app";
import Landing from "./components/Landing/Landing";
import LogIn from "./containers/Login/Login";

import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="container">
                <Switch>
                    <Route path="/login" component={LogIn} />
                    <Route path ="/app" component={App} />
                    <Route path ="/" component={Landing} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));