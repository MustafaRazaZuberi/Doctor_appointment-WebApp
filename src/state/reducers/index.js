import { combineReducers } from "redux";
import authData from "./authData";
const reducers = combineReducers ({
    auth : authData,
})
export default reducers