import axios from "axios";
import { UPLOAD_FILES } from "../actiontypes/";

const baseUrl = "http://periscope-julesbe.c9users.io/albums/";

export function fileUpload(files, id, callback){
    
    const upload = axios({
        url: `/api/upload/${id}`,
        method: 'put',
        data: files,
        headers:{'Content-Type':'multipart/form-data'},
        onUploadProgress: function (progressEvent) {
            document.getElementById(`${id}-progress`).style.height = ((progressEvent.loaded/progressEvent.total)*100)+"%";
        }
    }).then( _ => {
        callback();
    });
    
    return {
        type: UPLOAD_FILES,
        payload: upload
    };
    
}