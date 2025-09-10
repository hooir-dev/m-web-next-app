import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并 Tailwind CSS 类名的工具函数
 * @param {...string} inputs - 类名参数
 * @returns {string} 合并后的类名
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * 生成结构化数据的工具函数
 * @param {Object} data - 结构化数据对象
 * @returns {Object} 适用于 dangerouslySetInnerHTML 的对象
 */
export function generateStructuredData(data) {
  return {
    __html: JSON.stringify(data, null, 0)
  }
}

/**
 * 检查是否为生产环境
 * @returns {boolean}
 */
export function isProduction() {
  return process.env.NODE_ENV === 'production'
}

/**
 * 检查是否为开发环境
 * @returns {boolean}
 */
export function isDevelopment() {
  return process.env.NODE_ENV === 'development'
}
