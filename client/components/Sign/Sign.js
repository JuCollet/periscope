import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

export default class Sign extends Component {
    
    render () {
        return (
            <div id="sign-wrapper">
                <form id="sign">
                    <img src="img/logo.svg" width="150" alt="Logo Periscope"/>
                    <h1 className="margin-md-bottom margin-sm-top darkBlueGrey">Periscope</h1>
                    <input className="margin-md-bottom" name="username" type="text" placeholder="Login" aria-label="username"></input>
                    <input className="margin-lg-bottom" name="password" type="password" placeholder="Password" aria-label="password"></input>
                    <button className="button-anim" type="submit">Sign in</button>
                </form>
                <p className="mediumGrey">I forgot my password</p>
                <NavLink to='/gallery/albums'>HTML</NavLink>
            </div>
        );
    }
}