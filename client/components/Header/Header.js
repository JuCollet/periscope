'use strict';

import React from "react";
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.css';


const Header = props => {
  return (
    <div id="header">
      <i className="fa fa-bars" aria-hidden="true"></i>
      <span className="title">Periscope</span>
      <div id="header-search">
        <input type="text"></input>
        <i className="fa fa-search"></i>
      </div>
    </div>
    );
};

export default Header;