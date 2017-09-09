import React from "react";

export default props => {
    return(
        <div>
           <h3>Options</h3>
           <p><a href="">Supprimer cette image</a></p>
           <p><a href="">Télécharger cette image</a></p>
           <p><a href="">Choisir comme photo d'album</a></p>
         </div>   
    );
};


/*

<p><a href="#" onClick={_=>this.props.photoDelete(album._id, photo._id, photo.filename, this.props.callback)}>Supprimer cette image</a></p>
            <p><a href={photo.original} download>Télécharger cette image</a></p>
            {this.state.tagEdit ? this.tagsEditRender() : <p><a href="#" onClick={this.toggleTagsEdit}>Editer les tags</a></p> }
            <p><a href="#" onClick={_=>this.props.albumThumbUpdate(album._id, photo.thumb, _ => this.props.closeInfoBox())}>Choisir comme image d'album</a></p>           

*/