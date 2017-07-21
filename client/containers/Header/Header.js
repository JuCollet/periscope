'use strict';

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleMenu } from "../../actions/menu";

class Header extends Component {
  
  constructor(props){
    super(props);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }
  
  toggleMenu(){
    this.props.toggleMenu();
  }
  
  scrollToBottom(){
    window.scrollTo(0, document.getElementById("root").offsetHeight);
  }
  
  render(){
    
    const headerUpClass = this.props.menu.open ? 'header-up' : 'header-down';

    return (
      <div id="header" className={headerUpClass}>
        <i className="fa fa-bars" aria-hidden="true" onClick={this.toggleMenu.bind(this)}></i>
        <span className="title">Periscope</span>
        <div id="header-option">
          <i className="fa fa-search"></i>
          <input className="small-input" type="text" onTouchStart={_=>this.scrollToBottom()}></input>
        </div>
      </div>
      );  
  }

}

function mapDispatchToProps(dispatch){
  return bindActionCreators({toggleMenu}, dispatch);
}

function mapStateToProps(state){
  return {
    menu : state.menu
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);