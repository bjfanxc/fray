# 吵架必赢

一个基于 Next.js、Tailwind CSS 和 Shadcn/UI 构建的智能反击助手应用。

## 功能特性

- 🎯 **智能反击**: 输入对方话语，AI 生成有力的反驳论据
- 💡 **使用提示**: 详细的使用指南和建议
- 🎨 **现代 UI**: 使用 Tailwind CSS 和 Shadcn/UI 构建的美观界面
- ⚡ **实时响应**: 快速生成反击话术
- 📱 **响应式设计**: 支持各种设备尺寸

## 技术栈

- **框架**: Next.js 14
- **样式**: Tailwind CSS
- **组件库**: Shadcn/UI
- **图标**: Lucide React
- **语言**: TypeScript

## 安装和运行

1. **克隆项目**
   ```bash
   cd win-every-argument-app
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或
   yarn install
   ```

3. **配置环境变量** (可选)
   ```bash
   # 创建环境变量文件
   touch .env.local
   
   # 编辑 .env.local 文件，添加你的 Dify API 配置
   # DIFY_API_URL=https://api.dify.ai/v1
   # DIFY_API_KEY=your_dify_api_key_here
   ```
   
   **注意**: 如果不配置 Dify API Key，应用将使用模拟数据进行演示。

4. **启动开发服务器**
   ```bash
   npm run dev
   # 或
   yarn dev
   ```

5. **访问应用**
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 使用说明

1. 在输入框中输入对方的话语或观点
2. 点击"反击"按钮或按 Enter 键
3. AI 将生成有力的反击话术
4. 根据实际情况灵活运用生成的内容

## Dify API 集成

应用已经内置了完整的 Dify API 集成功能。要使用真实的 Dify API：

### 1. 获取 Dify API Key
- 访问 [Dify.ai](https://dify.ai) 注册账号
- 创建一个聊天助手应用
- 获取 API Key

### 2. 配置环境变量
在项目根目录创建 `.env.local` 文件：

```bash
DIFY_API_URL=https://api.dify.ai/v1
DIFY_API_KEY=your_actual_api_key_here
```

### 3. 重启应用
```bash
npm run dev
```

### 4. API 路由说明
应用已经包含了完整的 API 路由 (`src/app/api/dify/route.ts`)，具有以下特性：

- ✅ 自动检测 API Key 配置
- ✅ 如果未配置，自动降级到模拟响应
- ✅ 错误处理和重试机制
- ✅ 支持 blocking 模式
- ✅ 完整的 TypeScript 类型支持

**无需额外配置，开箱即用！**

## 项目结构

```
win-every-argument-app/
├── src/
│   ├── app/
│   │   ├── globals.css          # 全局样式
│   │   ├── layout.tsx           # 根布局
│   │   └── page.tsx             # 主页面
│   ├── components/
│   │   └── ui/                  # Shadcn/UI 组件
│   │       ├── alert.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   └── lib/
│       └── utils.ts             # 工具函数
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 构建和部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

## 注意事项

- 本工具仅供学习交流使用
- 请理性讨论，避免恶意争吵
- 生成的内容仅供参考，请结合实际情况使用

## 许可证

MIT License 