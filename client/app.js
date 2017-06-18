'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import 'font-awesome/css/font-awesome.css';
import './styles/styles.less';

import Sign from "./components/Sign/Sign";
import Albums from "./components/Albums/Albums";

import albumsMock from "./mock/albums";

const root = document.getElementById('root');

ReactDOM.render(<Albums albums={albumsMock} />, root);