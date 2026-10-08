/* home-news.js — 首页「学术动态」板块
   插在功能入口（.sp-quick）之后、三列面板（.sp-grid：学者发现 /
   研究方向总览 / 院校机构导航）之前。
   只挂一次；若已存在则只校正位置，不重复插入。
   板块在 #sportsPortal 内，离开首页时随门户壳隐藏。
   回退：删本文件，并去掉 index.html 里对应的 script。 */
(function(){
  var MOUNTED = false;

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

  function goAll(e){
    if(e && e.preventDefault) e.preventDefault();
    try{
      if(typeof window.spNavigate === "function") window.spNavigate("academicnews");
      else if(typeof window.go === "function") window.go("academicnews");
    }catch(err){}
  }

  function itemHtml(it, lead){
    var d = parseDate(it.date);
    var journal = it.journal ? '<span class="hn-journal">' + esc(it.journal) + "</span>" : "";
    var time = d ? '<time datetime="' + esc(d.iso) + '">' + esc(d.label) + "</time>" : "";
    var title = esc(it.title);
    var heading = it.link
      ? '<h3><a href="' + esc(it.link) + '" target="_blank" rel="noopener">' + title + "</a></h3>"
      : "<h3>" + title + "</h3>";
    var authors = it.authors ? '<p class="hn-authors">' + esc(it.authors) + "</p>" : "";
    var cls = lead ? "hn-lead" : "hn-row";
    return '<article class="' + cls + '"><div class="hn-meta">' + journal + time + "</div>" + heading + authors + "</article>";
  }

  function paint(root, snap){
    var items = (snap.items || []).filter(function(it){ return it && it.title; });
    items.sort(function(a, b){
      var da = (parseDate(a.date) || {sort:"0000-00-00"}).sort;
      var db = (parseDate(b.date) || {sort:"0000-00-00"}).sort;
      if(da === db) return 0;
      return da < db ? 1 : -1;
    });
    items = items.slice(0, 6);
    if(!items.length){ root.remove(); return; }
    var gen = fmtGenerated(snap.generatedAt);
    var updated = gen ? '<span class="hn-updated">更新于 ' + esc(gen) + "</span>" : "";
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
      '<div class="hn-layout">' +
        itemHtml(items[0], true) +
        '<div class="hn-list">' + items.slice(1).map(function(it){ return itemHtml(it, false); }).join("") + "</div>" +
      "</div>";
    var all = root.querySelector(".hn-all");
    if(all) all.addEventListener("click", goAll);
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
