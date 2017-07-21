"use strict";

import React from "react";
import Tags from "../../../components/Tags/Tags";


export default function(props){
    
    const { photo, album } = props;
    
    return (
        <div className="bkg-white photoInfoBox">
            <i className="fa fa-times" onClick={_ => props.closeInfoBox()}></i>
            <h2>Infos</h2>
            <p><b>Nom de l'album : </b>{album.name}</p>
            <p><b>Description : </b>{album.description}</p>
            <p><b>Crédit photographique : </b>&copy; {album.photographer}</p>
            <p><b>Dimensions : </b>{photo.width ? photo.width : "largeur inconnue"} x {photo.height ? photo.height : "hauteur inconnue"}</p>
            <Tags tags={photo.tags} />
            <br/>
            <a href="#"><p>Partager</p></a>
            <a href="#"><p>Supprimer cette image</p></a>
            <a href={photo.original} download><p>Télécharger cette image</p></a>            
            <a href="#"><p>Editer les tags</p></a>
        </div>
    );
}