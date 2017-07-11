import { ALBUMS_FETCH } from '../actiontypes/';
import _ from "lodash";

export default function(state = null, action){
    switch(action.type){
        case ALBUMS_FETCH :
            return _.mapKeys(action.payload.data, "_id");
        default :
            return state;
    }
}
