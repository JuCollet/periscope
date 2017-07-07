"use strict";

import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import UserReducer from "./reducer_user";
import MenuReducer from "./reducer_menu";

const rootReducer = combineReducers({
    menu : MenuReducer,
    user : UserReducer,
    form: formReducer
});

export default rootReducer;