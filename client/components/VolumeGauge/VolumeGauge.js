import React, { Component } from "react";
import "./styles.less";

export default class VolumeGauge extends Component {
    
    constructor(props){
        super(props);
        this.state = { style : null};
    }
    
    componentDidMount(){

        const { volume, usedVolume } = this.props;
        const usedVolumePercentage = Math.round((usedVolume/volume)*100);
        
        // Fake delay to animate the Gauge and simulate calculating;
        setTimeout(_=>{
            this.setState({
                style : {
                    width : usedVolumePercentage + "%",
                    backgroundColor : usedVolumePercentage < 90 ? usedVolumePercentage < 70 ? "#4EE898" : "#F5A623" : "#FF3F00"
                }
            });
        }, 500);
    }
    
    render(){
        return (
            <div className="volumeGaugeContainer">
                <div className="volumeGaugeLevel" style={this.state.style}>
                </div>
            </div>
        );  
    }
    

}