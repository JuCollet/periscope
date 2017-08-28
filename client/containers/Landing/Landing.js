import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from "./Header/Header";
import Plans from "./Plans/Plans";
import Checkout from "./Checkout/Checkout";

export default class Home extends Component {
    
    componentDidMount(){
        document.getElementsByTagName('html')[0].classList.add('bkg-darkBlueGrey');
    }
    
    componentWillUnmount(){
        document.getElementsByTagName('html')[0].classList.remove('bkg-darkBlueGrey');
    }
    
    render(){
        return(
            <div className="container">
                <Header/>
                <Switch>
                    <Route exact path="/" component={Plans} />
                    <Route path="/checkout/:plan" component={Checkout} />
                </Switch>
            </div>
        );
    }
    
}