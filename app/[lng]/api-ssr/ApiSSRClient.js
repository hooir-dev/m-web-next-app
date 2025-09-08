'use client';

/**
 * SSR 页面的客户端交互组件
 * 在服务端渲染页面中提供客户端 API 交互功能
 */

import { useState } from 'react';
import { useApiRequest } from '@/lib/hooks/useApi';
import { getCaptcha } from '@/lib/api/client';

export default function ApiSSRClient({ 
  initialData, 
  serverError, 
  apiType: initialApiType 
}) {
  const [showServerData, setShowServerData] = useState(true);
  const [apiType, setApiType] = useState(initialApiType || 'captcha');

  // 使用客户端 API Hook
  const {
    data: clientApiData,
    loading: apiLoading,
    error: apiError,
    execute: fetchData,
    reset: resetData,
    isSuccess: hasClientData
  } = useApiRequest(getCaptcha);

  // 处理客户端获取数据
  const handleFetchClientData = async () => {
    try {
      await fetchData('blockPuzzle');
      console.log('客户端 API 数据获取成功');
    } catch (error) {
      console.error('客户端 API 数据获取失败:', error);
    }
  };

  // 处理重置数据
  const handleResetClientData = () => {
    resetData();
    console.log('客户端数据已重置');
  };

  return (
    <div className="space-y-6">
      {/* 数据源切换 */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          数据来源对比
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowServerData(true)}
            className={`px-3 py-2 rounded text-sm transition-colors ${
              showServerData 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            服务端数据 (SSR)
          </button>
          <button
            onClick={() => setShowServerData(false)}
            className={`px-3 py-2 rounded text-sm transition-colors ${
              !showServerData 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            客户端数据 (CSR)
          </button>
        </div>
      </div>

      {/* 服务端数据展示 */}
      {showServerData && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            服务端预渲染数据 (SSR)
          </h3>
          
          {serverError ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">
                服务端错误: {serverError}
              </p>
            </div>
          ) : initialData ? (
            <div className="space-y-3">
              {/* 数据概览 */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-800">✅ 预渲染成功</span>
                  <span className="text-xs text-green-600">页面加载时已存在</span>
                </div>
                <div className="text-sm text-green-700 space-y-1">
                  <div>响应码: <span className="font-mono">{initialData.code}</span></div>
                  <div>数据大小: <span className="font-mono">{Math.round(JSON.stringify(initialData).length / 1024)}KB</span></div>
                  <div>包含字段: {Object.keys(initialData.data || {}).length} 个</div>
                </div>
              </div>
              
              {/* 完整数据 */}
              <details className="bg-gray-50 rounded-lg">
                <summary className="p-3 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-100">
                  查看完整服务端数据
                </summary>
                <div className="px-3 pb-3">
                  <pre className="text-xs text-gray-800 overflow-auto max-h-32">
                    {JSON.stringify(initialData, null, 2)}
                  </pre>
                </div>
              </details>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              <p className="text-sm">服务端未获取到数据</p>
            </div>
          )}
        </div>
      )}

      {/* 客户端数据展示 */}
      {!showServerData && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            客户端动态数据 (CSR)
          </h3>

          {/* API 类型选择 */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              API 接口类型
            </label>
            <select
              value={apiType}
              onChange={(e) => setApiType(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="captcha">验证码接口</option>
              <option value="userInfo">用户信息接口</option>
              <option value="systemInfo">系统信息接口</option>
            </select>
          </div>

          {/* 操作按钮 */}
          <div className="space-y-2 mb-4">
            <button
              onClick={handleFetchClientData}
              disabled={apiLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-3 rounded text-sm transition-colors"
            >
              {apiLoading ? '请求中...' : '客户端获取数据'}
            </button>

            {hasClientData && (
              <button
                onClick={handleResetClientData}
                disabled={apiLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-2 px-3 rounded text-sm transition-colors"
              >
                清空客户端数据
              </button>
            )}
          </div>

          {/* 客户端数据展示 */}
          {hasClientData && clientApiData && (
            <div className="mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-800">✅ 客户端获取成功</span>
                  <span className="text-xs text-blue-600">动态请求获得</span>
                </div>
                <div className="text-sm text-blue-700 space-y-1">
                  <div>响应码: <span className="font-mono">{clientApiData.code}</span></div>
                  <div>数据大小: <span className="font-mono">{Math.round(JSON.stringify(clientApiData).length / 1024)}KB</span></div>
                  {clientApiData.data?.captchaKey && (
                    <div>密钥: <span className="font-mono text-xs">{clientApiData.data.captchaKey.substring(0, 20)}...</span></div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 客户端错误信息 */}
          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
              <h4 className="text-xs font-medium text-red-800 mb-1">
                客户端请求错误
              </h4>
              <p className="text-red-700 text-xs">
                {apiError.message || '获取数据失败'}
              </p>
            </div>
          )}

          {/* 客户端状态 */}
          <div className="p-3 bg-gray-50 rounded">
            <h4 className="text-xs font-medium text-gray-700 mb-2">
              客户端请求状态
            </h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">请求状态:</span>
                <span className={`font-medium ${apiLoading ? 'text-blue-600' : 'text-gray-800'}`}>
                  {apiLoading ? '请求中' : '空闲'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">数据状态:</span>
                <span className={`font-medium ${hasClientData ? 'text-blue-600' : 'text-gray-800'}`}>
                  {hasClientData ? '已获取' : '未获取'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">错误状态:</span>
                <span className={`font-medium ${apiError ? 'text-red-600' : 'text-gray-800'}`}>
                  {apiError ? '有错误' : '正常'}
                </span>
              </div>
            </div>
          </div>

          {/* 空状态 */}
          {!hasClientData && !apiLoading && !apiError && (
            <div className="text-center py-6 text-gray-400">
              <svg className="mx-auto h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <p className="text-xs">点击按钮获取客户端数据</p>
            </div>
          )}
        </div>
      )}

      {/* 对比说明 */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          SSR vs CSR 数据对比
        </h3>
        <div className="text-xs text-blue-700 space-y-1">
          <div><strong>服务端数据 (SSR):</strong> 页面加载时已存在，SEO 友好，首屏快</div>
          <div><strong>客户端数据 (CSR):</strong> 动态获取，交互性强，实时更新</div>
          <div><strong>混合模式:</strong> 结合两者优势，提供最佳用户体验</div>
        </div>
      </div>
    </div>
  );
}