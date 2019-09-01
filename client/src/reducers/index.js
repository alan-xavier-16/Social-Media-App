/* ALL REDUCERS WILL BE COMBINED AND EXPORTED HERE TO STORE.JS */
import { combineReducers } from "redux";
import alert from "./alert";

export default combineReducers({ alert });
