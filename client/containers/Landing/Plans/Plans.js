import React, { Component} from 'react';
import SliderSelect from "../../../components/SliderSelect/SliderSelect";
import plansOffer from "../plansOffer"; 
import "./Styles.less";

export default class Plans extends Component {
    
    constructor(props){
        super(props);
        this.state = {SelectedPlan : 0},
        this.SliderCallback = this.SliderCallback.bind(this);
    }
    
    SliderCallback(SelectedPlan){
        this.setState({
            SelectedPlan 
        });
    }
    
    render(){
        
        const { SelectedPlan } = this.state;
        
        return(
            <div className="plans">
                <span className="planVolume margin-lg-bottom txt-darkBlueGrey">{plansOffer[SelectedPlan].volume}</span>
                <SliderSelect callback={this.SliderCallback} valuesArray={plansOffer}/>
                <h2 className="txt-darkBlueGrey margin-md-top margin-md-bottom">{plansOffer[SelectedPlan].name}</h2>
                <hr/>
                <p className="txt-darkBlueGrey">Jusqu'à {plansOffer[SelectedPlan].photos}</p>
                <p className="txt-darkBlueGrey">{plansOffer[SelectedPlan].users}</p>
                <button className="small-button small-button-anim margin-sm-top" onClick={_=>this.props.history.push(`/checkout/${this.state.SelectedPlan}`)}>{plansOffer[SelectedPlan].price}</button>
            </div>
        );
    }
}