'use strict';

import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link, withRouter } from"react-router-dom";
import { signInUser, signErrorReset } from "../../../actions/user";

class Signin extends Component {

    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    renderField(field){
        return(
            <input className={field.className} type={field.type} placeholder={field.placeholder} aria-label={field.ariaLabel} {...field.input}/>
        );
    }
    
    componentWillUpdate(nextProps){
        if(nextProps.error.err){
            this.props.tilt();
            this.props.signErrorReset();
        }
    }
    
    onSubmit(data){
        this.props.signInUser(data, this.props.history, this.props.reset);
    }    
    
    render(){
        
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <img src="/img/logo.svg" width="150" alt="Logo Periscope"/>
                <h1 className="margin-md-bottom margin-sm-top txt-darkBlueGrey">Periscope</h1>
                <Field className="small-input margin-sm-bottom" name="email" type="text" placeholder="E-Mail" ariaLabel="e-mail" component={this.renderField} />
                <Field className="small-input margin-md-bottom" name="password" type="password" placeholder="Password" ariaLabel="password" component={this.renderField} />
                <button className="small-button small-button-anim" type="submit">Sign in</button>
            </form>        
        );
    }
}

function validate(values){
    const errors = {};
    if(!values.email){
        errors.email = "No valid E-mail";
    }
    if (!values.password){
        errors.password = "No valid password";
    }
    return errors;
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ signInUser, signErrorReset }, dispatch);
}

function mapStateToProps(state){
    return {
        error : state.user.error   
    };
}

export default reduxForm({
    validate,
    form : 'LoginForm'
})(connect(mapStateToProps, mapDispatchToProps)(withRouter(Signin)));