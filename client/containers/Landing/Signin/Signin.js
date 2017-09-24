/*global localStorage*/

'use strict';

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from"react-router-dom";
import { signInUser, signErrorReset } from "../../../actions/user";

import LandingAnim from "../LandingAnim";
import logo from "../../../assets/logo.svg";

class Signin extends Component {

    constructor(props){
        super(props);
        this.state = { 
            email : "",
            password : "",
            error : null
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount(){
        if(this.props.user.authenticated){
            this.props.history.push('/app/albums');
        }
        // This action require a boolean to reset or not the error message.
        this.props.signErrorReset(true);
    }
    
    componentWillUpdate(nextProps){
        if(nextProps.user.error && nextProps.user.error.err){
            this.props.tilt();
            this.props.signErrorReset();
        } else if(nextProps.user.authenticated){
            this.props.history.push('/app/albums');
        }        
    }
    
    onChangeHandler(e){
        this.setState({
            [e.currentTarget.name] : e.currentTarget.value
        });
    }
    
    onSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            this.props.tilt();
            return this.setState({
                error : "Cet email semble incorrect",
                errorField : "email"
            });
        } else if(!password){
            this.props.tilt();
            return this.setState({
                error : "Entrez votre mot de passe",
                errorField : "password"
            });    
        } else {
            this.setState({
                error : null,
                errorField : null
            });
        }
        
        this.props.signInUser({email, password});
    }
    
    renderStyle(name){
        const { errorField } = this.state;
        return errorField === name ? {border : "1px solid tomato"} : null;
    }    
    
    render(){
        return(
            <form onSubmit={this.onSubmit}>
                <img src={logo} width="150" alt="Logo Periscope"/>
                <h1 className="margin-md-bottom margin-sm-top txt-darkBlueGrey">Periscope</h1>
                <input value={this.state.email} style={this.renderStyle('email')} onChange={this.onChangeHandler} className="small-input margin-sm-bottom" name="email" type="text" placeholder="E-Mail" aria-label="e-mail" />
                <input value={this.state.password} style={this.renderStyle('password')} onChange={this.onChangeHandler} className="small-input margin-sm-bottom" name="password" type="password" placeholder="Password" aria-label="password" />
                {this.state.error ? <div className="txt-red margin-sm-bottom"> {this.state.error} </div> : this.props.user.error ? <div className="txt-red margin-sm-bottom"> {this.props.user.error.message} </div> : null}
                <button className="button button-medium button-white button-animation margin-sm-top" type="submit">Se connecter</button>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ signInUser, signErrorReset }, dispatch);
}

function mapStateToProps(state){
    return {
        user : state.user   
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingAnim(withRouter(Signin)));