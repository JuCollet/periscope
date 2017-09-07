import { SEARCH_TERM_UPDATE, SEARCH_TYPE_TOGGLE } from "../actiontypes/";

export {
    searchTermUpdate, // Update search term sent to API;
    searchType // Switch between album search mode, photo search mode or no active search;
};

function searchTermUpdate(term){
    return{
        type: SEARCH_TERM_UPDATE,
        payload: term
    };
}

function searchType(type){
    return{
        type: SEARCH_TYPE_TOGGLE,
        payload: type
    };
}