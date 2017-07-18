import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from "redux";
import { userLogin } from "../../actions/user";
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
        this.props.userLogin(data, _ => {this.props.history.push('/app/albums')});
        this.props.reset();
    }
    
    render () {
        
        const { handleSubmit } = this.props;
        
        return (
            <div className="wrapper flex-center">
                <form id="sign" onSubmit={handleSubmit(this.onSubmit)}>
                    <img src="/img/logo.svg" width="150" alt="Logo Periscope"/>
                    <h1 className="margin-md-bottom margin-sm-top darkBlueGrey">Periscope</h1>
                    <Field className="small-input margin-md-bottom" name="username" type="text" placeholder="Login" ariaLabel="username" component={this.renderField} />
                    <Field className="small-input margin-lg-bottom" name="password" type="password" placeholder="Password" ariaLabel="password" component={this.renderField} />
                    <button className="small-button small-button-anim" type="submit">Sign in</button>
                </form>
                <br/>
                <Link to="/" className="mediumGrey txt-isVeryLight">I forgot my password</Link>
            </div>
        );
    }
    
}

function validate(values){
    const errors = {};
    if(!values.username){
        errors.username = "No valid login";
    }
    if (!values.password){
        errors.password = "No valid password";
    }
    return errors;
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ userLogin }, dispatch);
}

export default reduxForm({
    validate,
    form : 'LoginForm'
})(connect(null, mapDispatchToProps)(LogIn));