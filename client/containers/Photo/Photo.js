'use strict';

import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { bindActionCreators } from "redux";
import { albumFetch } from "../../actions/albums";
import Loading from "../../components/Loading/Loading";
import PhotoInfo from "./PhotoInfo/PhotoInfo";

class Photos extends Component {
    
    constructor(props){
        super(props);
        this.state = {infoOpen:false};
        this.showInfos = this.showInfos.bind(this);
    }
    
    componentDidMount(){
        const { albumId } = this.props.match.params;
        this.props.albumFetch(albumId);
    }
    
    showInfos(){
        if(this.state.infoOpen){
            document.getElementsByClassName("photoButtonsBox")[0].style.opacity = "1";
            setTimeout(_=>{
                document.getElementsByClassName("photoButtonsBox")[0].style.visibility = "visible";
            }, 400);
            document.getElementsByClassName("PhotoBig")[0].classList.remove("PhotoBigRotation");
            document.getElementsByClassName("photoInfoBox")[0].classList.remove("photoInfoBoxRotation");            
        } else {
            document.getElementsByClassName("photoButtonsBox")[0].style.opacity = "0";
            setTimeout(_=>{
                document.getElementsByClassName("photoButtonsBox")[0].style.visibility = "hidden";
            }, 400);
            document.getElementsByClassName("PhotoBig")[0].classList.add("PhotoBigRotation");
            document.getElementsByClassName("photoInfoBox")[0].classList.add("photoInfoBoxRotation");
        }
        this.setState({infoOpen:!this.state.infoOpen});
    }

    render(){
        
        const { album } = this.props;
        
        if(!album){
            return <Loading />;
        }
        
        const photo = _.find(album.photos, {"_id":this.props.match.params.photoId});
        
        return (
            <div className="wrapper PhotoCenter bkg-veryDarkGrey">
                <PhotoInfo closeInfoBox={this.showInfos}/>
                <img className="PhotoBig" src={photo.medium} />    
                <div className="photoButtonsBox">
                    <a href={photo.original} download><div className="photoButton photoButton-left" >Télécharger</div></a>
                    <div onClick={this.showInfos} className="photoButton photoButton-right">Infos</div>
                </div>
            </div>
        );    
    }

}

function mapDispatchToProps(dispatch){
    return bindActionCreators({albumFetch}, dispatch);
}

function mapStateToProps(state, ownProps){
    return {
        album : state.albums[ownProps.match.params.albumId]
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos);