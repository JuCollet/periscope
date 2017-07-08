import React, { Component } from "react";
import { Route } from 'react-router-dom';

import Sidemenu from "../../containers/Sidemenu/Sidemenu";
import Header from "../../containers/Header/Header";
import Upload from "../../containers/Upload/Upload";
import Account from "../../containers/Account/Account";
import Albums from "./Albums/Albums";
import Photos from "./Photos/Photos";
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
                <Route path="/gallery/upload" component={Upload} />
                <Route path="/gallery/account" component={Account} />
            </div>
        );
    }
}