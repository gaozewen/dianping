const headers = new Headers({
  Accept: "application/json",
  "Content-type": "application/json"
});

// 对 response 的处理函数
function handleResponse(response, url) {
  if (response.status === 200) {
    return response.json();
  } else {
    console.error(`Request failed. Url = ${url}`);
    return Promise.reject({error: {message: "Request failed due to server error"}});
  }
}

class RequestUtil {
  static get(url) {
    return fetch(url, {
      method: "GET",
      headers,
    }).then(response => {
      handleResponse(url, response);
    }).catch(err => {
      console.error(`Request failed. Url = ${url} . Message = ${err}`);
      return Promise.reject({error: {message: "Request failed."}}); // 请求失败，还未到服务器端
    });
  }

  static post(url, data) {
    return fetch(url, {
      method: "POST",
      headers,
      body: data,
    }).then(response => {
      handleResponse(url, response);
    }).catch(err => {
      console.error(`Request failed. Url = ${url} . Message = ${err}`);
      return Promise.reject({error: {message: "Request failed."}}); // 请求失败，还未到服务器端
    });
  }
}


export default RequestUtil;
