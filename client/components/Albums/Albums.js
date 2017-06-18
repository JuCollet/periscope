'use strict';

import React from "react";
import PropTypes from 'prop-types';

import Card from "./Cards/Cards"

const Albums = props => {
  return (
    <div id="albums">
      {props.albums.map(function(album, index){
        return <Card album={album} key={index}/>;
      })}
    </div>
    );
};

export default Albums;