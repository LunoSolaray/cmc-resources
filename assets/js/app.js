// ============================================================
// 内联 SVG 图标系统（feather 风格线性图标，随主题变色）
// ============================================================
const SVG_PATHS = {
  file: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="13 2 13 8 19 8"/>',
  "file-text":
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
  grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  archive:
    '<polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/>',
  image:
    '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
  film: '<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  box: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  "book-open":
    '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  award:
    '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
  flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',
  cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12.5V17c0 1.66 2.69 3 6 3s6-1.34 6-3v-4.5"/>',
  clipboard:
    '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>',
  layers:
    '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  shuffle:
    '<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>',
  download:
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  alert:
    '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
};
function svgIcon(name, cls = "") {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${
    SVG_PATHS[name] || SVG_PATHS.file
  }</svg>`;
}

// ============================================================
// 扩展名 → 图标与色调
// ============================================================
const EXT_META = {
  pdf: { icon: "file-text", cls: "pdf" },
  doc: { icon: "file-text", cls: "doc" },
  docx: { icon: "file-text", cls: "doc" },
  ppt: { icon: "file-text", cls: "doc" },
  pptx: { icon: "file-text", cls: "doc" },
  txt: { icon: "file-text", cls: "doc" },
  md: { icon: "file-text", cls: "doc" },
  xls: { icon: "grid", cls: "xls" },
  xlsx: { icon: "grid", cls: "xls" },
  csv: { icon: "grid", cls: "xls" },
  zip: { icon: "archive", cls: "zip" },
  rar: { icon: "archive", cls: "zip" },
  "7z": { icon: "archive", cls: "zip" },
  png: { icon: "image", cls: "img" },
  jpg: { icon: "image", cls: "img" },
  jpeg: { icon: "image", cls: "img" },
  gif: { icon: "image", cls: "img" },
  svg: { icon: "image", cls: "img" },
  webp: { icon: "image", cls: "img" },
  mp4: { icon: "film", cls: "video" },
  mov: { icon: "film", cls: "video" },
  avi: { icon: "film", cls: "video" },
  mkv: { icon: "film", cls: "video" },
  mp3: { icon: "music", cls: "audio" },
  wav: { icon: "music", cls: "audio" },
  flac: { icon: "music", cls: "audio" },
  m4a: { icon: "music", cls: "audio" },
};
function getExt(path) {
  const name = path.split("/").pop();
  const i = name.lastIndexOf(".");
  return i > 0 ? name.slice(i + 1).toLowerCase() : "";
}
function getFileMeta(path) {
  return EXT_META[getExt(path)] || { icon: "file", cls: "" };
}
// 可预览类型：PDF 由浏览器原生引擎渲染
function previewable(path) {
  return getExt(path) === "pdf";
}
function escapeHtml(text) {
  // innerHTML 只转义 < > &，属性值里的双引号需额外处理
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML.replace(/"/g, "&quot;");
}

// 设备与环境分流：移动端浏览器不支持 iframe 内嵌 PDF（iOS 仅渲染首页且不可滚动，
// Android 多直接触发下载），触屏统一交给平台原生查看器；微信/QQ 内置内核对
// PDF 支持最差，跳转前给出提示。
const IS_TOUCH = window.matchMedia("(pointer: coarse)").matches;
const IS_WECHAT = /MicroMessenger|QQ\//i.test(navigator.userAgent);

let toastTimer = 0;
function toast(msg) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3000);
}

// ============================================================
// 状态
// ============================================================
const ALL = "__all__";
const state = {
  tree: [],
  flatIndex: [],
  counts: new Map(),
  currentCat: ALL,
  keyword: "",
  cursor: -1,
  loading: true,
  error: null,
};

// ============================================================
// 索引加载（构建时预生成的 resources.json，零 GitHub API 依赖）
// ============================================================
async function loadManifest(force = false) {
  const base = "assets/data/resources.json";
  const url = force ? `${base}?t=${Date.now()}` : base;
  const res = await fetch(url, { cache: "no-cache" });
  if (res.status === 404) {
    throw new Error(
      "未找到 resources.json：推送代码触发 Action 生成索引，或本地运行 scripts/build_manifest.py。",
    );
  }
  if (!res.ok) {
    throw new Error(`索引加载失败：HTTP ${res.status}`);
  }
  try {
    return await res.json();
  } catch {
    throw new Error("索引响应不是合法 JSON：重新运行 scripts/build_manifest.py 生成索引");
  }
}

// 搜索规范化：小写 + 去空白。加载索引时对「分类链+文件名」预计算，不占索引体积
function normText(s) {
  return String(s ?? "")
    .toLowerCase()
    .replace(/\s+/g, "");
}

function buildIndex(manifest) {
  if (!manifest || !Array.isArray(manifest.categories)) {
    throw new Error("索引格式不正确：resources.json 结构损坏，重新运行 scripts/build_manifest.py");
  }
  const flat = [];
  const counts = new Map();
  manifest.categories.forEach((cat) => {
    cat.files.forEach((f) =>
      flat.push({
        f,
        label: cat.name,
        topId: cat.id,
        catId: cat.id,
        norm: normText(cat.name + f.name),
      }),
    );
    let n = cat.files.length;
    (cat.children || []).forEach((ch) => {
      ch.files.forEach((f) =>
        flat.push({
          f,
          label: `${cat.name} / ${ch.name}`,
          topId: cat.id,
          catId: ch.id,
          norm: normText(cat.name + ch.name + f.name),
        }),
      );
      n += ch.files.length;
    });
    counts.set(cat.id, n);
  });
  state.tree = manifest.categories;
  state.flatIndex = flat;
  state.counts = counts;
}

// ============================================================
// 分类查询
// ============================================================
function findCategory(id) {
  for (const cat of state.tree) {
    if (cat.id === id) return cat;
    if (cat.children) {
      for (const child of cat.children) {
        if (child.id === id) return child;
      }
    }
  }
  return null;
}
function countInCategory(cat) {
  let n = cat.files.length;
  if (cat.children) for (const c of cat.children) n += c.files.length;
  return n;
}

// 搜索态标题高亮：纯文本层定位匹配区间，分段转义后拼接
function highlightName(name, kw) {
  name = String(name ?? "");
  const i = kw ? name.toLowerCase().indexOf(kw) : -1;
  if (i < 0) return escapeHtml(name);
  return `${escapeHtml(name.slice(0, i))}<mark>${escapeHtml(name.slice(i, i + kw.length))}</mark>${escapeHtml(
    name.slice(i + kw.length),
  )}`;
}

// ============================================================
// 渲染：导航
// ============================================================
function navBtn(id, name, count) {
  return `<button class="cat-link ${state.currentCat === id ? "active" : ""}"
          data-cat="${escapeHtml(id)}">${escapeHtml(name)}<span class="cat-count">${count}</span></button>`;
}

function renderNav() {
  document.getElementById("catNav").innerHTML =
    navBtn(ALL, "全部", state.flatIndex.length) +
    state.tree.map((cat) => navBtn(cat.id, cat.name, state.counts.get(cat.id) || 0)).join("");
  const cat = findCategory(state.currentCat);
  document.getElementById("subNav").innerHTML =
    cat && cat.children
      ? cat.children.map((ch) => navBtn(ch.id, ch.name, ch.files.length)).join("")
      : "";
}

// ============================================================
// 渲染：归档列表
// ============================================================
function rowHtml(entry) {
  const f = entry.f;
  const ext = getExt(f.path);
  const meta = getFileMeta(f.path);
  const canPrev = previewable(f.path);
  const parts = [ext.toUpperCase(), formatSize(f.size || 0)];
  if (entry.label) parts.push(entry.label);
  const metaHtml = parts
    .map((p) => `<span>${escapeHtml(p)}</span>`)
    .join('<span class="dot">·</span>');
  const attrs = `data-name="${escapeHtml(f.name)}" data-path="${encodePath(f.path)}"`;
  const nameHtml = highlightName(f.name, state.keyword);
  const title = canPrev
    ? `<button class="row-title" data-act="preview" ${attrs}>${nameHtml}</button>`
    : `<span class="row-title plain">${nameHtml}</span>`;
  const actions = `${canPrev ? `<button class="row-btn" data-act="preview" ${attrs}>${svgIcon("eye")}<span>预览</span></button>` : ""}
        <button class="row-btn" data-act="share" ${attrs}>${svgIcon("link")}<span>分享</span></button>
        <a class="row-btn" href="${encodePath(f.path)}" download>${svgIcon("download")}<span>下载</span></a>`;
  return `
    <div class="file-row">
        <div class="row-icon ${meta.cls}">${svgIcon(meta.icon)}</div>
        <div class="row-main">${title}<div class="row-meta">${metaHtml}</div></div>
        <div class="row-actions">${actions}</div>
    </div>`;
}

function getGroups() {
  if (state.keyword) {
    return [{ name: "", files: state.flatIndex.filter((x) => x.norm.includes(state.keyword)) }];
  }
  if (state.currentCat === ALL) {
    return state.tree
      .map((cat) => ({ name: cat.name, files: state.flatIndex.filter((x) => x.topId === cat.id) }))
      .filter((g) => g.files.length);
  }
  const cat = findCategory(state.currentCat);
  if (!cat) return [];
  if (cat.children) {
    const groups = cat.files.length
      ? [{ name: cat.name, files: cat.files.map((f) => ({ f, label: "" })) }]
      : [];
    return groups.concat(
      cat.children.map((ch) => ({ name: ch.name, files: ch.files.map((f) => ({ f, label: "" })) })),
    );
  }
  return [{ name: "", files: cat.files.map((f) => ({ f, label: "" })) }];
}

function renderContent() {
  const content = document.getElementById("content");
  const countEl = document.getElementById("resultCount");

  if (state.loading) {
    content.innerHTML = `<div class="skeleton-wrap">${`<div class="skel-row"><div class="skel-icon"></div><div class="skel-lines"><div class="skel-line w62"></div><div class="skel-line w38"></div></div></div>`.repeat(8)}</div>`;
    countEl.textContent = "";
    return;
  }
  if (state.error) {
    content.innerHTML = `
        <div class="status-state">
            ${svgIcon("alert", "error-svg")}
            <div class="error-title">加载失败</div>
            <div class="error-msg">${escapeHtml(state.error)}</div>
            <button class="retry-btn" data-act="retry">重新加载</button>
        </div>`;
    countEl.textContent = "";
    return;
  }

  const groups = getGroups();
  const total = groups.reduce((n, g) => n + g.files.length, 0);
  countEl.textContent = `${total} 个文件`;

  if (total === 0) {
    content.innerHTML = `
        <div class="empty">
            ${svgIcon("search", "empty-svg")}
            <div class="empty-text">没有找到匹配的资源，换个关键词试试</div>
        </div>`;
    return;
  }

  content.innerHTML = groups
    .map((g) =>
      g.name
        ? `<div class="group"><div class="group-head"><span class="group-name">${escapeHtml(
            g.name,
          )}</span><span class="group-count">${g.files.length}</span></div>${g.files
            .map(rowHtml)
            .join("")}</div>`
        : g.files.map(rowHtml).join(""),
    )
    .join("");
  state.cursor = -1;
}

function updateLabel() {
  if (state.keyword) {
    document.getElementById("sectionLabel").textContent = "搜索结果";
    return;
  }
  if (state.currentCat === ALL) {
    document.getElementById("sectionLabel").textContent = "全部资源";
    return;
  }
  const cat = findCategory(state.currentCat);
  document.getElementById("sectionLabel").textContent = cat ? cat.name : "资源";
}

// ============================================================
// 文档弹层预览
// ============================================================
let lastFocus = null;
function openPreview(name, path) {
  if (IS_TOUCH) {
    if (IS_WECHAT) toast("内置浏览器对 PDF 支持有限，建议用系统浏览器打开本站");
    window.location.href = path; // 交给平台原生查看器/下载
    return;
  }
  document.getElementById("modalTitle").textContent = name;
  document.getElementById("modalDownload").href = path;
  document.getElementById("modalFrame").src = path;
  document.getElementById("pdfModal").hidden = false;
  document.body.style.overflow = "hidden";
  lastFocus = document.activeElement;
  document.getElementById("modalClose").focus();
}
function closePreview() {
  document.getElementById("pdfModal").hidden = true;
  document.getElementById("modalFrame").src = "about:blank";
  document.body.style.overflow = "";
  if (lastFocus) {
    lastFocus.focus();
    lastFocus = null;
  }
}

// ============================================================
// 事件
// ============================================================
function switchCategory(id) {
  state.currentCat = id;
  history.replaceState(
    null,
    "",
    id === ALL ? location.pathname + location.search : "#" + encodeURIComponent(id),
  );
  if (state.keyword) {
    state.keyword = "";
    document.getElementById("searchInput").value = "";
  }
  renderNav();
  updateLabel();
  renderContent();
}

// URL 深链：#files/kaoyan 直达分类视图；#files/kaoyan?f=<编码路径> 直达并打开单文件
function applyHash() {
  const raw = location.hash.slice(1);
  if (!raw) return false;
  const qIndex = raw.indexOf("?");
  let id,
    fileParam = null;
  try {
    id = decodeURIComponent(qIndex < 0 ? raw : raw.slice(0, qIndex));
    if (qIndex >= 0) {
      // URLSearchParams.get 自带一次解码，恰好是写入端 encodeURIComponent 的逆运算；
      // 再手动 decode 会双重解码，文件名本身含 % 字符时抛 URIError 使整条深链失效
      fileParam = new URLSearchParams(raw.slice(qIndex + 1)).get("f");
    }
  } catch {
    return false; // 畸形百分号序列等非法 hash，忽略
  }
  if (!id || (id !== ALL && !findCategory(id))) return false;
  if (id !== state.currentCat) switchCategory(id);
  if (fileParam) {
    const entry = state.flatIndex.find((x) => x.f.path === fileParam);
    if (entry) openPreview(entry.f.name, encodePath(fileParam));
  }
  return true;
}
window.addEventListener("hashchange", applyHash);

["catNav", "subNav"].forEach((navId) => {
  document.getElementById(navId).addEventListener("click", (e) => {
    const btn = e.target.closest(".cat-link");
    if (btn) switchCategory(btn.dataset.cat);
  });
});

document.getElementById("content").addEventListener("click", (e) => {
  if (e.target.closest('[data-act="retry"]')) {
    init(true);
    return;
  }
  const btn = e.target.closest('[data-act="preview"]');
  if (btn) {
    openPreview(btn.dataset.name, btn.dataset.path);
    return;
  }
  const shareBtn = e.target.closest('[data-act="share"]');
  if (shareBtn) {
    const rawPath = decodeURIComponent(shareBtn.dataset.path);
    const entry = state.flatIndex.find((x) => x.f.path === rawPath);
    const catId = entry ? entry.topId : state.currentCat;
    const url = `${location.origin}${location.pathname}#${encodeURIComponent(catId)}?f=${shareBtn.dataset.path}`;
    // clipboard API 仅安全上下文可用，非 HTTPS（局域网 IP 等）降级 execCommand
    const fallbackCopy = () => {
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      toast(ok ? "链接已复制，粘贴给同学可直接打开此文件" : "复制失败，请手动复制地址栏链接");
    };
    if (navigator.clipboard && location.protocol === "https:") {
      navigator.clipboard
        .writeText(url)
        .then(() => toast("链接已复制，粘贴给同学可直接打开此文件"))
        .catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
  }
});

document.getElementById("modalClose").addEventListener("click", closePreview);
document.getElementById("pdfModal").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) closePreview();
});
// 键盘：Esc 关弹层、J/K 移动光标、Enter 预览、/ 聚焦搜索
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (!document.getElementById("pdfModal").hidden) closePreview();
    return;
  }
  const inInput = e.target.matches("input, textarea");
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    document.getElementById("searchInput").focus();
    return;
  }
  if (inInput) return;
  if (e.key === "/") {
    e.preventDefault();
    document.getElementById("searchInput").focus();
    return;
  }
  const rows = [...document.querySelectorAll(".file-row")];
  if (!rows.length) return;
  if (e.key === "j" || e.key === "k") {
    e.preventDefault();
    if (state.cursor < 0) state.cursor = 0;
    else if (e.key === "j") state.cursor = Math.min(state.cursor + 1, rows.length - 1);
    else state.cursor = Math.max(state.cursor - 1, 0);
    rows.forEach((r, i) => r.classList.toggle("cursor", i === state.cursor));
    rows[state.cursor].scrollIntoView({ block: "nearest" });
  } else if (e.key === "Enter" && state.cursor >= 0 && rows[state.cursor]) {
    const btn = rows[state.cursor].querySelector('[data-act="preview"]');
    if (btn) openPreview(btn.dataset.name, btn.dataset.path);
  }
});

// 全局搜索：rAF 节流，Esc 清空
let searchRaf = 0;
document.getElementById("searchInput").addEventListener("input", (e) => {
  state.keyword = e.target.value.trim().toLowerCase().replace(/\s+/g, "");
  cancelAnimationFrame(searchRaf);
  searchRaf = requestAnimationFrame(() => {
    updateLabel();
    renderContent();
  });
});
document.getElementById("searchInput").addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    this.value = "";
    state.keyword = "";
    updateLabel();
    renderContent();
  }
});

document.getElementById("refreshBtn").addEventListener("click", async function () {
  const btn = this;
  btn.disabled = true;
  btn.classList.add("spinning");
  await init(true);
  btn.disabled = false;
  btn.classList.remove("spinning");
});

// ============================================================
// 初始化
// ============================================================
async function init(forceRefresh = false) {
  state.loading = true;
  state.error = null;
  renderContent();

  try {
    const manifest = await loadManifest(forceRefresh);
    buildIndex(manifest);

    // hash 指定了合法分类则直达，否则回退「全部」
    if (!applyHash() && state.currentCat !== ALL && !findCategory(state.currentCat)) {
      state.currentCat = ALL;
    }

    document.getElementById("indexTime").textContent = manifest.build || "—";

    state.loading = false;
    renderNav();
    updateLabel();
    renderContent();
  } catch (e) {
    console.error(e);
    state.loading = false;
    // fetch 网络层失败（断网、服务未启动）抛 TypeError，映射为可操作的中文指引
    state.error =
      e instanceof TypeError
        ? "网络请求失败：请检查网络连接，或确认本地服务已启动"
        : e.message || "未知错误";
    renderContent();
  }
}

// ============================================================
// 工具
// ============================================================
function encodePath(p) {
  return p.split("/").map(encodeURIComponent).join("/");
}
function formatSize(bytes) {
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + " MB";
  if (bytes >= 1024) return (bytes / 1024).toFixed(0) + " KB";
  return bytes + " B";
}

init();
