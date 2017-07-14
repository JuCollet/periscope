"use strict";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fileUpload } from "../../actions/upload";

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
    
    document.getElementById(`${this.props.id}-icon`).classList.add("dropIconAnim");
    
    const dt = e.dataTransfer;
    let data = new FormData();
    
    const callback = function(){
      document.getElementById(`${this.props.id}-icon`).classList.remove("dropIconAnim", "fa-paper-plane");
      document.getElementById(`${this.props.id}-icon`).classList.add("fa-check", "txt-white");
      setTimeout(_ => {
        document.getElementById(`${this.props.id}-progress`).style.height = ("0px");
        document.getElementById(`${this.props.id}-dropzone`).classList.remove("dragUploadDragHover");
        document.getElementById(`${this.props.id}-icon`).classList.remove("dropIconAnim", "fa-check", "txt-white");
        document.getElementById(`${this.props.id}-icon`).classList.add("fa-paper-plane");
      }, 1000);
    }.bind(this);  
    
    for (let i = 0; i < dt.files.length; i++) {
      if(dt.files[i].type === "image/jpeg")
      data.append('photos', dt.files[i], dt.files[i].name);
    }
    
    this.props.fileUpload(data, this.props.id, callback);
    
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
        
    function mapDispacthToProps(dispatch){
      return bindActionCreators({ fileUpload }, dispatch);
    }
    
export default connect(null, mapDispacthToProps)(Dropbox);
