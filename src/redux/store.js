import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./modules";

let store;

if (
  process.env.NODE_ENV !== "production" &&
  window._REDUX_DEVTOOLS_EXTENSION_
) { // 开发环境
  // 这是一个函数
  const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_;
  store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
} else { // 生产环境
  store = createStore(rootReducer, applyMiddleware(thunk));
}

export default store;
