/*
Manages the STATE and ACTIONS for:
  1. Registration
*/

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token") /*token will be saved in localStorage */,
  isAuthenticated: null /* Response for Register or Login will set to TRUE */,
  loading: true /* Ensures we have received response from server */,
  user: null /* User from Backend */
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };

    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };

    default:
      return state;
  }
}
