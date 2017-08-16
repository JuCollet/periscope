import { SEARCH_TERM_UPDATE, SEARCH_TYPE_TOGGLE } from "../actiontypes/";

export default function(state = {searchTerm : "", searchType : null}, action){
    
    switch(action.type){
        case SEARCH_TERM_UPDATE :
            return {...state, searchTerm : action.payload};
        case SEARCH_TYPE_TOGGLE :
            return {...state, searchType : action.payload};
        default :
            return state;
    }
    
}