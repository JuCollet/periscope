import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.less";

export default class BulletsNav extends Component {
    
    constructor(props){
        super(props);
        this.renderListItems = this.renderListItems.bind(this);
    }
    
    renderListItems(){

        const location = this.props.location;
        const currentLocation = /\/\w+/.exec(location) ? /\/\w+/.exec(location)[0] : "/";
        
        return this.props.pages.map(link => {
            const cleanLink = /\/\w+/.exec(link) ? /\/\w+/.exec(link)[0] : "/";
            return <Link key={link} to={link}><li className={ cleanLink === currentLocation ? "active" : null }></li></Link>;
        });
        
    }
    
    render(){
        return(
            <ul className="bulletNav">
                {this.renderListItems()}
            </ul>
        );
    }
}