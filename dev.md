# 开发文档

纯静态资源站。HTML/CSS/JS 三文件结构，零框架、零第三方库、零运行时依赖，构建时预生成索引，运行时对 GitHub API 零调用。

## 架构

```
push main（网页上传即可）
  → GitHub Action: uv run scripts/build_manifest.py 扫描 files/ 生成 assets/data/resources.json
  → 打包 index.html + assets/ + files/ 部署 GitHub Pages
  → 浏览器仅请求 2 个资源: index.html + resources.json（其余按需 CSS/JS/文件）
  → 下载与 PDF 页内预览走相对路径 ./files/...，直接由 Pages CDN 提供
```

数据流核心：目录树在构建时已知，没有理由在运行时递归调 Contents API。旧的运行时方案匿名配额 60 次/小时按 IP 计数，共享出口 IP 下极易 403；静态化后该问题从根上消失。

## 目录结构

```
index.html                  页面骨架，无内联样式与脚本
assets/css/style.css        全部样式（暗色主题，CSS 变量驱动）
assets/js/app.js            数据加载、索引、渲染、搜索、PDF 弹层预览
assets/data/resources.json  构建生成的静态索引，已 gitignore（不叫 manifest.json，
                            避免与 PWA manifest 标准名冲突）
files/                      资源本体，两层结构：<大类>/<子分类>/
scripts/build_manifest.py   构建时索引脚本（stdlib only，PEP 723）
.github/workflows/deploy.yml  Pages 部署流水线
```

## 本地开发

构建索引并起本地服务：

```bash
uv run scripts/build_manifest.py
uv run --python 3.12 python -m http.server 8123
```

浏览器访问 http://localhost:8123 。uv 首次运行会自动管理 Python 版本，无需本机安装 Python。

## 新增分类

编辑 build_manifest.py 中的 CATEGORY_META，键为完整路径，值为 (显示名, 图标名)，字典顺序即导航顺序。图标名必须存在于 app.js 的 SVG_PATHS。未收录的目录自动回退为「目录名 + folder 图标」，大类根目录下的散落文件归入「未分类」。

## 界面

布局借鉴 Hexo 博客主题：顶部页头（品牌 + 搜索框 + 水平分类导航，含「全部」项与子分类次级导航），正文为居中窄栏（860px）单列归档列表，按子分类分组展示条目（图标、文件名、大小、格式、分类）。玄墨暗色基调 + 朱砂点缀，扁平无渐变无玻璃拟态，标题用衬线字体。

PDF 直接点击条目即页内弹层预览（iframe 加载同源文件，浏览器原生引擎渲染，零库零开销），doc/docx/ppt/pptx/xls/xlsx 借 Office 在线视图预览（要求文件公网可访问，本地 localhost 自动隐藏预览入口）。Esc、遮罩或关闭按钮退出；下载仅通过显式下载按钮。

## 提交 PR

本仓库上游为 LunoSolaray/cmc-resources，直接推送会被拒绝，走 fork PR：

```bash
# 1. 在 GitHub 网页上 Fork 本仓库到个人账号（仅一次）
# 2. 添加自己的 fork 为第二个 remote（仅一次）
git remote add fork https://github.com/<你的用户名>/cmc-resources.git
# 3. 推送本地提交（按需指定分支名，与 main 无需同名）
git push fork main:pr/static-site
# 4. 打开 GitHub，仓库页面会提示 Compare & pull request，创建 PR 即可
# 5. PR 若需修改：本地继续提交后重复第 3 步，PR 自动更新
```

## 部署

一次性设置：仓库 Settings → Pages → Source 选 GitHub Actions。此后 push main 或手动 workflow_dispatch 即自动构建部署，进度见 Actions 页。

## 平台限制

- 单文件上限 100 MB：Git 与 Pages 硬限制，超限文件 push 会被拒绝，大文件需压缩或外链
- 站点总大小 1 GB：Pages 建议上限，当前 files/ 约 13.5 MB，余量充足
- 带宽软限 100 GB/月：Pages 全球 CDN 分发，超出仅限流不收费
- Actions 免费额度：公开仓库无限量

## 约定

- 不引入任何前端框架、UI 库、搜索库；图标一律内联 SVG（feather 风格路径表 SVG_PATHS）
- 搜索规范化规则：小写 + 去空白，构建端与前端保持一致（norm / normalizeKeyword）
- 暗色主题为唯一主题，调色只改 :root 变量
- assets/data/resources.json 是生成产物，禁止手改、禁止提交
