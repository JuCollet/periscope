/*global localStorage*/

import axios from "axios";
import { ALBUMS_FETCH, ALBUM_FETCH, FETCHING, ALBUM_CREATE, ALBUM_DELETE, ALBUM_SEARCH, ALBUM_THUMB_UPDATE, NOTIFICATION_SEND, USER_UNAUTH } from "../actiontypes/";

const baseUrl = "/api/albums/";

export {
    albumsFetch, // Fetch all albums - auth required
    albumFetch, // Fetch a particular album - auth not required
    albumThumbUpdate, // Update the displayed album thumb - auth not required
    createAlbum, // Create a new album - auth required
    deleteAlbum, // Delete an existing album - auth required
    searchAlbum // Search an album with album or photo tags - auth required
};

function albumsFetch(){
    return function(dispatch){
        
        dispatch({
            type : FETCHING,
            payload : {isFetching : true}
        });        
        
        axios.get(baseUrl, {headers : {authorization : localStorage.getItem('token')}}).then(albums => {
            
            dispatch({
                type : FETCHING,
                payload : {isFetching : false}
            });
            
            dispatch({
                type : ALBUMS_FETCH,
                payload : albums            
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
            if(err && err.message === "Request failed with status code 401"){
                dispatch({
                    type : USER_UNAUTH
                });
            } else {
                console.log(err);
            }
        });
    };
}

function albumFetch(id){
    return function(dispatch){
        axios.get(baseUrl+id)
        .then(album => {
            dispatch({
                type : ALBUM_FETCH,
                payload : album            
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
        });
    };
}

function albumThumbUpdate(id, albumThumb, cb){
    return function(dispatch){
        axios.put(baseUrl + "updateAlbumThumb/", {id, albumThumb}, {headers : {authorization : localStorage.getItem('token')}})
        .then( album => {
            cb();
            dispatch({
                type: NOTIFICATION_SEND,
                payload : {
                    message : "C'est fait !"
                }
            });
            dispatch({
                type : ALBUM_THUMB_UPDATE,
                payload : album        
            });        
        })
        .catch(err => {
            dispatch({
                type: NOTIFICATION_SEND,
                payload : {
                    message : err.response.data,
                    type: "error"
                }
            });
        });
    };    
}

function createAlbum(album, cb){
    return function(dispatch){
        axios.post(baseUrl, album, {headers : {authorization : localStorage.getItem('token')}})
        .then(createdAlbum => {
            cb("/app/albums");
            dispatch({
                type : ALBUM_CREATE,
                payload : createdAlbum            
            });
            dispatch({
                type: NOTIFICATION_SEND,
                payload : {
                    message : "Album créé !"
                }
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

function deleteAlbum(albumId, cb){
    return function(dispatch){
        axios.delete(baseUrl, {...{headers : {authorization : localStorage.getItem('token')}}, data : { albumId }})
        .then( _ => {
            cb();
            dispatch({
                type : ALBUM_DELETE,
                payload : albumId           
            });
            dispatch({
                type: NOTIFICATION_SEND,
                payload : {
                    message : "Album supprimé !"
                }
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

function searchAlbum(tags){

    let finalUrl;
    
    if(tags.slice(0,1) === "#"){
        tags = tags.substr(1);
        finalUrl = baseUrl + "searchphotos/";
    } else {
        finalUrl = baseUrl + "searchalbum/";
    }

    return function(dispatch){
        axios.post(finalUrl, {tags:tags}, {headers : {authorization : localStorage.getItem('token')}}).then( albums => {
            dispatch({
                type: ALBUM_SEARCH,
                payload: albums 
            });        
        });
    };    
}