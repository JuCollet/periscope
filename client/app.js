'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import promise from "redux-promise";

import 'normalize.css';
import './styles/styles.less';

import reducers from "./reducers";

import Gallery from "./containers/Gallery/Gallery";
import Sign from "./components/Sign/Sign";

const storeWithMiddleware = applyMiddleware()(createStore);

const root = document.getElementById('root');

ReactDOM.render(
    <Provider store={storeWithMiddleware(reducers)}>
        <BrowserRouter>
            <div className="container">
                <Route exact path="/" component={Sign} />
                <Route path="/gallery" component={Gallery} />
            </div>
        </BrowserRouter>
    </Provider>, 
    root);