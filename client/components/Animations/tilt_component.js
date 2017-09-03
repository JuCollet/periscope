import React, { Component } from "react";

export default function(ComposedComponent){

    class TiltComponent extends Component {
        
        tilt(el, size = 20, time = 50, iteration = 7){
            let counter = 0;
            let left = true;

            const tiltBox = function(){
                setTimeout(function(){
                    if(left){
                        el.style.right = "0px";
                        el.style.left = `${size}px`;   
                    } else {
                        el.style.right = `${size}px`;
                        el.style.left = "0px";     
                    }
                    left = !left;
                    counter++;
                    if(counter === iteration){
                        el.style.right = "0px";
                        el.style.left = "0px";
                    } else {
                        tiltBox();
                    }
                }, time);            
            };
            tiltBox();
        }
        
        render(){
            return <ComposedComponent tilt={this.tilt} {...this.props}/>;
        }
    }
    
    return TiltComponent;
    
}