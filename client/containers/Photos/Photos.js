'use strict';

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";
import { albumFetch } from "../../actions/albums";
import Loading from "../../components/Loading/Loading";
import Tags from "../../components/Tags/Tags";

class Photos extends Component {
  
  componentDidMount(){
    this.props.albumFetch(this.props.match.params.id);
  }
  
  render(){
    
    const { album } = this.props;
    
    if(!album){
      return <Loading />;
    }
    
    return (
      <div className="wrapper wrapper-padding">
        <span className="albumTitle">{album.name}</span>
        <span className="albumPhotographer">par {album.photographer}</span>
        <span className="albumDescription">{album.description}</span>
        <Tags tags={album.tags} />
        <hr className="albumHr" />
        <div id="photos">
          {this.props.album.photos.map(function(photo, index){
            return <NavLink to={`/app/photo/${album._id}/${photo._id}`} key={photo._id}> <img src={photo.medium} /></NavLink>;
          })}
        </div>
      </div>
    );  
  }
  
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ albumFetch }, dispatch);
}

function mapStateToProps(state, ownProps){
  return {
    album : state.albums[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos);