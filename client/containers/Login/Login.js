import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from "redux";
import { userLogin } from "../../actions/user_login";
import { connect } from "react-redux";

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
        this.props.userLogin(data, _ => {this.props.history.push('/gallery/albums')});
        this.props.reset();
    }
    
    render () {
        
        const { handleSubmit } = this.props;
        
        return (
            <div id="sign-wrapper">
                <form id="sign" onSubmit={handleSubmit(this.onSubmit)}>
                    <img src="img/logo.svg" width="150" alt="Logo Periscope"/>
                    <h1 className="margin-md-bottom margin-sm-top darkBlueGrey">Periscope</h1>
                    <Field className="margin-md-bottom" name="username" type="text" placeholder="Login" ariaLabel="username" component={this.renderField} />
                    <Field className="margin-lg-bottom" name="password" type="password" placeholder="Password" ariaLabel="password" component={this.renderField} />
                    <button className="button-anim" type="submit">Sign in</button>
                </form>
                <p className="mediumGrey">I forgot my password</p>
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