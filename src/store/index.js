import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import todoReducer from "./reducers/todoReducer";
import filterReducer from "./reducers/filterReducer";

const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer,
});

const logger = createLogger();

const store = createStore(rootReducer, undefined, applyMiddleware(logger));

export default store;
