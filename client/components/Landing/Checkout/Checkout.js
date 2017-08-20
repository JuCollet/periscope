import React, { Component } from "react";
import { Link } from"react-router-dom";
import PlansData from "../Plans/PlansData";
import axios from "axios";
import visa from "./visa.png";
import mastercard from "./mastercard.png";

export default class Checkout extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            firstName : '',
            lastName : '',
            email : '',
            password : '',
            passwordValidation : '',
            plan : this.props.match.params.plan
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
    }
    
    handleInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name] : value
        });
        
    }
    
    sendRequest(e){
        e.preventDefault();
        axios.post('/api/users/signup', this.state)
            .then(function(response){
                alert('ok');
            })
            .catch(function(error){
                
            });
    }

    render(){
        
        const selectedPlan = PlansData[this.props.match.params.plan];
        
        return(
            <div className="wrapper wrapper-checkout">
                <div className="checkout-form">
                  <span className="index-checkout-form-title"><b>{selectedPlan.name}</b> Checkout</span>
                  <form onSubmit={this.sendRequest}>
                    <p><input name="firstName" placeholder="Prénom" value={this.state.firstName} onChange={this.handleInputChange}/></p>
                    <p><input name="lastName" placeholder="Nom" value={this.state.lastName} onChange={this.handleInputChange}/></p>
                    <p><input name="email" placeholder="Adresse e-mail" value={this.state.email} onChange={this.handleInputChange}/></p>
                    <p><input name="password" placeholder="Mot de passe" type="password" value={this.state.password} onChange={this.handleInputChange}/></p>
                    <p><input name="passwordValidation" placeholder="Confirmation du mot de passe" type="password" value={this.state.passwordValidation} onChange={this.handleInputChange}/></p> 
                    <span onClick={this.sendRequest} className="planbox-cta bkg-orange">INSCRIPTION</span>
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
};