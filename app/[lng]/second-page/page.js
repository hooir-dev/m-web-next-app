import { getT } from '../../i18n'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Link } from '../components/Link'

export async function generateMetadata() {
  const { t } = await getT('second-page')
  return { title: t('h1') }
}

export default async function Page() {
  const { t } = await getT('second-page')
  return (
    <>
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <Header heading={t('h1')} />
          
          <div style={{
            margin: '2rem 0',
            padding: '1.5rem',
            backgroundColor: '#f1f5f9',
            borderRadius: '8px',
            border: '1px solid #cbd5e1'
          }}>
            <p style={{
              margin: 0,
              color: '#475569',
              fontSize: '16px',
              lineHeight: '1.6'
            }}>
              这是第二个页面的示例，展示了 Next.js 13 App Router 的路由功能和国际化支持。
            </p>
          </div>

          <Link href="/">
            <button type="button" style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)'
            }}>
              🏠 {t('back-to-home')}
            </button>
          </Link>
        </div>
      </main>
      <Footer path="/second-page" />
    </>
  )
}