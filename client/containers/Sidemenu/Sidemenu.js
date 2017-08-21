'use strict';

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { toggleMenu } from "../../actions/menu";

class Sidemenu extends Component {
  
  render(){
    
    const toggleMenuClass = this.props.menu.open ? 'sidemenu-open' : 'sidemenu-close';

    return (
      <div id="sidemenu" className={toggleMenuClass}>
        <i className="fa fa-times close-icon" aria-hidden="true" onClick={ _ => this.props.toggleMenu() }></i>
        <h2>Periscope</h2>
        <ul className="sidemenu-desktop-list">
          <li><NavLink to="/app/albums/" onClick={ _ => this.props.toggleMenu() }>Gallerie</NavLink></li>
          <li className="sidemenu-desktop"><NavLink to="/app/upload/" onClick={ _ => this.props.toggleMenu() }>Créer un album</NavLink></li>
          <li><NavLink to="/app/account/" onClick={ _ => this.props.toggleMenu() }>Mon compte</NavLink></li>
          <li>Favoris</li>
          <li><a href="/">Déconnexion</a></li>
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