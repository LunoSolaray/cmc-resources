# 项目手册（供接手的智能体与人类）

纯静态资源站：HTML/CSS/JS 三文件，零框架、零第三方库、零运行时依赖。索引在构建时预生成，运行时对 GitHub API 零调用。改动前必读本文件「接口约定」一节，避免破坏构建端与前端的数据契约。

## 架构与数据流

```
push main（网页上传文件即可）
  → GitHub Action（deploy.yml）: uv run scripts/build_manifest.py
      扫描 files/ 生成 assets/data/resources.json
  → 打包 index.html + assets/ + files/ → actions/deploy-pages@v4 部署
  → 浏览器首屏仅 2 个请求: index.html + resources.json（CSS/JS/文件按需）
  → 下载与 PDF 页内预览走相对路径 ./files/...，由 Pages CDN 直出
```

设计动机：目录树构建时已知，运行时递归调 Contents API 的旧方案受匿名配额 60 次/小时按 IP 计数限制，共享出口 IP（校园网、企业 NAT）下极易 403。静态化使该问题不存在。

## 目录结构

```
index.html                    页面骨架，无内联样式与脚本
assets/css/style.css          全部样式（CSS 变量驱动，:root 为唯一调色入口）
assets/js/app.js              加载、索引、渲染、搜索、键盘、hash 路由、PDF 弹层
assets/data/resources.json    构建产物，已 gitignore，禁止手改、禁止提交
files/                        资源本体，两层结构：<大类>/<子分类>/
scripts/build_manifest.py     构建时索引（stdlib only，PEP 723，uv run 直跑）
.github/workflows/deploy.yml  Pages 部署流水线
agent.md                      本文件
```

## 接口约定

### resources.json（build_manifest.py 产出，app.js 消费）

```
{
  "build": "ISO8601 时间戳",          // 页脚「索引更新于」
  "categories": [                      // 字典序 = 导航序
    {
      "id": "files/kaoyan",            // 相对路径，同时用作 hash 路由
      "name": "考研数学",              // 显示名
      "icon": "cap",                   // 必须存在于 app.js 的 SVG_PATHS
      "path": "files/kaoyan",
      "files": [ { "name", "path", "ext", "size" } ],   // size 字节数
      "children": [ ...同结构，无 children ]             // 可选，仅一层
    }
  ]
}
```

### 搜索规范化

小写 + 去空白（`/\s+/g`）。前端加载索引时对「分类链名 + 文件名」预计算（normText），索引体积不含冗余字段。改动规则必须同步 normText 与未来任何构建端逻辑。

### 目录模型

两层：files/<大类>/ 与 files/<大类>/<子分类>/。第三层及更深不进索引，构建时输出 warning 提示。大类根目录散落文件归入「未分类」（files/_root）。未在 CATEGORY_META 登记的目录回退为「目录名 + folder 图标」。

### CATEGORY_META

build_manifest.py 内字典：键 = 完整相对路径，值 = (显示名, 图标名)，字典顺序即导航顺序。新增分类在此登记。

## 界面与交互

Hexo 式布局：顶部页头（品牌 + 搜索 + 水平分类导航 + 子分类次级导航），正文 860px 居中单列归档列表，按子分类分组。玄墨底 #141413 + 朱砂 #c9463d，扁平无渐变无玻璃拟态，品牌与区块标题用衬线字体。

- PDF 点击条目即弹层预览（iframe 同源，浏览器原生渲染），Esc/遮罩/关闭按钮退出；下载仅经显式按钮
- 键盘：J/K 移动选中、Enter 预览、/ 聚焦搜索、Esc 关弹层或清搜索
- 分类视图写入 URL hash（#files/kaoyan），hashchange 双向同步，非法 hash 忽略
- 搜索命中词 `<mark>` 高亮；错误态（索引缺失/损坏/网络失败）给出中文指引与内嵌重试按钮，非白屏

## 本地开发与验证

```bash
uv run scripts/build_manifest.py                      # 生成索引
uv run --python 3.12 python -m http.server 8123       # 本地服务
node --check assets/js/app.js                         # 语法检查
```

改动 JS/CSS 后至少完成：语法检查、构建成功、浏览器冒烟（渲染/搜索/分类切换/弹层）。

## 自动化

deploy.yml：push main 或手动 workflow_dispatch 触发。步骤 = checkout → astral-sh/setup-uv@v5 → uv run 构建 → mkdir dist 拷贝产物 → actions/upload-pages-artifact + deploy-pages。一次性设置：仓库 Settings → Pages → Source 选 GitHub Actions。新增文件只需放入 files/ 对应目录后 push，无需改任何代码。

## 平台限制

- 单文件 100 MB：Git 与 Pages 硬限，超限 push 被拒
- 站点 1 GB：Pages 建议上限，当前 files/ 约 13.5 MB
- 带宽 100 GB/月软限，CDN 分发，超限限流不收费
- Actions 公开仓库无限量

## 提交 PR

上游为 LunoSolaray/cmc-resources，直接 push 被拒，走 fork PR：

```bash
# 1. GitHub 网页 Fork 到个人账号（一次）
# 2. 添加 fork 为第二个 remote（一次）
git remote add fork https://github.com/<用户名>/cmc-resources.git
# 3. 推送（分支名可与 main 不同）
git push fork main:pr/static-site
# 4. GitHub 仓库页 Compare & pull request
# 5. 后续修改：本地追加提交后重复第 3 步，PR 自动更新
```

PR 前建议先在自己 fork 上让 Action 完成一次线上部署验证（Pages 是子路径部署，与本地根路径服务有差异，相对路径设计已覆盖但以线上实测为准）。

## 约定

- 不引入前端框架、UI 库、搜索库、构建器；图标一律内联 SVG（SVG_PATHS 路径表）
- 暗色为唯一主题；调色只改 :root 变量
- 生成产物不入库；临时测试文件跑完即删
