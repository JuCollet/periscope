import React, { Component } from "react";
import PropTypes from 'prop-types';

import Sidemenu from "../../components/Sidemenu/Sidemenu";
import Header from "../../components/Header/Header";
import Albums from "../../components/Albums/Albums";
import Photos from "../../components/Photos/Photos";
import albumsMock from "../../mock/albums";
import photosMock from "../../mock/photos"

export default class Gallery extends Component {
    
    render () {
        return (
            <div id="gallery" className="container">
                <Header />
                <Photos photos={photosMock}/>
            </div>
        );
    }
}