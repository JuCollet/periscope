'use strict';

import React from "react";
import { Route, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Card from "./Cards/Cards"

const Albums = props => {
  return (
    <div id="albums">
      {props.albums.map(function(album, index){
        return <NavLink to='/gallery/photos' key={index}><Card album={album} /></NavLink>;
      })}
    </div>
    );
};

export default Albums;