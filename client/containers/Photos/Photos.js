'use strict';

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";
import { albumFetch, deleteAlbum } from "../../actions/albums";
import { searchType, searchTermUpdate } from "../../actions/search";
import Loading from "../../components/Loading/Loading";
import Tags from "../../components/Tags/Tags";
import Patchwork from "../../components/Patchwork/Patchwork";

class Photos extends Component {
  
  componentDidMount(){
    this.props.albumFetch(this.props.match.params.id);
    if(this.props.search.searchTerm.substr(0,1) !== "#"){
      this.props.searchTermUpdate("");
    }
    this.props.searchType("photos"); 
  }
  
  componentWillUnmount(){
    this.props.searchType(null);
  }
  
  deleteAlbum(albumId){
    this.props.deleteAlbum(albumId, _ => {
      this.props.history.push('/app/albums');
    });
  }
  
  renderPatchwork(){
    
    const { album } = this.props;
    const { searchTerm } = this.props.search;

    if(this.props.album.photos){
      return <Patchwork photos={this.props.album.photos} searchTerm={searchTerm.substr(0,1) === "#" ? searchTerm.substr(1) : searchTerm} albumId={album._id} />;
    } else {
      return <Loading />;
    }
    
  }
   
  render(){
    
    const { album } = this.props;

    if(!album){
      return <Loading />;
    }
    
    return (
      <div className="wrapper-padding">
        <p><NavLink to="/app/albums/"><i className="fa fa-chevron-left"></i><span className="photos-back-link">&nbsp;&nbsp;Retour</span></NavLink></p>
        <span className="albumTitle">{album.name}</span>
        <span className="albumPhotographer">par {album.photographer}</span>
        <span className="albumDescription">{album.description}</span>
        <Tags tags={album.tags} />
        <i className="fa fa-trash button-icon" onClick={_ => this.deleteAlbum(album._id)}></i>
        <i className="fa fa-pencil button-icon"></i>
        <i className="fa fa-envelope button-icon"></i>
        <hr className="albumHr" />
        {this.renderPatchwork()}
      </div>
    );  
  }
  
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ albumFetch, deleteAlbum, searchType, searchTermUpdate }, dispatch);
}

function mapStateToProps(state, ownProps){
  return {
    album : state.albums[ownProps.match.params.id],
    search : state.search
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos);