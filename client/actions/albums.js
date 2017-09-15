/*global localStorage*/

import axios from "axios";
import download from "downloadjs";
import { ALBUMS_FETCH, ALBUM_FETCH, FETCHING, ALBUM_CREATE, ALBUM_DELETE, ALBUM_SEARCH, ALBUM_THUMB_UPDATE, NOTIFICATION_SEND, USER_UNAUTH } from "../actiontypes/";

const baseUrl = "/api/albums/";

export {
    albumsFetch, // Fetch all albums - auth required
    albumFetch, // Fetch a particular album - auth not required
    albumThumbUpdate, // Update the displayed album thumb - auth not required
    createAlbum, // Create a new album - auth required
    downloadAlbum, // Download album photos in a zip file - auth required
    deleteAlbum, // Delete an existing album - auth required
    updateAlbum, // Update the album infos - auth required
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
        axios.get(baseUrl+"getalbum/"+id)
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

function downloadAlbum(albumId, cb){
    return function(dispatch){
        
        let firstEvent = true;
        const startDownload = Date.now();
        let emitNotificationDate = Date.now();
        
        axios({
          url: `${baseUrl}download/${albumId}`,
          method : 'get',
          responseType : 'blob',
          headers : {authorization : localStorage.getItem('token')},
          onDownloadProgress : function(e){
            if(firstEvent === true){
                dispatch({
                    type: NOTIFICATION_SEND,
                    payload : {
                        message: "Téléchargement en cours..."
                    }
                });
                firstEvent = false;
            }
            if(Date.now() - startDownload >= 7000 && Date.now() >= emitNotificationDate + 7000){
                dispatch({
                    type: NOTIFICATION_SEND,
                    payload : {
                        message: `${Math.round((e.loaded/e.total)*100)}% téléchargé...`
                    }
                });
                emitNotificationDate = Date.now();
            }
          }
        }).then(response => {
            download(response.data, "photos.zip");
            cb();
          })
          .catch(_=>{
                dispatch({
                    type: NOTIFICATION_SEND,
                    payload : {
                        message: "Téléchargement impossible",
                        type : "error"
                    }
                });              
                cb();
          });
    };
}

function updateAlbum(albumId, data){
    return function(dispatch){
        axios.put(baseUrl, {albumId, data}, {headers : {authorization : localStorage.getItem('token')}})
        .then(album => {
            dispatch({
                type : ALBUM_FETCH,
                payload : album            
            });            
            dispatch({
                type: NOTIFICATION_SEND,
                payload : {
                    message : "C'est fait !"
                }
            });    
        })
        .catch(err => {
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