"use strict";

import React, { Component } from "react";
import _ from "lodash";

export default class SearchBar extends Component{
    constructor(props){
        super(props);
        this.searchFor = _.debounce(this.searchFor, 250).bind(this);
    }

    componentDidUpdate(){
        if(this.searchTerm.value.substr(0,1) === "#" && this.props.searchForType === "photos"){
            const searchTermText = this.searchTerm.value.substr(1);
            this.searchTerm.value = searchTermText;
            this.props.searchForFunc(searchTermText);            
        }
        else {
            this.searchTerm.value = "";
        }
    }

    searchFor(e){
        e.persist();
        this.props.searchForFunc(e.target.value);
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