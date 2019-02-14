// 凡是这个标志的 action 都需要中间件处理
import RequestUtil from "../../utils/request";

export const FETCH_DATA = 'FETCH_DATA';

export default store => next => action => {
  let callAPI = action[FETCH_DATA];
  if (typeof callAPI === 'undefined') { // 不存在，不是此标志
    return next(action); // 交给后面的中间件处理
  }

  const {url, schema, types} = callAPI;
  // 参数校验
  if (typeof url !== 'string') throw new Error('endpoint 必须为字符串类型的URL');
  if (!schema) throw new Error('必须指定领域实体的 schema');
  if (!Array.isArray(types)) throw new Error('需要指定一个包含了3个 action type 的数组');
  if (!types.every(type => typeof type === 'string')) throw new Error('action types 必须为字符串类型');

  // 创建增强版的 action , 包含了 额外的参数
  const actionWith = data => {
    const finalAction = {...action, ...data}; // 在原有的 action 上扩展了 data
    delete finalAction[FETCH_DATA]; // 因为 此中间件已经处理了这一属性，所以向下传递的时候需要删除
    return finalAction;
  };

  const [requestType, successType, failureType] = types;

  next(actionWith({type: requestType})); // 发送 action

  // 处理请求
  return fetchData(url, schema)
    .then(response => next(actionWith({type: successType, response})))
    .catch(error => next(actionWith({type: failureType, error: error.message || '获取数据失败'})));
}

// 执行网络请求
const fetchData = (url, schema) => {
  return RequestUtil.get(url).then(data => {
    return normalizeData(data, schema);
  })
};

// 根据 schema，将获取的数据扁平化处理
const normalizeData = (data, schema) => {
  const {id, name} = schema;
  let kvObj = {};
  let ids = []; // 获取数据列表的所有 id，有利于维护数据的有序性

  if (Array.isArray(data)) { // 数组类型
    data.forEach(item => {
      kvObj[item[id]] = item; // 新对象中的 id 属性对应 item 整个对象
      ids.push(item[id]);
    })
  } else { // 不是数组类型
    kvObj[data[id]] = data;
    ids.push(data[id]);
  }

  return {
    [name]: kvObj, // eg: {products: {'p-1':{...},'p-2':{...}}
    ids,
  }
};
