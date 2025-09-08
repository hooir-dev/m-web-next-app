import { Trans } from 'react-i18next/TransWithoutContext'
import { getT } from '../../i18n'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Link } from '../components/Link'

export default async function Page({ params }) {
  const { lng } = await params;
  const { t } = await getT(lng)

  return (
    <>
      <main>
        <Header></Header>
        {/* 返回首页按钮 */}
        <div className="mb-5">
          <Link href="/">
            <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md text-sm cursor-pointer transition-colors duration-200 hover:bg-gray-200">
              返回首页
            </button>
          </Link>
        </div>

        {/* 导航按钮区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full mx-auto">
          {/* 基础页面示例 */}
          <div className="p-5 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="m-0 mb-3 text-base font-semibold">
              📄 基础页面示例
            </h3>
            <div className="flex flex-col gap-2">
              <Link href="/second-page">
                <button type="button" className="w-full px-3 py-2 bg-gray-600 text-white border-0 rounded-md text-sm cursor-pointer hover:bg-gray-700 transition-colors duration-200">
                  {t('to-second-page')}
                </button>
              </Link>
              <Link href="/client-page">
                <button type="button" className="w-full px-3 py-2 bg-gray-600 text-white border-0 rounded-md text-sm cursor-pointer hover:bg-gray-700 transition-colors duration-200">
                  {t('to-client-page')}
                </button>
              </Link>
            </div>
          </div>

          {/* API 调用示例 */}
          <div className="p-5 border border-gray-200 rounded-lg bg-blue-50">
            <h3 className="m-0 mb-3 text-base font-semibold">
              🚀 API 调用示例
            </h3>
            <div className="flex flex-col gap-2">
              <Link href="/api-demo">
                <button type="button" style={{
                  width: '100%',
                  padding: '10px 12px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}>
                  📱 客户端 API 示例
                </button>
              </Link>
              <Link href="/api-ssr">
                <button type="button" style={{
                  width: '100%',
                  padding: '10px 12px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}>
                  ⚡ 服务端 API 示例
                </button>
              </Link>
            </div>
            <p style={{
              margin: '12px 0 0 0',
              fontSize: '12px',
              color: '#6b7280',
              lineHeight: '1.4'
            }}>
              展示客户端和服务端 API 调用的不同方式和优势对比
            </p>
          </div>
        </div>
        <Footer path="/test"></Footer>
      </main>
    </>
  )
}
