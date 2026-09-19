# cmc-resources

纯静态资源站。vanilla HTML/CSS/JS，无框架无库无构建器，索引构建时生成，运行时零 API 调用。

## Stack

| 层   | 实现                                                                     |
|------|--------------------------------------------------------------------------|
| 前端 | index.html + assets/css/style.css + assets/js/app.js，三文件，无构建步骤 |
| 索引 | scripts/build_manifest.py，stdlib only，PEP 723                          |
| 部署 | .github/workflows/deploy.yml → GitHub Pages                              |

## Commands

```bash
uv run scripts/build_manifest.py                 # 生成 assets/data/resources.json
uv run --python 3.12 python -m http.server 8123  # 本地服务
node --check assets/js/app.js                    # JS 语法检查
```

## 数据契约

build_manifest.py 产出 → app.js 消费，两端只通过此结构耦合：

```jsonc
{
  "build": "ISO8601",              // 页脚「索引更新于」
  "categories": [
    {
      "id": "files/kaoyan",        // = path，同时是 hash 路由值
      "name": "考研数学",          // 显示名
      "icon": "cap",               // 键，必须 ∈ SVG_PATHS
      "path": "files/kaoyan",
      "files": [{ "name", "path", "ext", "size" }],
      "children": [ /* 同构，无 children，最多一层 */ ]
    }
  ]
}
```

## 不变量

1. `assets/data/resources.json` 是生成物：不手改、不提交
2. 搜索规范化 = 小写 + 去空白，唯一实现点 app.js `normText`；索引不存冗余字段，加载时对「分类链名+文件名」预计算
3. 目录两层模型：`files/<大类>/<子分类>/`；第三层忽略并输出构建 warning；大类根目录散落文件归「未分类」（id `files/_root`）
4. `CATEGORY_META` 键 = files/ 下相对路径，值 = (显示名， 图标名)，字典序即导航序；未登记目录回退「目录名 + folder」
5. 所有 HTML 插值必须过 `escapeHtml`（转义 `< > & "`）
6. 所有资源引用用相对路径——Pages 是子路径部署
7. 文件下载/预览只走 `./files/...` 相对路径，无任何 API 端点

## app.js 段落地图

```
SVG_PATHS        内联 SVG 图标表（feather 风格 path），svgIcon() 出口
EXT_META         扩展名 → 图标/色类
state            tree/flatIndex/counts/currentCat/keyword/cursor/loading/error
loadManifest     fetch assets/data/resources.json，四种错误分支
buildIndex       校验结构 → 拍平 flatIndex（含预计算 norm）→ counts
renderNav        导航 = navBtn(ALL) + 分类；subNav = 子分类
rowHtml          归档行：图标 + highlightName 标题 + 元信息 + 预览/下载
getGroups        搜索态/全部态/分类态三种分组策略
renderContent    loading/error/empty/列表 四态
openPreview      iframe 弹层：赋 src → 显示 → 焦点移入；close 置 about:blank
事件             导航与 content 委托；keydown 全局（J/K/Enter///Esc）；rAF 搜索节流
init             loadManifest → buildIndex → applyHash → 渲染；catch 兜底错误态
```

## 错误路径

| 触发                         | 表现                                               |
|------------------------------|----------------------------------------------------|
| fetch 404                    | 「未找到 resources.json」+ 生成指引                |
| HTTP 非 200                  | 「索引加载失败：HTTP xxx」                         |
| TypeError（断网/服务未启动） | 「网络请求失败」                                   |
| JSON 解析失败 / 结构非数组   | 「索引格式不正确」                                 |
| 以上任意                     | 错误态含内嵌「重新加载」按钮 → `init(true)` 绕缓存 |

## 交互

- hash 路由：`#files/<id>`（分类）与 `#files/<id>?f=<encodePath 编码路径>`（直达单文件，由行内「分享」按钮生成）；`applyHash` 校验非法即忽略；`hashchange` 双向同步
- 键盘：`J/K` 移动、`Enter` 预览、`/` 或 `Ctrl/Cmd+K` 聚焦搜索、`Esc` 关弹层/清搜索；输入框内不拦截
- PDF 预览：桌面 iframe 同源加载原生渲染；触屏（`pointer: coarse`）改为 `location.href` 交给平台原生查看器——移动浏览器 iframe 内嵌 PDF 不可用（iOS 仅渲染首页，Android 触发下载）；微信/QQ 内置内核跳转前 toast 提示
- toast：`#toast` 单例，3s 自动消失，用于复制反馈与环境提示
- 搜索：`norm.includes(keyword)` 纯字符串匹配（无正则注入面），命中词 `<mark>` 高亮；加载态为 8 行 shimmer 骨架屏

## Deploy

push main（网页上传即可）→ Action：setup-uv → `build_manifest.py` → dist 打包（index.html + assets/ + files/）→ deploy-pages。手动触发：workflow_dispatch。

一次性设置：仓库 Settings → Pages → Source = GitHub Actions。

限制：单文件 100 MB（硬限）、站点 1 GB（建议）、带宽 100 GB/月（软限）。

## 新增资源

- 加文件：放入 `files/<大类>/` 或其子目录，push 即自动上线，零代码变更
- 加分类：`CATEGORY_META` 加一行（路径 → 显示名+图标）
- 改样式：只动 `:root` 变量；暗色是唯一主题

## License

站点代码与页面编排以 CC BY-NC-SA 4.0 授权，全文在 LICENSE；仓库内收集的资料文件不适用本许可（版权归各自权利人），靠 README 免责声明约束。README 面向访客与上游，措辞变更需同步免责声明。

## Fork PR

上游 LunoSolaray/cmc-resources，直接 push 被拒：

```bash
git remote add fork https://github.com/<用户名>/cmc-resources.git
git push fork main
# fork 上验证线上部署后，从 fork main 向上游 main 发 PR
# 后续修改：本地追加提交 → 重复 push，PR 自动更新
```
