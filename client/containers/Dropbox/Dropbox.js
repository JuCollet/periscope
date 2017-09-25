"use strict";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fileUpload } from "../../actions/upload";
import { sendNotification } from "../../actions/notification";
 
class Dropbox extends Component {
    
  onDragOver(e){
    e.preventDefault();
    e.currentTarget.classList.add("dragUploadDragHover");
  }
  
  onDragLeave(e){
    e.currentTarget.classList.remove("dragUploadDragHover");
  }
  
  onDrop(e){
    e.preventDefault();
    
    const { id, redirection } = this.props;
    
    document.getElementById(`${id}-icon`).classList.add("dropIconAnim");
    
    const dt = e.dataTransfer;
    let data = new FormData();
    let dataSize = 0;
    let fileCounter = 0;
    
    const callback = function(delay = 1000){

      if(this.props.redirection){
        this.props.history.push(redirection);
      }
      document.getElementById(`${id}-icon`).classList.remove("fa-cog", "fa-spin");
      document.getElementById(`${id}-icon`).classList.add("fa-check", "txt-white");
      setTimeout(_ => {
        document.getElementById(`${id}-progress`).style.height = ("0px");
        document.getElementById(`${id}-icon`).classList.remove("dropIconAnim", "fa-check", "txt-white");
        document.getElementById(`${id}-dropzone`).classList.remove("dragUploadDragHover");
        document.getElementById(`${id}-icon`).classList.add("fa-paper-plane");
      }, delay);
    }.bind(this);

    for (let i = 0; i < dt.files.length; i++) {
      if(dt.files[i].type === "image/jpeg" || dt.files[i].type === "image/png") {
        if(fileCounter >= 50){
          callback(0);
          return this.props.sendNotification("50 fichiers maximum","error");
        }
        dataSize += dt.files[i].size;
        data.append('photos', dt.files[i], dt.files[i].name);
        fileCounter++;        
      }
    }
    this.props.fileUpload(data, id, dataSize, callback);
    
  }
  
  render(){

    return(
        <div id={`${this.props.id}-dropzone`} style={{height:this.props.height}} className="dropzone" onDrop={e => this.onDrop(e)} onDragOver={e => this.onDragOver(e)} onDragLeave={e => this.onDragLeave(e)} >
          <div className="dropLimits">
            <i id={`${this.props.id}-icon`} className="fa fa-paper-plane"></i>
          </div>
          <div className="dropzone-progress" id={`${this.props.id}-progress`} >
          </div>
        </div>
    );
  }
}
        
    function mapDispatchToProps(dispatch){
      return bindActionCreators({ fileUpload, sendNotification }, dispatch);
    }
    
export default connect(null, mapDispatchToProps)(Dropbox);
