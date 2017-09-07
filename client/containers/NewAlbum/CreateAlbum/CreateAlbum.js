import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createAlbum } from '../../../actions/albums';
import { bindActionCreators } from 'redux';
import Tags from "../../../components/Tags/Tags";

class CreateAlbum extends Component {
    
    constructor(props){
        super(props);
        this.state = {tags:["tags"]};
        this.errors = {errors:false};
        this.renderTags = this.renderTags.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentWillReceiveProps(){
        this.renderTags();
    }
    
    renderInput(field){
        
        const { meta : {touched, error, pristine } } = field;
        
        return(
            <div>
                <input placeholder={field.placeholder} {...field.input}></input>
                {touched && error ?  <i className="fa fa-times txt-red"></i> : touched && pristine ? <i className="fa fa-times txt-red"></i> : touched ? <i className="fa fa-check txt-green"></i> : ""}
            </div>
        );
    }    
    
    renderTags(values){
        if(values){
            const tags = values.currentTarget.value.replace(/ /g,'').split(",");
            this.setState({
                tags:tags.length === 1 && tags[0] === "" ? ["tags"] : tags
            });
        }
    }
    
    onSubmit(data){
        const newAlbum = {
            name: data.albumName,
            photographer: data.photographerName,
            description: data.description,
            tags: this.state.tags
        };
        this.props.createAlbum(newAlbum, this.props.history.push);
    }
    
    render(){
        return (
            <div>
                <h3 className="margin-md-bottom">Créer un album</h3>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="input-group">
                        <Field name="albumName" placeholder="Nom de l'album" component={this.renderInput}></Field>
                    </div>
                    <div className="input-group">
                        <Field name="photographerName" placeholder="Nom du photographe" component={this.renderInput}></Field>
                    </div>
                    <div className="input-group">
                        <Field name="description" component={field => {return <textarea rows="3" placeholder="Description" {...field.input}></textarea>;}}></Field>
                    </div>
                    <div className="input-group">
                        <Field name="tags" placeholder="Tags" onChange={this.renderTags} component={this.renderInput}></Field>
                    </div>
                    <div className="margin-md-bottom">
                        <Tags tags={this.state.tags} />
                    </div>                    
                    <button className="small-button small-button-anim" type="submit">Créer</button>
                </form>
            </div>
        );        
    }
}

function validate(values){
    const errors = {};
    if(!values.albumName || values.albumName && values.albumName.length < 3){
        errors.albumName = "Erreur";
    }
    if(!values.photographerName || values.photographerName && values.photographerName.length < 3){
        errors.photographerName = "Erreur";
    }   
    return errors;
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ createAlbum }, dispatch);
}

export default reduxForm({
  validate,
  form: 'uploadForm'
})(connect(null, mapDispatchToProps)(CreateAlbum));