import React, { Component } from "react";
import Tags from "../../../components/Tags/Tags";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { updateAlbum } from "../../../actions/albums";

import "./styles.less";

class EditAlbum extends Component {
    
    constructor(props){
        
        const { album } = props;
        
        super(props);
        this.state = {
            name : album.name || "",
            photographer : album.photographer || "",
            description : album.description || "",
            tags : album.tags ? album.tags.join(',') : ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(e){
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    
    handleSubmit(e){
        e.preventDefault();
        const { name, photographer, description, tags } = this.state;
        this.props.updateAlbum(this.props.album._id, {name, photographer, description, tags : tags ? this.props.tagsStringToArray(tags) : [""]});
        this.props.toggleEditForm();
    }
    
    render(){
        return(
            <form onSubmit={this.handleSubmit} className="margin-md-top margin-md-bottom albumEditForm">
                <h3 className="margin-lg-bottom">Editer cet album</h3>
                <div className="input-group margin-sm-bottom">
                    <input name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Nom de l'album" className="margin-md-bottom"/>
                    <input name="photographer" value={this.state.photographer} onChange={this.handleInputChange} placeholder="Nom du photographe" className="margin-md-bottom"/>
                    <textarea name="description" value={this.state.description} onChange={this.handleInputChange} placeholder="Description" className="margin-md-bottom"/>
                    <input name="tags" value={this.state.tags} onChange={this.handleInputChange} placeholder="Tags" className="margin-md-bottom"/>
                    {this.props.renderTagsElement(this.props.tagsStringToArray(this.state.tags))}
                    <button onClick={this.handleSubmit} className="button button-medium button-white button-animation margin-sm-top" type="submit">Enregistrer</button>
                </div>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ updateAlbum }, dispatch);
}

export default connect(null, mapDispatchToProps)(Tags(EditAlbum));