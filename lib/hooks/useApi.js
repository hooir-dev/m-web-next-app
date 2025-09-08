/**
 * API 请求相关的 React Hooks
 * 提供统一的数据获取、加载状态管理和错误处理
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { getCaptcha, getUserInfo } from '../api/client';

/**
 * 基础 API 请求 Hook
 * @param {Function} apiFunction - API 请求函数
 * @param {Object} options - 配置选项
 * @returns {Object} 请求状态和方法
 */
export function useApiRequest(apiFunction, options = {}) {
  const {
    immediate = false,        // 是否立即执行
    onSuccess,               // 成功回调
    onError,                 // 错误回调
    deps = [],               // 依赖项数组
    defaultData = null       // 默认数据
  } = options;

  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  // 执行请求的函数
  const execute = useCallback(async (...args) => {
    if (!mountedRef.current) return;
    
    setLoading(true);
    setError(null);

    try {
      const result = await apiFunction(...args);
      
      if (!mountedRef.current) return;
      
      setData(result);
      onSuccess?.(result);
      return result;
    } catch (err) {
      if (!mountedRef.current) return;
      
      console.error('API Request Error:', err);
      setError(err);
      onError?.(err);
      throw err;
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [apiFunction, onSuccess, onError]);

  // 重置状态
  const reset = useCallback(() => {
    setData(defaultData);
    setLoading(false);
    setError(null);
  }, [defaultData]);

  // 立即执行或依赖变化时执行
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute, ...deps]);

  // 组件卸载时设置标识
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    // 便捷的状态判断
    isIdle: !loading && !error && data === defaultData,
    isSuccess: !loading && !error && data !== defaultData,
    isError: !loading && !!error
  };
}

/**
 * 验证码获取 Hook
 * @param {string} captchaType - 验证码类型
 * @returns {Object} 验证码相关状态和方法
 */
export function useCaptcha(captchaType = 'blockPuzzle') {
  const {
    data: captchaData,
    loading: captchaLoading,
    error: captchaError,
    execute: fetchCaptcha,
    reset: resetCaptcha
  } = useApiRequest(getCaptcha, {
    onSuccess: (data) => {
      console.log('验证码获取成功:', data);
    },
    onError: (error) => {
      console.error('验证码获取失败:', error.message);
    }
  });

  // 获取验证码的便捷方法
  const getCaptchaData = useCallback(() => {
    return fetchCaptcha(captchaType);
  }, [fetchCaptcha, captchaType]);

  // 刷新验证码
  const refreshCaptcha = useCallback(() => {
    resetCaptcha();
    return getCaptchaData();
  }, [resetCaptcha, getCaptchaData]);

  return {
    captchaData,
    captchaLoading,
    captchaError,
    getCaptchaData,
    refreshCaptcha,
    // 便捷的验证码相关数据
    captchaImage: captchaData?.data?.captchaImage,
    captchaKey: captchaData?.data?.captchaKey,
    hasCaptcha: !!captchaData?.data
  };
}

/**
 * 用户信息获取 Hook
 * @param {boolean} immediate - 是否立即获取
 * @returns {Object} 用户信息相关状态和方法
 */
export function useUserInfo(immediate = true) {
  const {
    data: userInfo,
    loading: userLoading,
    error: userError,
    execute: fetchUserInfo,
    reset: resetUserInfo
  } = useApiRequest(getUserInfo, {
    immediate,
    onSuccess: (data) => {
      console.log('用户信息获取成功:', data);
    },
    onError: (error) => {
      console.error('用户信息获取失败:', error.message);
    }
  });

  return {
    userInfo,
    userLoading,
    userError,
    fetchUserInfo,
    resetUserInfo,
    // 便捷的用户相关数据
    user: userInfo?.data?.user,
    permissions: userInfo?.data?.permissions,
    roles: userInfo?.data?.roles,
    isLoggedIn: !!userInfo?.data?.user
  };
}

/**
 * 分页数据获取 Hook
 * @param {Function} apiFunction - API 请求函数
 * @param {Object} initialParams - 初始参数
 * @returns {Object} 分页相关状态和方法
 */
export function usePagination(apiFunction, initialParams = {}) {
  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 10,
    ...initialParams
  });

  const {
    data,
    loading,
    error,
    execute,
    reset
  } = useApiRequest(apiFunction, {
    deps: [params]
  });

  // 改变页码
  const changePage = useCallback((pageNo) => {
    setParams(prev => ({ ...prev, pageNo }));
  }, []);

  // 改变页面大小
  const changePageSize = useCallback((pageSize) => {
    setParams(prev => ({ ...prev, pageSize, pageNo: 1 }));
  }, []);

  // 更新查询参数
  const updateParams = useCallback((newParams) => {
    setParams(prev => ({ ...prev, ...newParams, pageNo: 1 }));
  }, []);

  // 刷新当前页
  const refresh = useCallback(() => {
    return execute(params);
  }, [execute, params]);

  // 自动执行查询
  useEffect(() => {
    refresh();
  }, [params]);

  return {
    data,
    loading,
    error,
    params,
    changePage,
    changePageSize,
    updateParams,
    refresh,
    reset,
    // 便捷的分页数据
    list: data?.data?.list || [],
    total: data?.data?.total || 0,
    current: params.pageNo,
    pageSize: params.pageSize
  };
}

/**
 * 防抖 Hook
 * @param {*} value - 需要防抖的值
 * @param {number} delay - 延迟时间
 * @returns {*} 防抖后的值
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * 本地存储 Hook
 * @param {string} key - 存储键名
 * @param {*} initialValue - 初始值
 * @returns {Array} [value, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}
