"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchAlbum } from "../../../actions/albums";
import { photoSearch } from "../../../actions/photos";
import { searchTermUpdate } from "../../../actions/search";

import _ from "lodash";

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.searchFor = _.debounce(this.searchFor, 250).bind(this);
    }

    componentDidMount(){
        this.searchTerm.value = this.props.search.searchTerm;
    }

    scrollToBottom(){
        window.scrollTo(0, document.getElementById("root").offsetHeight);
    }
    
    searchFor(e){
        this.props.searchTermUpdate(e.target.value);
        if(this.props.search.searchType === "albums"){
            this.props.searchAlbum(this.props.search.searchTerm);
        }
    }

    render(){
        return (
        <div className="searchBar">
        <i className="fa fa-search"></i>
        <input ref={searchTerm => this.searchTerm = searchTerm} className="small-input" type="text" onChange={e=>{e.persist();this.searchFor(e)}} onTouchStart={_=>this.props.scrollToBottom()}></input>
        </div>
        );        
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({searchAlbum, photoSearch, searchTermUpdate}, dispatch);
}

function mapStateToProps(state){
  return {
    search : state.search
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);