/**
 * =======================================================================
 * CSSD 体育学人 - 核心体验增强补丁 (Step 1 Enhancement Patch)
 * 文件名: enhanced-scholars.js
 * 
 * 功能特性：
 * 1. 拼音首字母 / 全拼 / 汉字模糊加权检索引擎 (如输入 "ly" 匹配 "刘宇")
 * 2. 基于 requestAnimationFrame 的分片平滑渲染 (解决 5,800+ 列表掉帧卡顿)
 * 3. 国家社科基金课题 GB/T 7714-2015 与 BibTeX 学术引文一键导出
 * =======================================================================
 */

(function () {
  'use strict';

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
      if (!query || !query.trim()) {
        return this.raw.slice(0, maxResults);
      }

      const q = query.trim().toLowerCase();
      const results = [];
      const len = this.index.length;

      for (let i = 0; i < len; i++) {
        const item = this.index[i];
        let score = 0;

        // 姓名匹配
        if (item.name === q) score += 100;
        else if (item.name.startsWith(q)) score += 80;
        else if (item.name.includes(q)) score += 60;

        // 拼音首字母匹配 (例如 "ly" 匹配 "刘宇")
        if (item.initials === q) score += 70;
        else if (item.initials.startsWith(q)) score += 50;

        // 拼音全拼
        if (item.fullPinyin.includes(q)) score += 40;

        // 院校机构
        if (item.inst.includes(q)) score += 30;
        if (item.dept.includes(q)) score += 20;

        // 人才称号与头衔
        if (item.hats.includes(q)) score += 25;

        // 二级学科与研究方向
        if (item.disc.includes(q)) score += 15;
        if (item.research.includes(q)) score += 10;

        if (score > 0) {
          results.push({ s: item.raw, score });
        }
      }

      results.sort((a, b) => b.score - a.score);
      return results.slice(0, maxResults).map(r => r.s);
    }
  }

  let _renderRafId = null;

  function smoothRenderToGrid(gridEl, scholars, renderCardFn, batchSize = 30) {
    if (_renderRafId) {
      cancelAnimationFrame(_renderRafId);
      _renderRafId = null;
    }

    gridEl.innerHTML = '';
    const total = scholars.length;
    let renderedCount = 0;

    function renderNextChunk() {
      const fragment = document.createDocumentFragment();
      const end = Math.min(renderedCount + batchSize, total);

      for (let i = renderedCount; i < end; i++) {
        const cardNode = renderCardFn(scholars[i]);
        if (cardNode) fragment.appendChild(cardNode);
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

  window.CSSDCitation = {
    formatGBT7714(project, scholar) {
      const author = scholar.n || '佚名';
      const title = project.title || '无题';
      const inst = project.unit || scholar.institution || '未知单位';
      const year = project.year || new Date().getFullYear();
      const cat = project.category || '科研项目';
      const code = project.code ? ` (项目编号: ${project.code})` : '';
      return `${author}. ${title}[R]. ${inst}, ${year}. ${cat}${code}.`;
    },

    formatBibTeX(project, scholar) {
      const cleanPinyin = (scholar.e || 'scholar').replace(/[^a-zA-Z]/g, '');
      const key = `${cleanPinyin}${project.year || 2026}`;
      return `@techreport{${key},\n  author = {${scholar.n}},\n  title = {${project.title}},\n  institution = {${project.unit || scholar.institution}},\n  year = {${project.year || ''}},\n  number = {${project.code || ''}},\n  type = {${project.category || 'National Social Science Fund'}}\n}`;
    },

    async copy(text, label = '引文') {
      try {
        await navigator.clipboard.writeText(text);
        if (typeof showToast === 'function') {
          showToast(`${label}已复制到剪贴板`);
        } else {
          alert(`${label}已复制到剪贴板！`);
        }
      } catch (e) {
        console.error('复制失败', e);
      }
    }
  };

  let searchEngineInstance = null;

  function initOptimization() {
    if (!window.S || !Array.isArray(window.S) || window.S.length === 0) {
      setTimeout(initOptimization, 100);
      return;
    }

    searchEngineInstance = new ScholarSearchIndex(window.S);
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
    document.addEventListener('DOMContentLoaded', initOptimization);
  } else {
    initOptimization();
  }
})();
