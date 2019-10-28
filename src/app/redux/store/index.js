import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "../reducers";
import thunk from "redux-thunk";

const middlewares = [thunk];
const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

export const configureStore = () => createStore(rootReducer, composedEnhancer);
