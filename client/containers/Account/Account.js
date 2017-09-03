import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getInfos } from "../../actions/user";

import Loading from "../../components/Loading/Loading";
import VolumeGauge from "../../components/VolumeGauge/VolumeGauge";

class Account extends Component {
    
    componentWillMount(){
        this.props.getInfos();
    }    
    
    render(){
        
        if(!this.props.userInfos){
            return <Loading />;
        }
        
        const { volume, usedVolume } = this.props.userInfos;
        const usedVolumePercentage = Math.round((usedVolume/volume)*100);

        const infos = this.props.userInfos;        

        return (
            <div className="wrapper-padding flex-center">
                <h2 className="txt-darkBlueGrey margin-lg-bottom">Bienvenue, {this.props.userInfos.name}</h2>
                <h3>Utilisation</h3>
                <p>Tu as déjà utilisé {usedVolumePercentage} % de ton volume de {volume/1073741824} Go.</p>
                <VolumeGauge volume={infos.volume} usedVolume={infos.usedVolume}/>
                <h3 className="margin-lg-top margin-md-bottom">Infos personnelles</h3>
                <span className="margin-sm-bottom">Ton adresse e-mail est : {this.props.userInfos.email}</span>
                <span className="margin-md-bottom">L'ID de ton espace est : {this.props.userInfos.bucket}</span>
            </div>
        );
    }
}

function mapDispatchToprops(dispatch){
    return bindActionCreators({ getInfos }, dispatch);
}

function mapStateTopProps(state){
    return {
        userInfos : state.user.infos
    };
}

export default connect(mapStateTopProps, mapDispatchToprops)(Account);