/*global localStorage*/

import axios from "axios";
import { PHOTO_DELETE, PHOTO_UPDATE, PHOTO_SEARCH, NOTIFICATION_SEND } from "../actiontypes/";

export {
    photoDelete, // Delete a particular photo
    photoUpdate, // Update photo tags
    photoSearch, // Update the search term for filtering displayed photos.
};

const baseUrl = "/api/photos/";

function photoDelete(albumId, photoId, filename, cb){
    return function(dispatch){
        cb();
        axios.put(baseUrl+"delete/", {albumId, photoId, filename}, {headers : {authorization : localStorage.getItem('token')}})
        .then( album => {
            dispatch({
                type: NOTIFICATION_SEND,
                payload : {
                    message : "Photo supprimée !"
                }
            });            
            dispatch({
                type : PHOTO_DELETE,
                payload : album    
            });        
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

function photoUpdate(photoId, data, cb){
    return function(dispatch){
        axios.put(baseUrl+"update/", {photoId, data}, {headers : {authorization : localStorage.getItem('token')}})
        .then( album => {
            cb();
            dispatch({
                type: NOTIFICATION_SEND,
                payload : {
                    message : "Enregistré !"
                }
            });               
            dispatch({
                type: PHOTO_UPDATE,
                payload: album 
            });        
        })
        .catch(err=>{
            dispatch({
                type: NOTIFICATION_SEND,
                payload : {
                    message : err.response.data,
                    type: "error"
                }
            });                
        })
    };
}

function photoSearch(term){
    return {
        type: PHOTO_SEARCH,
        payload: term
    };
}