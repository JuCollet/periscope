import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from "redux";
import { signInUser } from "../../actions/user";
import { connect } from "react-redux";
import { Link } from"react-router-dom";

class LogIn extends Component {
    
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    renderField(field){
        return(
            <input className={field.className} type={field.type} placeholder={field.placeholder} aria-label={field.ariaLabel}{...field.input}/>
        );
    }
    
    onSubmit(data){
        this.props.signInUser(data);
        this.props.reset();
    }
    
    render () {
        
        const { handleSubmit } = this.props;
        
        return (
            <div className="wrapper sign-background-image flex-center">
                <form id="sign" onSubmit={handleSubmit(this.onSubmit)}>
                    <img src="/img/logo.svg" width="150" alt="Logo Periscope"/>
                    <h1 className="margin-md-bottom margin-sm-top darkBlueGrey">Periscope</h1>
                    <Field className="small-input margin-md-bottom" name="email" type="text" placeholder="E-Mail" ariaLabel="e-mail" component={this.renderField} />
                    <Field className="small-input margin-lg-bottom" name="password" type="password" placeholder="Password" ariaLabel="password" component={this.renderField} />
                    <button className="small-button small-button-anim" type="submit">Sign in</button>
                </form>
                <Link to="/" className="mediumGrey txt-isVeryLight login-forgotpw">I forgot my password</Link>
            </div>
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
    return bindActionCreators({ signInUser }, dispatch);
}

export default reduxForm({
    validate,
    form : 'LoginForm'
})(connect(null, mapDispatchToProps)(LogIn));