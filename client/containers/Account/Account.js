import React, { Component } from 'react';
import { Link, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getInfos } from "../../actions/user";

import Loading from "../../components/Loading/Loading";

import MyUsage from "./MyUsage/MyUsage";
import MyFriends from "./MyFriends/MyFriends";

class Account extends Component {
    
    componentWillMount(){
        this.props.getInfos();
    }    
    
    renderLinkStyle(link){
        const { pathname } = this.props.location;
        return pathname.split('/').indexOf(link.path) !== -1 ? {opacity:".5"} : null;
    }
    
    renderLinksList(){
        
        const { path } = this.props.match;

        const links = [
            {
                path : "usage",
                label : "Mon utilisation"
            },
            {
                path : "friends",
                label : "Mes amis",
                isAdmin : true
            },            
        ];
        
        return (
            links.map(link=>{
                if(link.isAdmin && !this.props.user.isAdmin){
                    return null;
                }
                return <li className="margin-sm-bottom" style={this.renderLinkStyle(link)} key={link.label}><Link to={`${path}/${link.path}`}>{link.label}</Link></li>;
            })
        );
    }
    
    render(){
        
        if(!this.props.user.infos){
            return <Loading />;
        }
        
        const { infos } = this.props.user;
        const { path } = this.props.match;

        return (
            <div className="container-center wrapper-padding">
                <div className="content-page">
                    <div className="content-page-sidemenu">
                        <h2 className="txt-darkBlueGrey margin-md-bottom">Mon compte</h2>
                        <ul>
                            {this.renderLinksList()}
                        </ul>
                    </div>
                    <div className="content-page-content">
                    <Switch>
                        <Route path={`${path}/usage`} render={props=> { return <MyUsage {...props} infos={infos} />}} />
                        <Route path={`${path}/friends`} render={props=> { return <MyFriends {...props} infos={infos} />}} />
                        <Redirect from={`${path}/`} to={`${path}/usage`} />
                    </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToprops(dispatch){
    return bindActionCreators({ getInfos }, dispatch);
}

function mapStateTopProps(state){
    return {
        user : state.user,
    };
}

export default connect(mapStateTopProps, mapDispatchToprops)(Account);