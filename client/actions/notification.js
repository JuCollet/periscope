import { NOTIFICATION_SEND, NOTIFICATION_STOP } from '../actiontypes/';

export {
    sendNotification,
    stopNotification
};

function sendNotification(message, type = "info"){
    return {
        type: NOTIFICATION_SEND,
        payload : {
            message, type, newNotification : true
        }
    };
}

function stopNotification(){
    return {
        type: NOTIFICATION_STOP,
    };
}