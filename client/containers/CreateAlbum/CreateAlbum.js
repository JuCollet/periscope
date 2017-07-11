import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createAlbum } from '../../actions/albums';
import { bindActionCreators } from 'redux'; 

class Upload extends Component {
    
    constructor(props){
        super(props);
        this.state = {tags:["tags"]};
        this.errors = {errors:false};
        this.renderTags = this.renderTags.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        this.props.createAlbum(newAlbum, _ => {
            this.props.history.push('/app/albums');
        });
    }
    
    render(){
        return(
            <div className="wrapper-flex-center">
                <div className="contentBox">
                    <div className="contentBox-image bkg-darkBlueGrey">
                    </div>
                    <div className="contentBox-body">
                        <h2>Créer un album</h2>
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                            <div className="input-group">
                                <Field name="albumName" placeholder="Nom de l'album" component={this.renderInput}></Field>
                            </div>
                            <br/>
                            <div className="input-group">
                                <Field name="photographerName" placeholder="Nom du photographe" component={this.renderInput}></Field>
                            </div>
                            <br/>
                            <div className="input-group">
                                <Field name="description" component={field => {return <textarea rows="3" placeholder="Description" {...field.input}></textarea>;}}></Field>
                            </div>
                            <br/>
                            <div className="input-group">
                                <Field name="tags" placeholder="Tags" onChange={this.renderTags} component={this.renderInput}></Field>
                            </div>
                            <br/>
                            <div className="UploadTagsDisplay">
                            {this.renderTags()}
                                {this.state.tags.map((tag, index) => {
                                    return (
                                        <span className="tag" key={index}>#{tag}</span>
                                    );
                                })}
                            </div>
                            <br/>
                            <button disabled={!this.props.valid} className="small-button small-button-anim" type="submit">Envoyer</button>
                        </form>
                    </div>
                </div>
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
})(connect(null, mapDispatchToProps)(Upload));