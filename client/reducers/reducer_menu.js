import { TOGGLE_MENU, TOGGLE_SEARCHBAR } from '../actiontypes/';

export default function(state = { open: false, searchFor : null }, action){
    
    switch(action.type){
        case TOGGLE_MENU :
            return {...state, open:!state.open};
        case TOGGLE_SEARCHBAR :
            return {...state, searchFor : action.payload};
        default :
            return state;
    }
    
}