"use strict";

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { photoUpdate } from "../../../actions/photos";
import { albumThumbUpdate } from "../../../actions/albums";
import Tags from "../../../components/Tags/Tags";


class PhotoInfo extends Component {
    
    constructor(props){
        super(props);
        this.state = {tagEdit:false, tags:[]};
        this.toggleTagsEdit = this.toggleTagsEdit.bind(this);
        this.onTagsSubmit = this.onTagsSubmit.bind(this);
        this.onTagsChange = this.onTagsChange.bind(this);
    }
    
    componentDidMount(){
        const { tags } = this.props.photo;
        
        if(tags !== null)this.setState({tags:this.props.photo.tags.toString()});
    }
    
    toggleTagsEdit(){
        this.setState({tagEdit:!this.state.tagEdit,tags:this.props.photo.tags.toString()});
    }
    
    onTagsChange(e){
        this.setState({
            tags:e.currentTarget.value
        });
    }
    
    tagsEditRender(){
        
        return(
            <div className="input-group">
                <form onSubmit={this.onTagsSubmit}>
                    <input name="tags" type="text" placeholder="Tags" value={this.state.tags} onChange={this.onTagsChange}/>
                </form>
            </div>        
        );
    }
    
    onTagsSubmit(e){
        e.preventDefault();
        const data = e.currentTarget.tags.value.replace(/ /g,'').split(",");
        this.props.photoUpdate(this.props.photo._id, data, this.setState({tagEdit:!this.state.tagEdit}));
    }

    render(){
    
        const { photo, album } = this.props;

        
        return (
            <div className="bkg-white photoInfoBox">
                <h2>Infos</h2>
                <p><b>Nom de l'album : </b>{album.name}</p>
                <p><b>Description : </b>{album.description}</p>
                <p><b>Crédit photographique : </b>&copy; {album.photographer}</p>
                <p><b>Dimensions : </b>{photo.width ? photo.width : "largeur inconnue"} x {photo.height ? photo.height : "hauteur inconnue"}</p>
                <Tags tags={photo.tags} />
                <hr/>
                <p><a href="#">Partager</a></p>
                <p><a href="#" onClick={_=>this.props.photoDelete(album._id, photo._id, photo.filename, this.props.callback)}>Supprimer cette image</a></p>
                <p><a href={photo.original} download>Télécharger cette image</a></p>
                {this.state.tagEdit ? this.tagsEditRender() : <p><a href="#" onClick={this.toggleTagsEdit}>Editer les tags</a></p> }
                <p><a href="#" onClick={_=>this.props.albumThumbUpdate(album._id, photo.thumb, _ => this.props.closeInfoBox())}>Choisir comme image d'album</a></p>
                <br/>
                <i className="fa fa-chevron-down" onClick={_ => this.props.closeInfoBox()}></i>
            </div>
        );        
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ photoUpdate, albumThumbUpdate }, dispatch);
}

export default connect(null, mapDispatchToProps)(PhotoInfo);