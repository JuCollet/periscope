import axios from "axios";
import { ALBUMS_FETCH, ALBUM_FETCH, ALBUM_CREATE, ALBUM_DELETE, ALBUM_SEARCH, ALBUM_THUMB_UPDATE } from "../actiontypes/";

const baseUrl = "/api/albums/";

export function albumsFetch(){
    return function(dispatch){
        axios.get(baseUrl).then(albums => {
            dispatch({
                type : ALBUMS_FETCH,
                payload : albums            
            });        
        });
    };
}

export function albumFetch(id){
    return function(dispatch){
        axios.get(baseUrl+id).then(album => {
            dispatch({
                type : ALBUM_FETCH,
                payload : album            
            });        
        });
    };
}

export function createAlbum(album, cb){
    return function(dispatch){
        axios.post(baseUrl, album).then(createdAlbum => {
            cb();
            dispatch({
                type : ALBUM_CREATE,
                payload : createdAlbum            
            });        
        });
    };
}

export function deleteAlbum(albumId, cb){
    return function(dispatch){
        axios.delete(baseUrl, {data : { albumId }}).then( _ => {
            cb();
            dispatch({
                type : ALBUM_DELETE,
                payload : albumId           
            });        
        });
    };
}

export function albumThumbUpdate(id, albumThumb, cb){
    return function(dispatch){
        axios.put(baseUrl + "/updateAlbumThumb/", {id, albumThumb}).then( album => {
            cb();
            dispatch({
                type : ALBUM_THUMB_UPDATE,
                payload : album        
            });        
        });
    };    
}

export function searchAlbum(tags){

    let finalUrl;
    
    if(tags.slice(0,1) === "#"){
        tags = tags.substr(1);
        finalUrl = baseUrl + "searchphotos/";
    } else {
        finalUrl = baseUrl + "searchalbum/";
    }

    return function(dispatch){
        axios.post(finalUrl, {tags:tags}).then( albums => {
            dispatch({
                type: ALBUM_SEARCH,
                payload: albums 
            });        
        });
    };    
}