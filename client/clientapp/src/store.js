import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { reducerMath, reducerProducts } from "./reducers/reducers";
import thunk from "redux-thunk";
export default createStore(
  combineReducers({ reducerMath, reducerProducts }),
  {},
  applyMiddleware(createLogger(), thunk)
);
