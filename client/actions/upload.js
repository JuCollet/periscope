import axios from "axios";
import { UPLOAD_FILES } from "../actiontypes/";

export function fileUpload(files, id, callback){
    
    const album = axios({
        url: `/api/upload/${id}`,
        method: 'put',
        data: files,
        headers:{'Content-Type':'multipart/form-data'},
        onUploadProgress: function (progressEvent) {
            document.getElementById(`${id}-progress`).style.height = ((progressEvent.loaded/progressEvent.total)*100)+"%";
            if(progressEvent.loaded === progressEvent.total) {
                document.getElementById(`${id}-icon`).classList.remove("dropIconAnim", "fa-paper-plane");
                document.getElementById(`${id}-icon`).classList.add("fa-cog", "fa-spin", "txt-white");                
            }
        }
    }).then( album => {
        callback();
        return album;
    });
    
    return {
        type: UPLOAD_FILES,
        payload: album
    };
    
}