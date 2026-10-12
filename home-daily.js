/* home-daily.js — 首页「每日动态」频道（体育学C刊官网 + 全国体育院校官网日报）
   插在 #homeXuejie（学界动态）之后、.sp-grid（三列面板）之前。
   数据：daily-dynamics.json（GitHub Actions 每日抓取生成：cat=期刊|院校）。
   左列：期刊最新发表；右列：院校新闻公告。抓取失败或无条目时隐藏整块。
   回退：删本文件，并去掉 index.html 里对应的 script。 */
(function(){
  var LABEL = {journal:"期刊", univ:"院校"};

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
    return !!(snap && Array.isArray(snap.items) && snap.items.some(function(it){
      return it && it.title && it.link;
    }));
  }

  function loadSnap(){
    return loadJson("daily-dynamics.json").then(asSnap).catch(function(){ return null; });
  }

  function catOf(it){
    return (it.cat === "期刊") ? "journal" : "univ";
  }

  function metaHtml(it){
    var c = catOf(it);
    var tag = '<span class="xj-tag ' + (c === "journal" ? "xj-tag-journal" : "xj-tag-univ") + '">' +
      esc(LABEL[c] || it.cat || "院校") + "</span>";
    var d = parseDate(it.date);
    var time = d ? '<time datetime="' + esc(d.iso) + '">' + esc(d.label) + "</time>" : "";
    return '<div class="xj-meta">' + tag + time + "</div>";
  }

  function titleHtml(it){
    var t = esc(it.title);
    if(it.link){
      return '<a href="' + esc(it.link) + '" target="_blank" rel="noopener">' + t + "</a>";
    }
    return t;
  }

  function rowHtml(it){
    var unit = it.source ? '<span class="xj-unit">' + esc(it.source) + "</span>" : "";
    return "<li>" + metaHtml(it) +
      "<h3>" + titleHtml(it) + "</h3>" +
      '<p class="xj-sub">' + unit + "</p>" +
    "</li>";
  }

  function colHtml(title, cls, rows){
    if(!rows.length) return "";
    return '<section class="dy-col ' + cls + '">' +
      '<h3 class="dy-col-title">' + esc(title) + "</h3>" +
      '<ul>' + rows.map(rowHtml).join("") + "</ul>" +
    "</section>";
  }

  function paint(root, snap){
    var items = (snap.items || []).filter(function(it){
      return it && it.title && it.link;
    });
    items.sort(function(a, b){
      var da = (parseDate(a.date) || {sort:"0000-00-00"}).sort;
      var db = (parseDate(b.date) || {sort:"0000-00-00"}).sort;
      if(da === db) return 0;
      return da < db ? 1 : -1;
    });
    var journals = items.filter(function(it){ return catOf(it) === "journal"; }).slice(0, 6);
    var univs = items.filter(function(it){ return catOf(it) === "univ"; }).slice(0, 8);
    if(!journals.length && !univs.length){ root.remove(); return; }
    var gen = fmtGenerated(snap.generatedAt);
    var updated = gen ? '<span class="xj-updated">更新于 ' + esc(gen) + "</span>" : "";
    root.innerHTML =
      '<div class="xj-head">' +
        '<div class="xj-titles">' +
          '<p class="xj-eye">DAILY DYNAMICS</p>' +
          '<h2 id="homeDailyTitle">每日动态</h2>' +
        "</div>" +
        '<div class="xj-aside">' + updated + "</div>" +
      "</div>" +
      '<div class="dy-cols">' +
        colHtml("期刊最新发表", "dy-col-journals", journals) +
        colHtml("院校新闻公告", "dy-col-univs", univs) +
      "</div>";
    root.removeAttribute("hidden");
  }

  function afterBlock(){
    return document.getElementById("homeXuejie") || document.getElementById("homeNews");
  }

  function place(sec){
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

  function ensureSec(){
    var existing = document.getElementById("homeDaily");
    if(existing){
      place(existing);
      return existing;
    }
    var sec = document.createElement("section");
    sec.className = "xj dy";
    sec.id = "homeDaily";
    sec.setAttribute("aria-labelledby", "homeDailyTitle");
    sec.hidden = true;
    if(!place(sec)) return null;
    return sec;
  }

  function mount(){
    var sec = ensureSec();
    if(!sec) return false;
    if(sec.getAttribute("data-dy-loaded") === "1"){
      place(sec);
      return true;
    }
    sec.setAttribute("data-dy-loaded", "1");
    loadSnap().then(function(snap){
      var el = document.getElementById("homeDaily");
      if(!el) return;
      if(!usable(snap)){ if(el.parentNode) el.remove(); return; }
      try{ paint(el, snap); }
      catch(e){ if(el.parentNode) el.remove(); }
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
