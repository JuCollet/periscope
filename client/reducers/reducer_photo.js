import { PHOTO_SEARCH } from '../actiontypes/';
import _ from "lodash";

export default function(state = {}, action){
    switch(action.type){
        case PHOTO_SEARCH :
            return {...state, searchTerm : action.payload};        
        default :
            return state;
    }
}