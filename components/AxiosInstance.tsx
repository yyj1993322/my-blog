import axios from 'axios';
import type { AxiosResponse } from 'axios';

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: '/api',  // API 基础路径
  timeout: 5000,    // 超时时间
  headers: {
    'Accept': 'application/json', // 明确告诉服务器期望返回 JSON 格式数据
  }
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 可以在这里添加请求头，例如 token
    // config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 404:
          alert('资源未找到(404)');
          break;
        case 500:
          alert('服务器内部错误(500)');
          break;
        default:
          alert(`请求错误：${status}`);
      }
    } else if (error.request) {
      alert('服务器无响应');
    } else {
      alert(`请求失败：${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;