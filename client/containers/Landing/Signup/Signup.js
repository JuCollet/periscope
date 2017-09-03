'use strict';

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { signUpUser, signErrorReset } from "../../../actions/user";
import { connect } from "react-redux";
import { withRouter } from"react-router-dom";

class Signup extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            firstName : "",
            email : "",
            password : "",
            passwordValidation : "",
            error : null
        };
    }
    
    componentWillMount(){
        // This action require a boolean to reset or not the error message.
        this.props.signErrorReset(true);
    }    
    
    componentWillUpdate(nextProps){
        if(nextProps.error && nextProps.error.err){
            this.props.tilt();
            this.props.signErrorReset();
        }
    }    
    
    onChangeHandler(e){
        this.setState({
            [e.currentTarget.name] : e.currentTarget.value
        });
    }
    
    onSubmit(e){
        e.preventDefault();
        
        const { firstName, email, password, passwordValidation } = this.state;
        
        if(!firstName || firstName.length < 2){
            this.props.tilt();
            return this.setState({
                error : "Quel est votre prénom ?",
                errorField : "firstName"
            });    
        } else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            this.props.tilt();
            return this.setState({
                error : "Cet email semble incorrect",
                errorField : "email"
            });
        } else if(!password){
            this.props.tilt();
            return this.setState({
                error : "Choisissez un mot de passe",
                errorField : "password"
            });    
        } else if(password !== passwordValidation){
            this.props.tilt();
            return this.setState({
                error : "Confirmation incorrecte",
                errorField : "passwordValidation"
            });    
        } else {
            this.setState({
                error : null,
                errorField : null
            });
        }
        this.props.signUpUser({firstName, email, password}, this.props.history);
    }
    
    renderStyle(name){
        const { errorField } = this.state;
        return errorField === name ? {border : "1px solid tomato"} : null;
    }

    render(){
        return(
            <div>
                <h2 className="txt-darkBlueGrey margin-sm-bottom">Inscription</h2>
                <h3 className="txt-darkBlueGrey margin-lg-bottom"><b>5Go</b> gratuits !</h3>
                <form onSubmit={this.onSubmit} >
                    <input value={this.state.firstName} style={this.renderStyle('firstName')} className="small-input margin-sm-bottom" name="firstName" type="text" placeholder="Prénom" aria-label="Prénom" onChange={this.onChangeHandler} />
                    <input value={this.state.email} style={this.renderStyle('email')} className="small-input margin-sm-bottom" name="email" type="text" placeholder="E-Mail" aria-label="e-mail" onChange={this.onChangeHandler} />
                    <input value={this.state.password} style={this.renderStyle('password')} className="small-input margin-sm-bottom" name="password" type="password" placeholder="Mot de passe" aria-label="mot de passe" onChange={this.onChangeHandler} />
                    <input value={this.state.passwordValidation} style={this.renderStyle('passwordValidation')} className="small-input margin-sm-bottom" name="passwordValidation" type="password" placeholder="Confirmez le mot de passe" aria-label="Confirmation du mot de passe" onChange={this.onChangeHandler} />
                    {this.state.error ? <div className="txt-red"> {this.state.error} </div> : this.props.error ? <div className="txt-red"> {this.props.error.message} </div> : null}
                    <button className="small-button small-button-anim margin-md-top" type="submit">je m'inscris</button>
                </form>   
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({signUpUser, signErrorReset}, dispatch);
}

function mapStateToProps(state){
    return {
        error : state.user.error   
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup));