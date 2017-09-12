"use strict";

import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import AlbumsReducer from "./reducer_albums";
import MenuReducer from "./reducer_menu";
import NotificationReducer from "./reducer_notification";
import FetchingReducer from "./reducer_fetching";
import PhotoReducer from "./reducer_photo";
import UserReducer from "./reducer_user";
import SearchReducer from "./reducer_search";
import { USER_UNAUTH } from "../actiontypes/";

const rootReducer = (state, action) => {
    if(action.type === USER_UNAUTH){
        state = undefined;
    }
    return appReducer(state,action);
};

const appReducer = combineReducers({
    albums : AlbumsReducer,
    fetching : FetchingReducer,
    form: formReducer,
    menu : MenuReducer,
    notification : NotificationReducer,
    photo : PhotoReducer,
    user : UserReducer,
    search: SearchReducer,
});

export default rootReducer;