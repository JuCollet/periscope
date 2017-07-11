'use strict';

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { albumFetch } from "../../actions/albums";
import Loading from "../Loading/Loading";
import Tags from "../Tags/Tags";

class Photos extends Component {
  
  componentDidMount(){
    this.props.albumFetch(this.props.match.params.id);
  }
  
  render(){
    
    const { album } = this.props;
    
    if(!album){
      return <Loading />
    }
    
    return (
      <div className="wrapper">
        <span className="albumTitle">{album.name}</span>
        <span className="albumPhotographer">par {album.photographer}</span>
        <span className="albumDescription">{album.description}</span>
        <Tags tags={album.tags} />
        <hr className="albumHr" />
        <div id="photos">
          {this.props.album.photos.map(function(photo, index){
            return <img src={photo.medium} key={index}/>;
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