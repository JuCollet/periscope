'use strict';

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleMenu } from "../../actions/menu";
import { searchAlbum } from "../../actions/albums";
import { photoSearch } from "../../actions/photos";
import SearchBar from "../../components/SearchBar/SearchBar";

class Header extends Component {
  
  constructor(props){
    super(props);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }
  
  renderSearchBar(){
    
    const { searchFor } = this.props.menu;

    switch(searchFor){
      case null :
        return "";
      case "albums" :
        return <SearchBar searchForType={this.props.searchAlbum} scrollToBottom={this.scrollToBottom}/>;
      case "photos" :
        return <SearchBar searchForType={this.props.photoSearch} scrollToBottom={this.scrollToBottom}/>;
      default :
        return "";
    }
    
  }
  
  scrollToBottom(){
    window.scrollTo(0, document.getElementById("root").offsetHeight);
  }  
  
  toggleMenu(){
    this.props.toggleMenu();
  }
  
  render(){
    
    const headerUpClass = this.props.menu.open ? 'header-up' : 'header-down';

    return (
      <div id="header" className={headerUpClass}>
        <i className="fa fa-bars" aria-hidden="true" onClick={this.toggleMenu.bind(this)}></i>
        <span className="title">Periscope</span>
        <div className="header-option">
        {this.renderSearchBar()}
        </div>
      </div>
      );  
  }

}

function mapDispatchToProps(dispatch){
  return bindActionCreators({toggleMenu, searchAlbum, photoSearch}, dispatch);
}

function mapStateToProps(state){
  return {
    menu : state.menu
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);