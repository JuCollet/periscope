'use strict';

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleMenu } from "../../actions/menu";
import SearchBar from "./SearchBar/SearchBar";

class Header extends Component {
  
  render(){
    
    const headerUpClass = this.props.menu.open ? 'header-up' : 'header-down';

    return (
      <div id="header" className={headerUpClass}>
        <i className="fa fa-bars margin-sm-right" aria-hidden="true" onClick={_=>this.props.toggleMenu()}></i>
        <div className="title margin-sm-left margin-sm-right txt-darkBlueGrey">Periscope</div>
        <div className="header-search">
          {this.props.search.searchType === null ? "" : <SearchBar />}
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