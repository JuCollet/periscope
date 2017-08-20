import React from "react";
import { Link } from"react-router-dom";
import PlansData from "../Plans/PlansData";

export default props => {
    
    const selectedPlan = PlansData[props.match.params.plan];

    return(
        <div className="wrapper wrapper-checkout">
            <div className="checkout-form">
              <span className="index-checkout-form-title"><b>{selectedPlan.name}</b> Checkout</span>
              <form>
                <p><input name="firstName" placeholder="Prénom"/></p>
                <p><input name="firstName" placeholder="Nom"/></p>
                <p><input name="firstName" placeholder="Adresse e-mail"/></p>
                <p><input name="firstName" placeholder="Mot de passe" type="password"/></p>
                <p><input name="firstName" placeholder="Confirmation du mot de passe" type="password"/></p> 
                <span className="planbox-cta bkg-orange">INSCRIPTION</span>
              </form>
            </div>
            <div className="checkout-recap">
                <div>
                    <span className="index-checkout-recap-title">Formule sélectionnée : <br/><b>{selectedPlan.name}</b></span>
                    <hr/>
                    <p><b>{selectedPlan.storage}</b> de stockage</p>
                    <p><b>{selectedPlan.users}</b> {selectedPlan.usersText}</p>
                    <Link to="/"><span className="checkout-recap-button bkg-orange">MODIFIER</span></Link> 
                    <hr/>
                    <p>A payer : <b>{selectedPlan.price}</b></p>                
                </div>
            </div>
        </div>
    );
};