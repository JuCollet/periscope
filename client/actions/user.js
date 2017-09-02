/*global localStorage*/

import { USER_AUTH, USER_UNAUTH, USER_SIGN_ERROR, USER_RESET_ERROR } from "../actiontypes/";
import axios from "axios";

const baseUrl = "/api/users/";

export function signInUser({email, password}, history){
    return function(dispatch){
        axios.post(baseUrl+"signin", {email, password})
            .then(function(res){
                dispatch({ type: USER_AUTH });
                localStorage.setItem("customer",true);
                localStorage.setItem('token', res.data.token);
                history.push('/app/albums');
            })
            .catch(function(err){
                dispatch({
                    type: USER_SIGN_ERROR,
                    payload: {
                        err : true,
                        message : err.response.data.error.message
                    }
                });
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
            localStorage.setItem("customer",true);
            localStorage.setItem('token', res.data.token);
            history.push('/app/albums');
        })
        .catch(function(err){
            dispatch({
                type: USER_SIGN_ERROR,
                payload: {
                    err : true,
                    message : err.response.data
                }
            });
        });        
    };
}

export function signErrorReset(message){
    
    let payload = {
        err : false,
    };
    
    if(message){
        payload = { ...payload, message : ""};
    }
    
    return {
        type: USER_RESET_ERROR,
        payload
    };
}