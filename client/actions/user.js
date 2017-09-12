/*global localStorage*/

import { FETCHING, USER_AUTH, USER_UNAUTH, USER_GET_INFOS, USER_SIGN_ERROR, USER_RESET_ERROR, NOTIFICATION_SEND } from "../actiontypes/";
import axios from "axios";

export {
    getInfos,
    signInUser,
    signUpUser,
    signOutUser,
    signErrorReset
};

const baseUrl = "/api/users/";

function getInfos(){
    return function(dispatch){
        dispatch({
            type : FETCHING,
            payload : {isFetching : true}
        });           
        axios.get(baseUrl+"infos", {headers : {authorization : localStorage.getItem('token')}})
            .then(function(res){
                dispatch({
                    type : FETCHING,
                    payload : {isFetching : false}
                });                
                dispatch({
                    type: USER_GET_INFOS,
                    payload : res.data
                });
            })
            .catch(_=>{
                dispatch({
                    type: NOTIFICATION_SEND,
                    payload : {
                        message : "Connection impossible",
                        type : "error"
                    }
                });
            });
    };
}

function signInUser({email, password}){
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

function signOutUser(){
    return function(dispatch){
        localStorage.removeItem('token');
        dispatch({
            type: USER_UNAUTH
        });
    };
}

function signUpUser(user, history){
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

function signErrorReset(message){
    
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