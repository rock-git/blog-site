---
title: "Next.js 入门指南"
date: "2024-03-18"
category: "技术"
tags: ["Next.js", "React", "前端"]
excerpt: "快速上手 Next.js，了解 App Router 的核心概念。"
---

## Next.js 简介

Next.js 是一个基于 React 的全栈框架，提供了丰富的开箱即用功能。

### 核心特性

#### App Router

Next.js 13 引入了全新的 App Router，基于文件系统的路由：

```
app/
├── page.tsx        # /
├── about/
│   └── page.tsx    # /about
└── posts/
    └── [slug]/
        └── page.tsx # /posts/:slug
```

#### 服务端组件

默认情况下，App Router 中的组件都是**服务端组件**，可以直接访问数据库、文件系统等。

#### 静态生成

通过 `generateStaticParams`，可以在构建时预渲染页面：

```typescript
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

### 开始使用

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

这样就能在 `http://localhost:3000` 看到你的应用了。
