import React from "react";

export default function(props){
    
    const infos = props.infos;

    return (
        <div>
            <h3>Mes infos personnelles</h3>
            <p className="margin-sm-bottom">Ton adresse e-mail est : <b>{infos.email}</b></p>
            <p className="margin-md-bottom">L'ID de ton espace est : <b>{infos.bucket}</b></p>
            <i className="fa fa-edit button-icon"></i>
        </div>
    );
}