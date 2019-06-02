import axios from 'axios';
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    console.log(config);
    config.url = ('http://localhost:8081' + config.url);
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    const responseData = response.data;
    if (responseData.success) {
        return responseData;
    } else {
        return Promise.reject(responseData.rtnData);
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default axios;