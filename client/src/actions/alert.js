/*
Actions are payloads of information that send data from your application to your store
They don't describe how the application's state changes, that is for REDUCERS
*/
import { SET_ALERT, REMOVE_ALERT } from "./types";
import uuid from "uuid";

/* DISPATCHES MULTIPLE ACTION TYPES USING 'DISPATCH' FROM 'THUNK' MIDDLEWARE */
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4();

  // Set an alert
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  // Removes alert after 5s
  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      }),
    timeout
  );
};
