import { ALBUMS_FETCH, ALBUM_FETCH, ALBUM_DELETE, PHOTO_DELETE, ALBUM_SEARCH } from '../actiontypes/';
import _ from "lodash";

export default function(state = {}, action){
    switch(action.type){
        case ALBUMS_FETCH :
            return _.mapKeys(action.payload.data, "_id");
        case ALBUM_FETCH : 
            return {...state, [action.payload.data._id] : action.payload.data };
        case ALBUM_DELETE :
            return _.omit(state, action.payload);
        case PHOTO_DELETE :
            return {...state, [action.payload._id] : action.payload };
        case ALBUM_SEARCH :
            return _.mapKeys(action.payload.data, "_id");
        default :
            return state;
    }
}