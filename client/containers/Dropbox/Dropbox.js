"use strict";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { albumFetch } from "../../actions/albums";
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
    let targetCounter = 0;
    
    const callback = function(delay = 1000){

      const iconEl = document.getElementById(`${id}-icon`);
      const progressEl = document.getElementById(`${id}-progress`);
      const dropZoneEl = document.getElementById(`${id}-dropzone`);

      targetCounter = this.props.numberOfPhotos + fileCounter;

      if(this.props.redirection){
        this.props.history.push(redirection);
      }
      
      if(iconEl){
        iconEl.classList.remove("fa-cog", "fa-spin");
        iconEl.classList.add("fa-check", "txt-white");
      }

      setTimeout(_ => {
        if(progressEl && iconEl && dropZoneEl) {
          progressEl.style.height = ("0px");
          iconEl.classList.remove("dropIconAnim", "fa-check", "txt-white");
          dropZoneEl.classList.remove("dragUploadDragHover");
          iconEl.classList.add("fa-paper-plane");  
        }
      }, delay);
    }.bind(this);
    
    const checkProgress = () => {
      
      // Toutes les 5 secondes, vérifier si le nombre de photos contenues dans l'album
      // a augmenté du nombre de photos envoyées et notifier du changement.      
      const checkInterval = setInterval(function(){
        this.props.albumFetch(this.props.id);
        if(this.props.numberOfPhotos === targetCounter){
          clearInterval(checkInterval);
        }
      }.bind(this),5000);
    };    

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
    
    if(fileCounter === 0){
      callback(0);
      return this.props.sendNotification("Aucune image à envoyer","error");
    }
    
    this.props.fileUpload(data, id, dataSize, callback, checkProgress, fileCounter);
  }
  
  render(){
    return(
        <div id={`${this.props.id}-dropzone`} style={{height:this.props.height}} className="dropzone" onDrop={e => this.onDrop(e)} onDragOver={e => this.onDragOver(e)} onDragLeave={e => this.onDragLeave(e)} >
            <i id={`${this.props.id}-icon`} className="fa fa-paper-plane"></i>
          <div className="dropzone-progress" id={`${this.props.id}-progress`} >
          </div>
        </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fileUpload, sendNotification, albumFetch }, dispatch);
}
    
export default connect(null, mapDispatchToProps)(Dropbox);
