'use strict';

import React, { Component } from "react";
import { connect } from "react-redux";
import Hammer from "react-hammerjs";
import _ from "lodash";
import { bindActionCreators } from "redux";
import { albumFetch } from "../../actions/albums";
import { photoDelete } from "../../actions/photos";
import Loading from "../../components/Loading/Loading";
import PhotoInfo from "./PhotoInfo/PhotoInfo";

class Photos extends Component {
    
    constructor(props){
        super(props);
        this.state = {infoOpen:false};
        this.showInfos = this.showInfos.bind(this);
        this.browsePhoto = this.browsePhoto.bind(this);
        this.getPhotoIndex = this.getPhotoIndex.bind(this);
        this.afterPhotoIsDeleted = this.afterPhotoIsDeleted.bind(this);
    }
    
    componentDidMount(){
        const { albumId } = this.props.match.params;
        this.props.albumFetch(albumId);
    }
    
    showInfos(){
        if(this.state.infoOpen){
            document.getElementsByClassName("photoButtonsBox")[0].style.visibility = "visible";
            document.getElementsByClassName("PhotoBig")[0].classList.remove("PhotoHide");
            document.getElementsByClassName("photoInfoBox")[0].classList.remove("photoInfoShow");            
        } else {
            document.getElementsByClassName("photoButtonsBox")[0].style.visibility = "hidden";
            document.getElementsByClassName("PhotoBig")[0].classList.add("PhotoHide");
            document.getElementsByClassName("photoInfoBox")[0].classList.add("photoInfoShow");
        }
        this.setState({infoOpen:!this.state.infoOpen});
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
    
    afterPhotoIsDeleted(){
        this.props.history.go(-1);
    }

    render(){
        
        const { album } = this.props;
        
        if(!album){
            return <Loading />;
        }
        
        const photo = _.find(album.photos, {"_id":this.props.match.params.photoId});
        
        return (
            <div className="wrapper wrapper-padding no-overflow flex-center bkg-veryDarkGrey">
                <Hammer onSwipe={this.browsePhoto}>
                    <div id="img-container">
                        <i className="fa fa-times photos-close-button" onClick={_=>this.props.history.push(`/app/photos/${this.props.album._id}`)}></i>
                        <img className="PhotoBig" src={photo.medium} />
                    </div>
                </Hammer>
                <PhotoInfo photoDelete={this.props.photoDelete} callback={this.afterPhotoIsDeleted} album={this.props.album} photo={photo} closeInfoBox={this.showInfos}/>
                <div className="photoButtonsBox">
                    <a href={photo.original} download><i className="fa fa-download"></i></a>
                    <i className="fa fa-heart"></i>
                    <i className="fa fa-share-alt"></i>
                    <i className="fa fa-info-circle" onClick={this.showInfos}></i>
                    <i className="fa fa-chevron-left" onClick={_=>this.browsePhoto({direction:4})}></i>
                    <span>{this.getPhotoIndex()+1} / {album.photos.length}</span>
                    <i className="fa fa-chevron-right" onClick={_=>this.browsePhoto({direction:2})}></i>
                </div>                    
            </div>
        );
    }

}

function mapDispatchToProps(dispatch){
    return bindActionCreators({albumFetch, photoDelete}, dispatch);
}

function mapStateToProps(state, ownProps){
    return {
        album : state.albums[ownProps.match.params.albumId]
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos);