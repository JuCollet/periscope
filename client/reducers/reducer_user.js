import { USER_LOGIN } from '../actiontypes/';

export default function(state = {}, action){
    
    switch(action.type){
        case USER_LOGIN :
            return action.payload;
        default :
            return state;
    }
    
}