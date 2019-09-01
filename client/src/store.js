/*REDUX STORE BOILERPLATE*/
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

/*Set initial state (required). All state will be obtained from Reducers.*/
const initialState = {};

/*Array of Middlewares */
const middleware = [thunk];

/*Creates store with
  - Root Reducer,
  - Initial State
  - Middleware
*/
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
