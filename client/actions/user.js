/*global localStorage*/

import { FETCHING, USER_AUTH, USER_UNAUTH, USER_GET_INFOS, USER_SIGN_ERROR, USER_RESET_ERROR, NOTIFICATION_SEND } from "../actiontypes/";
import axios from "axios";

export {
    getInfos,
    signInUser,
    signUpUser,
    signOutUser,
    signErrorReset,
    inviteFriend
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
            .catch(err=>{
                dispatch({
                    type: NOTIFICATION_SEND,
                    payload : {
                        message : err.response.data,
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
                _setLocalstorage([
                    {key: "token", value: res.data.token},
                    {key: "customer", value: true},
                    {key: "isAdmin", value: res.data.isAdmin},
                    {key: "canWrite", value: res.data.canWrite},
                    {key: "canDelete", value: res.data.canDelete},
                    {key: "userId", value: res.data.userId }
                ]);
                dispatch({ 
                    type: USER_AUTH,
                    payload : {
                        authenticated : true,
                        isAdmin : res.data.isAdmin,
                        canWrite : res.data.canWrite,
                        canDelete : res.data.canDelete
                    }
                });
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
        _removeFromLocalStorage(['token','isAdmin','canWrite','canDelete', 'userId']);
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
            _setLocalstorage([
                {key: "token",value: res.data.token},
                {key: "customer",value: true},
                {key: "isAdmin",value: res.data.isAdmin},
                {key: "canWrite",value: res.data.canWrite},
                {key: "canDelete",value: res.data.canDelete},
                {key: "userId", value: res.data.userId }
            ]);
            dispatch({ 
                type: USER_AUTH,
                payload : {
                    authenticated : true,
                    isAdmin : res.data.isAdmin,
                    canWrite : res.data.canWrite,
                    canDelete : res.data.canDelete
                }
            });
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

function inviteFriend(data){
    return function(dispatch){
        axios.post(baseUrl+"invite", data, {headers : {authorization : localStorage.getItem('token')}})
        .then(_=> {
            dispatch({
                type: NOTIFICATION_SEND,
                payload : {
                    message : "Invitation envoyée !"
                }
            });
        })
        .catch(err=>{
            dispatch({
                type: NOTIFICATION_SEND,
                payload : {
                    message : err.response.data,
                    type : "error"
                }
            });
        });
    };
}

function _setLocalstorage(values){
    values.forEach(value=>{
        localStorage.setItem(value.key, value.value);
    });
}

function _removeFromLocalStorage(values){
    values.forEach(value=>{
        localStorage.removeItem(value);
    });
}