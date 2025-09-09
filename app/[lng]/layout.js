import './global.css'

import { dir } from 'i18next'
import { languages } from '../i18n/settings'
import { getT } from '../i18n'
import GoogleAnalytics from "@/app/GoogleAnalytics";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export async function generateMetadata() {
  const { t } = await getT()
  return {
    title: t('title'),
    description: 'MANETmesh Technologles'
  }
}

export default async function RootLayout({
  children,
  params
}) {
  const { lng } = await params
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>
        {children}
        {process.env.NODE_ENV === "development" ? (
          <></>
        ) : (
          <>
            <GoogleAnalytics />
          </>
        )}
      </body>
    </html>
  )
}
