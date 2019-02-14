import RequestUtil from "../../utils/request";
import UrlUtil from "../../utils/url";

export const types = {
  FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST", // 获取猜你喜欢请求
  FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_SUCCESS", // 获取猜你喜欢请求成功
  FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_FAILURE", // 获取猜你喜欢请求失败
};

export const actions = {
  loadLikes: () => {
    return (dispatch, getState) => {
      dispatch(fetchLikesRequest());// 请求开始发送
      return RequestUtil.get(UrlUtil.getProductList(0, 10)).then(
        data => {
          dispatch(fetchLikesSuccess(data));// 更新 ui 状态
          // todo: 更新领域状态 products
          // dispatch(...(data));// 更新 领域 状态
          // dispatch(...(data));// 更新 领域 状态
        },
        error => {
          dispatch(fetchLikesFailure(error))
        },
      )
    }
  }
};

// 内部使用的 actionCreators
const fetchLikesRequest = () => ({type: types.FETCH_LIKES_REQUEST});
const fetchLikesSuccess = (data) => ({type: types.FETCH_LIKES_SUCCESS, data});
const fetchLikesFailure = (error) => ({type: types.FETCH_LIKES_FAILURE, error});


const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_LIKES_REQUEST:
      // TODO:界面 loading状态开启
      return state;
    case types.FETCH_LIKES_SUCCESS:
      return state;
    case types.FETCH_LIKES_FAILURE:
      return state;
    default:
      return state;
  }
};

export default reducer;
