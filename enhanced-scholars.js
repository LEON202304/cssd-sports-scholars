/**
 * CSSD 体育学人 - 核心体验与学术增强补丁
 * 包含：加权拼音检索 + 分片平滑渲染 + 弹窗引文复制按钮 + 勘误认领通道
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

    search(query, maxResults = 120) {
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

  // 3. 学术引文工具与 Toast
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

  // 4. 详情弹窗动态注入样式与按钮
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

  // 5. 初始化与搜索挂载
  function init() {
    injectStyles();
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
      const matched = searchEngineInstance.search(text);

      if (rinfo) {
        rinfo.textContent = text ? `找到 ${matched.length} 位学者` : `全部学者 (${window.S.length})`;
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
