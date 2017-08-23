/*global localStorage*/

import { USER_AUTH, USER_AUTH_ERROR, USER_AUTH_RESET_ERROR } from "../actiontypes/";
import axios from "axios";

const baseUrl = "/api/users/";


export function signInUser({email, password}, history, cb){
    return function(dispatch){
        axios.post(baseUrl+"signin", {email, password})
            .then(function(res){
                dispatch({ type: USER_AUTH });
                localStorage.setItem('token', res.data.token);
                history.push('/app/albums');
            })
            .catch(function(){
                dispatch({
                    type: USER_AUTH_ERROR,
                    payload: true
                });
                cb();
            });
    };
}

export function signUpUser(user){
    return function(dispatch){
        axios.post(baseUrl+"signup", user).then(function(res){
            console.log(res);
        });
    };
}

export function signInUserResetError(){
    return {
        type: USER_AUTH_RESET_ERROR
    };
}