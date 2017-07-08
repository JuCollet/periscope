'use strict';

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { toggleMenu } from "../../actions/menu_toggle";

class Sidemenu extends Component {
  
  render(){
    
    const toggleMenuClass = this.props.menu.open ? 'sidemenu-open' : 'sidemenu-close';

    return (
      <div id="sidemenu" className={toggleMenuClass}>
        <i className="fa fa-bars" aria-hidden="true" onClick={_ => this.props.toggleMenu()}></i>
        <h2>Periscope</h2>
        <ul className="bigList">
          <li>Mon compte</li>
          <li><NavLink to="/gallery/upload/">Créer un album</NavLink></li>
          <li>Déconnexion</li>
        </ul>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({toggleMenu}, dispatch);
}

function mapStateToProps(state){
  return {
    menu : state.menu
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidemenu);