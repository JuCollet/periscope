import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class Upload extends Component {
    
    constructor(props){
        super(props);
        this.state = {tags:["tags"]};
        this.renderTags = this.renderTags.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    renderInput(field){
        return(
            <div>
                <input placeholder={field.placeholder} {...field.input}></input>
                <i className="fa fa-check"></i>
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
        console.log(data);
        console.log(this.state.tags)
    }
    
    render(){
        return(
            <div className="wrapper">
                <div className="contentBox">
                    <div className="contentBox-image bkg-darkBlueGrey">
                    </div>
                    <div className="contentBox-body">
                        <h2>Nouvel album</h2>
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
                            <div className="tagsDisplay">
                            {this.renderTags()}
                                {this.state.tags.map((tag, index) => {
                                    return (
                                        <span key={index}>#{tag}</span>
                                    );
                                })}
                            </div>
                            <br/>
                            <button className="small-button small-button-anim" type="submit">Envoyer</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function validate(values){
    const errors = {}
    return errors;
};

export default reduxForm({
  validate,
  form: 'uploadForm'
})(Upload);