import React, { Component } from 'react';

export default class Account extends Component {
    render(){
        return (
            <div className="wrapper flex-center">
                <div className="contentBox">
                    <div className="contentBox-image bkg-darkBlueGrey">
                    </div>
                    <div className="contentBox-body">
                        <h2>Votre compte</h2>
                        <p>Nom : Julien</p>
                    </div>
                </div>
            </div>
        )
    }
}