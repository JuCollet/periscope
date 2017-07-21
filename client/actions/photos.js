import axios from "axios";
import { PHOTO_DELETE } from "../actiontypes/";

const baseUrl = "http://periscope-julesbe.c9users.io/api/photos/";

export function photoDelete(albumId, photoId, filename, cb){

    const album = axios.delete(baseUrl, { data : {albumId, photoId, filename}}).then(_ => {
        cb();
    });

    return {
        type : PHOTO_DELETE,
        payload : album
    };
    
}