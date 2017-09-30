import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createAlbum } from '../../../actions/albums';
import { bindActionCreators } from 'redux';
import Tags from "../../../components/Tags/Tags";

class CreateAlbum extends Component {
    
    constructor(props){
        super(props);
        this.state = {tags:[""]};
        this.errors = {errors:false};
        this.renderTags = this.renderTags.bind(this);
        this.autoTags = this.autoTags.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentWillReceiveProps(){
        this.renderTags();
    }
    
    renderInput(field){
        const { meta : {touched, error } } = field;
        return(
            <div>
                {field.type === "text" ? <input placeholder={field.placeholder} {...field.input}></input> : <textarea placeholder={field.placeholder} rows={field.rows} {...field.input}></textarea>}
                {touched && error ?  <div><i className="fa fa-times txt-red"></i><p className="txt-red margin-sm-top">{error}</p></div> : ""}
            </div>
        );
    }    
    
    renderTags(values){
        if(values){
            const tags = this.props.tagsStringToArray(values.currentTarget.value, 0);
            this.setState({
                tags: tags ? tags : [""]
            });
        }
    }
    
    autoTags(e){
        e.preventDefault();
        let autoTags = [];

        if(this.props.values && this.props.values.values){
            const { values : { albumName, description }} = this.props.values;
            const tagsStringArray = [albumName, description];
            
            tagsStringArray.forEach(str=>{
                if(str) autoTags = autoTags.concat(this.props.tagsStringToArray(str, 4, autoTags));
            });
            
            this.setState({tags : autoTags});
            this.props.change("tags", autoTags.join(","));
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
                        <Field name="albumName" placeholder="Nom de l'album" type="text" component={this.renderInput}></Field>
                    </div>
                    <div className="input-group">
                        <Field name="photographerName" placeholder="Nom du photographe" type="text" component={this.renderInput}></Field>
                    </div>
                    <div className="input-group">
                        <Field name="description" placeholder="Description de l'album" type="textarea" rows="3"component={this.renderInput}></Field>
                    </div>
                    <div className="input-group">
                        <Field name="tags" placeholder="Tags" onChange={this.renderTags} type="text" component={this.renderInput}></Field>
                    </div>
                    <div className="margin-md-bottom">
                        {this.props.renderTagsElement(this.state.tags)}
                    </div>
                    <div className="margin-md-bottom">
                        <a href="" onClick={this.autoTags}><i className="fa fa-magic"></i>&nbsp;&nbsp;tags automatiques</a>
                    </div>
                    <button className="button button-medium button-white button-animation" type="submit">Créer</button>
                </form>
            </div>
        );        
    }
}

function validate(values){
    const errors = {};
    if(!values.albumName || values.albumName && values.albumName.length < 3){
        errors.albumName = "Cet album n'a pas de nom";
    }
    if(!values.description || values.description && values.description.length < 3){
        errors.description = "Cet album n'a pas de description";
    }   
    return errors;
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ createAlbum }, dispatch);
}

function mapStateToProps(state){
    return {
        values : state.form.uploadForm
    };
}

export default reduxForm({
  validate,
  form: 'uploadForm'
})(connect(mapStateToProps, mapDispatchToProps)(Tags(CreateAlbum)));