'use client'

import * as React from 'react'
import { useT } from '../../i18n/client'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer/client'
import { Link } from '../components/Link/client'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const { t, i18n } = useT('second-client-page')
  
  return (
    <>
      <main style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: '#fef3c7'
      }}>
        <div style={{
          maxWidth: '700px',
          width: '100%',
          textAlign: 'center',
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '16px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          border: '2px solid #fbbf24'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: '#fef3c7',
            borderRadius: '20px',
            marginBottom: '1rem',
            border: '1px solid #fbbf24'
          }}>
            <span style={{ fontSize: '12px', color: '#92400e', fontWeight: '600' }}>
              🎯 CLIENT COMPONENT
            </span>
          </div>
          
          <Header heading={t('h1')} />
          
          <div style={{
            margin: '2rem 0',
            padding: '1.5rem',
            backgroundColor: '#fffbeb',
            borderRadius: '12px',
            border: '1px solid #fed7aa',
            textAlign: 'left'
          }}>
            <h3 style={{
              margin: '0 0 1rem 0',
              color: '#9a3412',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              ⚡ 客户端组件特性
            </h3>
            <ul style={{
              margin: 0,
              paddingLeft: '1.2rem',
              color: '#c2410c',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              <li>使用 'use client' 指令</li>
              <li>支持 React Hooks (useState, useEffect 等)</li>
              <li>可以处理浏览器事件和交互</li>
              <li>访问浏览器 API (localStorage, window 等)</li>
              <li>实时国际化语言切换</li>
            </ul>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center'
          }}>
            <Link href="/">
              <button type="button" style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(245, 158, 11, 0.3)',
                minWidth: '200px'
              }}>
                🏠 {t('back-to-home')}
              </button>
            </Link>
            
            <button 
              type="button" 
              onClick={() => router.push(`/${i18n.resolvedLanguage}/client-page`)}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)',
                minWidth: '200px'
              }}
            >
              📱 {t('to-client-page')}
            </button>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#6b7280'
          }}>
            💡 当前语言: <strong>{i18n.resolvedLanguage}</strong> | 
            渲染模式: <strong>客户端渲染 (CSR)</strong>
          </div>
        </div>
      </main>
      <Footer path="/second-client-page" />
    </>
  )
}