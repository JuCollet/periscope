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
            <div className="container wrapper-padding flex-center bkg-lightGrey">
                <div className="content-box content-box-medium txt-darkBlueGrey content-box-banner-left">
                    <div className="content-box-banner-left-img bkg-vintagePhoto"></div>
                    <h2 className="margin-md-bottom">Bonjour {this.props.userInfos.name} !</h2>
                    <h3>Utilisation</h3>
                    <p>Tu as déjà utilisé <b>{usedVolumePercentage}%</b> de ton volume de <b>{volume/1073741824}Go</b>.</p>
                    <VolumeGauge volume={infos.volume} usedVolume={infos.usedVolume}/>
                    <h3 className="margin-md-top margin-md-bottom">Infos personnelles</h3>
                    <p className="margin-sm-bottom">Ton adresse e-mail est : <b>{this.props.userInfos.email}</b></p>
                    <p className="margin-md-bottom">L'ID de ton espace est : <b>{this.props.userInfos.bucket}</b></p>
                    <i className="fa fa-edit button-icon"></i>
                </div>
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