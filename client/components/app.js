'use strict';

import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';

import require_auth from "./require_auth";

import Sidemenu from "../containers/Sidemenu/Sidemenu";
import Header from "../containers/Header/Header";
import CreateAlbum from "../containers/CreateAlbum/CreateAlbum";
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
                <Switch>
                    <Route path="/app/Upload" component={CreateAlbum} />
                    <Route path="/app/Account" component={Account} />
                    <Route path="/app/albums" component={Albums} />
                    <Route path="/app/photos/:id" component={Photos} />
                    <Route path="/app/photo/:albumId/:photoId" component={Photo} />
                </Switch>
            </div>
        );
    }
    
}

export default require_auth(App);