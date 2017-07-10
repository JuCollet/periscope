import axios from "axios";
import { ALBUMS_FETCH, ALBUM_CREATE } from "../actiontypes/";

const baseUrl = "http://periscope-julesbe.c9users.io/albums/";

export function albumsFetch(){

    const albums = axios.get(baseUrl);

    return {
        type : ALBUMS_FETCH,
        payload : albums
    };
    
}

export function createAlbum(album, cb){
    
    const createdAlbum = axios.post(baseUrl, album)
        .then(_ => cb());
    
    return {
        type : ALBUM_CREATE,
        payload: createdAlbum
    }
    
}