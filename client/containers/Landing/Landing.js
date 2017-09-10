/*global localStorage*/

import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import BulletsNav from "../../components/BulletsNav/BulletsNav";
import Welcome from "./Welcome/Welcome";
import Signup from './Signup/Signup';
import Signin from "./Signin/Signin";

// Custom HOC to tilt parent component on error : 
// add tilt() method to props and accept the parameters :
// (DOM element, amplitude (Int - default 20), duration (Int - default 50), iterations (Int - default 7)
import TiltComponent from "../../components/Animations/tilt_component";

class Landing extends Component {
    
    componentWillMount(){
        // Test if pathname contains '/signup/' + a 21-digits bucket name,
        // and doesn't redirect if true, because it's a request to join an existing profile.
        if(localStorage.getItem('customer') && !/(signup\/)\w{21}/.test(this.props.location.pathname)){
            this.props.history.push('/signin');
        }
    }
    
    render () {
        const { pathname } = this.props.location;
        return (
            <div className="container flex-center bkg-pattern">
                <div className="landing flex-center bkg-white" ref={(LandingBox) => { this.LandingBox = LandingBox; }}>
                    <Switch>
                        <Route path="/signin" render={(props) => (<Signin tilt={_ => this.props.tilt(this.LandingBox)}/>)} />
                        <Route path="/signup/:friendId" render={(props) => (<Signup tilt={_ => this.props.tilt(this.LandingBox)}/>)} />
                        <Route path ="/" component={Welcome} />
                    </Switch>
                    <div className="landing-footer">
                        <BulletsNav pages={["/","/signup/0","/signin"]} location={pathname} history={this.props.history}/>
                    </div>
                </div>
                {pathname === "/signin" ? <Link to="/signin" className="txt-darkGrey margin-md-top txt-isLight">Mot de passe oublié ?</Link> : <Link to="/signin" className="txt-darkGrey margin-md-top txt-isLight">Déjà inscrit ?</Link>}
            </div>
        );
    }
}

export default TiltComponent(Landing);