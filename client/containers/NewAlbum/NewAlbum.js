import React, { Component } from 'react';
import { Link, Route, Switch, Redirect } from "react-router-dom";

import CreateAlbum from "./CreateAlbum/CreateAlbum";
import Infos from "./Infos/Infos";

export default class NewAlbum extends Component {
    
    renderLinkStyle(link){
        const { pathname } = this.props.location;
        return pathname.split('/').indexOf(link.path) !== -1 ? {opacity:".5"} : null;
    }
    
    renderLinksList(){
        
        const { path } = this.props.match;

        const links = [
            {
                path : "create",
                label : "Créer un album"
            },
            {
                path : "infos",
                label : "Plus d'infos"
            },            
        ];
        
        return (
            links.map(link=>{
                return <li className="margin-sm-bottom" style={this.renderLinkStyle(link)} key={link.label}><Link to={`${path}/${link.path}`}>{link.label}</Link></li>;
            })
        );
    }
    
    render(){

        const { path } = this.props.match;

        return (
            <div className="container-center wrapper-padding">
                <div className="content-page">
                    <div className="content-page-sidemenu">
                        <h2 className="txt-darkBlueGrey margin-md-bottom">Albums</h2>
                        <ul>
                            {this.renderLinksList()}
                        </ul>
                    </div>
                    <div className="content-page-content">
                    <Switch>
                        <Route path={`${path}/infos`} component={Infos} />
                        <Route path={`${path}/create`} render={props=> { return <CreateAlbum {...props} />}} />
                        <Redirect from={`${path}/`} to={`${path}/create`} />
                    </Switch>
                    </div>
                </div>
            </div>
        );
    }
}