import RequestUtil from "../../utils/request";
import UrlUtil from "../../utils/url";
import {FETCH_DATA} from "../middleware/api";
import {ProductSchema} from "./entities/products";

export const types = {
  FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST", // 获取猜你喜欢请求
  FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_SUCCESS", // 获取猜你喜欢请求成功
  FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_FAILURE", // 获取猜你喜欢请求失败
};

export const actions = {

  loadLikes: () => {
    return (dispatch, getState) => {
      const url = UrlUtil.getProductList(0, 10); // 发送请求的 url
      return dispatch(fetchLikes(url));
    };
  },
};

// 内部使用的 actionCreators
const fetchLikes = (url, params) => ({
  [FETCH_DATA]: {
    types: [types.FETCH_LIKES_REQUEST, types.FETCH_LIKES_SUCCESS, types.FETCH_LIKES_FAILURE],
    url,
    schema: ProductSchema,
  },
  params
});


const reducer = (state = {}, action) => {
  if (action.response && action.response.products) {
    return {...state, ...action.response.products}
  }
};

export default reducer;
