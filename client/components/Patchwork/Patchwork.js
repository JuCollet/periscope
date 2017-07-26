"use strict";

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import getHeight from "./getHeight";
import "./styles.less";

const breakpoints = [
    {
      breakpoint: 1200,
      columns: 5
    },
    {
      breakpoint: 768,
      columns: 4
    },
    {
      breakpoint: 320,
      columns: 2
    },
    {
      breakpoint: 1,
      columns: 1
    }    
];

export default class Patchwork extends Component {
    
    constructor(props){
        super(props);
        this.state = {};
        this.stateUpdate = this.stateUpdate.bind(this);
    }
    
    stateUpdate(){
        const { photos } = this.props;
        const newviewWidth = document.getElementById("patchwork").offsetWidth;
        this.setState({
            photosHeight : getHeight(photos, newviewWidth, 13, breakpoints)
        });        
    }

    componentDidMount(){
        this.stateUpdate();
        window.addEventListener("resize", this.stateUpdate);
    }
    
    componentWillUnmount(){
        window.removeEventListener("resize", this.stateUpdate);
    }
    
    renderPatchwork(){
        
        const { photos, searchTerm, albumId } = this.props;
        
        if(this.state.photosHeight){
            return photos.map(function(photo, index){
                        if(photo.tags.some(function(tag){return tag.indexOf(searchTerm) !== -1}) || searchTerm === undefined || searchTerm === ''){
                            return <NavLink to={`/app/photo/${albumId}/${photo._id}`} key={photo._id}> <img src={photo.thumb} height={this.state.photosHeight[index]}  /></NavLink>;
                        } else {
                            return null;
                        }
                    }.bind(this));
        } else {
            return null;
        }
    }
    
    render(){
        return(
            <div id="patchwork">
                {this.renderPatchwork()}
            </div>
        );
    }
}