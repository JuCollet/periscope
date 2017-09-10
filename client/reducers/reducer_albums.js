import { ALBUMS_FETCH, ALBUM_FETCH, ALBUM_DELETE, ALBUMS_RESET_STATE, ALBUM_THUMB_UPDATE, PHOTO_DELETE, PHOTO_UPDATE, ALBUM_SEARCH, UPLOAD_FILES } from '../actiontypes/';
import _ from "lodash";

export default function(state = {}, action){
    switch(action.type){
        case ALBUM_DELETE :
            return _.omit(state, action.payload);        
        case ALBUMS_FETCH :
            return _.mapKeys(action.payload.data, "_id");
        case ALBUM_FETCH :
            return {...state, [action.payload.data._id] : action.payload.data };
        case ALBUM_SEARCH :
            return _.mapKeys(action.payload.data, "_id");
        case ALBUM_THUMB_UPDATE :
            return {...state, [action.payload.data._id] : action.payload.data };
        case PHOTO_DELETE :
            return {...state, [action.payload.data._id] : action.payload.data };
        case PHOTO_UPDATE :
            return {...state, [action.payload.data._id] : action.payload.data };
        case UPLOAD_FILES :
            return {...state, [action.payload.data._id] : action.payload.data };            
        default :
            return state;
    }
}