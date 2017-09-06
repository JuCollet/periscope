/*global localStorage*/

import { ALBUMS_RESET_STATE, USER_AUTH, USER_UNAUTH, USER_GET_INFOS, USER_SIGN_ERROR, USER_RESET_ERROR } from "../actiontypes/";
import axios from "axios";

const baseUrl = "/api/users/";

export function getInfos(){
    return function(dispatch){
        axios.get(baseUrl+"infos", {headers : {authorization : localStorage.getItem('token')}})
            .then(function(res){
                dispatch({
                    type: USER_GET_INFOS,
                    payload : res.data
                });
            });
    };
}

export function signInUser({email, password}){
    return function(dispatch){
        axios.post(baseUrl+"signin", {email : email.toLowerCase(), password})
            .then(function(res){
                localStorage.setItem('token', res.data.token);
                localStorage.setItem("customer",true);
                dispatch({ type: USER_AUTH });
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
            type: ALBUMS_RESET_STATE
        });
        dispatch({
            type: USER_UNAUTH
        });
    };
}

export function signUpUser(user, history){
    const userWithLowerCaseEmail = {...user, email : user.email.toLowerCase()};
    return function(dispatch){
        axios.post(baseUrl+"signup", userWithLowerCaseEmail)
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