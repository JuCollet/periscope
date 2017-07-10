import axios from "axios";
import { ALBUMS_FETCH } from "../actiontypes/";

export function albumsFetch(){

    const albums = axios.get("http://periscope-julesbe.c9users.io/albums/");

    return {
        type : ALBUMS_FETCH,
        payload : albums
    };
    
}