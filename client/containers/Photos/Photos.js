'use strict';

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";
import { albumFetch, deleteAlbum } from "../../actions/albums";
import { toggleSearchBar } from "../../actions/menu";
import Loading from "../../components/Loading/Loading";
import Tags from "../../components/Tags/Tags";

class Photos extends Component {
  
  componentDidMount(){
    this.props.albumFetch(this.props.match.params.id);
    
    this.props.toggleSearchBar("photos");
  }
  
  componentWillUnmount(){
    this.props.toggleSearchBar(null);
  }
  
  deleteAlbum(albumId){
    this.props.deleteAlbum(albumId, _ => {
      this.props.history.push('/app/albums');
    });
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
        <i className="fa fa-trash button-icon" onClick={_ => this.deleteAlbum(album._id)}></i>
        <i className="fa fa-share-alt-square button-icon"></i>
        <hr className="albumHr" />
        <div id="photos">
          {this.props.album.photos.map(function(photo, index){
            return <NavLink to={`/app/photo/${album._id}/${photo._id}`} key={photo._id}> <img src={photo.thumb} /></NavLink>;
          })}
        </div>
      </div>
    );  
  }
  
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ albumFetch, deleteAlbum, toggleSearchBar }, dispatch);
}

function mapStateToProps(state, ownProps){
  return {
    album : state.albums[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos);