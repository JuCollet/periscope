import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import './styles.less';

import { stopNotification } from "../../actions/notification";

class Notification extends Component{
    
    renderNotification(){
        const { type, message, newNotification} = this.props.notification;
        if(this.props.notification && newNotification) {
            setTimeout( _ => {this.props.stopNotification();}, 2500);
            return (
                <div className={`notification ${type === "error" ? "bkg-red" : "bkg-green"}`}>
                    <div className="notification-bubble bkg-white"><i className={`fa ${type === "error" ? "fa-times txt-red" : "fa-check txt-green"}`}></i></div>
                    <div className="notification-message txt-white">{message}</div>
                </div>
            );    
        } else {
            return null;
        }
    }
    
    render(){
        return this.renderNotification();
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ stopNotification }, dispatch);
}

function mapStateToProps(state){
    return {
        notification : state.notification
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);