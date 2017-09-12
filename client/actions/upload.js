/*global localStorage*/

import axios from "axios";
import { UPLOAD_FILES, NOTIFICATION_SEND } from "../actiontypes/";

export {
    fileUpload // Send file to server;
};

function fileUpload(files, id, cb){
    
    return function(dispatch){
        axios({
            url: `/api/upload/${id}`,
            method: 'put',
            data: files,
            headers:{'Content-Type':'multipart/form-data', authorization : localStorage.getItem('token')},
            onUploadProgress: function (progressEvent) {
                document.getElementById(`${id}-progress`).style.height = ((progressEvent.loaded/progressEvent.total)*100)+"%";
                if(progressEvent.loaded === progressEvent.total) {
                    document.getElementById(`${id}-icon`).classList.remove("dropIconAnim", "fa-paper-plane");
                    document.getElementById(`${id}-icon`).classList.add("fa-cog", "fa-spin", "txt-white");                
                }
            }
        }).then( res => {
            cb();
            dispatch({
                type: UPLOAD_FILES,
                payload: res
            });
            dispatch({
                type: NOTIFICATION_SEND,
                payload : {
                    message : "Photos envoyées !"
                }
            });
        }).catch( err => {
            dispatch({
                type: NOTIFICATION_SEND,
                payload : {
                    message : err.response.data.error.message,
                    type: "error"
                }
            });    
        });
    };        
}