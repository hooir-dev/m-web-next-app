/**
 * 客户端 API 调用封装
 * 基于现有的 axios 配置，适配 Next.js 客户端使用
 */

import axios from 'axios';

// API 配置 - 直接调用后端，通过 nginx 代理
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/prod-api', // 使用相对路径，通过 nginx 代理
  timeout: 10000,
  defaultTenantId: '1'
};

// Token 管理工具函数
const tokenUtils = {
  getAccessToken: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  },
  
  getRefreshToken: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refresh_token');
  },
  
  getTenantId: () => {
    if (typeof window === 'undefined') return API_CONFIG.defaultTenantId;
    return localStorage.getItem('tenant_id') || API_CONFIG.defaultTenantId;
  },
  
  setToken: (tokenData) => {
    if (typeof window === 'undefined') return;
    
    if (tokenData.accessToken) {
      localStorage.setItem('access_token', tokenData.accessToken);
    }
    if (tokenData.refreshToken) {
      localStorage.setItem('refresh_token', tokenData.refreshToken);
    }
    if (tokenData.tenantId) {
      localStorage.setItem('tenant_id', tokenData.tenantId);
    }
  },
  
  removeToken: () => {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('tenant_id');
  }
};

// 创建 axios 实例
const clientApi = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
  }
});

// 请求状态管理
let isRefreshingToken = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

// 请求拦截器
clientApi.interceptors.request.use(
  (config) => {
    // 添加租户ID
    config.headers['tenant-id'] = tokenUtils.getTenantId();
    
    // 添加认证token
    const token = tokenUtils.getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    console.log(`[Client API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[Client API Request Error]:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
clientApi.interceptors.response.use(
  (response) => {
    const { data } = response;
    
    // 处理二进制数据
    if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
      return response.data;
    }
    
    // 处理业务响应码
    if (data.code !== undefined && data.code !== 200) {
      console.error(`[Client API Business Error] Code: ${data.code}, Message: ${data.msg}`);
      return Promise.reject(new Error(data.msg || '请求失败'));
    }
    
    return data;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // 处理 401 未授权错误
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshingToken) {
        // 如果正在刷新token，将请求加入队列
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return clientApi(originalRequest);
        }).catch((err) => {
          return Promise.reject(err);
        });
      }
      
      originalRequest._retry = true;
      isRefreshingToken = true;
      
      const refreshToken = tokenUtils.getRefreshToken();
      
      if (refreshToken) {
        try {
          // 刷新token - 直接调用后端 API
          const response = await axios.post(
            `/prod-api/admin-api/system/auth/refresh-token?refreshToken=${refreshToken}`,
            {},
            {
              headers: {
                'tenant-id': tokenUtils.getTenantId()
              }
            }
          );
          
          const newTokenData = response.data.data;
          tokenUtils.setToken(newTokenData);
          
          // 更新原请求的Authorization头
          originalRequest.headers['Authorization'] = `Bearer ${newTokenData.accessToken}`;
          
          processQueue(null, newTokenData.accessToken);
          
          return clientApi(originalRequest);
        } catch (refreshError) {
          console.error('[Token Refresh Failed]:', refreshError);
          processQueue(refreshError, null);
          tokenUtils.removeToken();
          
          // 跳转到登录页
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          
          return Promise.reject(refreshError);
        } finally {
          isRefreshingToken = false;
        }
      } else {
        // 没有刷新token，直接跳转登录
        tokenUtils.removeToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    }
    
    // 处理其他错误
    let message = error.message;
    if (message === 'Network Error') {
      message = '网络错误，请检查您的网络连接';
    } else if (message.includes('timeout')) {
      message = '请求超时，请稍后重试';
    } else if (error.response?.status) {
      message = `请求失败，状态码：${error.response.status}`;
    }
    
    console.error('[Client API Response Error]:', message);
    return Promise.reject(new Error(message));
  }
);

/**
 * 获取验证码 - 客户端版本
 * @param {string} captchaType - 验证码类型
 * @returns {Promise} 验证码数据
 */
export const getCaptcha = (captchaType = 'blockPuzzle') => {
  return clientApi.post('/admin-api/system/captcha/get', {
    captchaType
  });
};

/**
 * 用户登录 - 客户端版本
 * @param {Object} loginData - 登录数据
 * @returns {Promise} 登录结果
 */
export const login = (loginData) => {
  return clientApi.post('/admin-api/system/auth/login', loginData);
};

/**
 * 获取用户信息 - 客户端版本
 * @returns {Promise} 用户信息
 */
export const getUserInfo = () => {
  return clientApi.get('/admin-api/system/auth/get-permission-info');
};

/**
 * 登出 - 客户端版本
 * @returns {Promise} 登出结果
 */
export const logout = () => {
  return clientApi.post('/admin-api/system/auth/logout').finally(() => {
    tokenUtils.removeToken();
  });
};

// 导出工具函数和axios实例
export { tokenUtils, clientApi };
export default clientApi;
