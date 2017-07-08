'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import promise from "redux-promise";

import 'normalize.css';
import './styles/styles.less';

import reducers from "./reducers";

import LogIn from "./containers/Login/Login";
import Gallery from "./components/Gallery/Gallery";
import Upload from "./containers/Upload/Upload"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(promise)
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="container">
                <Route exact path="/" component={LogIn} />
                <Route path="/gallery/" component={Gallery} />
            </div>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));