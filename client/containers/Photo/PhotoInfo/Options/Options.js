import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { photoDelete } from "../../../../actions/photos";
import { albumThumbUpdate } from "../../../../actions/albums";


class Options extends Component {
    
    render(){
        
        const { photo, album } = this.props;
        
        return(
            <div>
                <h3>Options</h3>
                <h4 className="margin-md-top">Télécharger cette image</h4>
                <p>Téléchargez cette image au format JPEG, dans sa qualité d'origine (original), dans une taille medium (1600px&nbsp;max.) ou small/thumb (320px&nbsp;max.).</p>
                <a href={photo.original} download><button className="button button-small button-white button-hover-green margin-sm-right">Original</button></a>
                <a href={photo.medium} download><button className="button button-small button-white button-hover-green margin-sm-right">Medium</button></a>
                <a href={photo.thumb} download><button className="button button-small button-white button-hover-green">Small</button></a>
                <h4 className="margin-md-top">Définir comme image d'album</h4>
                <p>Cette image sera utilisée comme image d'album dans votre gallerie.</p>
                <button onClick={_=>this.props.albumThumbUpdate(album._id, photo.thumb, _ => this.props.closeInfoBox())} className="button button-small button-white button-hover-green">Image d'album</button>
                <h4 className="margin-md-top">Supprimer l'image</h4>
                <p>Attention, en supprimant cette image, les personnes avec qui vous l'avez partagée ne pourront plus la voir et les liens vers cette image intégrés dans des blogs ou sur d'autres sites ne fonctionneront plus.</p>
                <button onClick={_=>this.props.photoDelete(album._id, photo._id, photo.filename, _ => {this.props.history.push(`/app/photos/${album._id}`)})} className="button button-small button-white button-hover-red">Supprimer cette image</button>
             </div>   
        );          
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ photoDelete, albumThumbUpdate }, dispatch);
}

export default connect(null,mapDispatchToProps)(Options);