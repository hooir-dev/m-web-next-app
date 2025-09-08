/**
 * 服务端渲染 API 调用示例页面
 * 展示如何在服务端预获取 API 数据并渲染到页面
 */

import { getCaptchaServer } from '@/lib/api/server';
import ApiSSRClient from './ApiSSRClient';

// 这是一个服务端组件，在服务器端执行
export default async function ServerApiDemoPage({ params, searchParams }) {
  const { lng } = params;
  const apiType = searchParams?.type || 'captcha';
  
  let initialApiData = null;
  let serverError = null;
  const renderTime = new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  try {
    console.log(`[SSR] 服务端获取数据: apiType=${apiType}`);
    
    // 在服务端预获取 API 数据
    initialApiData = await getCaptchaServer('blockPuzzle');
    
    console.log('[SSR] 服务端数据获取成功');
  } catch (error) {
    console.error('[SSR] 服务端数据获取失败:', error);
    serverError = error.message;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            服务端渲染 API 调用示例
          </h1>
          <p className="text-gray-600">
            演示如何在 Next.js 服务端预获取 API 数据并直接渲染到页面
          </p>
          <div className="mt-2 text-sm text-green-600">
            🚀 服务端直调: {process.env.API_BASE_URL || 'http://admin.manetmesh.com/prod-api'}
          </div>
          <div className="mt-1 text-sm text-blue-600">
            ⏰ 渲染时间: {renderTime}
          </div>
        </div>

        {/* 服务端状态展示 */}
        <div className="mb-8">
          {serverError ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    服务端数据获取失败
                  </h3>
                  <p className="mt-1 text-sm text-red-700">
                    {serverError}
                  </p>
                </div>
              </div>
            </div>
          ) : initialApiData && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    服务端数据预获取成功
                  </h3>
                  <p className="mt-1 text-sm text-green-700">
                    API 数据已在服务端成功获取并预渲染到页面中，提升首屏加载速度
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：服务端信息 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              服务端渲染信息
            </h2>

            <div className="space-y-4">
              {/* 渲染时间 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  页面渲染时间
                </h3>
                <div className="bg-gray-100 rounded p-3 font-mono text-sm">
                  {renderTime}
                </div>
              </div>

              {/* 请求参数 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  请求参数
                </h3>
                <div className="bg-gray-100 rounded p-3">
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">语言:</span>
                      <span className="font-medium">{lng}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">API 类型:</span>
                      <span className="font-medium">{apiType}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 服务端状态 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  服务端状态
                </h3>
                <div className="bg-gray-100 rounded p-3">
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">数据获取:</span>
                      <span className={`font-medium ${initialApiData ? 'text-green-600' : 'text-red-600'}`}>
                        {initialApiData ? '成功' : '失败'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">渲染模式:</span>
                      <span className="font-medium text-blue-600">SSR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">数据大小:</span>
                      <span className="font-medium text-gray-800">
                        {initialApiData ? `${Math.round(JSON.stringify(initialApiData).length / 1024)}KB` : '0KB'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 切换链接 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  切换 API 类型
                </h3>
                <div className="space-y-2">
                  <a
                    href={`/${lng}/api-ssr?type=captcha`}
                    className={`block px-3 py-2 rounded text-sm text-center transition-colors ${
                      apiType === 'captcha' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    验证码接口
                  </a>
                  <a
                    href={`/${lng}/api-ssr?type=userInfo`}
                    className={`block px-3 py-2 rounded text-sm text-center transition-colors ${
                      apiType === 'userInfo' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    用户信息接口
                  </a>
                  <a
                    href={`/${lng}/api-ssr?type=systemInfo`}
                    className={`block px-3 py-2 rounded text-sm text-center transition-colors ${
                      apiType === 'systemInfo' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    系统信息接口
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：数据展示和客户端交互 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              数据展示与交互
            </h2>

            {/* 服务端预渲染的数据 */}
            {initialApiData && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  服务端预渲染数据
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-green-700">响应码:</span>
                      <span className="font-mono text-green-800">{initialApiData.code || 200}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">响应消息:</span>
                      <span className="text-green-800">{initialApiData.msg || '成功'}</span>
                    </div>
                    {initialApiData.data?.captchaKey && (
                      <div>
                        <span className="text-green-700">数据密钥:</span>
                        <div className="font-mono text-xs text-green-800 mt-1 break-all">
                          {initialApiData.data.captchaKey}
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-green-600 mt-3">
                    ✅ 此数据在服务端渲染时获取，直接包含在 HTML 中
                  </p>
                </div>
              </div>
            )}

            {/* 客户端交互组件 */}
            <ApiSSRClient 
              initialData={initialApiData} 
              serverError={serverError}
              apiType={apiType}
            />
          </div>
        </div>

        {/* 技术说明 */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            服务端渲染技术要点
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">🚀 SSR 优势</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• SEO 友好，数据直接在 HTML 中</li>
                <li>• 首屏加载快，无需等待 API</li>
                <li>• 减少客户端请求次数</li>
                <li>• 支持无 JavaScript 环境</li>
                <li>• 更好的性能指标</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">⚡ 实现特点</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 服务端 async/await 支持</li>
                <li>• 直接调用后端 API</li>
                <li>• 错误边界处理</li>
                <li>• 混合渲染模式</li>
                <li>• 客户端交互增强</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              💡 <strong>核心优势:</strong> 数据在服务端预获取并直接渲染到 HTML，
              用户看到页面时数据已经存在，无需等待 API 请求。
            </p>
          </div>
        </div>

        {/* 导航链接 */}
        <div className="mt-8 text-center">
          <a
            href={`/${lng}/api-demo`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            查看客户端版本示例
            <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}