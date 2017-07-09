'use strict';

import React from "react";

const Photos = props => {
  return (
    <div className="wrapper">
      <span className="albumTitle">Accompagnement à domicile</span>
      <span className="albumPhotographer">par Julien Collet</span>
      <span className="albumDescription">Typewriter offal fanny pack schlitz letterpress, subway tile deep v yuccie. Master cleanse shabby chic post-ironic skateboard thundercats, mixtape meditation knausgaard VHS.</span>
      <span className="tag">Hello</span>
      <span className="tag">Hello</span>
      <span className="tag">Hello</span>
      <span className="tag">Hello</span>
      <span className="tag">Hello</span>
      <span className="tag">Hello</span>
      <span className="tag">Hello</span>
      <span className="tag">Hello</span>
      <span className="tag">Hello</span>
      <span className="tag">Hello</span>
      <span className="tag">Hello</span>
      <span className="tag">Hello</span>
      <span className="tag">Hello</span>
      <span className="tag">Hello</span>
      <span className="tag">Hello</span>
      <span className="tag">Hello</span>
      <span className="tag">Hello</span>
      <span className="tag">Hello</span>
      <hr className="albumHr" />
      
      <div id="photos">
        {props.photos.map(function(photo, index){
          return <img src={photo.medium} key={index}/>;
        })}
      </div>
    </div>
    );
};

export default Photos;