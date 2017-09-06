import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DropBox from "../Dropbox/Dropbox";

class Upload extends Component{
    
    componentWillMount(){
        if(!this.props.match.params.albumId || this.props.match.params.albumId === "undefined"){
            this.props.history.push('/app/albums');
        }
    }
    
    render(){
        
        const { albumId } = this.props.match.params;
        
        return(
            <div className="container wrapper-padding flex-center bkg-lightGrey">
                <div className="content-box content-box-medium">
                    <DropBox id={albumId} height={350}/>
                </div>
            </div>
        );
    }
}

function mapDispatchToprops(dispatch){
    return bindActionCreators({}, dispatch);
}

function mapStateTopProps(state){
    return {
        
    }
}

export default connect()(Upload);