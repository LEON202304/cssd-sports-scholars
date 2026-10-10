/* home-xuejie.js — 首页「学界动态」（荣誉 / 活动 / 会议）
   插在 #homeNews（学术动态）之后、.sp-grid 之前。
   数据：xuejie-snapshot.json（每日自动抓取院校与学会公开信息）。
   抓取失败或无条目时隐藏整块，不再显示占位示意。
   左卡：头条 + 至多 3 条紧凑；右列至多 4 条。
   回退：删本文件、index.html 对应 script，以及 portal.polish.css 中 xuejie 分区。 */
(function(){
  var TYPE_LABEL = {honor:"荣誉", event:"活动", meet:"会议"};
  var TYPE_CLS = {honor:"xj-tag-honor", event:"xj-tag-event", meet:"xj-tag-meet"};

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
    return loadJson("xuejie-snapshot.json").then(asSnap).catch(function(){ return null; });
  }

  function metaHtml(it){
    var tag = '<span class="xj-tag ' + (TYPE_CLS[it.type] || "") + '">' +
      esc(TYPE_LABEL[it.type] || it.type) + "</span>";
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

  function itemHtml(it, lead){
    var unit = it.org ? '<span class="xj-unit">' + esc(it.org) + "</span>" : "";
    var cls = lead ? "xj-lead" : "xj-row";
    return '<article class="' + cls + '">' +
      metaHtml(it) +
      "<h3>" + titleHtml(it) + "</h3>" +
      '<p class="xj-sub">' + unit + "</p>" +
    "</article>";
  }

  function sideHtml(rows){
    if(!rows.length) return "";
    var lis = rows.map(function(it){
      var unit = it.org ? '<span class="xj-unit">' + esc(it.org) + "</span>" : "";
      return "<li>" + metaHtml(it) +
        "<h3>" + titleHtml(it) + "</h3>" +
        '<p class="xj-sub">' + unit + "</p>" +
      "</li>";
    }).join("");
    return '<div class="xj-side"><ul class="xj-side-list">' + lis + "</ul></div>";
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
    items = items.slice(0, 8);
    if(!items.length){ root.remove(); return; }

    var lead = items[0];
    var side = items.slice(1, 4);
    var rest = items.slice(4, 8);
    var gen = fmtGenerated(snap.generatedAt);
    var updated = gen ? '<span class="xj-updated">更新于 ' + esc(gen) + "</span>" : "";

    root.innerHTML =
      '<div class="xj-head">' +
        '<div class="xj-titles">' +
          '<p class="xj-eye">ACADEMIC CIRCLE</p>' +
          '<h2 id="homeXuejieTitle">学界动态</h2>' +
        "</div>" +
        '<div class="xj-aside">' + updated +
          '<a class="xj-all" href="#academicnews">查看学术动态</a>' +
        "</div>" +
      "</div>" +
      '<div class="xj-layout">' +
        itemHtml(lead, true).replace("</article>", sideHtml(side) + "</article>") +
        '<div class="xj-list">' + rest.map(function(it){ return itemHtml(it, false); }).join("") + "</div>" +
      "</div>";

    var all = root.querySelector(".xj-all");
    if(all) all.addEventListener("click", function(e){
      e.preventDefault();
      try{
        if(typeof window.spNavigate === "function") window.spNavigate("academicnews");
        else if(typeof window.go === "function") window.go("academicnews");
      }catch(err){}
    });
    root.removeAttribute("hidden");
  }

  function afterNews(){
    return document.getElementById("homeNews");
  }

  function place(sec){
    var news = afterNews();
    var grid = document.querySelector("#sportsPortal .sp-grid");
    if(news && news.parentNode){
      if(sec.parentNode !== news.parentNode || news.nextElementSibling !== sec){
        news.parentNode.insertBefore(sec, news.nextSibling);
      }
      return true;
    }
    if(grid && grid.parentNode){
      if(sec.parentNode !== grid.parentNode || sec.nextElementSibling !== grid){
        grid.parentNode.insertBefore(sec, grid);
      }
      return true;
    }
    return false;
  }

  function ensureSec(){
    var existing = document.getElementById("homeXuejie");
    if(existing){
      place(existing);
      return existing;
    }
    var host = afterNews() || document.querySelector("#sportsPortal .sp-grid");
    if(!host || !host.parentNode) return null;
    var sec = document.createElement("section");
    sec.className = "xj";
    sec.id = "homeXuejie";
    sec.setAttribute("aria-labelledby", "homeXuejieTitle");
    sec.hidden = true;
    place(sec);
    return sec;
  }

  function mount(){
    var sec = ensureSec();
    if(!sec) return false;
    if(sec.getAttribute("data-xj-loaded") === "1"){
      place(sec);
      return !!(afterNews() || document.querySelector("#sportsPortal .sp-grid"));
    }
    sec.setAttribute("data-xj-loaded", "1");
    loadSnap().then(function(snap){
      if(!usable(snap)){
        if(sec.parentNode) sec.remove();
        return;
      }
      try{ paint(sec, snap); }catch(e){ if(sec.parentNode) sec.remove(); }
    });
    return true;
  }

  function watch(){
    if(mount()){
      var n = 0;
      var t = setInterval(function(){
        var sec = document.getElementById("homeXuejie");
        if(sec) place(sec);
        if(++n > 20 || afterNews()) clearInterval(t);
      }, 200);
      return;
    }
    var obs = new MutationObserver(function(){
      if(mount()) obs.disconnect();
    });
    obs.observe(document.documentElement, {childList:true, subtree:true});
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", watch, {once:true});
  else watch();
})();
