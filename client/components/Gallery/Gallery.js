import React, { Component } from "react";
import { Route } from 'react-router-dom';

import Sidemenu from "../../containers/Sidemenu/Sidemenu";
import Header from "../../containers/Header/Header";
import Albums from "../../components/Albums/Albums";
import Photos from "../../components/Photos/Photos";
import albumsMock from "../../mock/albums";
import photosMock from "../../mock/photos";

export default class Gallery extends Component {
    
    render () {
        return (
            <div id="gallery" className="container">
                <Sidemenu />
                <Header />
                <Route path="/gallery/albums" render={ () => <Albums albums={albumsMock} /> }/>
                <Route path="/gallery/photos" render={ () => <Photos photos={photosMock} /> }/>
            </div>
        );
    }
}