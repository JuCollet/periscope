import { NOTIFICATION_SEND, NOTIFICATION_STOP} from '../actiontypes/';

export default function(state = {}, action){
    
    switch(action.type){
        case NOTIFICATION_SEND :
            return action.payload;
        case NOTIFICATION_STOP :
            return {...state, newNotification : false };
        default :
            return state;    
    }
}