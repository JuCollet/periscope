/*global localStorage*/

import axios from "axios";
import { ALBUMS_FETCH, ALBUM_FETCH, FETCHING, ALBUM_CREATE, ALBUM_DELETE, ALBUM_SEARCH, ALBUM_THUMB_UPDATE } from "../actiontypes/";

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
            
        });
    };
}

function albumFetch(id){
    return function(dispatch){
        axios.get(baseUrl+id).then(album => {
            dispatch({
                type : ALBUM_FETCH,
                payload : album            
            });        
        });
    };
}

function albumThumbUpdate(id, albumThumb, cb){
    return function(dispatch){
        axios.put(baseUrl + "updateAlbumThumb/", {id, albumThumb}).then( album => {
            cb();
            dispatch({
                type : ALBUM_THUMB_UPDATE,
                payload : album        
            });        
        });
    };    
}

function createAlbum(album, cb){
    return function(dispatch){
        axios.post(baseUrl, album, {headers : {authorization : localStorage.getItem('token')}}).then(createdAlbum => {
            cb("/app/albums");
            dispatch({
                type : ALBUM_CREATE,
                payload : createdAlbum            
            });        
        });
    };
}

function deleteAlbum(albumId, cb){
    return function(dispatch){
        axios.delete(baseUrl, {...{headers : {authorization : localStorage.getItem('token')}}, data : { albumId }}).then( _ => {
            cb();
            dispatch({
                type : ALBUM_DELETE,
                payload : albumId           
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