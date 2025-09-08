'use client';

/**
 * 客户端 API 调用示例页面
 * 展示如何在客户端使用 React Hooks 获取和渲染 API 数据
 */

import { useState } from 'react';
import { useApiRequest } from '@/lib/hooks/useApi';
import { getCaptcha } from '@/lib/api/client';

export default function ClientApiDemoPage() {
  const [apiType, setApiType] = useState('captcha');
  const [showDetails, setShowDetails] = useState(false);

  // 使用通用 API 请求 Hook
  const {
    data: apiData,
    loading: apiLoading,
    error: apiError,
    execute: fetchData,
    reset: resetData,
    isSuccess,
    isError
  } = useApiRequest(getCaptcha);

  // 处理获取数据
  const handleFetchData = async () => {
    try {
      await fetchData('blockPuzzle'); // 传递参数给 API
      console.log('API 数据获取成功');
    } catch (error) {
      console.error('API 数据获取失败:', error);
    }
  };

  // 处理重置数据
  const handleResetData = () => {
    resetData();
    console.log('数据已重置');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            客户端 API 调用示例
          </h1>
          <p className="text-gray-600">
            演示如何在 Next.js 客户端使用 React Hooks 获取和渲染 API 数据
          </p>
          <div className="mt-2 text-sm text-blue-600">
            🔗 API 端点: /prod-api/admin-api/system/captcha/get
          </div>
          <div className="mt-1 text-sm text-green-600">
            📊 展示：数据获取 → 状态管理 → 渲染展示
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：操作面板 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              API 操作面板
            </h2>

            {/* API 类型选择 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API 接口类型
              </label>
              <select
                value={apiType}
                onChange={(e) => setApiType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="captcha">系统验证码接口</option>
                <option value="userInfo">用户信息接口</option>
                <option value="systemInfo">系统信息接口</option>
              </select>
            </div>

            {/* 操作按钮 */}
            <div className="space-y-3">
              <button
                onClick={handleFetchData}
                disabled={apiLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                {apiLoading ? '请求中...' : '发起 API 请求'}
              </button>

              {apiData && (
                <button
                  onClick={handleResetData}
                  disabled={apiLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                >
                  清空数据
                </button>
              )}

              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                {showDetails ? '隐藏详情' : '显示详情'}
              </button>
            </div>

            {/* 状态显示 */}
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium text-gray-800 mb-2">请求状态</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">加载状态:</span>
                  <span className={`font-medium ${apiLoading ? 'text-blue-600' : 'text-gray-800'}`}>
                    {apiLoading ? '请求中' : '空闲'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">数据状态:</span>
                  <span className={`font-medium ${isSuccess ? 'text-green-600' : 'text-gray-800'}`}>
                    {isSuccess ? '已获取' : '未获取'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">错误状态:</span>
                  <span className={`font-medium ${isError ? 'text-red-600' : 'text-gray-800'}`}>
                    {isError ? '有错误' : '正常'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：数据展示 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              API 响应数据
            </h2>

            {/* 成功状态展示 */}
            {isSuccess && apiData && (
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <h3 className="text-sm font-medium text-green-700">
                    数据获取成功
                  </h3>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm mb-2">
                    响应码: <span className="font-mono">{apiData.code || 200}</span>
                  </p>
                  <p className="text-green-800 text-sm">
                    响应消息: {apiData.msg || '请求成功'}
                  </p>
                </div>
              </div>
            )}

            {/* 核心数据展示 */}
            {apiData?.data && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  核心数据
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  {apiData.data.captchaKey && (
                    <p className="text-blue-800 text-sm mb-1">
                      Key: <span className="font-mono text-xs">{apiData.data.captchaKey}</span>
                    </p>
                  )}
                  {apiData.data.captchaType && (
                    <p className="text-blue-800 text-sm mb-1">
                      Type: {apiData.data.captchaType}
                    </p>
                  )}
                  {apiData.data.captchaImage && (
                    <p className="text-blue-800 text-sm">
                      Image: ✅ 已获取 ({Math.round(apiData.data.captchaImage.length / 1024)}KB)
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 错误信息展示 */}
            {isError && apiError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <h3 className="text-sm font-medium text-red-800">
                    请求失败
                  </h3>
                </div>
                <p className="text-red-700 text-sm">
                  {apiError.message || 'API 请求失败'}
                </p>
              </div>
            )}

            {/* 详细信息 */}
            {showDetails && apiData && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  完整响应数据
                </h3>
                <div className="bg-gray-100 rounded p-3 overflow-auto max-h-64">
                  <pre className="text-xs text-gray-800">
                    {JSON.stringify(apiData, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* 空状态 */}
            {!apiData && !apiLoading && !apiError && (
              <div className="text-center py-8 text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p>点击"发起 API 请求"按钮开始</p>
              </div>
            )}
          </div>
        </div>

        {/* 技术说明 */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            客户端 API 调用技术要点
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">🔄 数据流程</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 用户点击按钮触发请求</li>
                <li>• Hook 管理请求状态</li>
                <li>• Axios 发送 HTTP 请求</li>
                <li>• nginx 代理到后端 API</li>
                <li>• 响应数据自动渲染</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">⚡ 技术特性</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• React Hooks 状态管理</li>
                <li>• 自动错误处理</li>
                <li>• Loading 状态展示</li>
                <li>• 响应式 UI 设计</li>
                <li>• Token 自动续期</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>核心优势:</strong> 无需 Next.js API Routes 中间层，直接通过 nginx 代理调用后端，
              减少请求链路，提升性能。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
