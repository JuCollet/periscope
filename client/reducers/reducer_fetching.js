import { FETCHING } from '../actiontypes/';

export default function(state = { isFetching : false }, action){
    switch(action.type){
        case FETCHING :
            return action.payload;        
        default :
            return state;
    }
}