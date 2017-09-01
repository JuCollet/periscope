'use strict';

import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from"react-router-dom";

class CheckOut extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    renderField(field){
        return(
            <input className={field.className} type={field.type} placeholder={field.placeholder} aria-label={field.ariaLabel} {...field.input}/>
        );
    }    
    
    onSubmit(data){
        this.props.signInUser(data, this.props.history, this.props.reset);
    }

    render(){
        
        const { handleSubmit } = this.props;

        return(
            <div>
                            <img src="/img/logo_150.svg" alt="Logo Periscope"/>

                <h2 className="txt-darkBlueGrey margin-sm-bottom">Inscription</h2>
                <h3 className="txt-darkBlueGrey margin-lg-bottom">5Go gratuits !</h3>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <Field className="small-input margin-sm-bottom" name="name" type="text" placeholder="Prénom" ariaLabel="Prénom" component={this.renderField} />
                    <Field className="small-input margin-sm-bottom" name="email" type="text" placeholder="E-Mail" ariaLabel="e-mail" component={this.renderField} />
                    <Field className="small-input margin-sm-bottom" name="password" type="password" placeholder="Mot de passe" ariaLabel="mot de passe" component={this.renderField} />
                    <Field className="small-input margin-lg-bottom" name="passwordValidation" type="password" placeholder="Confirmez le mot de passe" ariaLabel="Confirmation du mot de passe" component={this.renderField} />
                    <button className="small-button small-button-anim" type="submit">je m'inscris</button>
                </form>   
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

function mapStateToProps(state){
    return {
        error : state.user.error   
    };
}

export default reduxForm({
    validate,
    form : 'CheckoutForm'
})(connect(mapStateToProps)(withRouter(CheckOut)));