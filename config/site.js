const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.manetmesh.com";

const GITHUB_URL = 'https://github.com/manetmesh'
const LINKEDIN_URL = 'https://www.linkedin.com/company/manetmesh'
const TWITTER_URL = 'https://twitter.com/manetmesh'
const EMAIL_URL = 'mailto:contact@manetmesh.com'

export const siteConfig = {
  name: "MANETmesh Technologies",
  url: BASE_URL,
  authors: [
    {
      name: "MANETmesh Technologies",
      url: "https://www.manetmesh.com",
    }
  ],
  creator: '@manetmesh',
  socialLinks: {
    github: GITHUB_URL,
    linkedin: LINKEDIN_URL,
    twitter: TWITTER_URL,
    email: EMAIL_URL,
  },
  themeColors: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a365d' },
  ],
  defaultNextTheme: 'light', // next-theme option: system | dark | light
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
  // 公司信息
  company: {
    foundingDate: "2020",
    industry: "Technology",
    address: {
      country: "US"
    }
  },
  // SEO 默认设置
  seo: {
    defaultTitle: "MANETmesh Technologies",
    titleTemplate: "%s | MANETmesh",
    defaultDescription: "Innovative Mobile Ad-hoc Network (MANET) solutions for infrastructure-free communications",
    defaultKeywords: "MANET, mesh network, wireless technology, mobile communications, ad-hoc network",
  }
}
