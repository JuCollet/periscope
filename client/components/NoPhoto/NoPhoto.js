import React, { Component } from "react";
import './noPhoto.png';

export default class NoPhoto extends Component {
    render(){
        return(
            <div className="wrapper-padding wrapper-fullHeight flex-center bkg-lightGrey">
                <div className="content-box flex-center desktop-only text-center">
                    <img src="../../img/noPhoto.png" width="128px" />
                    <h2 className="txt-darkBlueGrey">Aucune photo<br/>trouvée</h2>
                    <p className="txt-darkBlueGrey">Peut-être voudriez-vous créer <br/>un nouvel album ?</p>
                    <button className="button button-medium button-white button-animation margin-sm-top" onClick={_=>this.props.history.push('/app/CreateAlbum')}>Créer un album</button>
                </div>
                <img className="mobile-only" src="../../img/noPhoto.png" width="128px" />
            </div>
        );   
    }

}