import { USER_AUTH, USER_UNAUTH, USER_AUTH_ERROR, USER_AUTH_RESET_ERROR } from '../actiontypes/';

export default function(state = {}, action){
    
    switch(action.type){
        case USER_AUTH :
            return {...state, authenticated : true};
        case USER_UNAUTH :
            return {...state, authenticated : false};
        case USER_AUTH_ERROR :
            return {...state, error : action.payload};
        case USER_AUTH_RESET_ERROR :
            return {...state, error : false};            
        default :
            return state;
    }
    
}