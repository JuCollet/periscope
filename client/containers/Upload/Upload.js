import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DropBox from "../DropBox/DropBox";

class Upload extends Component{
    render(){
        return(
            <div className="container wrapper-padding flex-center bkg-lightGrey">
                <div className="content-box">
                    <DropBox />
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