/* home-news.js — 首页「学术动态」板块
   插在功能入口（.sp-quick）之后、三列面板（.sp-grid：学者发现 /
   研究方向总览 / 院校机构导航）之前。
   只挂一次；若已存在则只校正位置，不重复插入。
   板块在 #sportsPortal 内，离开首页时随门户壳隐藏。
   左卡头条下的「最新立项」读页面已加载的 NOPSS_SPORTS_PROJECTS，
   不另请求数据文件。没有项目时不渲染该分区。左卡高度跟随内容，不靠 stretch 假对齐。
   回退：删本文件，并去掉 index.html 里对应的 script。 */
(function(){
  var MOUNTED = false;
  var GRANT_LIMIT = 4;

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
    return !!(snap && Array.isArray(snap.items) && snap.items.some(function(it){ return it && it.title; }));
  }

  function loadPapers(){
    return loadJson("news-snapshot.json").then(asSnap).catch(function(){ return null; }).then(function(snap){
      if(usable(snap)) return snap;
      return loadJson("latest_papers.json").then(asSnap).catch(function(){ return null; });
    });
  }

  function codeNum(code){
    var m = String(code || "").match(/^2026-序号(\d+)$/);
    return m ? parseInt(m[1], 10) : null;
  }

  /* 固定选法：2026 年国社科一般项目里，批准号为「2026-序号NNNN」的条目，
     按序号从小到大取前 GRANT_LIMIT 条（桌面 4，手机 CSS 限 2）。不读会议，也不另拉数据文件。 */
  function latestGrants(){
    var src;
    try{ src = window.NOPSS_SPORTS_PROJECTS; }catch(e){ src = null; }
    if(!src || !src.length) return [];
    var rows = [];
    for(var i = 0; i < src.length; i++){
      var r = src[i];
      if(!r || String(r.year) !== "2026") continue;
      if(String(r.category) !== "一般项目") continue;
      if(codeNum(r.code) == null) continue;
      if(!r.projectTitle) continue;
      rows.push(r);
    }
    rows.sort(function(a, b){ return codeNum(a.code) - codeNum(b.code); });
    return rows.slice(0, GRANT_LIMIT);
  }

  function goAll(e){
    if(e && e.preventDefault) e.preventDefault();
    try{
      if(typeof window.spNavigate === "function") window.spNavigate("academicnews");
      else if(typeof window.go === "function") window.go("academicnews");
    }catch(err){}
  }

  function goProjects(e){
    if(e && e.preventDefault) e.preventDefault();
    try{
      if(typeof window.spNavigate === "function") window.spNavigate("projects");
      else if(typeof window.go === "function") window.go("projects");
      /* 项目页没有年份 URL 参数；沿用已有的年份筛选函数落到 2026。 */
      if(typeof window.setNopssProjectYear === "function") window.setNopssProjectYear("2026");
    }catch(err){}
  }

  function grantsHtml(rows){
    if(!rows.length) return "";
    var lis = rows.map(function(r){
      var bits = [r.applicant, r.unit, "2026 国社科一般项目"].filter(Boolean);
      return '<li>' +
        '<p class="hn-grant-title">' + esc(r.projectTitle) + '</p>' +
        '<p class="hn-grant-sub">' + esc(bits.join(" · ")) + '</p>' +
      '</li>';
    }).join("");
    return '<div class="hn-grants">' +
      '<div class="hn-grants-head">' +
        '<span class="hn-journal">最新立项</span>' +
        '<a class="hn-all hn-grants-all" href="#projects">查看全部立项</a>' +
      '</div>' +
      '<ol class="hn-grant-list">' + lis + '</ol>' +
    '</div>';
  }

  function itemHtml(it, lead, extra){
    var d = parseDate(it.date);
    var journal = "";
    if(it.journal || it.journalZh){
      journal = '<span class="hn-journal-block">' +
        (it.journal ? '<span class="hn-journal">' + esc(it.journal) + "</span>" : "") +
        (it.journalZh ? '<span class="hn-journal-zh">' + esc(it.journalZh) + "</span>" : "") +
      "</span>";
    }
    var time = d ? '<time datetime="' + esc(d.iso) + '">' + esc(d.label) + "</time>" : "";
    var title = esc(it.title);
    var titleLink = it.link
      ? '<a href="' + esc(it.link) + '" target="_blank" rel="noopener">' + title + "</a>"
      : title;
    var titleZh = it.titleZh ? '<p class="hn-title-zh">' + esc(it.titleZh) + "</p>" : "";
    var heading = "<h3>" + titleLink + "</h3>" + titleZh;
    var authors = it.authors ? '<p class="hn-authors">' + esc(it.authors) + "</p>" : "";
    var cls = lead ? "hn-lead" : "hn-row";
    return '<article class="' + cls + '"><div class="hn-meta">' + journal + time + "</div>" + heading + authors + (extra || "") + "</article>";
  }

  function paint(root, snap){
    var items = (snap.items || []).filter(function(it){ return it && it.title; });
    items.sort(function(a, b){
      var da = (parseDate(a.date) || {sort:"0000-00-00"}).sort;
      var db = (parseDate(b.date) || {sort:"0000-00-00"}).sort;
      if(da === db) return 0;
      return da < db ? 1 : -1;
    });
    /* 1 头条 + 3 右列；左卡只放立项，高度随内容（align-items:start），不靠 stretch */
    items = items.slice(0, 4);
    if(!items.length){ root.remove(); return; }
    var grants = [];
    try{ grants = latestGrants(); }catch(e){ grants = []; }
    var gen = fmtGenerated(snap.generatedAt);
    var updated = gen ? '<span class="hn-updated">更新于 ' + esc(gen) + "</span>" : "";
    var layoutCls = grants.length ? "hn-layout" : "hn-layout hn-layout-solo";
    root.innerHTML =
      '<div class="hn-head">' +
        '<div class="hn-titles">' +
          '<p class="hn-eye">ACADEMIC NEWS</p>' +
          '<h2 id="homeNewsTitle">学术动态</h2>' +
        "</div>" +
        '<div class="hn-aside">' + updated +
          '<a class="hn-all" href="#academicnews">查看全部</a>' +
        "</div>" +
      "</div>" +
      '<div class="' + layoutCls + '">' +
        itemHtml(items[0], true, grantsHtml(grants)) +
        '<div class="hn-list">' + items.slice(1).map(function(it){ return itemHtml(it, false, ""); }).join("") + "</div>" +
      "</div>";
    var all = root.querySelector(".hn-all:not(.hn-grants-all)");
    if(all) all.addEventListener("click", goAll);
    var more = root.querySelector(".hn-grants-all");
    if(more) more.addEventListener("click", goProjects);
    root.removeAttribute("hidden");
  }

  function anchor(){
    return document.querySelector("#sportsPortal .sp-grid");
  }

  function place(sec, grid){
    if(sec.parentNode !== grid.parentNode || sec.nextElementSibling !== grid){
      grid.parentNode.insertBefore(sec, grid);
    }
  }

  function mount(){
    var grid = anchor();
    if(!grid || !grid.parentNode) return false;
    var existing = document.getElementById("homeNews");
    if(existing){
      place(existing, grid);
      return true;
    }
    var sec = document.createElement("section");
    sec.className = "hn";
    sec.id = "homeNews";
    sec.setAttribute("aria-labelledby", "homeNewsTitle");
    sec.hidden = true;
    place(sec, grid);
    MOUNTED = true;
    loadPapers().then(function(snap){
      var el = document.getElementById("homeNews");
      if(!el) return;
      if(!usable(snap)){ el.remove(); return; }
      try{ paint(el, snap); }
      catch(e){ el.remove(); }
    }).catch(function(){
      var el = document.getElementById("homeNews");
      if(el) el.remove();
    });
    return true;
  }

  function watch(){
    if(mount()) return;
    var obs = new MutationObserver(function(){
      if(mount()) obs.disconnect();
    });
    obs.observe(document.documentElement, {childList:true, subtree:true});
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", watch, {once:true});
  else watch();
})();
