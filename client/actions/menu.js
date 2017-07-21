import { TOGGLE_MENU, TOGGLE_SEARCHBAR } from '../actiontypes/';

export function toggleMenu(){
    return {
        type: TOGGLE_MENU,
        payload: null
    };
}

export function toggleSearchBar(type){
    return {
        type: TOGGLE_SEARCHBAR,
        payload: type
    };
}