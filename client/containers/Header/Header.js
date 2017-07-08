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
    
    const headerUpClass = this.props.menu.open ? 'header-up' : 'header-down';

    return (
      <div id="header" className={headerUpClass}>
        <i className="fa fa-bars" aria-hidden="true" onClick={this.toggleMenu.bind(this)}></i>
        <span className="title">Periscope</span>
        <div id="header-search">
          <i className="fa fa-search"></i>
          <input className="small-input" type="text"></input>
        </div>
      </div>
      );  
  }

};

function mapDispatchToProps(dispatch){
  return bindActionCreators({toggleMenu}, dispatch)
}

function mapStateToProps(state){
  return {
    menu : state.menu
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);