/*global localStorage*/

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";

import { sendNotification } from "../../../../actions/notification";

class Share extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            destinationName : "",
            destinationEmail : "",
            message : ""
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    onInputChange(e){
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    
    handleSubmit(e){
        e.preventDefault();
        const data = {
            destinationName : this.state.destinationName,
            destinationEmail : this.state.destinationEmail,
            imageUrl : this.props.photo.thumb,
            downloadUrl: this.props.photo.original,
            message: this.state.message 
        };
        axios.post("/api/photos/share/", data, {headers : {authorization : localStorage.getItem('token')}})
        .then(_=>{
            this.props.closeInfoBox();
            this.props.sendNotification("Photo envoyée !");
        })
        .catch(err => {
            this.props.closeInfoBox();
            this.props.sendNotification(err.response.data.error.message, "error");
        });
    }
    
    render(){
        return(
            <div>
                <h3 className="margin-md-bottom">Partager cette image</h3>
                <p>En partageant cette image, vous permettrez à votre contact de la télécharger dans sa qualité d'origine.</p>
                <form onSubmit={this.handleSubmit}>
                    <h4 className="margin-md-bottom">Nom du destinataire</h4>
                    <input name="destinationName" onChange={this.onInputChange} value={this.state.destinationName} className="small-input margin-md-bottom" type="text" placeholder="Nom du destinataire" />
                    <h4 className="margin-md-bottom">Adresse E-mail du destinataire</h4>
                    <input name="destinationEmail" onChange={this.onInputChange} value={this.state.destinationEmail} className="small-input margin-md-bottom" type="email" placeholder="Email du destinataire" />
                    <h4 className="margin-md-bottom">Quel message voulez-vous joindre à cette image ?</h4>
                    <textarea placeholder="Message" name="message" onChange={this.onInputChange} value={this.state.message} rows="3" className="small-input margin-md-bottom"></textarea>
                    <button type="submit" className="button button-small button-white button-hover-green">Envoyer</button>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({sendNotification}, dispatch);
}

export default connect(null, mapDispatchToProps)(Share);