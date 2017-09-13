import { USER_AUTH, USER_SIGN_ERROR, USER_GET_INFOS, USER_RESET_ERROR } from '../actiontypes/';

export default function(state = {}, action){
    
    switch(action.type){
        case USER_AUTH :
            return {...state, ...action.payload};
        case USER_SIGN_ERROR :
            return {...state, error : action.payload};
        case USER_RESET_ERROR :
            return {...state, error : { ...state.error, ...action.payload }};
        case USER_GET_INFOS :
            return {...state, infos : action.payload };
        default :
            return state;
    }
}