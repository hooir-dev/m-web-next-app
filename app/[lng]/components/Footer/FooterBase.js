import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { languages } from '../../../i18n/settings'

export const FooterBase = ({ t, lng, path = '' }) => {
  return (
    <footer style={{
      marginTop: '4rem',
      padding: '2rem',
      backgroundColor: '#1f2937',
      color: 'white',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* 语言切换 */}
        <div style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          backgroundColor: '#374151',
          borderRadius: '12px',
          border: '1px solid #4b5563'
        }}>
          <div style={{
            marginBottom: '1rem',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            🌍 语言切换
          </div>
          <div style={{
            fontSize: '14px',
            marginBottom: '1rem',
            color: '#d1d5db'
          }}>
            <Trans i18nKey="footer.languageSwitcher" t={t}>
              Switch from <strong style={{ color: '#fbbf24' }}>{{lng}}</strong> to:{' '}
            </Trans>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            {languages.filter((l) => lng !== l).map((l, index) => (
              <Link 
                key={l} 
                href={`/${l}${path}`}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6366f1',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s ease'
                }}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>

        {/* 描述信息 */}
        <div style={{
          marginBottom: '2rem',
          fontSize: '16px',
          color: '#e5e7eb',
          lineHeight: '1.6'
        }}>
          {t('footer.description')}
        </div>

        {/* 支持信息 */}
        <div style={{
          padding: '1rem',
          backgroundColor: '#111827',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#9ca3af',
          fontStyle: 'italic'
        }}>
          <Trans i18nKey="footer.helpLocize" t={t}>
            With using{' '}
            <a 
              href="https://locize.com" 
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#60a5fa',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              locize
            </a>
            {' '}you directly support the future of{' '}
            <a 
              href="https://www.i18next.com" 
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#60a5fa',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              i18next
            </a>
            .
          </Trans>
        </div>
      </div>
    </footer>
  )
}
