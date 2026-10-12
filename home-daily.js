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
      ? '<a href="' + esc(it.link) + '" target="_blank" rel="noopener">' + esc(it.title) + "</a>"
      : esc(it.title);
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
      ? '<a href="' + esc(it.link) + '" target="_blank" rel="noopener">' + esc(it.title) + "</a>"
      : esc(it.title);
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
