'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import 'font-awesome/css/font-awesome.css';
import './styles/styles.less';

import Gallery from "./containers/Gallery/Gallery";

const root = document.getElementById('root');

ReactDOM.render(<Gallery />, root);