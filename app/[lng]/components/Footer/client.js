'use client'

import { FooterBase } from './FooterBase'
import { useT } from '../../../i18n/client'

export const Footer = ({ path }) => {
  const { t, i18n } = useT('common')
  return <FooterBase t={t} lng={i18n.resolvedLanguage} path={path} />
}
