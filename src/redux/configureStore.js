import { createStore, combineReducers, applyMiddleware } from "redux"; // createStore allow to creat Redux store
import { Staffs } from "./staffs";
import { Departments } from "./departments";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: Staffs,
            departments: Departments

        }),
        applyMiddleware(thunk, logger)
    ) 
    return store;
}

//Go to App.js file to update store to it