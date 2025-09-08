# Next.js 应用

简化架构的 Next.js 前端应用。

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发环境

根据你的后端配置选择启动方式：

```bash
pnpm run dev
```

### 生产环境

```bash
# 构建应用
pnpm run build

# 启动生产服务
pnpm start
```

## 🏗️ 架构说明

### 简化架构
```
客户端浏览器 → Next.js 应用 → nginx 代理 → Java 后端 API
```

### 特点
- ✅ **无中间层**: 去除了 Next.js API Routes，直接代理到后端
- ✅ **简单认证**: 不在 Next.js 中做 JWT 验证，完全由后端处理
- ✅ **开发代理**: 本地开发自动代理 API 请求
- ✅ **生产代理**: 生产环境通过 nginx 统一代理

## 📁 项目结构

```
├── app/                    # Next.js App Router
│   ├── [lng]/             # 国际化路由
│   │   ├── captcha-demo/  # 客户端 API 调用示例
│   │   └── captcha-ssr/   # 服务端 API 调用示例
│   └── i18n/              # 国际化配置
├── lib/                   # 工具库
│   ├── api/              # API 调用封装
│   │   ├── client.js     # 客户端 API
│   │   └── server.js     # 服务端 API
│   ├── hooks/            # React Hooks
│   │   └── useApi.js     # API 相关 Hooks
│   └── types/            # 类型定义
│       └── api.js        # API 类型和工具
├── middleware.js         # Next.js 中间件（仅国际化）
├── next.config.js        # Next.js 配置（含开发代理）
└── nginx.conf.example    # nginx 配置示例
```