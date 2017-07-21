import axios from "axios";
import { ALBUMS_FETCH, ALBUM_FETCH, ALBUM_CREATE, ALBUM_DELETE, ALBUM_SEARCH } from "../actiontypes/";

const baseUrl = "http://periscope-julesbe.c9users.io/api/albums/";

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
        .then(_=>cb());
    
    return {
        type: ALBUM_DELETE,
        payload: albumId
    };
    
}

export function searchAlbum(tags){
    
    const albums = axios.post(baseUrl+"search/", {tags:tags});
    
    return {
        type: ALBUM_SEARCH,
        payload: albums
    };
    
}