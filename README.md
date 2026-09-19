# cmc-resources

全国大学生数学竞赛（CMC）非数学类备赛资源站。收集整理公开渠道的备考资料，提供分类浏览、搜索、在线预览。纯静态页面：无框架、无构建器、无运行时 API 依赖，推送代码即由 GitHub Actions 自动构建并部署到 GitHub Pages。

在线访问：<https://lunosolaray.github.io/cmc-resources/>

维护者：Dreemurr空曙（[哔哩哔哩主页](https://space.bilibili.com/523993449)）

## 免责声明

- 本站仅为学习资料的汇总与检索工具，不创作、不存储任何原创内容；所有资料文件均收集自公开网络，托管于本仓库
- 资料的版权归原作者或出版方所有，本站不对其主张任何权利
- 资料仅供个人学习与备考交流，严禁任何形式的商业使用；请于合理期限内自行删除，深入学习请支持正版
- 维护者不对资料的准确性、完整性、时效性作任何保证，使用资料产生的后果由使用者自行承担
- 若资料侵犯您的合法权益，请提交 Issue 并附权属证明，核实后将第一时间删除

## 功能

- PDF 弹层预览：浏览器原生渲染，桌面端即点即看
- 移动端自动分流：触屏设备调起系统查看器，微信与 QQ 内置浏览器给出使用提示
- 全站搜索：分类与文件名模糊匹配，命中词高亮
- 键盘导航：J/K 移动、Enter 预览、/ 或 Ctrl+K 聚焦搜索、Esc 关闭弹层
- 文件级分享：每个文件可复制深链，打开直达该文件
- 加载骨架屏：索引请求期间显示占位动画，弱网无白屏

## 工作原理

推送触发 Action 依次完成两步：

1. `scripts/build_manifest.py` 扫描 `files/` 目录，生成静态索引 `assets/data/resources.json`
2. 打包 `index.html`、`assets/`、`files/` 发布到 GitHub Pages

页面运行时只加载这一份构建期生成的 JSON，无后端、无数据库、无第三方请求。

## 添加资源

- 加文件：放入 `files/<分类>/` 对应目录，推送即上线，无需改代码
- 加分类：在 `build_manifest.py` 的 `CATEGORY_META` 中登记显示名与图标

## 本地开发

```bash
uv run scripts/build_manifest.py                  # 生成索引
uv run --python 3.12 python -m http.server 8123   # 预览 http://localhost:8123
```

架构、数据契约、不变量与错误路径等维护细节见 [agent.md](agent.md)。
