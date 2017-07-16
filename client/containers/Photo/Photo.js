'use strict';

import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { bindActionCreators } from "redux";
import { albumFetch } from "../../actions/albums";
import Loading from "../../components/Loading/Loading";

class Photos extends Component {
    
    componentDidMount(){
        const { albumId } = this.props.match.params;
        this.props.albumFetch(albumId);
    }    

    render(){
        
        const { album } = this.props;
        
        if(!album){
            return <Loading />;
        }
        
        return (
            <div className="wrapper PhotoCenter bkg-veryDarkGrey">
                <img className="PhotoBig" src={_.find(album.photos, {"_id":this.props.match.params.photoId}).medium} />    
            </div>
        );    
    }

}

function mapDispatchToProps(dispatch){
    return bindActionCreators({albumFetch}, dispatch)
}

function mapStateToProps(state, ownProps){
    return {
        album : state.albums[ownProps.match.params.albumId]
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos);