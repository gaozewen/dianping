import { combineReducers } from "redux";
import entities from "./entities";
import home from "./home";
import detail from "./detail";
import app from "./app";

// 合并成根 reducer
const rootReducer = combineReducers({
  entities,
  home,
  detail,
  app
});

export default rootReducer;
