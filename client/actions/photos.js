import axios from "axios";
import { PHOTO_DELETE, PHOTO_UPDATE, PHOTO_SEARCH } from "../actiontypes/";

const baseUrl = "/api/photos/";

export function photoDelete(albumId, photoId, filename, cb){

    const album = axios.put(baseUrl+"delete/", {albumId, photoId, filename})
        .then(album => {
            return album;
        });

    cb();

    return {
        type : PHOTO_DELETE,
        payload : album
    };
    
}

export function photoUpdate(photoId, data, cb){
    
    const album = axios.put(baseUrl+"tagsupdate/", {photoId, data})
        .then(album => {
            return album;
        });
        
    cb;
    
    return {
        type: PHOTO_UPDATE,
        payload: album
    };
        
}

export function photoSearch(term){
    
    return {
        type: PHOTO_SEARCH,
        payload: term
    };
    
}