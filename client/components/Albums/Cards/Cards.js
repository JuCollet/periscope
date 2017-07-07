'use strict';

import React from "react";

const Card = props => {
  
  const cardStyle = {
    backgroundImage: 'url(' + props.album.thumbImg + ')',
  };
  
  // 86400000ms = 1 day;
  var newBadge = Date.now() - props.album.creationDate < 86400000 ? <div className="card-img-infos red">NEW</div> : "";
  
  return (
    <div className="card">
      <div className="card-img-wrapper">
        <div className="card-img" style={cardStyle}></div>
          {newBadge}
          <div className="card-img-infos">{props.album.photos.length} Photos</div>           
      </div>
      <div className="card-body">
        <div className="card-body-title">{props.album.title}</div>
        <div className="card-body-text">{props.album.description}</div>
      </div>
      <div className="card-buttons">
        <i className="fa fa-heart"></i>
        <i className="fa fa-arrow-down"></i>
        <i className="fa fa-share-alt"></i>
      </div>
    </div>
  );
};

export default Card;