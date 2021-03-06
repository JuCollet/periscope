'use strict';

import React, { Component } from "react";
import { connect } from "react-redux";
import Hammer from "react-hammerjs";
import _ from "lodash";
import { bindActionCreators } from "redux";
import SmoothScroll from "../../components/Animations/SmoothScroll";
import { albumFetch } from "../../actions/albums";
import Loading from "../../components/Loading/Loading";
import PhotoInfo from "./PhotoInfo/PhotoInfo";

class Photos extends Component {
    
    constructor(props){
        super(props);
        this.showInfos = this.showInfos.bind(this);
        this.closeInfos = this.closeInfos.bind(this);
        this.browsePhoto = this.browsePhoto.bind(this);
        this.getPhotoIndex = this.getPhotoIndex.bind(this);
    }
    
    componentDidMount(){
        const { albumId } = this.props.match.params;
        window.scrollTo(0, 0);
        this.props.albumFetch(albumId);
    }
    
    showInfos(){
        this.props.smoothScrollTo(this.photoInfo);
    }
    
    closeInfos(){
        this.props.smoothScrollTo(this.photoBox, 10);
    }
    
    getPhotoIndex(){
        return _.findIndex(this.props.album.photos, {_id : this.props.match.params.photoId});
    }

    browsePhoto(e){
        
        const photoIndex = this.getPhotoIndex();
        let nextIndex = 0;

        if(e.direction === 2 && photoIndex < this.props.album.photos.length-1){
            nextIndex = photoIndex + 1;
        } else if(e.direction === 2 && photoIndex === this.props.album.photos.length-1){
            nextIndex = 0;
        }else if(e.direction === 4 && photoIndex > 0){
            nextIndex = photoIndex -1;
        } else if(e.direction === 4 && photoIndex === 0){
            nextIndex = this.props.album.photos.length-1;
        }        
        this.props.history.push(`/app/photo/${this.props.album._id}/${this.props.album.photos[nextIndex]._id}`);
    }

    render(){

        const { album } = this.props;
        
        if(!album){
            return <Loading />;
        }
        
        const photo = _.find(album.photos, {"_id":this.props.match.params.photoId});
        
        return (
            <div className="container">
                <div ref={node=> {this.photoBox = node}} className="wrapper-padding wrapper-fullHeight flex-center bkg-veryDarkGrey">
                    <Hammer onSwipe={this.browsePhoto}>
                        <div id="img-container">
                            <i className="fa fa-times photos-close-button" onClick={_=>this.props.history.push(`/app/photos/${this.props.album._id}`)}></i>
                            <img className="PhotoBig" src={photo.medium} />
                        </div>
                    </Hammer>
                    <div className="photoButtonsBox">
                        <a href={photo.original} download><i className="fa fa-download"></i></a>
                        <i className="fa fa-info-circle" onClick={this.showInfos}></i>
                        <i className="fa fa-chevron-left" onClick={_=>this.browsePhoto({direction:4})}></i>
                        <span>{this.getPhotoIndex()+1} / {album.photos.length}</span>
                        <i className="fa fa-chevron-right" onClick={_=>this.browsePhoto({direction:2})}></i>
                    </div>                    
                </div>
                <PhotoInfo photoInfoDomElement={el => this.photoInfo = el} history={this.props.history} album={this.props.album} photo={photo} closeInfoBox={this.closeInfos} location={this.props.location} match={this.props.match} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SmoothScroll(Photos));