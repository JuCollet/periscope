import React, { Component } from "react";
import './styles.less';
import './noPhoto.png';

export default class NoPhoto extends Component {
    render(){
        return(
            <div className="container wrapper-padding flex-center bkg-lightGrey">
                <div className="NoPhotoBox flex-center desktop-only">
                    <img src="../../img/noPhoto.png" width="128px" />
                    <h2>Aucune photo<br/>trouvée</h2>
                    <p>Peut-être voudriez-vous créer <br/>un nouvel album ?</p>
                    <button className="small-button small-button-anim margin-sm-top" onClick={_=>this.props.history.push('/app/upload')}>Créer un album</button>
                </div>
                <img className="mobile-only" src="../../img/noPhoto.png" width="128px" />
            </div>
        );   
    }

}