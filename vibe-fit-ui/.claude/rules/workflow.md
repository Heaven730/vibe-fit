# 工作流规则

## 会话启动（每次必须执行）

读取 `STATE.md`，输出：
> 当前阶段：[内容] | 版本：[内容] | 健康度：[内容]，等待指令。

## 每次需求执行顺序

**Step 1 — 方案确认（写代码前输出，等待确认）**
- 【复用检查】（见 reuse.md）
- 实现思路
- 需新建或修改的文件列表
- 若修改 `src/types/` `src/components/common/` `src/api/` `src/hooks/`，列出所有受影响的下游文件

**Step 2 — 原子化执行（每步完成后等待确认）**
```
src/types/ 类型定义
  → src/api/ 接口层
  → src/hooks/ 自定义 Hook
  → src/components/ 组件
  → screens/ 页面 UI（先静态）
  → screens/ 接入逻辑
  → __tests__/ 单元测试
```

**Step 3 — 更新 STATE.md**（版本号 +1，禁止修改 `ci_status` `test_result` `last_release` 三个字段）

**Step 4 — 更新日志**（见 logs.md）

## CI 失败处理

若 `STATE.md` 中 `ci_status: failing`，读取 `docs/logs/cicd.md` 最新条目，在修复 CI 前禁止推进新功能。
