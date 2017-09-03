'use strict';

import React, { Component } from "react";
import Hammer from "react-hammerjs";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { toggleMenu } from "../../actions/menu";
import { signOutUser } from "../../actions/user";

class Sidemenu extends Component {
  
  constructor(props){
    super(props);
    this.onSignOut = this.onSignOut.bind(this);
  }
  
  onSignOut(){
    this.props.toggleMenu();
    this.props.signOutUser();
  }
  
  onSwipeHandler(e){
    e.preventDefault();
    this.props.toggleMenu();
  }  
  
  render(){
    
    const toggleMenuClass = this.props.menu.open ? 'sidemenu-open' : 'sidemenu-close';

    return (
      <Hammer onSwipe={e=>this.onSwipeHandler(e)}>
        <div id="sidemenu" className={toggleMenuClass}>
          <i className="fa fa-times close-icon" aria-hidden="true" onClick={ _ => this.props.toggleMenu() }></i>
          <h2 className="sidemenu-title txt-darkBlueGrey">Periscope</h2>
          <ul className="sidemenu-desktop-list">
            <li><NavLink to="/app/albums/" onClick={ _ => this.props.toggleMenu() }>Gallerie</NavLink></li>
            <li className="sidemenu-desktop-only"><NavLink to="/app/CreateAlbum/" onClick={ _ => this.props.toggleMenu() }>Créer un album</NavLink></li>
            <li><NavLink to="/app/account/" onClick={ _ => this.props.toggleMenu() }>Mon compte</NavLink></li>
            <li><NavLink to="/" onClick={this.onSignOut} >Déconnexion</NavLink></li>
          </ul>
        </div>
      </Hammer>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({toggleMenu, signOutUser}, dispatch);
}

function mapStateToProps(state){
  return {
    menu : state.menu
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidemenu);