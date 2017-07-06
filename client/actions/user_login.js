import { USER_LOGIN } from "../actiontypes/";
import { usersMock } from "../mock/users";

export function userLogin(user, cb){

    if(user.username === usersMock.login && user.password === usersMock.password){
        cb();
    }
    
    return {
        type : USER_LOGIN,
        payload : usersMock
    }
    
}