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

import albumsMock from "./mock/albums";
import photosMock from "./mock/photos";

import Sidemenu from "./containers/Sidemenu/Sidemenu";
import Header from "./containers/Header/Header";

import LogIn from "./containers/Login/Login";
import CreateAlbum from "./containers/CreateAlbum/CreateAlbum";
import Account from "./containers/Account/Account";
import Albums from "./containers/Albums/Albums";

import Photos from "./components/Photos/Photos";
import Photo from "./components/Photo/Photo";
import Loading from "./components/Loading/Loading";

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
                <Route path="/app/Upload" component={CreateAlbum} />
                <Route path="/app/Account" component={Account} />
                <Route path="/app/Loading" component={Loading} />
                <Route path="/app/albums" render={ () => <Albums albums={albumsMock} /> } />
                <Route path="/app/photos" render={ () => <Photos photos={photosMock} /> } />
                <Route path="/app/photo/:id" component={Photo} />
            </div>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));