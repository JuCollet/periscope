import axios from "axios";
import { PHOTO_DELETE } from "../actiontypes/";

const baseUrl = "http://periscope-julesbe.c9users.io/api/photos/";

export function photoDelete(albumId, photoId, filename, cb){

    const album = axios.put(baseUrl, {albumId, photoId, filename})
        .then(album => {
            return album;
        });

    cb();

    return {
        type : PHOTO_DELETE,
        payload : album
    };
    
}