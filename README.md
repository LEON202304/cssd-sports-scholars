# 中国体育学人才综合数据库 (CSSD)


## 当前版本
**v4.6-23 + polish/site-optimization**

静态站点（无需构建）。样式 token 见 `portal.2e2629e7.css` / `portal.polish.css`；学术动态数据见 `news-snapshot.json`（每日自动更新，见下文「自动化」）。

## 功能特点
- 学者目录高级检索与筛选
- 长江学者、博士点院校专栏
- 多学科方向三级架构
- CNKI 论文集成（支持 10,000+ 论文）
- 学术动态 + 重点期刊最新论文自动更新

## 使用方式
1. 双击 `index.html` 即可在本地浏览器打开
2. 推荐使用 GitHub Pages 在线访问

## 版本管理规范
每次更新都以 `v4.6-XX` 方式命名，方便追溯历史。

## 自动化：期刊最新论文每日更新
- **做什么**：`update_latest_papers.py` 抓取重点体育学期刊官网公开的「当期目录 / 本期目次 / 网络首发」页面，与现有数据按标题去重合并，按日期降序保留约 30 条（每刊最多 3 条），写入 `latest_papers.json` 和 `news-snapshot.json`。前端「学术动态」页读取 `news-snapshot.json`：把这些论文置顶到「今日聚焦」和动态流，并按 `generatedAt`（北京时间日期）显示状态——当天为「实时聚合 · 今日已更新」，前一天为「昨日已更新」，更早为「数据稍旧」，断网时读本地快照显示「离线」。
- **来源**（均为期刊官网公开页面，不访问 CNKI 检索/登录页，不处理验证码）：
  - 仁和 xml-journal：《体育科学》tykx.xml-journal.net、《上海体育大学学报》shtyxyxb.xml-journal.net
  - 知网腾云期刊官网 cbpt：《中国体育科技》zgty、《天津体育学院学报》tjty、《体育与科学》tyyk、《西安体育学院学报》xaty（当期目录 + 近半年网络首发）
  - WKG 期刊官网：《北京体育大学学报》bjtd.chinajournal.net.cn、《武汉体育学院学报》wtxb.cbpt.cnki.net（本期目次，日期精确到月）
  - 编辑部官网：《体育学刊》tyxk.scnu.edu.cn（期刊导读·目次）
  - 未接入：《成都体育学院学报》官网启用 WAF 人机验证，按规则不抓取
- **何时跑**：GitHub Actions `.github/workflows/update-papers.yml`，每天 UTC 23:17（北京时间 07:17 左右，GitHub 定时任务可能延后几分钟到几十分钟）。有变化才提交到 `main`，EdgeOne 自动部署；两个 JSON 在 `edgeone.json` 中为 5 分钟短缓存。
- **容错**：每个源独立超时与重试，单源失败不影响其他源；全部失败或抓到 0 条时不改动任何文件，前端会因日期变旧自动显示「数据稍旧」。
- **手动触发**：GitHub 仓库 → Actions → Update Latest Papers → Run workflow；或命令行 `gh workflow run update-papers.yml -R LEON202304/cssd-sports-scholars`。
- **本地运行**：`pip install requests beautifulsoup4 lxml && python update_latest_papers.py`

---

**维护**：体育学人
