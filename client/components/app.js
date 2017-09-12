'use strict';

import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';

import require_auth from "./Authentication/require_auth";

import Sidemenu from "../containers/Sidemenu/Sidemenu";
import Header from "../containers/Header/Header";
import Notification from "../containers/Notification/Notification";
import NewAlbum from "../containers/NewAlbum/NewAlbum";
import Upload from "../containers/Upload/Upload";
import Account from "../containers/Account/Account";
import Albums from "../containers/Albums/Albums";
import Photos from "../containers/Photos/Photos";
import Photo from "../containers/Photo/Photo";

class App extends Component {
    
    render(){
        return(
            <div className="container">
                <Header />
                <Sidemenu />
                <Notification />
                <Switch>
                    <Route path="/app/createalbum" component={NewAlbum} />
                    <Route path="/app/upload/:albumId" component={Upload} />
                    <Route path="/app/account" component={Account} />
                    <Route path="/app/albums" component={Albums} />
                    <Route path="/app/photos/:id" component={Photos} />
                    <Route path="/app/photo/:albumId/:photoId" component={Photo} />
                </Switch>
            </div>
        );
    }
    
}

export default require_auth(App);