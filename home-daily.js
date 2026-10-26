/* home-daily.js — 首页「每日动态」预览 + 独立页 #vw-daily
   数据：daily-dynamics.json（cat=期刊|院校）
   路由：go('daily') / #daily / #daily/journal / #daily/univ
   回退：删本文件，并去掉 index.html 里对应的 script。 */
(function(){
  var LABEL = {all:"全部", journal:"期刊", univ:"院校"};
  var HOME_CAP = 5; /* 首页每列条数（等量截断） */


  /* 脏标题过滤（与 update_daily_dynamics.is_noise_title 对齐）
     MIN_TITLE_LEN=6：丢弃 <6 字壳标题；短词精确匹配，≥4 字短语可子串命中。 */
  var MIN_TITLE_LEN = 6;
  var TITLE_EXACT_BLOCK = {
    "首页":1, "更多":1, "版权":1, "网站地图":1, "无标题":1,
    "untitled":1, "no title":1, "通知公告":1, "期刊新闻":1,
    "期刊导读":1, "动态速递":1, "null":1, "none":1, "n/a":1, "na":1,
    "-":1, "—":1, "–":1
  };
  var TITLE_CONTAIN_BLOCK = ["通知公告","期刊新闻","期刊导读","动态速递","网站地图","无标题"];

  function isNoiseTitle(title){
    var t = String(title == null ? "" : title).replace(/\s+/g, " ").trim();
    if(!t) return true;
    if(t.length < MIN_TITLE_LEN) return true;
    var low = t.toLowerCase();
    if(TITLE_EXACT_BLOCK[t] || TITLE_EXACT_BLOCK[low]) return true;
    for(var i = 0; i < TITLE_CONTAIN_BLOCK.length; i++){
      var p = TITLE_CONTAIN_BLOCK[i];
      if(t.indexOf(p) !== -1 || low.indexOf(p.toLowerCase()) !== -1) return true;
    }
    return false;
  }

  function isUsableItem(it){
    return !!(it && it.link && it.title && !isNoiseTitle(it.title));
  }

  function esc(s){
    return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }

  /* 与 home-xuejie 同一口径：快照标题里的「时间：…」缺年/月/日则整段不输出。 */
  function timeSegmentComplete(body){
    var s = String(body || "").replace(/\s+/g, "");
    if(!s) return false;
    if(/^[-—–~～至到]/.test(s)) return false;
    var iso = s.match(/((?:19|20)\d{2})-(\d{1,2})-(\d{1,2})/);
    if(iso){
      var moI = parseInt(iso[2], 10), daI = parseInt(iso[3], 10);
      return moI >= 1 && moI <= 12 && daI >= 1 && daI <= 31;
    }
    if(!/(?:19|20)\d{2}年/.test(s)) return false;
    var mm = s.match(/(?:^|[^0-9])(\d{1,2})月/);
    var dd = s.match(/(?:^|[^0-9])(\d{1,2})日/);
    if(!mm || !dd) return false;
    var month = parseInt(mm[1], 10), day = parseInt(dd[1], 10);
    if(!(month >= 1 && month <= 12 && day >= 1 && day <= 31)) return false;
    if(/年[-—–]/.test(s) || /月[-—–]日/.test(s) || /[-—–]月/.test(s)) return false;
    return true;
  }

  function displayTitle(raw){
    var t = String(raw == null ? "" : raw);
    t = t.replace(/\s*时间[：:][ \t]*([^]*?)(?=[ \t]*地点[：:]|$)/g, function(_full, body){
      var chunk = String(body || "").replace(/^\s+|\s+$/g, "");
      if(!timeSegmentComplete(chunk)) return "";
      return " 时间：" + chunk;
    });
    return t.replace(/[ \t]{2,}/g, " ").trim();
  }

  function parseDate(raw){
    var m = String(raw || "").trim().match(/^(\d{4})-(\d{2})(?:-(\d{2}))?/);
    if(!m) return null;
    var day = m[3] || "";
    var partial = !day || day === "00";
    return {
      sort: m[1] + "-" + m[2] + "-" + (partial ? "00" : day),
      label: partial ? (m[1] + "-" + m[2]) : (m[1] + "-" + m[2] + "-" + day),
      iso: partial ? (m[1] + "-" + m[2]) : (m[1] + "-" + m[2] + "-" + day)
    };
  }

  function fmtGenerated(raw){
    var m = String(raw || "").trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
    return m ? (m[1] + "-" + m[2] + "-" + m[3]) : "";
  }

  function loadJson(url){
    return fetch(url, {cache:"no-store"}).then(function(r){
      if(!r.ok) throw new Error("http");
      return r.json();
    });
  }

  function asSnap(data){
    if(!data) return null;
    if(Array.isArray(data)) return {generatedAt:"", items:data};
    if(Array.isArray(data.items)) return data;
    return null;
  }

  function usable(snap){
    return !!(snap && Array.isArray(snap.items) && snap.items.some(isUsableItem));
  }

  var _snapPromise = null;
  function loadSnap(){
    if(!_snapPromise){
      _snapPromise = loadJson("daily-dynamics.json").then(asSnap).catch(function(){ return null; });
    }
    return _snapPromise;
  }

  function catOf(it){
    return (it.cat === "期刊") ? "journal" : "univ";
  }

  function sortItems(items){
    return items.slice().sort(function(a, b){
      var da = (parseDate(a.date) || {sort:"0000-00-00"}).sort;
      var db = (parseDate(b.date) || {sort:"0000-00-00"}).sort;
      if(da === db) return 0;
      return da < db ? 1 : -1;
    });
  }

  function filterItems(items, tab){
    if(tab === "journal") return items.filter(function(it){ return catOf(it) === "journal"; });
    if(tab === "univ") return items.filter(function(it){ return catOf(it) === "univ"; });
    return items;
  }

  function goDaily(tab){
    try{
      if(typeof window.spNavigate === "function") window.spNavigate("daily");
      else if(typeof window.go === "function") window.go("daily");
    }catch(e){}
    if(tab && tab !== "all") setTab(tab, true);
  }

  /* ── 首页预览 ─────────────────────────────────────────────── */
  function homeRowHtml(it){
    var unit = it.source ? '<span class="xj-unit">' + esc(it.source) + "</span>" : "";
    var c = catOf(it);
    var tag = '<span class="xj-tag ' + (c === "journal" ? "xj-tag-journal" : "xj-tag-univ") + '">' +
      esc(LABEL[c] || it.cat || "院校") + "</span>";
    var d = parseDate(it.date);
    var time = d ? '<time datetime="' + esc(d.iso) + '">' + esc(d.label) + "</time>" : "";
    var title = it.link
      ? '<a href="' + esc(it.link) + '" target="_blank" rel="noopener">' + esc(displayTitle(it.title)) + "</a>"
      : esc(displayTitle(it.title));
    return "<li>" +
      '<div class="xj-meta">' + tag + time + "</div>" +
      "<h3>" + title + "</h3>" +
      '<p class="xj-sub">' + unit + "</p>" +
    "</li>";
  }

  function colHtml(title, cls, rows){
    if(!rows.length) return "";
    return '<section class="dy-col ' + cls + '">' +
      '<h3 class="dy-col-title">' + esc(title) + "</h3>" +
      "<ul>" + rows.map(homeRowHtml).join("") + "</ul>" +
    "</section>";
  }

  function paintHome(root, snap){
    var items = sortItems((snap.items || []).filter(isUsableItem));
    var journals = items.filter(function(it){ return catOf(it) === "journal"; }).slice(0, HOME_CAP);
    var univs = items.filter(function(it){ return catOf(it) === "univ"; }).slice(0, HOME_CAP);
    if(!journals.length && !univs.length){ root.remove(); return; }
    var gen = fmtGenerated(snap.generatedAt);
    var updated = gen ? '<span class="xj-updated">更新于 ' + esc(gen) + "</span>" : "";
    root.innerHTML =
      '<div class="xj-head">' +
        '<div class="xj-titles">' +
          '<p class="xj-eye">DAILY DYNAMICS</p>' +
          '<h2 id="homeDailyTitle">每日动态</h2>' +
        "</div>" +
        '<div class="xj-aside">' + updated +
          '<button type="button" class="dy-more" data-dy-more>查看全部</button>' +
        "</div>" +
      "</div>" +
      '<div class="dy-cols">' +
        colHtml("期刊最新发表", "dy-col-journals", journals) +
        colHtml("院校新闻公告", "dy-col-univs", univs) +
      "</div>";
    var more = root.querySelector("[data-dy-more]");
    if(more) more.addEventListener("click", function(){ goDaily("all"); });
    root.removeAttribute("hidden");
  }

  function afterBlock(){
    return document.getElementById("homeXuejie") || document.getElementById("homeNews");
  }

  function placeHome(sec){
    var anchor = afterBlock();
    if(anchor && anchor.parentNode){
      if(sec.parentNode !== anchor.parentNode || anchor.nextElementSibling !== sec){
        anchor.parentNode.insertBefore(sec, anchor.nextSibling);
      }
      return true;
    }
    var grid = document.querySelector("#sportsPortal .sp-grid");
    if(grid && grid.parentNode){
      if(sec.parentNode !== grid.parentNode || sec.nextElementSibling !== grid){
        grid.parentNode.insertBefore(sec, grid);
      }
      return true;
    }
    return false;
  }

  function ensureHomeSec(){
    var existing = document.getElementById("homeDaily");
    if(existing){
      placeHome(existing);
      return existing;
    }
    var sec = document.createElement("section");
    sec.className = "xj dy";
    sec.id = "homeDaily";
    sec.setAttribute("aria-labelledby", "homeDailyTitle");
    sec.hidden = true;
    if(!placeHome(sec)) return null;
    return sec;
  }

  function mountHome(){
    var sec = ensureHomeSec();
    if(!sec) return false;
    if(sec.getAttribute("data-dy-loaded") === "1"){
      placeHome(sec);
      return true;
    }
    sec.setAttribute("data-dy-loaded", "1");
    loadSnap().then(function(snap){
      var el = document.getElementById("homeDaily");
      if(!el) return;
      if(!usable(snap)){ if(el.parentNode) el.remove(); return; }
      try{ paintHome(el, snap); }
      catch(e){ if(el.parentNode) el.remove(); }
    });
    return true;
  }

  /* ── 独立页 #vw-daily ──────────────────────────────────────── */
  var currentTab = "all";

  function parseHashTab(){
    var h = String(location.hash || "").replace(/^#\/?/, "");
    if(h === "daily" || h === "vw-daily") return "all";
    var m = h.match(/^daily\/(all|journal|univ)$/);
    return m ? m[1] : null;
  }

  function setHash(tab, replace){
    var next = (!tab || tab === "all") ? "#daily" : ("#daily/" + tab);
    try{
      if(replace) history.replaceState({view:"daily", dailyTab: tab || "all"}, "", next);
      else if(location.hash !== next) history.pushState({view:"daily", dailyTab: tab || "all"}, "", next);
    }catch(e){
      try{ location.hash = next.replace(/^#/, ""); }catch(err){}
    }
  }

  function setTab(tab, replaceHash){
    currentTab = tab || "all";
    if(replaceHash !== false) setHash(currentTab, true);
    paintPage();
  }

  function pageRowHtml(it){
    var c = catOf(it);
    var badgeCls = c === "journal" ? "is-journal" : "is-univ";
    var d = parseDate(it.date);
    var title = it.link
      ? '<a href="' + esc(it.link) + '" target="_blank" rel="noopener">' + esc(displayTitle(it.title)) + "</a>"
      : esc(displayTitle(it.title));
    var source = it.source ? esc(it.source) : "";
    if(it.section) source = source ? (source + " · " + esc(it.section)) : esc(it.section);
    return '<li class="dy-row">' +
      '<span class="dy-row-badge ' + badgeCls + '">' + esc(LABEL[c] || it.cat || "院校") + "</span>" +
      '<h3 class="dy-row-title">' + title + "</h3>" +
      (d ? '<time class="dy-row-date" datetime="' + esc(d.iso) + '">' + esc(d.label) + "</time>" : '<span class="dy-row-date"></span>') +
      '<p class="dy-row-source">' + source + "</p>" +
    "</li>";
  }

  function ensurePage(){
    var v = document.getElementById("vw-daily");
    if(v) return v;
    v = document.createElement("div");
    v.className = "vw";
    v.id = "vw-daily";
    v.innerHTML =
      '<div class="dy-page">' +
        '<header class="dy-page-hero">' +
          '<p class="dy-page-eye">DAILY DYNAMICS</p>' +
          "<h1>每日动态</h1>" +
          '<p class="dy-page-sub">体育学 C 刊官网与全国体育院校官网日报 · 列表不含摘要</p>' +
          '<p class="dy-page-sub" id="dyPageUpdated" hidden></p>' +
        "</header>" +
        '<div class="dy-tabs" role="tablist" aria-label="每日动态分类" id="dyTabs">' +
          '<button type="button" class="dy-tab on" role="tab" aria-selected="true" data-dy-tab="all">全部</button>' +
          '<button type="button" class="dy-tab" role="tab" aria-selected="false" data-dy-tab="journal">期刊</button>' +
          '<button type="button" class="dy-tab" role="tab" aria-selected="false" data-dy-tab="univ">院校</button>' +
        "</div>" +
        '<ul class="dy-list" id="dyList" aria-live="polite"></ul>' +
      "</div>";
    var anchor = document.getElementById("vw-academicnews") ||
      document.getElementById("vw-journals") ||
      document.getElementById("vw-home");
    if(anchor && anchor.parentNode){
      anchor.parentNode.insertBefore(v, anchor.nextSibling);
    }else{
      document.body.appendChild(v);
    }
    var tabs = v.querySelector("#dyTabs");
    if(tabs){
      tabs.addEventListener("click", function(e){
        var btn = e.target && e.target.closest && e.target.closest("[data-dy-tab]");
        if(!btn) return;
        setTab(btn.getAttribute("data-dy-tab") || "all", true);
      });
    }
    return v;
  }

  var _pageSnap = null;
  function paintPage(){
    var v = ensurePage();
    var list = v.querySelector("#dyList");
    var tabs = v.querySelectorAll("[data-dy-tab]");
    tabs.forEach(function(b){
      var on = b.getAttribute("data-dy-tab") === currentTab;
      b.classList.toggle("on", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    var upd = v.querySelector("#dyPageUpdated");
    if(!_pageSnap){
      if(list) list.innerHTML = '<li class="dy-empty">加载中…</li>';
      loadSnap().then(function(snap){
        _pageSnap = snap;
        paintPage();
      });
      return;
    }
    if(upd){
      var gen = fmtGenerated(_pageSnap.generatedAt);
      if(gen){
        upd.hidden = false;
        upd.textContent = "更新于 " + gen + (_pageSnap.source ? (" · " + _pageSnap.source) : "");
      }
    }
    if(!usable(_pageSnap)){
      if(list) list.innerHTML = '<li class="dy-empty">暂无日报条目</li>';
      return;
    }
    var items = sortItems((_pageSnap.items || []).filter(isUsableItem));
    items = filterItems(items, currentTab);
    if(!list) return;
    if(!items.length){
      list.innerHTML = '<li class="dy-empty">该分类暂无条目</li>';
      return;
    }
    list.innerHTML = items.map(pageRowHtml).join("");
  }

  function showDaily(){
    var tab = parseHashTab();
    if(tab) currentTab = tab;
    ensurePage();
    paintPage();
    setHash(currentTab, true);
  }

  function patchGo(){
    if(typeof window.go !== "function") return false;
    if(window.go.__dyPatched) return true;
    var orig = window.go;
    window.go = function(name, opts){
      if(name === "daily") ensurePage();
      var r = orig.apply(this, arguments);
      if(name === "daily"){
        try{ showDaily(); }catch(e){}
      }
      return r;
    };
    window.go.__dyPatched = true;
    return true;
  }

  function bootFromHash(){
    var tab = parseHashTab();
    if(tab == null) return;
    ensurePage();
    currentTab = tab;
    if(typeof window.go === "function"){
      try{ window.go("daily"); }catch(e){ showDaily(); }
    }else{
      showDaily();
      var v = document.getElementById("vw-daily");
      if(v){
        document.querySelectorAll(".vw").forEach(function(el){ el.classList.remove("on"); });
        v.classList.add("on");
      }
    }
  }

  function watchHome(){
    if(mountHome()) return;
    var obs = new MutationObserver(function(){
      if(mountHome()) obs.disconnect();
    });
    obs.observe(document.documentElement, {childList:true, subtree:true});
  }

  function start(){
    ensurePage(); /* 让 #daily 哈希启动时 vw-daily 已存在 */
    patchGo();
    if(!window.go || !window.go.__dyPatched){
      var n = 0;
      var t = setInterval(function(){
        if(patchGo() || ++n > 40) clearInterval(t);
      }, 100);
    }
    watchHome();
    bootFromHash();
    window.addEventListener("hashchange", function(){
      var tab = parseHashTab();
      if(tab == null) return;
      currentTab = tab;
      if(typeof window.go === "function") window.go("daily");
      else showDaily();
    });
    window.addEventListener("popstate", function(){
      var tab = parseHashTab();
      if(tab == null) return;
      currentTab = tab;
      paintPage();
    });
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, {once:true});
  else start();
})();

/* 首页政策专题：体育高端智库 2026—2030 周期公示记录。
   手工整理的公示资料，独立于每日抓取；日期状态按北京时间判断。 */
(function(){
  'use strict';
  var units = [
    ['清华大学','清华大学体育发展研究院'],
    ['北京师范大学','全民健身与全民健康高质量融合发展高端智库'],
    ['首都体育学院','体育治理现代化研究中心'],
    ['北京体育大学','中国体育发展研究院'],
    ['中国政法大学','体育法治研究基地'],
    ['天津体育学院','“三大球”发展研究院'],
    ['沈阳体育学院','中国冰雪运动发展研究院'],
    ['哈尔滨体育学院','（国家冰雪运动学院）冰雪运动发展高端智库'],
    ['上海体育大学','体育科学创新研究院'],
    ['上海政法学院','体育风险治理与涉外体育法治高端智库'],
    ['苏州大学','东吴体育智库'],
    ['南京体育学院','中国竞技体育研究院'],
    ['浙江大学','体育现代化高端智库'],
    ['福建师范大学','闽台体育融合发展智库'],
    ['武汉体育学院','中国体育治理与体教融合研究中心'],
    ['成都体育学院','体育文化与宣传战略研究中心'],
    ['西安体育学院','西部体育发展智库']
  ];
  function esc(s){
    return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});
  }
  function status(){
    var day = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0,10);
    return day < '2026-10-23' ? '公示尚未开始' : day <= '2026-10-29' ? '公示中' : '公示期已结束';
  }
  function mount(){
    if(document.getElementById('homeThinkTanks')) return true;
    var quick = document.querySelector('#sportsPortal .sp-quick');
    if(!quick || !quick.parentNode) return false;
    var section = document.createElement('section');
    section.id = 'homeThinkTanks';
    section.className = 'tt-topic';
    section.setAttribute('aria-labelledby','thinkTankTitle');
    section.innerHTML =
      '<header class="tt-header"><div><h2 id="thinkTankTitle">体育高端智库</h2>'+
      '<p class="tt-subtitle">2026—2030年周期 · 入选公示</p></div>'+
      '<span class="tt-status">'+status()+'</span></header>'+
      '<p class="tt-intro">国家体育总局政策法规司于<time datetime="2026-10-23">2026年10月23日</time>发布《体育高端智库入选公示》，本次公示涉及<strong>17家单位</strong>。遴选依照《体育高端智库管理办法》及申报通知要求，经自主申报、资格审查、部门推荐、专家评审和综合考评五个环节开展。</p>'+
      '<div class="tt-period"><span>公示时间</span><strong><time datetime="2026-10-23">2026年10月23日</time>—<time datetime="2026-10-29">10月29日</time></strong><span>共7天</span></div>'+
      '<details class="tt-details"><summary><span>查看17家公示单位名单</span><span class="tt-summary-note">按学校标识码排序</span><svg class="tt-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary>'+
      '<div class="tt-table-wrap"><table class="tt-table"><caption>2026—2030年周期体育高端智库入选公示名单（按学校标识码排序）</caption><thead><tr><th scope="col">序号</th><th scope="col">所在学校</th><th scope="col">智库名称</th></tr></thead><tbody>'+
      units.map(function(u,i){return '<tr><td>'+(i+1)+'</td><th scope="row">'+esc(u[0])+'</th><td>'+esc(u[1])+'</td></tr>';}).join('')+
      '</tbody></table></div></details>'+
      '<details class="tt-details tt-contact"><summary><span>异议反馈与联系方式</span><svg class="tt-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary>'+
      '<div class="tt-contact-body"><p>公示期内，任何单位或个人如有异议，可通过电话、传真、邮件或信函向国家体育总局政策法规司反映，并提供必要证据材料以便核实。信函以邮戳日期为准。</p>'+
      '<dl><div><dt>电话</dt><dd><a href="tel:+861087182431">（010）87182431</a></dd></div>'+
      '<div><dt>传真</dt><dd>（010）67111157</dd></div>'+
      '<div><dt>邮箱</dt><dd><a href="mailto:lilunchu@sport.gov.cn">lilunchu@sport.gov.cn</a></dd></div>'+
      '<div><dt>地址</dt><dd>北京市东城区体育馆路2号国家体育总局政策法规司</dd></div></dl></div></details>'+
      '<p class="tt-context">本次公示涉及体育治理、冰雪运动、全民健身、体育法治、体教融合和区域体育发展等领域，为了解体育政策研究与智库布局提供参考。</p>'+
      '<footer class="tt-source">信息依据：国家体育总局政策法规司《体育高端智库入选公示》（2026-10-23）。本页为公示信息整理，最终认定结果以主管部门正式公布为准。</footer>';
    quick.parentNode.insertBefore(section,quick.nextSibling);
    return true;
  }
  function start(){
    if(mount()) return;
    var observer = new MutationObserver(function(){if(mount()) observer.disconnect();});
    observer.observe(document.documentElement,{childList:true,subtree:true});
    window.addEventListener('pagehide',function(){observer.disconnect();},{once:true});
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
