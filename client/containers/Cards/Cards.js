'use strict';

import React, { Component } from "react";
import Dropbox from "../Dropbox/Dropbox";

import "./img/noPhotoInAlbum.png";


export default class Card extends Component {
  
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

    
    return (
      <div className="card">
        <Dropbox id={this.props.album._id} height={150} />
        <div className="card-img-wrapper">
          <div className="card-img" style={this.cardStyle()}></div>
            {newBadge}
            <div className="card-img-infos">{this.props.album.numberOfPhotos ? this.props.album.numberOfPhotos : this.props.album.photos ? this.props.album.photos.length : "0" } Photo{this.props.album.numberOfPhotos < 2 ? "" : "s"}</div>           
        </div>
        <div className="card-body">
          <div className="card-body-title">{this.props.album.name}</div>
          <div className="card-body-text">{this.props.album.description}</div>
        </div>
        <div className="card-buttons">
          <i className="fa fa-arrow-down"></i>
          <i className="fa fa-share-alt"></i>
        </div>
      </div>
    );  
  }
}