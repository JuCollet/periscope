"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route, Switch, Redirect } from "react-router-dom";

import Infos from "./Infos/Infos";
import Edit from "./Edit/Edit";
import Share from "./Share/Share";
import Integration from "./Integration/Integration";
import Options from "./Options/Options";

class PhotoInfo extends Component {
    
    renderLinkStyle(link){
        const { pathname } = this.props.location;
        return pathname.split('/').indexOf(link.path) !== -1 ? {opacity:".5"} : null;
    }
    
    renderLinksList(){
        
        const { url } = this.props.match;

        const links = [
            {
                path : "infos",
                label : "Infos"
            },
            {
                path : "edit",
                label : "Editer les infos",
                canWrite : true
            },
            {
                path : "share",
                label : "Envoyer par E-mail"
            },                
            {
                path : "integration",
                label : "Intégration"
            },                 
            {
                path : "options",
                label : "Options"
            },            
        ];
        
        return (
            links.map(link=>{
                if(link.canWrite && !this.props.user.canWrite){
                    return null;
                }
                return <li className="margin-sm-bottom" style={this.renderLinkStyle(link)} key={link.label}><Link to={`${url}/${link.path}`}>{link.label}</Link></li>;
            })
        );
    }    

    render(){
        
        const { url } = this.props.match;

        return (
            <div className="wrapper-padding container-center wrapper-fullHeight bkg-white" ref={this.props.photoInfoDomElement}>
                <div className="content-page">
                    <div className="content-page-sidemenu">
                        <h2 className="txt-darkBlueGrey margin-md-bottom">Photo</h2>
                        <ul>
                            {this.renderLinksList()}
                        </ul>
                        <i className="fa fa-chevron-up button-icon margin-md-bottom" style={{marginRight:"0px"}} onClick={_ => this.props.closeInfoBox()}></i>
                    </div>
                    <div className="content-page-content">
                        <Switch>
                            <Route path={`${url}/infos`} render={_ => { return <Infos album={this.props.album} photo={this.props.photo} />}} />
                            <Route path={`${url}/edit`} render={_ => { return <Edit album={this.props.album} photo={this.props.photo} history={this.props.history} />}} />
                            <Route path={`${url}/share`} render={ _ => {return <Share photo={this.props.photo}  closeInfoBox={this.props.closeInfoBox} /> }}/>                            
                            <Route path={`${url}/integration`} render={ _ => {return <Integration album={this.props.album} photo={this.props.photo} /> }}/>                            
                            <Route path={`${url}/options`} render={ _ => {return <Options history={this.props.history} album={this.props.album} photo={this.props.photo} closeInfoBox={this.props.closeInfoBox} /> }} />
                            <Redirect from={`/`} to={`${url}/infos`} />
                        </Switch>                    
                    </div>
                </div>
            </div>
        );        
    }
}

function mapStateTopProps(state){
    return {
        user: state.user
    };
}

export default connect(mapStateTopProps)(PhotoInfo);