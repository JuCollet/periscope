/*global localStorage*/

import axios from "axios";
import { PHOTO_DELETE, PHOTO_UPDATE, PHOTO_SEARCH } from "../actiontypes/";

export {
    photoDelete, // Delete a particular photo
    photoUpdate, // Update photo tags
    photoSearch, // Update the search term for filtering displayed photos.
};

const baseUrl = "/api/photos/";

function photoDelete(albumId, photoId, filename, cb){
    return function(dispatch){
        cb();
        axios.put(baseUrl+"delete/", {albumId, photoId, filename}, {headers : {authorization : localStorage.getItem('token')}}).then( album => {
            dispatch({
                type : PHOTO_DELETE,
                payload : album    
            });        
        });
    };
}

function photoUpdate(photoId, data, cb){
    return function(dispatch){
        axios.put(baseUrl+"update/", {photoId, data}, {headers : {authorization : localStorage.getItem('token')}}).then( album => {
            cb();
            dispatch({
                type: PHOTO_UPDATE,
                payload: album 
            });        
        });
    };
}

function photoSearch(term){
    return {
        type: PHOTO_SEARCH,
        payload: term
    };
}