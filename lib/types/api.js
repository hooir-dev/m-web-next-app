/**
 * API 相关的类型定义和常量
 * 提供统一的数据结构定义和错误码管理
 */

// API 响应状态码
export const API_CODES = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BUSINESS_ERROR: 1000
};

// 验证码类型
export const CAPTCHA_TYPES = {
  BLOCK_PUZZLE: 'blockPuzzle',
  CLICK_WORD: 'clickWord',
  SLIDER: 'slider'
};

// 请求方法
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
};

// 错误类型
export const ERROR_TYPES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  BUSINESS_ERROR: 'BUSINESS_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR'
};

// 错误消息映射
export const ERROR_MESSAGES = {
  [ERROR_TYPES.NETWORK_ERROR]: '网络连接失败，请检查网络或稍后重试',
  [ERROR_TYPES.TIMEOUT_ERROR]: '请求超时，请稍后重试',
  [ERROR_TYPES.AUTH_ERROR]: '认证失败，请重新登录',
  [ERROR_TYPES.BUSINESS_ERROR]: '业务处理失败',
  [ERROR_TYPES.VALIDATION_ERROR]: '数据验证失败',
  [ERROR_TYPES.SERVER_ERROR]: '服务器内部错误'
};

/**
 * API 响应数据结构
 * @typedef {Object} ApiResponse
 * @property {number} code - 响应码
 * @property {*} data - 响应数据
 * @property {string} msg - 响应消息
 * @property {boolean} success - 是否成功
 */

/**
 * 验证码响应数据结构
 * @typedef {Object} CaptchaData
 * @property {string} captchaImage - 验证码图片 base64
 * @property {string} captchaKey - 验证码密钥
 * @property {string} captchaType - 验证码类型
 * @property {number} expireTime - 过期时间（秒）
 */

/**
 * 用户信息数据结构
 * @typedef {Object} UserInfo
 * @property {number} id - 用户ID
 * @property {string} username - 用户名
 * @property {string} nickname - 昵称
 * @property {string} email - 邮箱
 * @property {string} avatar - 头像URL
 * @property {Array<string>} roles - 角色列表
 * @property {Array<string>} permissions - 权限列表
 * @property {string} tenantId - 租户ID
 */

/**
 * 登录请求数据结构
 * @typedef {Object} LoginRequest
 * @property {string} username - 用户名
 * @property {string} password - 密码
 * @property {string} captchaKey - 验证码密钥
 * @property {string} captchaValue - 验证码值
 * @property {string} tenantId - 租户ID
 */

/**
 * 登录响应数据结构
 * @typedef {Object} LoginResponse
 * @property {string} accessToken - 访问令牌
 * @property {string} refreshToken - 刷新令牌
 * @property {number} expiresIn - 过期时间（秒）
 * @property {UserInfo} user - 用户信息
 */

/**
 * 分页请求参数
 * @typedef {Object} PaginationParams
 * @property {number} pageNo - 页码（从1开始）
 * @property {number} pageSize - 每页大小
 * @property {string} [orderBy] - 排序字段
 * @property {string} [orderDirection] - 排序方向 asc/desc
 */

/**
 * 分页响应数据结构
 * @typedef {Object} PaginationResponse
 * @property {Array} list - 数据列表
 * @property {number} total - 总数
 * @property {number} pageNo - 当前页码
 * @property {number} pageSize - 每页大小
 * @property {number} totalPages - 总页数
 */

/**
 * API 请求配置
 * @typedef {Object} ApiRequestConfig
 * @property {string} method - 请求方法
 * @property {Object} [headers] - 请求头
 * @property {*} [body] - 请求体
 * @property {string} [tenantId] - 租户ID
 * @property {boolean} [requireAuth] - 是否需要认证
 * @property {number} [timeout] - 超时时间
 */

/**
 * Hook 返回状态
 * @typedef {Object} ApiHookState
 * @property {*} data - 数据
 * @property {boolean} loading - 加载状态
 * @property {Error|null} error - 错误信息
 * @property {Function} execute - 执行函数
 * @property {Function} reset - 重置函数
 * @property {boolean} isIdle - 空闲状态
 * @property {boolean} isSuccess - 成功状态
 * @property {boolean} isError - 错误状态
 */

// 导出所有类型定义（在 JavaScript 中作为注释存在）
export const Types = {
  ApiResponse: 'ApiResponse',
  CaptchaData: 'CaptchaData',
  UserInfo: 'UserInfo',
  LoginRequest: 'LoginRequest',
  LoginResponse: 'LoginResponse',
  PaginationParams: 'PaginationParams',
  PaginationResponse: 'PaginationResponse',
  ApiRequestConfig: 'ApiRequestConfig',
  ApiHookState: 'ApiHookState'
};

// 验证函数
export const validators = {
  /**
   * 验证邮箱格式
   * @param {string} email - 邮箱
   * @returns {boolean} 是否有效
   */
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * 验证用户名格式（字母、数字、下划线，3-20位）
   * @param {string} username - 用户名
   * @returns {boolean} 是否有效
   */
  isValidUsername: (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  },

  /**
   * 验证密码强度（至少8位，包含字母和数字）
   * @param {string} password - 密码
   * @returns {boolean} 是否有效
   */
  isValidPassword: (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  },

  /**
   * 验证分页参数
   * @param {PaginationParams} params - 分页参数
   * @returns {boolean} 是否有效
   */
  isValidPagination: (params) => {
    return (
      params &&
      typeof params.pageNo === 'number' &&
      typeof params.pageSize === 'number' &&
      params.pageNo >= 1 &&
      params.pageSize >= 1 &&
      params.pageSize <= 100
    );
  }
};

// 工具函数
export const utils = {
  /**
   * 格式化 API 错误
   * @param {Error} error - 原始错误
   * @returns {Object} 格式化后的错误
   */
  formatError: (error) => {
    let type = ERROR_TYPES.SERVER_ERROR;
    let message = error.message || '未知错误';

    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      type = ERROR_TYPES.NETWORK_ERROR;
      message = ERROR_MESSAGES[type];
    } else if (error.message.includes('timeout')) {
      type = ERROR_TYPES.TIMEOUT_ERROR;
      message = ERROR_MESSAGES[type];
    } else if (error.message.includes('401') || error.message.includes('未授权')) {
      type = ERROR_TYPES.AUTH_ERROR;
      message = ERROR_MESSAGES[type];
    }

    return {
      type,
      message,
      originalError: error,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * 构建查询字符串
   * @param {Object} params - 参数对象
   * @returns {string} 查询字符串
   */
  buildQueryString: (params) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    
    return searchParams.toString();
  },

  /**
   * 深拷贝对象
   * @param {*} obj - 要拷贝的对象
   * @returns {*} 拷贝后的对象
   */
  deepClone: (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Array) return obj.map(item => utils.deepClone(item));
    if (typeof obj === 'object') {
      const clonedObj = {};
      Object.keys(obj).forEach(key => {
        clonedObj[key] = utils.deepClone(obj[key]);
      });
      return clonedObj;
    }
  },

  /**
   * 防抖函数
   * @param {Function} func - 要防抖的函数
   * @param {number} wait - 等待时间
   * @returns {Function} 防抖后的函数
   */
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * 节流函数
   * @param {Function} func - 要节流的函数
   * @param {number} limit - 时间限制
   * @returns {Function} 节流后的函数
   */
  throttle: (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};
