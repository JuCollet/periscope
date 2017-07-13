'use strict';

import React, { Component } from "react";
import Dropbox from "../Dropbox/Dropbox";


export default class Card extends Component {
  
  cardStyle = _ => {
    if(this.props.album.photos.length > 0){
      return { backgroundImage: 'url(' + this.props.album.photos[0].thumb + ')'};
    } else {
      return { backgroundImage: 'url(/img/nophoto.png)'};
    }
  };

  render(){
    
    // 86400000ms = 1 day;
    const date = new Date(this.props.album.updatedAt);
    const newBadge = Date.now() - date.getTime() < 86400000 ? <div className="card-img-infos red">NEW</div> : "";

    
    return (
      <div className="card">
        <Dropbox id={this.props.album._id} height={150} />
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