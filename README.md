# 中国体育学人才综合数据库（CSSD）

**China Sports Scholars Database** · 面向体育学学科建设、师资分析、院校对标与人才评价的开放数据平台。

- **主站（推荐，国内加速访问）**：<https://www.tiyuxueren.com>
- **镜像（GitHub Pages，作为备份）**：<https://leon202304.github.io/cssd-sports-scholars/>

---

## 项目简介

CSSD 是一个纯静态、可离线运行的学术资源数据库，系统整理全国体育学者的基本信息、研究方向、人才头衔、所属机构与科研项目，支持按学科方向、院校类型、人才计划、学位授权点与研究主题进行交叉检索与分析。所有数据来源于各高校、医院及科研机构官方公开信息，不依赖数据库服务器与后端接口。

**当前规模（截至 2026-10-10，v4.6-87）：**

| 指标 | 数量 |
|---|---|
| 收录学者 | 5,849 人 |
| 覆盖高校、医院与科研机构 | 560 所 |
| 收录学术期刊 | 164 种 |
| 科研项目记录（国家社科基金体育学） | 3,056 项 |
| 海外华人学者（独立分栏） | 26 人 |

## 功能模块

- **学者目录**：按姓名、单位、研究方向、人才称号的高级检索与筛选
- **机构导航**：体育院校、师范院校、综合大学、附属医院与科研院所
- **学科体系**：研究生四大类（体育教育训练学、体育人文社会学、运动人体科学、民族传统体育学）与本科体育学类 18 个专业
- **人才专栏**：长江学者、青年人才、博士点院校、学位授权点
- **学术动态**：重点期刊最新论文与学界会议/荣誉，每日自动更新
- **每日动态**：体育学 12 种 C 刊官网 + 全国 14 所体育院校官网新闻公告的当日聚合（首页频道）
- **期刊导航**：国内体育 C 刊/北大核心与国际 SSCI/SCI 期刊（含中科院分区、影响因子）
- **项目查询**：国家社科基金体育学项目（1997—至今），与学者目录打通

## 技术架构

- **纯静态站点，无构建步骤**：HTML / CSS / 原生 JavaScript，直接由 CDN 托管
- **数据分层**：
  - `sports-*.js`：主数据（学者、机构、期刊、项目），文件名带内容哈希，可长缓存
  - `latest_papers.json` / `news-snapshot.json` / `xuejie-snapshot.json` / `daily-dynamics.json`：每日更新的动态数据（短缓存）
  - `portal.<hash>.css/js`、`portal.premium.<hash>.css`、`home-news/xuejie.<hash>.js`：界面与首页脚本（内容哈希，immutable）
  - `portal.polish.css` / `home-daily.js`：迭代用固定名（短缓存）
- **部署**：
  - 主站由 **EdgeOne Pages** 托管（国内加速、HTTPS、安全响应头与缓存策略见 `edgeone.json`）
  - 镜像由 **GitHub Pages** 自动构建
  - 二者均以本仓库 `main` 分支为唯一内容源

## 缓存与发布（cache-bust）

EdgeOne 对带内容哈希的资产（`portal.<hash>.js/css`、`sports-*.js`、`home-news.<hash>.js`、`home-xuejie.<hash>.js`、`portal.premium.<hash>.css`）下发 `Cache-Control: immutable; max-age=31536000`。**内容变了必须换新文件名**，并同步更新 `index.html` 里的 `<link>` / `<script>` / `preload`；禁止把新字节写回旧的 immutable 文件名（否则用户普通刷新仍可能拿到旧壳）。

固定短缓存、本脚本不哈希的文件：`portal.polish.css`、`home-daily.js`，以及每日 JSON（`latest_papers.json` / `news-snapshot.json` / `xuejie-snapshot.json` / `daily-dynamics.json`）。

**改完壳或数据后的发布步骤：**

1. 编辑资产（如 `portal.*.js`、数据脚本等）
2. 在仓库根目录执行：`node scripts/cache-bust.mjs`（会按 sha256 前 8 位重命名，并改 HTML 引用）
3. 可选自检：`node scripts/cache-bust.mjs --check`（有漂移则 exit 1）
4. 把**新文件名 + 更新后的 HTML** 一起提交并推到 `main`（旧 hash 文件可留在 Git 历史；CDN 上旧对象自然过期即可）
5. EdgeOne / GitHub Pages 随 `main` 发布；勿只覆盖旧 immutable 路径

`--dry` 可只看计划不落盘。

## 自动化：学术动态每日更新

每日由 **GitHub Actions**（`.github/workflows/update-papers.yml`，北京时间约 07:17）自动运行 `update_latest_papers.py`、`update_xuejie_news.py` 与 `update_daily_dynamics.py`，抓取期刊最新论文、学界动态与每日动态日报，按标题去重合并写入四个 JSON；**有变化才提交到 `main`，随后 EdgeOne 主站与 GitHub Pages 镜像自动发布**。

**数据来源（均为公开页面，不处理登录与验证码）：**

- **国内期刊官网目录（TOC）**：
  - 仁和 xml-journal：《体育科学》《上海体育大学学报》
  - 知网腾云 cbpt：《中国体育科技》《天津体育学院学报》《体育与科学》《西安体育学院学报》
  - 玛格泰克 magtech：《武汉体育学院学报》《沈阳体育学院学报》
  - 南京体育学院期刊中心 nsi：《体育学研究》
  - WKG 期刊官网：《北京体育大学学报》
  - 编辑部官网：《体育学刊》
  - （《成都体育学院学报》官网启用人机验证，按规则不抓取）
- **院校官网（每日动态频道，14 所）**：北京体育大学、上海体育大学、武汉体育学院、成都体育学院、沈阳体育学院、天津体育学院、广州体育学院、西安体育学院、首都体育学院、南京体育学院、山东体育学院、河北体育学院、吉林体育学院、哈尔滨体育学院
- **国外期刊（Crossref 公开 API，链接指向 doi.org）**：
  *British Journal of Sports Medicine*、*Sports Medicine*、*Journal of Sport and Health Science*、*Medicine & Science in Sports & Exercise*、*Journal of Sports Sciences*、*Scandinavian Journal of Medicine & Science in Sports*

**容错与触发：**
- 每个数据源独立超时与重试，单源失败不影响其他源；全部失败或抓到 0 条时不改动任何文件，前端按日期自动显示"数据稍旧"
- 手动触发：仓库 → Actions → *Update Latest Papers* → Run workflow，或 `gh workflow run update-papers.yml -R LEON202304/cssd-sports-scholars`
- 本地运行：`pip install requests beautifulsoup4 lxml && python update_latest_papers.py`

## 本地运行

无需安装任何依赖：将仓库克隆到本地，直接用浏览器打开 `index.html` 即可离线查看完整功能（动态 JSON 数据为本地快照）。

## 版本规范

每次发布以 `v4.6-XX` 递增命名，便于追溯历史；当前版本号见页面页脚标识。

---

**维护**：体育学人（CSSD）项目组 · 数据纠错与学者信息认领请通过页面底部联系方式提交
