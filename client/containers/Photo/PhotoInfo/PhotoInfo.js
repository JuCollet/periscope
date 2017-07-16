"use strict";

import React from "react";

export default function(props){
    return (
        <div className="bkg-white photoInfoBox">
            <i className="fa fa-times" onClick={_ => props.closeInfoBox()}></i>
            <h2>Infos</h2>
            <p>Album name</p>
            <p>Photographe</p>
            <p>Size</p>
            <p>Weight</p>
            <p>Tags</p>
            <br/>
            <p>Partager</p>
            <p>Supprimer cette image</p>
            <p>Télécharger cette image</p>            
            <p>Editer les tags</p>
        </div>
    );
}