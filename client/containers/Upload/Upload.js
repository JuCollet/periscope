import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class Upload extends Component {
    
    
    renderInput(field){
        return(
            <div>
                <input placeholder={field.placeholder}></input>
                <i className="fa fa-check"></i>
            </div>
        );
    }
    
    render(){
        return(
            <div className="wrapper">
                <div className="contentBox">
                    <div className="contentBox-image bkg-darkBlueGrey">
                    </div>
                    <div className="contentBox-body">
                        <h2>Nouvel album</h2>
                        <form>
                            <div className="input-group">
                                <Field name="albumName" placeholder="Nom de l'album" component={this.renderInput}></Field>
                            </div>
                            <br/>
                            <div className="input-group">
                                <input placeholder="Photographe"></input><i className="fa fa-check"></i>
                            </div>
                            <br/>
                            <div className="input-group">
                                <textarea rows="3" placeholder="Description"></textarea>
                            </div>
                            <br/>
                            <div className="input-group">
                                <input placeholder="Tags"></input><i className="fa fa-check"></i>
                            </div>
                            <br/>
                            <div className="tagsDisplay">
                                <span>Hello</span>
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
    
};

export default reduxForm({
  validate,
  form: 'uploadForm'
})(Upload);