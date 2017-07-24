"use strict";

import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import UserReducer from "./reducer_user";
import AlbumsReducer from "./reducer_albums";
import PhotoReducer from "./reducer_photo";
import MenuReducer from "./reducer_menu";

const rootReducer = combineReducers({
    menu : MenuReducer,
    user : UserReducer,
    albums : AlbumsReducer,
    photo : PhotoReducer,
    form: formReducer
});

export default rootReducer;