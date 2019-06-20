import axios from 'axios';
import { message } from 'antd';
import { isTokenExpired } from '../utils/util';
const Api = {
    base: 'http://10.96.1.68:8080/account'
};
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('Access-Token');
    if (token) {
        config.headers['access-token'] = token;
    }
    if (config.data === 'local') { // 请求前端本地数据
    } else {
        config.url = (Api.base + config.url);
    }
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
      
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    const token = response.headers['access-token'];
    if (token) {
        if (!isTokenExpired(token)) {
            localStorage.setItem('Access-Token', token); // 将token存储到浏览器端
        }   else {
            localStorage.removeItem('Access-Token'); // token过期，将其移除
        }
    }
    const responseData = response.data;
    if (responseData.rtnCode === '000000' || response.config.data === 'local') { // 返回码做成可配置
        return responseData;
    } else {
        message.error(responseData.rtnMsg); // 做成可配置
        return Promise.reject(responseData.rtnData);
    }
}, function (error) {
    // 对响应错误做点什么
    message.error(error.message); // 做成可配置
    return Promise.reject(error);
});
export default axios;