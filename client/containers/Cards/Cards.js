'use strict';

import React, { Component } from "react";
import { connect } from "react-redux";
import Dropbox from "../Dropbox/Dropbox";

import "./img/noPhotoInAlbum.png";


class Card extends Component {
  
  cardStyle = _ => {
    if(this.props.album.albumThumb && this.props.album.albumThumb != null ){
      return { backgroundImage: 'url(' + this.props.album.albumThumb + ')'};
    }else if(this.props.album.thumb && this.props.album.thumb != null){
      return { backgroundImage: 'url(' + this.props.album.thumb + ')'};
    }else if(this.props.album.photos && this.props.album.photos.length > 0 ){
      return { backgroundImage: 'url(' + this.props.album.photos[0].thumb + ')'};
    }else {
      return { backgroundImage: 'url(/img/noPhotoInAlbum.png)'};
    }
  };

  render(){
    
    // 86400000ms = 1 day;
    const createDate = new Date(this.props.album.createdAt);
    const updateDate = new Date(this.props.album.updatedAt);
    const newBadge = Date.now() - createDate.getTime() < 86400000 ? <div className="card-img-infos red">NEW</div> : Date.now() - updateDate.getTime() < 86400000 ? <div className="card-img-infos red">UP</div> : "";
  
    const { album } = this.props;
    const { canWrite } = this.props.user;
  
    return (
      <div className="card">
        { !canWrite ? null : <Dropbox id={album._id} height={150} />}
        <div className="card-img-wrapper">
          <div className="card-img" style={this.cardStyle()}></div>
            {newBadge}
            <div className="card-img-infos">{album.numberOfPhotos ? album.numberOfPhotos : album.photos ? album.photos.length : "0" } Photo{album.numberOfPhotos < 2 ? "" : "s"}</div>           
        </div>
        <div className="card-body">
          <div className="card-body-title">{album.name.length > 30 ? album.name.substr(0,30) + " ..." : album.name}</div>
          <div className="card-body-text">{album.name.length > 22 ? album.description.length > 80 ? album.description.substr(0,80) + " ..." : album.description : album.description.length > 115 ? album.description.substr(0,115) + " ..." : album.description}</div>
        </div>
        <div className="card-buttons">
          <i className="fa fa-arrow-down"></i>
          <i className="fa fa-share-alt"></i>
        </div>
      </div>
    );  
  }
}

function mapStateTopProps(state){
  return {
    user: state.user
  };
}

export default connect(mapStateTopProps)(Card);