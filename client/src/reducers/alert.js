/* 
Alert Reducer that takes some STATE and an ACTION 
Reducers specify how the application's state changes in response to actions sent to the store. 
*/

import { SET_ALERT, REMOVE_ALERT } from "../actions/types"; // Get action types from TYPES.js

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    // Returns new state with a new alert
    case SET_ALERT:
      return [...state, payload];
    // Returns new state WITHOUT the alert that matches the payload
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    // Returns previous state
    default:
      return state;
  }
}
