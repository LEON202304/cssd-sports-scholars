/**
 * CSSD 体育学人 - 核心增强补丁 (轻量全能版 120行)
 * 包含：拼音检索 + 60fps丝滑渲染 + 引文一键复制 + 勘误通道 + 一键导出CSV + 快捷键
 */
(function () {
  'use strict';

  // 1. 拼音首字母加权检索
  function searchScholars(list, query) {
    if (!query || !query.trim()) return list.slice(0, 150);
    const q = query.trim().toLowerCase();
    const scored = [];
    for (let i = 0; i < list.length; i++) {
      const s = list[i];
      let score = 0;
      const name = (s.n || '').toLowerCase();
      const pinyin = (s.e || '').toLowerCase();
      const initials = pinyin.split(/\s+/).map(w => w[0] || '').join('');
      const inst = (s.institution || s.s || '').toLowerCase();
      const disc = (s.dL || '').toLowerCase();
      const res = (s.r || '').toLowerCase();

      if (name === q) score += 100;
      else if (name.startsWith(q)) score += 80;
      else if (name.includes(q)) score += 60;
      if (initials === q || initials.startsWith(q)) score += 70;
      if (inst.includes(q)) score += 30;
      if (disc.includes(q) || res.includes(q)) score += 15;

      if (score > 0) scored.push({ s, score });
    }
    return scored.sort((a, b) => b.score - a.score).slice(0, 150).map(x => x.s);
  }

  // 2. 60fps 分片平滑渲染（消灭 5,800+ 列表卡顿）
  let _raf = null;
  function smoothRender(grid, scholars, renderFn, batch = 30) {
    if (_raf) cancelAnimationFrame(_raf);
    grid.innerHTML = '';
    let count = 0;
    function chunk() {
      const frag = document.createDocumentFragment();
      const end = Math.min(count + batch, scholars.length);
      for (let i = count; i < end; i++) {
        const node = renderFn(scholars[i]);
        if (node) frag.appendChild(node);
      }
      grid.appendChild(frag);
      count = end;
      if (count < scholars.length) _raf = requestAnimationFrame(chunk);
    }
    chunk();
  }

  // 3. 规范学术引文复制与 Toast
  function toast(msg) {
    let t = document.getElementById('cssd-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'cssd-toast';
      t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#0f172a;color:#fff;padding:8px 16px;border-radius:20px;font-size:12px;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,0.2);';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.display = 'block';
    clearTimeout(t._tm);
    t._tm = setTimeout(() => t.style.display = 'none', 2000);
  }

  window.CSSDCitation = {
    copy(author, title, inst, year, type) {
      const y = year || 2026;
      const text = type === 'bib' 
        ? `@techreport{CSSD_${y},\n  author = {${author}},\n  title = {${title}},\n  institution = {${inst}},\n  year = {${y}}\n}`
        : `${author}. ${title}[R]. ${inst}, ${y}. 国家社会科学基金项目.`;
      navigator.clipboard.writeText(text).then(() => toast('已复制引文！')).catch(() => prompt('请复制：', text));
    }
  };

  // 4. 一键导出当前结果为 Excel/CSV (UTF-8 BOM 防乱码)
  function exportCSV(list) {
    if (!list || !list.length) return toast('无匹配学者可导出');
    const header = ['姓名,英文/拼音,单位,院系,职称,学科,研究方向,课题数'];
    const rows = list.map(s => [
      `"${s.n || ''}"`, `"${s.e || ''}"`, `"${s.institution || s.s || ''}"`,
      `"${s.dept || ''}"`, `"${s.title || ''}"`, `"${s.dL || ''}"`,
      `"${(s.r || '').replace(/"/g, '""')}"`, s.projectCount || (s.fundedProjects ? s.fundedProjects.length : 0)
    ].join(','));
    const blob = new Blob(['\uFEFF' + header.concat(rows).join('\n')], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `CSSD学者名录_${new Date().toLocaleDateString().replace(/\//g, '')}.csv`;
    a.click();
    toast(`已导出 ${list.length} 位学者`);
  }

  // 5. 详情弹窗动态注入引文按钮与勘误链接
  function enhanceModal() {
    const ov = document.getElementById('ov'), mb = document.getElementById('mb'), mtp = document.getElementById('mtp');
    if (!ov || !ov.classList.contains('on') || !mb) return;
    const name = mtp ? (mtp.querySelector('h2,h3,.mn,.m-name') || {}).textContent || '' : '';
    const inst = mtp ? (mtp.querySelector('.m-inst,p') || {}).textContent || '' : '';

    mb.querySelectorAll('.pj, .proj, .project, li').forEach(el => {
      if (el.dataset.cited) return;
      el.dataset.cited = '1';
      const title = el.querySelector('strong') ? el.querySelector('strong').textContent : el.textContent.split('\n')[0];
      const bar = document.createElement('div');
      bar.style.cssText = 'margin-top:4px;display:flex;gap:6px;';
      bar.innerHTML = `
        <button type="button" style="padding:2px 8px;font-size:11px;cursor:pointer;border:1px solid #cbd5e1;background:#f8fafc;border-radius:4px;">📋 复制 GB/T 7714</button>
        <button type="button" style="padding:2px 8px;font-size:11px;cursor:pointer;border:1px solid #cbd5e1;background:#f8fafc;border-radius:4px;">BibTeX</button>
      `;
      bar.children[0].onclick = (e) => { e.stopPropagation(); window.CSSDCitation.copy(name.trim(), title.trim(), inst.trim(), 2026, 'gbt'); };
      bar.children[1].onclick = (e) => { e.stopPropagation(); window.CSSDCitation.copy(name.trim(), title.trim(), inst.trim(), 2026, 'bib'); };
      el.appendChild(bar);
    });

    if (!mb.querySelector('.cssd-fb')) {
      const fb = document.createElement('div');
      fb.className = 'cssd-fb';
      fb.style.cssText = 'margin-top:12px;padding:8px 12px;background:#eff6ff;border:1px dashed #93c5fd;border-radius:6px;font-size:12px;display:flex;justify-content:space-between;align-items:center;';
      const link = `https://github.com/LEON202304/cssd-sports-scholars/issues/new?template=scholar-update.yml&title=${encodeURIComponent('【信息更新】' + name.trim())}`;
      fb.innerHTML = `<span>💡 发现信息变动或新增课题？</span><a href="${link}" target="_blank" style="color:#2563eb;font-weight:bold;text-decoration:none;">✏️ 提交勘误 / 认领</a>`;
      mb.appendChild(fb);
    }
  }

  // 6. 初始化并挂载主逻辑
  function init() {
    new MutationObserver(enhanceModal).observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });

    // 快捷键: "/" 聚焦搜索，"Esc" 清空/关闭
    window.addEventListener('keydown', e => {
      const q = document.getElementById('sp-scholars-q');
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && q) { e.preventDefault(); q.focus(); q.select(); }
      if (e.key === 'Escape') {
        const ov = document.getElementById('ov');
        if (ov && ov.classList.contains('on')) ov.classList.remove('on');
        else if (q && q.value) { q.value = ''; window.spFilterScholarsLive && window.spFilterScholarsLive(); }
      }
    });

    if (!window.S || !window.S.length) return setTimeout(init, 100);

    let currentList = window.S;
    const originFilter = window.spFilterScholarsLive;
    window.spFilterScholarsLive = function () {
      const q = document.getElementById('sp-scholars-q'), grid = document.getElementById('scgrid'), info = document.getElementById('rinfo'), empty = document.getElementById('scempty');
      if (!q || !grid) return originFilter && originFilter();
      const val = q.value.trim();
      currentList = val ? searchScholars(window.S, val) : window.S;

      if (info) {
        info.innerHTML = `
          <span>${val ? `找到 ${currentList.length} 位学者` : `全部学者 (${window.S.length})`}</span>
          <button type="button" id="cssd-exp" style="margin-left:8px;padding:2px 8px;font-size:11px;cursor:pointer;border-radius:4px;border:1px solid #cbd5e1;background:#fff;">📥 导出名单 (CSV)</button>
        `;
        document.getElementById('cssd-exp').onclick = () => exportCSV(currentList);
      }
      if (empty) empty.style.display = currentList.length ? 'none' : 'block';

      smoothRender(grid, currentList, s => {
        if (window.makeScholarCard) return window.makeScholarCard(s);
        const div = document.createElement('div');
        div.className = 'sc';
        div.innerHTML = `<div class="sc-hd"><div class="sc-av" style="background:${s.c||'#2563eb'}">${s.i||(s.n?s.n[0]:'')}</div><div class="sc-meta"><div class="sc-name">${s.n} <span class="sc-title">${s.title||''}</span></div><div class="sc-inst">${s.institution||s.s||''} · ${s.dL||''}</div></div></div>${s.r?`<div class="sc-r">${s.r}</div>`:''}`;
        return div;
      });
    };
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
