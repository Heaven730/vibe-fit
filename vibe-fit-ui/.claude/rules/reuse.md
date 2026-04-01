# 复用优先规则（每次生成代码前强制执行）

## 生成任何组件或方法前，必须先完成以下检查

**组件检查**（按顺序）：
1. 读取 `docs/logs/fe-components.md` 的组件清单表格
2. 扫描 `src/components/ui/` 和 `src/components/common/` 的文件列表

**方法/Hook 检查**（按顺序）：
1. 读取 `docs/logs/fe-utils.md` 的函数清单表格
2. 读取 `docs/logs/fe-hooks.md` 的 Hook 清单表格
3. 扫描 `src/utils/` 和 `src/hooks/` 的文件列表

## 检查结果必须在回复开头输出

```
【复用检查】
- 组件：复用 src/components/common/XxxComponent.tsx | 无可用，需新建
- Hook：复用 src/hooks/useXxx.ts | 无可用，需新建
- 工具函数：复用 src/utils/format.ts > formatDate() | 无可用，需新建
```

## 复用判定规则

- 已有组件可通过新增 prop 满足需求 → 扩展已有组件，不新建
- 功能重叠超过 50% → 重构合并，不新建
- 确认无可复用资产后才允许新建，并在回复中说明原因

## 清单维护（每次新增后必须更新）

新增公共组件后，在 `docs/logs/fe-components.md` 追加一行：
`| 组件名 | src/components/[层级]/文件名.tsx | ui/common | 核心 Props | 用途说明 |`

新增工具函数后，在 `docs/logs/fe-utils.md` 追加一行：
`| 函数名 | src/utils/文件名.ts | (参数类型) => 返回类型 | 用途说明 |`

新增 Hook 后，在 `docs/logs/fe-hooks.md` 追加一行：
`| useXxx | src/hooks/useXxx.ts | { 返回值字段 } | 用途说明 |`
