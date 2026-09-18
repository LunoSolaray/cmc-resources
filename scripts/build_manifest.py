# /// script
# requires-python = ">=3.9"
# ///
"""扫描 files/ 生成静态索引 assets/data/resources.json。

目录模型为两层：files/<大类>/ 与 files/<大类>/<子分类>/，
大类根目录下的散落文件归入「未分类」。显示名与图标在
CATEGORY_META 中维护；未收录目录回退为目录名 + folder 图标。
"""

import json
import re
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FILES_DIR = ROOT / "files"
OUT_PATH = ROOT / "assets" / "data" / "resources.json"
CST = timezone(timedelta(hours=8))

# 路径 -> (显示名, 图标名)，字典顺序即侧栏展示顺序
CATEGORY_META = {
    "files/guide":         ("竞赛指导手册", "book"),
    "files/video":         ("视频内容全一册", "film"),
    "files/prelim":        ("CMC初赛", "book-open"),
    "files/prelim/basic":  ("相关基础专题", "file-text"),
    "files/prelim/past":   ("官方模拟卷", "clipboard"),
    "files/final":         ("CMC决赛", "award"),
    "files/final/adv":     ("相关进阶专题", "layers"),
    "files/final/past":    ("官方模拟卷", "clipboard"),
    "files/final/linear":  ("线性代数专题", "grid"),
    "files/henan":         ("河南复赛", "flag"),
    "files/henan/topic":   ("相关专题", "layers"),
    "files/henan/past":    ("历年真题", "clipboard"),
    "files/kaoyan":        ("考研数学", "cap"),
    "files/kaoyan/gaoshu": ("高等数学", "activity"),
    "files/kaoyan/linear": ("线性代数", "grid"),
    "files/kaoyan/prob":   ("概率论", "shuffle"),
}
CATEGORY_ORDER = {path: i for i, path in enumerate(CATEGORY_META)}


def norm(text: str) -> str:
    """检索规范化：小写 + 去空白，前端用同一规则处理关键词。"""
    return re.sub(r"\s+", "", text.lower())


def sort_dirs(dirs: list[Path]) -> list[Path]:
    def key(d: Path):
        rel = d.relative_to(ROOT).as_posix()
        return (CATEGORY_ORDER.get(rel, len(CATEGORY_ORDER)), rel)
    return sorted(dirs, key=key)


def list_files(dir_path: Path, chain: list[str]) -> list[dict]:
    entries = []
    for p in sorted(dir_path.iterdir(), key=lambda x: x.name):
        if not p.is_file() or p.name.startswith("."):
            continue
        entries.append({
            "name": p.name,
            "path": p.relative_to(ROOT).as_posix(),
            "ext": p.suffix.lstrip(".").lower(),
            "size": p.stat().st_size,
            "norm": norm("".join(chain) + p.name),
        })
    return entries


def make_node(rel: str, name: str, icon: str, files: list[dict], children) -> dict:
    node = {"id": rel, "name": name, "icon": icon, "files": files}
    if children:
        node["children"] = children
    return node


def build() -> None:
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    categories = []

    if FILES_DIR.is_dir():
        top_dirs = sort_dirs([
            d for d in FILES_DIR.iterdir()
            if d.is_dir() and not d.name.startswith(".")
        ])

        loose = list_files(FILES_DIR, [])
        if loose:
            categories.append(make_node("files/_root", "未分类", "box", loose, None))

        for d in top_dirs:
            rel = d.relative_to(ROOT).as_posix()
            name, icon = CATEGORY_META.get(rel, (d.name, "folder"))
            children = []
            for sub in sort_dirs([
                s for s in d.iterdir()
                if s.is_dir() and not s.name.startswith(".")
            ]):
                sub_rel = sub.relative_to(ROOT).as_posix()
                sub_name, sub_icon = CATEGORY_META.get(sub_rel, (sub.name, "folder"))
                children.append(make_node(
                    sub_rel, sub_name, sub_icon,
                    list_files(sub, [name, sub_name]), None,
                ))
            categories.append(make_node(rel, name, icon, list_files(d, [name]), children or None))

    manifest = {
        "build": datetime.now(CST).strftime("%Y-%m-%d %H:%M"),
        "categories": categories,
    }
    OUT_PATH.write_text(
        json.dumps(manifest, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )

    total = sum(
        len(c["files"]) + sum(len(ch["files"]) for ch in c.get("children") or [])
        for c in categories
    )
    print(f"resources.json written: {len(categories)} categories, {total} files")


if __name__ == "__main__":
    build()
