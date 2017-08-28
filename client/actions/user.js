/*global localStorage*/

import { USER_AUTH, USER_UNAUTH, USER_AUTH_ERROR, USER_AUTH_RESET_ERROR } from "../actiontypes/";
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

export function signOutUser(){
    return function(dispatch){
        localStorage.removeItem('token');
        dispatch({
            type: USER_UNAUTH
        });
    };
}

export function signUpUser(user, history){
    return function(dispatch){
        axios.post(baseUrl+"signup", user)
        .then(function(res){
            dispatch({ type: USER_AUTH });
            localStorage.setItem('token', res.data.token);
            history.push('/app/albums');
        });
    };
}

export function signInUserResetError(){
    return {
        type: USER_AUTH_RESET_ERROR
    };
}