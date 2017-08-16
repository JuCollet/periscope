import { SEARCH_TERM_UPDATE, SEARCH_TYPE_TOGGLE } from "../actiontypes/";

export function searchTermUpdate(term){
    return{
        type: SEARCH_TERM_UPDATE,
        payload: term
    };
}

export function searchType(type){
    return{
        type: SEARCH_TYPE_TOGGLE,
        payload: type
    };
}