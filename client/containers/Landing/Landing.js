import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import BulletsNav from "../../components/BulletsNav/BulletsNav";
import Welcome from "./Welcome/Welcome";
import Signup from './Signup/Signup';
import Signin from "./Signin/Signin";

import TiltComponent from "../../components/tilt_component";

class Landing extends Component {
    
    render () {
        
        const { pathname } = this.props.location;
    
        return (
            <div className="wrapper flex-center bkg-pattern">
                <div className="landing flex-center bkg-white" ref={(LandingBox) => { this.LandingBox = LandingBox; }}>
                    <Switch>
                        <Route path="/signin" render={(props) => (<Signin tilt={_ => this.props.tilt(this.LandingBox)}/>)} />
                        <Route path="/signup" render={(props) => (<Signup tilt={_ => this.props.tilt(this.LandingBox)}/>)} />
                        <Route path ="/" component={Welcome} />
                    </Switch>
                    <div className="landing-footer">
                        <BulletsNav pages={["/","/signup","/signin"]} location={pathname} history={this.props.history}/>
                    </div>
                </div>
                {pathname === "/signin" ? <Link to="/signin" className="txt-mediumGrey margin-md-top">Mot de passe oublié ?</Link> : <Link to="/signin" className="txt-mediumGrey margin-md-top">Déjà inscrit ?</Link>}
            </div>
        );
    }
}

export default TiltComponent(Landing);