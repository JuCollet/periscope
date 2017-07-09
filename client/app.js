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

import Sidemenu from "./containers/Sidemenu/Sidemenu";
import Header from "./containers/Header/Header";

import Albums from "./containers/Albums/Albums";
import Photos from "./containers/Photos/Photos";
import albumsMock from "./mock/albums";
import photosMock from "./mock/photos";

import LogIn from "./containers/Login/Login";
import Upload from "./containers/Upload/Upload";
import Account from "./containers/Account/Account";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(promise)
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="container">
                <Route exact path="/" component={LogIn} />
                <Route path="/app/" component={Header} />
                <Route path="/app/" component={Sidemenu} />
                <Route path="/app/Upload" component={Upload} />
                <Route path="/app/Account" component={Account} />
                <Route path="/app/albums" render={ () => <Albums albums={albumsMock} /> } />
                <Route path="/app/photos" render={ () => <Photos photos={photosMock} /> } />
            </div>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));