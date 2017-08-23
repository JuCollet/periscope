import { USER_SIGNIN } from "../actiontypes/";
import axios from "axios";

const baseUrl = "/api/users/";


export function signInUser({email, password}){
    return function(dispatch){
        axios.post(baseUrl+"signin", {email, password})
            .then(function(res){
            console.log(res);
            })
            .catch(function(err){
                console.log(err.message);
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