import { ALBUMS_FETCH, ALBUM_FETCH } from '../actiontypes/';
import _ from "lodash";

export default function(state = {}, action){
    switch(action.type){
        case ALBUMS_FETCH :
            return _.mapKeys(action.payload.data, "_id");
        case ALBUM_FETCH : 
            return {...state, [action.payload.data._id] : action.payload.data };
        default :
            return state;
    }
}
