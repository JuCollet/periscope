import React, { Component } from "react";

export default class Welcome extends Component {
    render(){
        return(
            <div>
                <img src="/img/logo.svg" width="150" alt="Logo Periscope"/>
                <h1 className="margin-sm-bottom margin-md-top txt-darkBlueGrey">Periscope</h1>
                <h3 className="margin-lg-bottom txt-darkGrey">Sauvegardez et retrouvez toutes vos photos, gratuitement !</h3>
                <button className="small-button small-button-anim" type="submit" onClick={()=>this.props.history.push('/signup')}>S'inscrire</button>
            </div>
        );
    }
}