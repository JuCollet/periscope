import React, { Component } from "react";
import { Field, reduxForm } from "redux-form"; 
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signUpUser } from "../../../actions/user";
import { Link, withRouter } from"react-router-dom";
import PlansData from "../Plans/PlansData";
import formFields from "./formFields";
import visa from "./visa.png";
import mastercard from "./mastercard.png";

class Checkout extends Component {
    
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.renderInput = this.renderInput.bind(this);
    }
    
    renderInput(field){
        return (
            <div>
                <input 
                    placeholder={field.placeholder} 
                    type={field.type} {...field.input}
                    style={field.meta.touched && field.meta.error ? {backgroundColor : "tomato"} : null}></input>
            </div>
        );
    }
    
    onSubmit(data){
        this.props.signUpUser({...data, plan : this.props.match.params.plan }, this.props.history);
    }
    
    render(){
        
        const selectedPlan = PlansData[this.props.match.params.plan];

        return(
            <div className="wrapper wrapper-checkout">
                <div className="checkout-form">
                  <span className="index-checkout-form-title"><b>{selectedPlan.name}</b> Checkout</span>
                  
                  <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    {formFields.map(formField => {
                        return <Field key={formField.name} name={formField.name} placeholder={formField.placeholder} type={formField.type} component={this.renderInput}></Field>;
                    })}
                    <span onClick={this.props.handleSubmit(this.onSubmit)} className="planbox-cta bkg-orange">INSCRIPTION</span>
                  </form>
                  
                </div>
                <div className="checkout-recap">
                    <div>
                        <span className="index-checkout-recap-title">Formule sélectionnée : <br/><b>{selectedPlan.name}</b></span>
                        <hr/>
                        <p><b>{selectedPlan.storage}</b> de stockage</p>
                        <p><b>{selectedPlan.users}</b> {selectedPlan.usersText}</p>
                        <Link to="/"><span className="checkout-recap-button bkg-blue">MODIFIER</span></Link> 
                        <hr/>
                        <p>A payer : <b>{selectedPlan.price}</b></p>                
                    </div>
                    <img className="payments-logos" src={"../img/visa.png"} />
                    <img className="payments-logos" src={"../img/mastercard.png"} />
                </div>
            </div>
        );        
    }
}

function validate(values){
    const errors = {};
    
    if(!values.firstName){
        errors.firstName = "Veuillez introduire votre prénom";
    }
    
    if(!values.lastName){
        errors.lastName = "Veuillez introduire votre nom de famille";
    }
    
    if(!values.email){
        errors.email = "Veuillez introduire votre adresse E-mail";
    }

    if(!values.password){
        errors.password = "Veuillez choisir un mot de passe";
    }       
    
    if(values.password !== values.passwordValidation){
        errors.passwordValidation = "Les mots de passe ne correspondent pas";
    }
    
    return errors;
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({ signUpUser }, dispatch);
}

export default reduxForm({
    validate,
    form: "checkoutForm"
})(connect(null, mapDispatchToProps)(withRouter(Checkout)));