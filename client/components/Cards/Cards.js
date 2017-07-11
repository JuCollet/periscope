'use strict';

import React, { Component } from "react";

class Card extends Component {
  
  cardStyle = _ => {
    if(this.props.album.photos.length > 0){
      return { backgroundImage: 'url(' + this.props.album.photos[0].thumbUrl + ')'};
    } else {
      return { backgroundImage: 'url(/img/nophoto.png)'};
    }
  };

  onDragOver(e){
    e.preventDefault();
    e.currentTarget.classList.add("dragUploadDragOver");
    console.log(this.props.album._id);
  }
  
  onDragLeave(e){
    e.currentTarget.classList.remove("dragUploadDragOver");
  }
  
  onDrop(e){
    e.preventDefault();
    const dt = e.dataTransfer;
    let data = new FormData();
    
    for (let i = 0; i < dt.files.length; i++) {
      data.append('photos', dt.files[i], dt.files[i].name);
    }
    
    e.currentTarget.classList.remove("dragUploadDragOver");
    
  }

  render(){
    
    // 86400000ms = 1 day;
    const date = new Date(this.props.album.updatedAt);
    const newBadge = Date.now() - date.getTime() < 86400000 ? <div className="card-img-infos red">NEW</div> : "";

    
    return (
      <div className="card">
        <div id="dropzone" onDrop={e => this.onDrop(e)} onDragOver={e => this.onDragOver(e)} onDragLeave={e => this.onDragLeave(e)} >
          <div className="dropLimits">
            <i className="fa fa-paper-plane"></i>
          </div>
        </div>
        <div className="card-img-wrapper">
          <div className="card-img" style={this.cardStyle()}></div>
            {newBadge}
            <div className="card-img-infos">{this.props.album.photos.length} Photos</div>           
        </div>
        <div className="card-body">
          <div className="card-body-title">{this.props.album.name}</div>
          <div className="card-body-text">{this.props.album.description}</div>
        </div>
        <div className="card-buttons">
          <i className="fa fa-heart"></i>
          <i className="fa fa-arrow-down"></i>
          <i className="fa fa-share-alt"></i>
        </div>
      </div>
    );  
  }

}

export default Card;