'use strict';

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleMenu } from "../../actions/menu";
import SearchBar from "./SearchBar/SearchBar";

class Header extends Component {
  
  toggleMenu(){
    this.props.toggleMenu();
  }
  
  render(){
    
    const headerUpClass = this.props.menu.open ? 'header-up' : 'header-down';

    return (
      <div id="header" className={headerUpClass}>
        <i className="fa fa-bars" aria-hidden="true" onClick={this.toggleMenu.bind(this)}></i>
        <div className="header-option">
          {this.props.search.searchType === null ? <span className="title">Periscope</span> : <SearchBar />}
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
    menu : state.menu,
    search : state.search
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);