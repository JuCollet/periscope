"use strict";

import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import AlbumsReducer from "./reducer_albums";
import MenuReducer from "./reducer_menu";
import PhotoReducer from "./reducer_photo";
import UserReducer from "./reducer_user";
import SearchReducer from "./reducer_search";

const rootReducer = combineReducers({
    menu : MenuReducer,
    user : UserReducer,
    albums : AlbumsReducer,
    photo : PhotoReducer,
    search: SearchReducer,
    form: formReducer
});

export default rootReducer;