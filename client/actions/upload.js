/*global localStorage*/

import axios from "axios";
import { NOTIFICATION_SEND } from "../actiontypes/";

export {
    fileUpload // Send file to server;
};

const baseUrl = "/api/users/";

function fileUpload(files, id, dataSize, cb, checkProgress, fileCounter){
    return function(dispatch){
        
        axios.get(baseUrl+"infos", {headers : {authorization : localStorage.getItem('token')}})
            .then(function(res){
                // Check if remaining space of user is big enough for files he's trying to send;
                if((res.data.volume - res.data.usedVolume) < dataSize){
                    return (
                        dispatch({
                            type: NOTIFICATION_SEND,
                            payload : {
                                message : "Espace insuffisant",
                                type : "error"
                            }
                        })
                    );
                } else {
                    axios({
                        url: `/api/upload/${id}`,
                        method: 'put',
                        data: files,
                        headers:{'Content-Type':'multipart/form-data', authorization : localStorage.getItem('token')},
                        onUploadProgress: function (progressEvent) {
                            if(document.getElementById(`${id}-progress`)){
                                document.getElementById(`${id}-progress`).style.height = ((progressEvent.loaded/progressEvent.total)*100)+"%";
                            }
                            if(progressEvent.loaded === progressEvent.total && document.getElementById(`${id}-icon`)) {
                                document.getElementById(`${id}-icon`).classList.remove("dropIconAnim", "fa-paper-plane");
                                document.getElementById(`${id}-icon`).classList.add("fa-cog", "fa-spin", "txt-white");                
                            }
                        }
                    }).then( res => {
                        checkProgress();
                        cb();
                        dispatch({
                            type: NOTIFICATION_SEND,
                            payload : {
                                message : `Photo${fileCounter > 1 ? "s" : ""} envoyée${fileCounter > 1 ? "s" : ""} !`
                            }
                        });
                    }).catch( err => {
                        dispatch({
                            type: NOTIFICATION_SEND,
                            payload : {
                                message : err.response.data,
                                type: "error"
                            }
                        });    
                    });    
                }
            })
            .catch(err=>{
                dispatch({
                    type: NOTIFICATION_SEND,
                    payload : {
                        message : err.response.data,
                        type : "error"
                    }
                });
        });        
    };        
}