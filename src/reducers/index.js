import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {reposReducer} from "./reposReducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    repos: reposReducer
})


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
