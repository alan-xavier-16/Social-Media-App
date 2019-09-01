/*
Actions are payloads of information that send data from your application to your store
They don't describe how the application's state changes, that is for REDUCERS
*/
import { SET_ALERT, REMOVE_ALERT } from "./types";
import uuid from "uuid";

/* DISPATCHES MULTIPLE ACTION TYPES USING 'DISPATCH' FROM 'THUNK' MIDDLEWARE */
export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { mag, alertType, id }
  });
};
