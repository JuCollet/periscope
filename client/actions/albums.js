import axios from "axios";
import { ALBUMS_FETCH, ALBUM_FETCH, ALBUM_CREATE, ALBUM_DELETE, ALBUM_SEARCH, ALBUM_THUMB_UPDATE } from "../actiontypes/";

const baseUrl = "/api/albums/";

export function albumsFetch(){

    const albums = axios.get(baseUrl);

    return {
        type : ALBUMS_FETCH,
        payload : albums
    };
    
}

export function albumFetch(id){
    
    const album = axios.get(baseUrl+id);

    return {
        type: ALBUM_FETCH,
        payload : album
    };
    
}

export function createAlbum(album, cb){
    
    const createdAlbum = axios.post(baseUrl, album)
        .then(_ => cb());
    
    return {
        type : ALBUM_CREATE,
        payload: createdAlbum
    };
    
}

export function deleteAlbum(albumId, cb){
    
    axios.delete(baseUrl, {data : { albumId }})
        .then(album=>cb());
    
    return {
        type: ALBUM_DELETE,
        payload: albumId
    };
    
}

export function albumThumbUpdate(id, albumThumb, cb){
    const album = axios.put(baseUrl + "/updateAlbumThumb/", {id, albumThumb})
        .then(cb());
    
    return {
        type : ALBUM_THUMB_UPDATE,
        payload: album
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
    
    const albums = axios.post(finalUrl, {tags:tags});

    return {
        type: ALBUM_SEARCH,
        payload: albums
    };
    
}