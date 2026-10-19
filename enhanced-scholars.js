/**
 * CSSD 体育学人 - 核心体验与学术工具增强补丁 v5.0
 * 包含：拼音加权检索 + 60fps平滑渲染 + 弹窗引文复制 + 勘误认领通道 + 一键导出CSV + 键盘快捷键 + 学者横向对比 + 我的关注收藏 + 院校立项榜Top20 + 护眼深色模式
 */
(function () {
  'use strict';

  // 1. 拼音缩写与多字段加权检索
  class ScholarSearchIndex {
    constructor(dataset) {
      this.raw = dataset || [];
      this.index = [];
      this._build();
    }

    _build() {
      const data = this.raw;
      const len = data.length;
      this.index = new Array(len);

      for (let i = 0; i < len; i++) {
        const s = data[i];
        const pinyinTokens = (s.e || '').toLowerCase().split(/\s+/).filter(Boolean);
        const initials = pinyinTokens.map(w => w[0] || '').join('');
        const fullPinyin = pinyinTokens.join('');

        this.index[i] = {
          raw: s,
          name: (s.n || '').toLowerCase(),
          initials: initials,
          fullPinyin: fullPinyin,
          inst: (s.institution || s.s || '').toLowerCase(),
          dept: (s.dept || '').toLowerCase(),
          title: (s.title || '').toLowerCase(),
          disc: (s.dL || '').toLowerCase(),
          hats: (Array.isArray(s.hats) ? s.hats.join(' ') : '').toLowerCase(),
          research: (s.r || '').toLowerCase()
        };
      }
    }

    search(query, maxResults = 150) {
      if (!query || !query.trim()) return this.raw.slice(0, maxResults);
      const q = query.trim().toLowerCase();
      const results = [];
      const len = this.index.length;

      for (let i = 0; i < len; i++) {
        const item = this.index[i];
        let score = 0;

        if (item.name === q) score += 100;
        else if (item.name.startsWith(q)) score += 80;
        else if (item.name.includes(q)) score += 60;

        if (item.initials === q) score += 70;
        else if (item.initials.startsWith(q)) score += 50;

        if (item.fullPinyin.includes(q)) score += 40;
        if (item.inst.includes(q)) score += 30;
        if (item.dept.includes(q)) score += 20;
        if (item.hats.includes(q)) score += 25;
        if (item.disc.includes(q)) score += 15;
        if (item.research.includes(q)) score += 10;

        if (score > 0) results.push({ s: item.raw, score });
      }

      results.sort((a, b) => b.score - a.score);
      return results.slice(0, maxResults).map(r => r.s);
    }
  }

  // 2. 60fps 分片平滑渲染
  let _renderRafId = null;
  function smoothRenderToGrid(gridEl, scholars, renderCardFn, batchSize = 30) {
    if (_renderRafId) cancelAnimationFrame(_renderRafId);
    gridEl.innerHTML = '';
    const total = scholars.length;
    let renderedCount = 0;

    function renderNextChunk() {
      const fragment = document.createDocumentFragment();
      const end = Math.min(renderedCount + batchSize, total);
      for (let i = renderedCount; i < end; i++) {
        const node = renderCardFn(scholars[i]);
        if (node) fragment.appendChild(node);
      }
      gridEl.appendChild(fragment);
      renderedCount = end;
      if (renderedCount < total) {
        _renderRafId = requestAnimationFrame(renderNextChunk);
      } else {
        _renderRafId = null;
      }
    }
    renderNextChunk();
  }

  // 3. 学术引文工具与轻量 Toast
  function showToast(msg) {
    let t = document.getElementById('cssd-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'cssd-toast';
      t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:rgba(15,23,42,0.92);color:#fff;padding:8px 18px;border-radius:24px;font-size:13px;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,0.18);transition:opacity 0.25s,transform 0.25s;pointer-events:none;opacity:0;';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(t._timer);
    t._timer = setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(-50%) translateY(8px)';
    }, 2000);
  }

  window.CSSDCitation = {
    formatGBT7714(author, title, inst, year, cat, code) {
      const pAuthor = author || '佚名';
      const pTitle = title || '无题';
      const pInst = inst || '未知单位';
      const pYear = year || new Date().getFullYear();
      const pCat = cat || '科研项目';
      const pCode = code ? ` (项目编号: ${code})` : '';
      return `${pAuthor}. ${pTitle}[R]. ${pInst}, ${pYear}. ${pCat}${pCode}.`;
    },

    formatBibTeX(author, title, inst, year, cat, code) {
      const pAuthor = author || '佚名';
      const pYear = year || 2026;
      return `@techreport{CSSD_${pYear},\n  author = {${pAuthor}},\n  title = {${title}},\n  institution = {${inst || ''}},\n  year = {${pYear}},\n  number = {${code || ''}},\n  type = {${cat || 'National Social Science Fund'}}\n}`;
    },

    async copy(text, label = '引文') {
      try {
        await navigator.clipboard.writeText(text);
        showToast(`已复制 ${label}`);
      } catch (e) {
        prompt('请手动复制引文：', text);
      }
    }
  };

  // 4. 数据导出器 (Excel/CSV with UTF-8 BOM)
  let currentFilteredScholars = [];

  function exportScholarsToCSV(list) {
    if (!list || list.length === 0) {
      showToast('当前无匹配学者可导出');
      return;
    }

    const headers = ['学者姓名', '拼音/英文', '所在单位', '所属院系', '职称', '学科门类', '二级学科', '人才荣誉', '研究方向', '社科基金立项数'];
    const rows = list.map(s => [
      `"${(s.n || '').replace(/"/g, '""')}"`,
      `"${(s.e || '').replace(/"/g, '""')}"`,
      `"${(s.institution || s.s || '').replace(/"/g, '""')}"`,
      `"${(s.dept || '').replace(/"/g, '""')}"`,
      `"${(s.title || '').replace(/"/g, '""')}"`,
      `"${(s.dL || '').replace(/"/g, '""')}"`,
      `"${(s.disc || '').replace(/"/g, '""')}"`,
      `"${(Array.isArray(s.hats) ? s.hats.join(';') : '').replace(/"/g, '""')}"`,
      `"${(s.r || '').replace(/"/g, '""')}"`,
      s.projectCount || (Array.isArray(s.fundedProjects) ? s.fundedProjects.length : 0)
    ]);

    const csvContent = '\uFEFF' + headers.join(',') + '\n' + rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    link.href = url;
    link.setAttribute('download', `CSSD_体育学者检索结果_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`成功导出 ${list.length} 位学者名单`);
  }

  // 5. ⭐ 我的关注 / 收藏夹
  const BOOKMARK_KEY = 'cssd_fav_scholars_v1';
  let isOnlyFavMode = false;

  function getBookmarks() {
    try {
      return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function isBookmarked(scholarId) {
    const list = getBookmarks();
    return list.some(id => String(id) === String(scholarId));
  }

  function toggleBookmark(scholar) {
    let list = getBookmarks();
    const sid = String(scholar.id || scholar.n);
    const idx = list.indexOf(sid);
    if (idx >= 0) {
      list.splice(idx, 1);
      showToast(`已取消关注: ${scholar.n}`);
    } else {
      list.push(sid);
      showToast(`⭐ 已加入关注: ${scholar.n}`);
    }
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(list));
    updateBookmarkButton();
    if (isOnlyFavMode && typeof window.spFilterScholarsLive === 'function') {
      window.spFilterScholarsLive();
    }
  }

  function updateBookmarkButton() {
    const btn = document.getElementById('cssd-fav-toggle-btn');
    if (btn) {
      const count = getBookmarks().length;
      btn.innerHTML = `⭐ 我的关注 (${count})`;
      btn.style.color = isOnlyFavMode ? '#eab308' : '';
      btn.style.borderColor = isOnlyFavMode ? '#eab308' : '';
    }
  }

  // 6. 🏆 全国高校国家社科立项榜 Top 20
  function showInstitutionRanking() {
    if (!window.S || window.S.length === 0) return;

    const stats = {};
    for (const s of window.S) {
      const inst = s.institution || s.s || '其他科研单位';
      if (!stats[inst]) {
        stats[inst] = { name: inst, scholarCount: 0, projectCount: 0 };
      }
      stats[inst].scholarCount += 1;
      const pCount = s.projectCount || (Array.isArray(s.fundedProjects) ? s.fundedProjects.length : 0);
      stats[inst].projectCount += pCount;
    }

    const sorted = Object.values(stats).sort((a, b) => b.projectCount - a.projectCount || b.scholarCount - a.scholarCount).slice(0, 20);

    let m = document.getElementById('cssd-rank-modal');
    if (!m) {
      m = document.createElement('div');
      m.id = 'cssd-rank-modal';
      document.body.appendChild(m);
    }
    m.className = 'active';

    m.innerHTML = `
      <div class="cssd-c-content">
        <div class="cssd-c-hd">
          <h3>🏆 全国高校体育学国家社科基金立项榜 (Top 20)</h3>
          <button type="button" class="cssd-c-close" id="cssd-close-rank">✕</button>
        </div>
        <div class="cssd-c-body">
          <p style="font-size:12px;color:#64748b;margin-bottom:12px;">基于 CSSD 收录学者承担之国家社科基金课题聚合统计，点击高校名称可一键检索该校全部学者。</p>
          <table class="cssd-c-table">
            <thead>
              <tr>
                <th style="width:50px;text-align:center;">排名</th>
                <th>高校 / 科研院所</th>
                <th style="width:130px;text-align:right;">社科基金立项数</th>
                <th style="width:100px;text-align:right;">收录学者数</th>
              </tr>
            </thead>
            <tbody>
              ${sorted.map((item, idx) => `
                <tr>
                  <td style="text-align:center;font-weight:bold;color:${idx < 3 ? '#eab308' : '#64748b'};">${idx + 1}</td>
                  <td>
                    <a href="javascript:void(0)" class="cssd-rank-link" data-inst="${item.name}" style="color:#2563eb;font-weight:500;text-decoration:none;">
                      ${item.name}
                    </a>
                  </td>
                  <td style="text-align:right;font-weight:bold;color:#0f172a;">${item.projectCount} 项</td>
                  <td style="text-align:right;color:#64748b;">${item.scholarCount} 人</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    document.getElementById('cssd-close-rank').onclick = () => { m.className = ''; };
    m.querySelectorAll('.cssd-rank-link').forEach(el => {
      el.onclick = () => {
        const inst = el.getAttribute('data-inst');
        m.className = '';
        const qEl = document.getElementById('sp-scholars-q');
        if (qEl) {
          qEl.value = inst;
          if (typeof window.spFilterScholarsLive === 'function') window.spFilterScholarsLive();
          window.scrollTo({ top: 300, behavior: 'smooth' });
        }
      };
    });
  }

  // 7. 🌙 护眼暗色模式
  function initDarkMode() {
    const isDark = localStorage.getItem('cssd_theme_dark') === '1';
    if (isDark) {
      document.documentElement.classList.add('cssd-dark-theme');
    }
  }

  function toggleDarkMode() {
    const el = document.documentElement;
    el.classList.toggle('cssd-dark-theme');
    const isDark = el.classList.contains('cssd-dark-theme');
    localStorage.setItem('cssd_theme_dark', isDark ? '1' : '0');
    showToast(isDark ? '🌙 已开启夜间护眼模式' : '☀️ 已切换为日间明亮模式');
  }

  // 8. 学者学术画像对比池
  let compareList = [];

  function toggleCompare(scholar) {
    const idx = compareList.findIndex(x => x.id === scholar.id || x.n === scholar.n);
    if (idx >= 0) {
      compareList.splice(idx, 1);
      showToast(`已移除 ${scholar.n}`);
    } else {
      if (compareList.length >= 3) {
        showToast('对比池最多支持 3 位学者');
        return;
      }
      compareList.push(scholar);
      showToast(`已加入对比：${scholar.n}`);
    }
    renderCompareDock();
  }

  function renderCompareDock() {
    let dock = document.getElementById('cssd-compare-dock');
    if (!dock) {
      dock = document.createElement('div');
      dock.id = 'cssd-compare-dock';
      document.body.appendChild(dock);
    }

    if (compareList.length === 0) {
      dock.style.display = 'none';
      return;
    }

    dock.style.display = 'flex';
    dock.innerHTML = `
      <div class="cssd-dock-title">
        <span>⚖️ 学术对比池 (${compareList.length}/3)</span>
      </div>
      <div class="cssd-dock-names">
        ${compareList.map(s => `<span class="cssd-dock-tag">${s.n} <b data-id="${s.id}">×</b></span>`).join('')}
      </div>
      <div class="cssd-dock-actions">
        <button type="button" class="cssd-dock-btn" id="cssd-start-compare">查看对比</button>
        <button type="button" class="cssd-dock-clear" id="cssd-clear-compare">清空</button>
      </div>
    `;

    dock.querySelectorAll('.cssd-dock-tag b').forEach(el => {
      el.onclick = () => {
        const sid = el.getAttribute('data-id');
        compareList = compareList.filter(s => String(s.id) !== String(sid));
        renderCompareDock();
      };
    });

    const startBtn = document.getElementById('cssd-start-compare');
    if (startBtn) startBtn.onclick = showCompareModal;

    const clearBtn = document.getElementById('cssd-clear-compare');
    if (clearBtn) clearBtn.onclick = () => { compareList = []; renderCompareDock(); };
  }

  function showCompareModal() {
    let m = document.getElementById('cssd-compare-modal');
    if (!m) {
      m = document.createElement('div');
      m.id = 'cssd-compare-modal';
      document.body.appendChild(m);
    }
    m.className = 'active';

    m.innerHTML = `
      <div class="cssd-c-content">
        <div class="cssd-c-hd">
          <h3>学者综合学术画像横向对标 (${compareList.length}人)</h3>
          <button type="button" class="cssd-c-close" id="cssd-close-compare">✕</button>
        </div>
        <div class="cssd-c-body">
          <table class="cssd-c-table">
            <thead>
              <tr>
                <th style="width:120px">维度 / 学者</th>
                ${compareList.map(s => `<th><div class="c-th-name">${s.n}</div><div class="c-th-sub">${s.institution}</div></th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>职称 / 院系</td>
                ${compareList.map(s => `<td>${s.title \vert{}\vert{} '教师'} · ${s.dept || '体育院系'}</td>`).join('')}
              </tr>
              <tr>
                <td>学科门类</td>
                ${compareList.map(s => `<td>${s.dL \vert{}\vert{} '体育学'} (${s.disc || ''})</td>`).join('')}
              </tr>
              <tr>
                <td>人才荣誉</td>
                ${compareList.map(s => `<td>${(s.hats && s.hats.length) ? s.hats.map(h => `<span class="c-badge">${h}</span>`).join(' ') : '—'}</td>`).join('')}
              </tr>
              <tr>
                <td>核心研究方向</td>
                ${compareList.map(s => `<td>${s.r || '暂未公开'}</td>`).join('')}
              </tr>
              <tr>
                <td>社科基金总数</td>
                ${compareList.map(s => `<td><strong style="color:#2563eb;font-size:16px">${s.projectCount || (s.fundedProjects ? s.fundedProjects.length : 0)}</strong> 项</td>`).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    document.getElementById('cssd-close-compare').onclick = () => { m.className = ''; };
  }

  // 9. 键盘快捷键 ("/" 聚焦，"Esc" 关闭/清空)
  function initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        const qEl = document.getElementById('sp-scholars-q');
        if (qEl) {
          e.preventDefault();
          qEl.focus();
          qEl.select();
        }
      }

      if (e.key === 'Escape') {
        const rModal = document.getElementById('cssd-rank-modal');
        if (rModal && rModal.classList.contains('active')) {
          rModal.classList.remove('active');
          return;
        }

        const cModal = document.getElementById('cssd-compare-modal');
        if (cModal && cModal.classList.contains('active')) {
          cModal.classList.remove('active');
          return;
        }

        const ov = document.getElementById('ov');
        if (ov && ov.classList.contains('on')) {
          const closeBtn = document.getElementById('mc') || ov.querySelector('.close, .btn-close');
          if (closeBtn) closeBtn.click();
          else ov.classList.remove('on');
          return;
        }

        const qEl = document.getElementById('sp-scholars-q');
        if (qEl && qEl.value) {
          qEl.value = '';
          if (typeof window.spFilterScholarsLive === 'function') {
            window.spFilterScholarsLive();
          }
          qEl.blur();
        }
      }
    });
  }

  // 10. 样式注入
  function injectStyles() {
    if (document.getElementById('cssd-enhanced-styles')) return;
    const style = document.createElement('style');
    style.id = 'cssd-enhanced-styles';
    style.textContent = `
      .cssd-cite-group { display: inline-flex; gap: 6px; margin-top: 6px; }
      .cssd-cite-btn { background: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; transition: all 0.15s ease; line-height: 1.4; }
      .cssd-cite-btn:hover { background: #2563eb; color: #fff; border-color: #2563eb; }
      .cssd-feedback-bar { display: flex; align-items: center; justify-content: space-between; background: #eff6ff; border: 1px dashed #93c5fd; border-radius: 6px; padding: 8px 12px; margin-top: 14px; font-size: 12px; color: #1e40af; }
      .cssd-feedback-btn { background: #2563eb; color: #fff !important; padding: 3px 10px; border-radius: 4px; font-weight: 500; text-decoration: none; font-size: 12px; display: inline-block; }
      .cssd-feedback-btn:hover { background: #1d4ed8; }
      .cssd-toolbar-btn {
        background: #f8fafc;
        border: 1px solid #cbd5e1;
        color: #0f172a;
        padding: 3px 10px;
        border-radius: 6px;
        font-size: 12px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        margin-left: 6px;
        font-weight: 500;
        transition: all 0.2s ease;
      }
      .cssd-toolbar-btn:hover {
        background: #2563eb;
        color: #ffffff;
        border-color: #2563eb;
      }
      #cssd-compare-dock {
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #0f172a;
        color: #fff;
        padding: 10px 16px;
        border-radius: 30px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        display: none;
        align-items: center;
        gap: 12px;
        z-index: 9999;
        font-size: 13px;
      }
      .cssd-dock-tag {
        background: #334155;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 12px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .cssd-dock-tag b { cursor: pointer; color: #94a3b8; }
      .cssd-dock-tag b:hover { color: #f87171; }
      .cssd-dock-btn { background: #2563eb; color: #fff; border: none; padding: 4px 12px; border-radius: 20px; cursor: pointer; font-size: 12px; font-weight: bold; }
      .cssd-dock-clear { background: transparent; color: #94a3b8; border: none; cursor: pointer; font-size: 12px; }
      #cssd-compare-modal, #cssd-rank-modal {
        position: fixed;
        inset: 0;
        background: rgba(15,23,42,0.65);
        backdrop-filter: blur(4px);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 100000;
        padding: 20px;
      }
      #cssd-compare-modal.active, #cssd-rank-modal.active { display: flex; }
      .cssd-c-content {
        background: #fff;
        width: 100%;
        max-width: 900px;
        max-height: 85vh;
        border-radius: 12px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 0 20px 40px rgba(0,0,0,0.25);
      }
      .cssd-c-hd { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid #e2e8f0; }
      .cssd-c-hd h3 { margin: 0; font-size: 17px; color: #0f172a; }
      .cssd-c-close { background: none; border: none; font-size: 20px; cursor: pointer; color: #64748b; }
      .cssd-c-body { padding: 20px; overflow-y: auto; }
      .cssd-c-table { width: 100%; border-collapse: collapse; font-size: 13px; }
      .cssd-c-table th, .cssd-c-table td { padding: 10px 12px; border: 1px solid #e2e8f0; text-align: left; vertical-align: middle; }
      .cssd-c-table th { background: #f8fafc; font-weight: bold; }
      .c-th-name { font-size: 16px; color: #0f172a; }
      .c-th-sub { font-size: 12px; color: #64748b; font-weight: normal; margin-top: 2px; }
      .c-badge { background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; font-size: 11px; }

      .cssd-dark-theme body, .cssd-dark-theme html { background: #090d16 !important; color: #cbd5e1 !important; }
      .cssd-dark-theme .sc, .cssd-dark-theme .cssd-c-content, .cssd-dark-theme #mb, .cssd-dark-theme .m { background: #131b2e !important; color: #e2e8f0 !important; border-color: #1e293b !important; }
      .cssd-dark-theme .cssd-c-table th { background: #1e293b !important; color: #f8fafc !important; }
      .cssd-dark-theme .cssd-c-table td, .cssd-dark-theme .cssd-c-table th { border-color: #334155 !important; color: #cbd5e1 !important; }
      .cssd-dark-theme .cssd-c-hd { border-color: #334155 !important; }
      .cssd-dark-theme .cssd-c-hd h3, .cssd-dark-theme .c-th-name { color: #f8fafc !important; }
      .cssd-dark-theme .cssd-toolbar-btn, .cssd-dark-theme .cssd-cite-btn { background: #1e293b !important; color: #cbd5e1 !important; border-color: #334155 !important; }
      .cssd-dark-theme input[type="search"], .cssd-dark-theme input[type="text"] { background: #131b2e !important; color: #fff !important; border-color: #334155 !important; }
    `;
    document.head.appendChild(style);
  }

  function enhanceModal() {
    const ov = document.getElementById('ov');
    const mb = document.getElementById('mb');
    const mtp = document.getElementById('mtp');
    if (!ov || !ov.classList.contains('on') || !mb) return;

    let scholarName = '';
    let scholarInst = '';
    if (mtp) {
      const nameEl = mtp.querySelector('h2, h3, .mn, .m-name');
      scholarName = nameEl ? nameEl.textContent.trim().split(/\s+/)[0] : '';
      const instEl = mtp.querySelector('.m-inst, .inst, p');
      scholarInst = instEl ? instEl.textContent.trim() : '';
    }

    const matchedScholar = (window.S || []).find(x => x.n === scholarName && (x.institution === scholarInst || !scholarInst));

    if (mtp && matchedScholar && !mtp.querySelector('.cssd-modal-tools')) {
      const toolBox = document.createElement('div');
      toolBox.className = 'cssd-modal-tools';
      toolBox.style.cssText = 'display:inline-flex;gap:6px;margin-left:10px;vertical-align:middle;';

      const favBtn = document.createElement('button');
      favBtn.type = 'button';
      favBtn.className = 'cssd-cite-btn';
      const hasFav = isBookmarked(matchedScholar.id || matchedScholar.n);
      favBtn.textContent = hasFav ? '★ 已关注' : '☆ 关注学者';
      favBtn.onclick = () => {
        toggleBookmark(matchedScholar);
        favBtn.textContent = isBookmarked(matchedScholar.id || matchedScholar.n) ? '★ 已关注' : '☆ 关注学者';
      };

      const cmpBtn = document.createElement('button');
      cmpBtn.type = 'button';
      cmpBtn.className = 'cssd-cite-btn';
      cmpBtn.style.cssText = 'background:#2563eb;color:#fff;border-color:#2563eb;';
      cmpBtn.textContent = '⚖️ 加入对比';
      cmpBtn.onclick = () => toggleCompare(matchedScholar);

      toolBox.appendChild(favBtn);
      toolBox.appendChild(cmpBtn);
      mtp.appendChild(toolBox);
    }

    const projectItems = mb.querySelectorAll('.pj, .proj, .project, li, .p-item');
    projectItems.forEach((el) => {
      if (el.dataset.cssdEnhanced) return;
      el.dataset.cssdEnhanced = '1';

      const rawText = el.textContent || '';
      if (!rawText || rawText.length < 5) return;
      const title = el.querySelector('strong') ? el.querySelector('strong').textContent.trim() : rawText.split('\n')[0];

      const btnGroup = document.createElement('div');
      btnGroup.className = 'cssd-cite-group';

      const gbtBtn = document.createElement('button');
      gbtBtn.className = 'cssd-cite-btn';
      gbtBtn.type = 'button';
      gbtBtn.textContent = '📋 复制 GB/T 7714';
      gbtBtn.onclick = (e) => {
        e.stopPropagation();
        const cite = window.CSSDCitation.formatGBT7714(scholarName, title, scholarInst, 2026, '国家社会科学基金项目', '');
        window.CSSDCitation.copy(cite, 'GB/T 7714 引文');
      };

      const bibBtn = document.createElement('button');
      bibBtn.className = 'cssd-cite-btn';
      bibBtn.type = 'button';
      bibBtn.textContent = 'BibTeX';
      bibBtn.onclick = (e) => {
        e.stopPropagation();
        const bib = window.CSSDCitation.formatBibTeX(scholarName, title, scholarInst, 2026, 'National Social Science Fund', '');
        window.CSSDCitation.copy(bib, 'BibTeX 引文');
      };

      btnGroup.appendChild(gbtBtn);
      btnGroup.appendChild(bibBtn);
      el.appendChild(btnGroup);
    });

    if (!mb.querySelector('.cssd-feedback-bar')) {
      const feedBar = document.createElement('div');
      feedBar.className = 'cssd-feedback-bar';
      const issueUrl = `https://github.com/LEON202304/cssd-sports-scholars/issues/new?template=scholar-update.yml&title=${encodeURIComponent('【信息更新】' + (scholarName || '学者') + ' - ' + (scholarInst || '单位'))}`;
      feedBar.innerHTML = `
        <span>💡 发现该学者职务变动、新增课题或信息有误？</span>
        <a href="${issueUrl}" target="_blank" rel="noopener noreferrer" class="cssd-feedback-btn">
          ✏️ 提交勘误 / 认领
        </a>
      `;
      mb.appendChild(feedBar);
    }
  }

  const modalObserver = new MutationObserver(() => enhanceModal());

  // 11. 渲染工具栏组件
  function renderToolbar(container) {
    if (!container || container.querySelector('.cssd-toolbar-wrap')) return;

    const wrap = document.createElement('span');
    wrap.className = 'cssd-toolbar-wrap';
    wrap.style.cssText = 'display:inline-flex;align-items:center;flex-wrap:wrap;gap:4px;vertical-align:middle;';

    const expBtn = document.createElement('button');
    expBtn.type = 'button';
    expBtn.className = 'cssd-toolbar-btn';
    expBtn.id = 'cssd-export-trigger';
    expBtn.textContent = '📥 导出名单';
    expBtn.onclick = () => exportScholarsToCSV(currentFilteredScholars);

    const rankBtn = document.createElement('button');
    rankBtn.type = 'button';
    rankBtn.className = 'cssd-toolbar-btn';
    rankBtn.textContent = '🏆 院校立项榜';
    rankBtn.onclick = showInstitutionRanking;

    const favBtn = document.createElement('button');
    favBtn.type = 'button';
    favBtn.className = 'cssd-toolbar-btn';
    favBtn.id = 'cssd-fav-toggle-btn';
    const favCount = getBookmarks().length;
    favBtn.textContent = `⭐ 我的关注 (${favCount})`;
    favBtn.onclick = () => {
      isOnlyFavMode = !isOnlyFavMode;
      updateBookmarkButton();
      if (typeof window.spFilterScholarsLive === 'function') {
        window.spFilterScholarsLive();
      }
      showToast(isOnlyFavMode ? '已切换至「仅看关注学者」' : '已恢复全部学者视图');
    };

    const darkBtn = document.createElement('button');
    darkBtn.type = 'button';
    darkBtn.className = 'cssd-toolbar-btn';
    darkBtn.textContent = '🌙 护眼';
    darkBtn.title = '切换明暗夜间模式';
    darkBtn.onclick = toggleDarkMode;

    wrap.appendChild(expBtn);
    wrap.appendChild(rankBtn);
    wrap.appendChild(favBtn);
    wrap.appendChild(darkBtn);
    container.appendChild(wrap);
  }

  // 12. 初始化与主流程拦截
  function init() {
    injectStyles();
    initDarkMode();
    initKeyboardShortcuts();

    const ov = document.getElementById('ov');
    if (ov) {
      modalObserver.observe(ov, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
    }

    if (!window.S || !Array.isArray(window.S) || window.S.length === 0) {
      setTimeout(init, 100);
      return;
    }

    const searchEngineInstance = new ScholarSearchIndex(window.S);
    window.scholarSearchIndex = searchEngineInstance;
    currentFilteredScholars = window.S;

    const originFilter = window.spFilterScholarsLive;
    window.spFilterScholarsLive = function () {
      const qEl = document.getElementById('sp-scholars-q');
      const grid = document.getElementById('scgrid');
      const rinfo = document.getElementById('rinfo');
      const scempty = document.getElementById('scempty');

      if (!qEl || !grid || !searchEngineInstance) {
        if (typeof originFilter === 'function') originFilter();
        return;
      }

      const text = qEl.value.trim();
      let matched = searchEngineInstance.search(text, text ? 200 : 120);

      if (isOnlyFavMode) {
        const favs = getBookmarks();
        matched = matched.filter(s => favs.some(id => String(id) === String(s.id || s.n)));
      }

      currentFilteredScholars = text ? matched : (isOnlyFavMode ? matched : window.S);

      if (rinfo) {
        rinfo.innerHTML = `<span>${text ? `找到 ${matched.length} 位学者` : (isOnlyFavMode ? `关注学者 (${matched.length})` : `全部学者 (${window.S.length})`)}</span>`;
        renderToolbar(rinfo);
      }

      if (scempty) {
        scempty.style.display = matched.length === 0 ? 'block' : 'none';
      }

      smoothRenderToGrid(grid, matched, function (scholar) {
        if (typeof window.makeScholarCard === 'function') {
          return window.makeScholarCard(scholar);
        }
        const div = document.createElement('div');
        div.className = 'sc';
        const initial = scholar.i || (scholar.n ? scholar.n[0] : '学');
        const color = scholar.c || '#2563eb';
        div.innerHTML = `
          <div class="sc-hd">
            <div class="sc-av" style="background:${color}">${initial}</div>
            <div class="sc-meta">
              <div class="sc-name">${scholar.n} <span class="sc-title">${scholar.title || ''}</span></div>
              <div class="sc-inst">${scholar.institution || scholar.s || ''} · ${scholar.dL || ''}</div>
            </div>
          </div>
          ${scholar.r ? `<div class="sc-r">${scholar.r}</div>` : ''}
        `;
        return div;
      });
    };

    const rinfo = document.getElementById('rinfo');
    if (rinfo) {
      renderToolbar(rinfo);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
