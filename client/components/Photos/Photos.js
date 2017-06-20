'use strict';

import React from "react";
import PropTypes from 'prop-types';

const Photos = props => {
  return (
    <div id="photos">
      {props.photos.map(function(photo, index){
        return <img src={photo.medium} key={index}/>;
      })}
    </div>
    );
};

export default Photos;