"use strict";

import React, { Component } from "react";
import _ from "lodash";

export default class SearchBar extends Component{
    constructor(props){
        super(props);
        this.searchFor = _.debounce(this.searchFor, 500).bind(this);
    }

    searchFor(e){
        e.persist();
        this.props.searchForType(e.target.value);
    }

    render(){
        return (
        <div className="searchBar">
        <i className="fa fa-search"></i>
        <input className="small-input" type="text" onChange={e=>{e.persist();this.searchFor(e)}} onTouchStart={_=>this.props.scrollToBottom()}></input>
        </div>
        );        
    }
}