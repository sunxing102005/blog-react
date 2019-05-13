import { combineReducers } from "redux";
import article from "./system/article";

export const rootReducer = asyncReducers => {
    return combineReducers({
        article
    });
};

export default rootReducer;
