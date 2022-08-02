import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./Reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};

const middlewares = [thunkMiddleware];
const middlewareApplication = applyMiddleware(...middlewares);

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(middlewareApplication)
);

export default store;
