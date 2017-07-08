import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class Upload extends Component {
    render(){
        return(
            <div className="wrapper">
                <div id="uploadBox">
                    <div id="uploadBox-image">
                    </div>
                    <div id="uploadBox-body">
                        <h3>Nouvel album</h3>
                        <form>
                            <div className="input-group">
                                <input placeholder="Nom de l'album"></input><i className="fa fa-check"></i>
                            </div>
                            <br/>
                            <div className="input-group">
                                <input placeholder="Photographe"></input><i className="fa fa-check"></i>
                            </div>
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