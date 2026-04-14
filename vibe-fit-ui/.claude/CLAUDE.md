# React Native + Expo 项目开发规范

## 项目上下文

- **Figma 设计稿**: https://www.figma.com/design/4rAkwQRcYRJaybgbniKete/Untitled?node-id=0-1&p=f&t=LQsmMO1GkBJqvQKJ-0
- **当前开发重点**: 实现 Soft Pop 风格的体重记录页面（目标：73.5kg 记录 UI）

## 技术栈

- React Native + Expo + TypeScript + tailwindcss（禁止使用 `any`）
- 状态管理：Zustand；路由：Expo Router；请求：axios（统一走 `src/api/`）
- 路径别名：`@/` 指向 `src/`，禁止使用超过两层的相对路径 `../../`

## 目录结构

```
src/
├── types/          # 全局类型（api.ts / models.ts / navigation.ts / common.ts）
├── api/            # 接口层（client.ts + 按模块拆分）
├── store/          # Zustand store（按模块拆分）
├── hooks/          # 自定义 Hook（文件名和函数名必须以 use 开头）
├── components/
│   ├── ui/         # 原子组件，无业务逻辑，只接收 props
│   ├── common/     # 跨页面业务组件，可引用 hooks/store，禁止直接调用 api
│   └── [模块名]/   # 业务专属组件，禁止被其他模块引用
├── app/        # 页面层，每个页面一个文件夹
│   ├── (auth)/             # 登录模块
│   ├── (onboarding)/       # 初始化模块
│   └── (main)/             # 正式业务模块
│        └── index.tsx      # 主页面模块
├── navigation/     # 路由配置
├── utils/          # 纯函数，无副作用，无 store/api 引用
├── constants/      # 颜色、间距、字体 token（禁止业务代码硬编码数值）
└── assets/         # 图片、字体、图标
```

@.claude/rules/reuse.md
@.claude/rules/workflow.md
@.claude/rules/code-style.md
@.claude/rules/logs.md
