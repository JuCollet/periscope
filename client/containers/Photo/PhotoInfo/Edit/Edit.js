import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Tags from "../../../../components/Tags/Tags";

import { photoUpdate } from "../../../../actions/photos";

class Edit extends Component {
    
    constructor(props){
        super(props);
        
        const { photo, album } = props; 

        this.state = {
            photographer : photo.photographer ? photo.photographer : album.photographer,
            description : photo.description ? photo.description : album.description,
            tags : photo.tags,
            tagsArray : this.props.tagsStringToArray(photo.tags.join(','), 1)
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleInputChange(e){
        this.setState({
            [e.target.name] : e.target.value
        });
        if(e.target.name === "tags" && this.state.tags && this.state.tags.length > 1){
            this.setState({
                tagsArray : this.props.tagsStringToArray(e.target.value, 1)
            });
        }       
    }
    
    handleSubmit(e){
        e.preventDefault();
        this.props.photoUpdate(this.props.photo._id, {
            photographer : this.state.photographer,
            description : this.state.description,
            tags : this.state.tagsArray
        }, _ => {this.props.history.push(`/app/photos/${this.props.album._id}`)});
    }
    
    render(){

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3 className="margin-md-bottom">Editer les infos</h3>
                    <h4 className="margin-md-top margin-sm-bottom">Photographe</h4>
                    <input name="photographer" onChange={this.handleInputChange} value={this.state.photographer} className="small-input"></input>
                    <h4 className="margin-md-top margin-sm-bottom">Description</h4>
                    <textarea name="description" onChange={this.handleInputChange} rows="3" value={this.state.description} className="small-input"></textarea>
                    <h4 className="margin-md-top margin-sm-bottom">Tags</h4>
                    <input name="tags" onChange={this.handleInputChange} value={this.state.tags} className="small-input margin-md-bottom"></input>
                    {this.props.renderTagsElement(this.state.tagsArray)}
                    <button type="submit" className="button button-small button-white button-hover-green margin-sm-top">Valider</button>
                </form>
            </div>
        );
    
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({photoUpdate}, dispatch);
}

export default connect(null, mapDispatchToProps)(Tags(Edit));