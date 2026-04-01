# 日志维护规则

## 变更类型对应日志文件

| 变更类型 | 必须更新的文件 |
|----------|--------------|
| 新增/修改公共组件 | `docs/logs/fe-components.md`（更新清单表格） |
| 新增/修改工具函数 | `docs/logs/fe-utils.md`（更新清单表格） |
| 新增/修改自定义 Hook | `docs/logs/fe-hooks.md`（更新清单表格） |
| 接口层变更 | `docs/logs/api.md` |
| 路由/导航变更 | `docs/logs/fe-routing.md` |
| 状态管理变更 | `docs/logs/fe-store.md` |
| 登录态/Token | `docs/logs/fe-auth.md` |
| 第三方库引入或升级 | `docs/logs/dependencies.md` |

## 日志条目格式（追加到对应文件末尾）

```markdown
## [YYYY-MM-DD] [模块名] - [变更标题]

- **变更类型:** 新增 / 修改 / 修复 / 重构
- **版本:** v[X.X]
- **涉及文件:** [路径列表]
- **复用检查:** [复用了什么，或为何需要新建]
- **决策内容:** [做了什么]
- **决策原因:** [为什么，而不是其他方案]
- **清单已更新:** [fe-components.md / fe-utils.md / fe-hooks.md，无则填"无"]
- **已知风险:** [什么情况下会出问题]
- **下次注意:** [后续必须知道的事]
```

## 文档压缩

任意日志文件超过 500 行时，主动提议压缩：
1. 将原文件移至 `docs/archive/[模块名]_[YYYY-MM-DD].md`
2. 新建同名文件，保留架构决策区 + 近期未解决问题
3. 文件顶部注明：`> 历史归档见 docs/archive/[模块名]_[日期].md`
