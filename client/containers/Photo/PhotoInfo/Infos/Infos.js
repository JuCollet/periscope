import React from "react";
import Tags from "../../../../components/Tags/Tags"

class Infos extends React.Component {

    render(){
        
        const {album , photo} = this.props;
        
        return(
            <div>
                <h3>Infos</h3>
                <p><b>Nom de l'album : </b>{album.name}</p>
                <p><b>Description : </b>{photo.description ? photo.description : album.description}</p>
                <p><b>Photographe : </b>{photo.photographer ? photo.photographer : album.photographer}</p>
                <p><b>Dimensions : </b>{photo.width ? photo.width : "largeur inconnue"} x {photo.height ? photo.height : "hauteur inconnue"}</p>
                <p><b>Impression optimale : </b>{photo.width ? Math.round(photo.width/118) : "largeur inconnue"} cm x {photo.height ? Math.round(photo.height/118) : "hauteur inconnue"} cm max.</p>
                <p><b>Poids de l'image : </b>{Math.round((photo.size/1048576)*10)/10} Mo</p>
                {this.props.renderTagsElement(photo.tags)}
                <a href={photo.original}><button className="button button-small button-white button-animation">Télécharger</button></a>
            </div>
        ); 
    }
}

export default Tags(Infos);