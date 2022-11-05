import { applyMiddleware, combineReducers, createStore, compose } from "redux";
// import { logger } from "redux-logger";
// import { movieReducer } from "./domains/movie/movie.reducer";

// const getMiddleware = function () {
//   return process.env.NODE_ENV === "production"
//     ? applyMiddleware()
//     : applyMiddleware(logger);
// };
//
// const rootReducer = combineReducers({
//   movie: movieReducer,
// });
//
// export const store = compose(getMiddleware())(createStore)(rootReducer);
