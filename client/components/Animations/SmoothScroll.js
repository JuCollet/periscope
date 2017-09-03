import React, { Component } from "react";

export default function(ComposedComponent){

    class SmoothScroll extends Component {
        
        smoothScrollTo(el, speed = 15){
        
            const destination = el.offsetTop;
            const downward = destination > window.pageYOffset;
        
            let step = 10;
            
            const smooth = setInterval(_=>{
                window.scrollTo(0, window.scrollY + step);
                downward ? step += 10 : step -= 10;
                if(downward && window.pageYOffset >= destination){
                    clearInterval(smooth);
                } else if(!downward && window.pageYOffset <= destination){
                    clearInterval(smooth);
                }
            }, speed);
        }
        
        render(){
            return <ComposedComponent smoothScrollTo={this.smoothScrollTo} {...this.props}/>;
        }
    }
    
    return SmoothScroll;
    
}