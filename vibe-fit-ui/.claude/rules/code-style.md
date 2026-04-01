# 编码规范

## TypeScript
- 禁止 `any`，禁止 `@ts-ignore`
- Props interface 必须命名导出，命名为 `[组件名]Props`
- 公共类型定义在 `src/types/`，禁止在组件文件内定义跨文件复用的类型
- 使用 `interface` 定义对象结构，`type` 定义联合类型/工具类型

## 组件
- 只允许函数组件，命名导出（禁止 `export default`）
- 所有公共组件（`ui/` 和 `common/`）必须有中文 JSDoc，说明用途、每个 prop 的含义
- 组件文件单文件不超过 200 行；超过 400 行必须提议拆分

## 样式
- 使用 `StyleSheet.create()`，禁止内联 style 对象（`style={{ padding: 16 }}`）
- 颜色、间距、字体大小必须引用 `src/constants/` 的 token，禁止硬编码数值
- 示例：`padding: spacing.md` ✅，`padding: 16` ❌

## 路径
- 使用 `@/` 别名，禁止超过两层的相对路径
- 示例：`import { Button } from '@/components/ui'` ✅

## API 调用
- 所有网络请求必须在 `src/api/` 中定义，页面和组件通过 Hook 调用
- 禁止在组件或页面内直接调用 `axios` 或 `fetch`

## 组件层级引用规则
- `ui/` 禁止引用 store、api、业务类型
- `common/` 可引用 hooks/store，禁止直接调用 api
- `screens/[模块]/components/` 禁止被其他模块的文件引用
- 若页面私有组件需要跨模块复用，先迁移到 `common/`，再引用

## 禁止行为
- 禁止生成含 `// TODO`、`// 省略`、`{/* 省略 */}` 的代码
- 禁止在日志、STATE.md、CLAUDE.md 中记录 API Key、Token、密码等敏感信息，用 `[REDACTED]` 占位
