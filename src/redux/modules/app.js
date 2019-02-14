const initialState = {
  error: null,
};

export const types = {
  CLEAR_ERROR: 'APP/CLEAR_ERROR',
};

// action creators
export const appActions = {
  clearError: () => ({type: types.CLEAR_ERROR}),
};

const reducer = (state = initialState, action) => {
  const {type, error} = action;

  if (type === types.CLEAR_ERROR) {
    return {...state, error: null};
  } else if (error) { // 判断是否有 error 字段，来决定是否 设置 error
    return {...state, error};
  }

  return state;
};

export default reducer;


// selectors 用于从 state 中获取某一部分状态
export const getError = (state) => {
  return state.app.error;
};
