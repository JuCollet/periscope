import React, { Component } from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './LandingAnim.less';

export default function(ComposedComponent){
    
    class LandingAnim extends Component {
        render(){
            return(
                <ReactCSSTransitionGroup 
                transitionAppear={true}
                transitionAppearTimeout={500}                
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
                transitionName="SlideIn"
                >
                    <ComposedComponent {...this.props}/>
                </ReactCSSTransitionGroup>
            );
        }
    }
    
    return LandingAnim;
    
};