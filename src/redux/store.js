import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import api from './middleware/api';
import rootReducer from "./modules";

let store;

if (
  process.env.NODE_ENV !== "production" &&
  window._REDUX_DEVTOOLS_EXTENSION_
) { // 开发环境
  // 这是一个函数
  const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_;
  // 需要 redux thunk 先能处理函数类型的 action ，然后再经过 api 中间件
  store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, api)));
} else { // 生产环境
  store = createStore(rootReducer, applyMiddleware(thunk, api));
}

export default store;
