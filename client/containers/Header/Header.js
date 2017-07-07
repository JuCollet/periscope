'use strict';

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleMenu } from "../../actions/menu_toggle";

class Header extends Component {
  
  toggleMenu(){
    this.props.toggleMenu();
  }
  
  render(){
    return (
      <div id="header">
        <i className="fa fa-bars" aria-hidden="true" onClick={this.toggleMenu.bind(this)}></i>
        <span className="title">Periscope</span>
        <div id="header-search">
          <i className="fa fa-search"></i>
          <input type="text"></input>
        </div>
      </div>
      );  
  }

};

function mapDispatchToProps(dispatch){
  return bindActionCreators({toggleMenu}, dispatch)
}

export default connect(null, mapDispatchToProps)(Header);