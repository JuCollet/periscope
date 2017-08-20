import React, { Component } from "react";
import Planbox from "./Planbox/Planbox";
import PlansData from "./PlansData";

export default class Plans extends Component {

    renderPlanBoxes(){
        return PlansData.map(function(plan, index){
            return <Planbox key={index} plan={index} img={plan.img} name={plan.name} storage={plan.storage} usersText={plan.usersText} users={plan.users} color={plan.color} price={plan.price} />;
        });
    }
    
    render(){
        return(
            <div className="wrapper wrapper-planboxes">
                <div className="planboxes-presentation">
                    <p>Demo</p>
                </div>                
                {this.renderPlanBoxes()}              
            </div>
        );
    }
}