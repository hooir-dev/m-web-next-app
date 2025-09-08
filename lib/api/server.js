/**
 * 服务端 API 调用封装
 * 用于 SSR、SSG 和 API Routes 中调用后端 Java API
 */

import { cookies } from 'next/headers';

// API 配置 - 服务端直接调用后端 API
const API_CONFIG = {
  baseURL: process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://admin.manetmesh.com/prod-api',
  timeout: 10000,
  defaultTenantId: '1'
};

/**
 * 服务端 HTTP 请求封装
 * @param {string} url - 请求路径
 * @param {Object} options - 请求选项
 * @returns {Promise} 请求结果
 */
export async function serverRequest(url, options = {}) {
  const {
    method = 'GET',
    headers = {},
    body,
    tenantId,
    requireAuth = false,
    ...fetchOptions
  } = options;

  // 构建完整URL
  const fullUrl = `${API_CONFIG.baseURL}${url}`;

  // 构建请求头
  const requestHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
    'User-Agent': 'NextJS-Server/1.0',
    ...headers
  };

  // 添加租户ID
  requestHeaders['tenant-id'] = tenantId || API_CONFIG.defaultTenantId;

  // 处理认证
  if (requireAuth) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    
    if (!accessToken) {
      throw new Error('未找到访问令牌，请先登录');
    }
    
    requestHeaders['Authorization'] = `Bearer ${accessToken}`;
  }

  // 构建请求选项
  const requestOptions = {
    method,
    headers: requestHeaders,
    ...fetchOptions
  };

  // 添加请求体
  if (body) {
    if (typeof body === 'object') {
      requestOptions.body = JSON.stringify(body);
    } else {
      requestOptions.body = body;
    }
  }

  try {
    console.log(`[Server API] ${method} ${fullUrl}`);
    
    const response = await fetch(fullUrl, requestOptions);
    
    // 检查响应状态
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Server API Error] ${response.status}: ${errorText}`);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    // 处理不同类型的响应
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      
      // 处理业务错误码
      if (data.code && data.code !== 200) {
        console.error(`[Server API Business Error] Code: ${data.code}, Message: ${data.msg}`);
        throw new Error(data.msg || '业务处理失败');
      }
      
      return data;
    } else {
      // 处理二进制数据或其他格式
      return response;
    }
    
  } catch (error) {
    console.error(`[Server API Exception] ${error.message}`);
    
    // 网络错误处理
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('网络连接失败，请检查网络或稍后重试');
    }
    
    throw error;
  }
}

/**
 * 获取验证码 - 服务端版本
 * @param {string} captchaType - 验证码类型
 * @param {string} tenantId - 租户ID
 * @returns {Promise} 验证码数据
 */
export async function getCaptchaServer(captchaType = 'blockPuzzle', tenantId) {
  return serverRequest('/admin-api/system/captcha/get', {
    method: 'POST',
    body: { captchaType },
    tenantId,
    requireAuth: false
  });
}

/**
 * 用户登录 - 服务端版本
 * @param {Object} loginData - 登录数据
 * @returns {Promise} 登录结果
 */
export async function loginServer(loginData) {
  return serverRequest('/admin-api/system/auth/login', {
    method: 'POST',
    body: loginData,
    requireAuth: false
  });
}

/**
 * 获取用户信息 - 服务端版本
 * @returns {Promise} 用户信息
 */
export async function getUserInfoServer() {
  return serverRequest('/admin-api/system/auth/get-permission-info', {
    method: 'GET',
    requireAuth: true
  });
}

/**
 * 刷新令牌 - 服务端版本
 * @param {string} refreshToken - 刷新令牌
 * @returns {Promise} 新的令牌信息
 */
export async function refreshTokenServer(refreshToken) {
  return serverRequest(`/admin-api/system/auth/refresh-token?refreshToken=${refreshToken}`, {
    method: 'POST',
    requireAuth: false
  });
}
