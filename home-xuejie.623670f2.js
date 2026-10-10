/* home-xuejie.js — 首页「学界动态」设计稿（占位数据）
   插在 #homeNews（学术动态）之后、.sp-grid 之前。
   本文件仅为视觉示意，条目是虚构占位，不接真实抓取。
   确认设计后再做来源与关键词过滤。
   左卡：上头条 + 下 3 条紧凑占位，消灭大块留白；右列 4 条，两侧靠内容对齐。
   回退：删本文件，并去掉 index.html 里对应的 script，
   以及 portal.polish.css 中 xuejie-mock 分区。 */
(function(){
  var MOCK = [
    {type:"honor", title:"北京体育大学任弘教授入选长江学者特聘教授", unit:"北京体育大学", date:"2026-09-18"},
    {type:"honor", title:"武汉体育学院王君教授获评楚天学者", unit:"武汉体育学院", date:"2026-09-05"},
    {type:"event", title:"体育强国建设高端论坛在京举行，多位学者作主旨报告", unit:"北京体育大学", date:"2026-10-08"},
    {type:"event", title:"中国体育科学学会专家委员会扩大会议召开", unit:"中国体育科学学会", date:"2026-09-28"},
    {type:"meet", title:"第十四届全国体育科学大会征文通知发布", unit:"中国体育科学学会", date:"2026-10-01"},
    {type:"meet", title:"运动训练科学国际研讨会将于天津举行", unit:"天津体育学院", date:"2026-09-20"},
    {type:"honor", title:"成都体育学院刘青教授获国务院政府特殊津贴", unit:"成都体育学院", date:"2026-08-26"},
    {type:"meet", title:"体医融合学术年会报名通道开启", unit:"上海体育大学", date:"2026-09-12"}
  ];

  var TYPE_LABEL = {honor:"荣誉", event:"活动", meet:"会议"};
  var TYPE_CLS = {honor:"xj-tag-honor", event:"xj-tag-event", meet:"xj-tag-meet"};

  function esc(s){
    return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }

  function metaHtml(it){
    var tag = '<span class="xj-tag ' + (TYPE_CLS[it.type] || "") + '">' + esc(TYPE_LABEL[it.type] || it.type) + "</span>";
    var time = it.date ? '<time datetime="' + esc(it.date) + '">' + esc(it.date) + "</time>" : "";
    return '<div class="xj-meta">' + tag + time + "</div>";
  }

  function itemHtml(it, lead){
    var unit = it.unit ? '<span class="xj-unit">' + esc(it.unit) + "</span>" : "";
    var cls = lead ? "xj-lead" : "xj-row";
    return '<article class="' + cls + '">' +
      metaHtml(it) +
      "<h3>" + esc(it.title) + "</h3>" +
      '<p class="xj-sub">' + unit + "</p>" +
    "</article>";
  }

  function sideHtml(rows){
    if(!rows.length) return "";
    var lis = rows.map(function(it){
      var unit = it.unit ? '<span class="xj-unit">' + esc(it.unit) + "</span>" : "";
      return "<li>" + metaHtml(it) +
        "<h3>" + esc(it.title) + "</h3>" +
        '<p class="xj-sub">' + unit + "</p>" +
      "</li>";
    }).join("");
    return '<div class="xj-side"><ul class="xj-side-list">' + lis + "</ul></div>";
  }

  function paint(root){
    /* 左：头条 + 3 条紧凑；右：4 条列表。共用前 8 条占位。 */
    var lead = MOCK[0];
    var side = MOCK.slice(1, 4);
    var rest = MOCK.slice(4, 8);
    root.innerHTML =
      '<div class="xj-head">' +
        '<div class="xj-titles">' +
          '<p class="xj-eye">ACADEMIC CIRCLE</p>' +
          '<h2 id="homeXuejieTitle">学界动态</h2>' +
        "</div>" +
        '<div class="xj-aside">' +
          '<span class="xj-mock-badge" title="本板块为设计示意，条目为占位文案">设计示意 · 占位内容</span>' +
          '<a class="xj-all" href="#academicnews" aria-disabled="true">查看全部</a>' +
        "</div>" +
      "</div>" +
      '<p class="xj-note">以下条目为版面示意，确认后将按「荣誉 / 活动 / 会议」接入院校与学会公开信息，不做随意新闻聚合。</p>' +
      '<div class="xj-layout">' +
        itemHtml(lead, true).replace("</article>", sideHtml(side) + "</article>") +
        '<div class="xj-list">' + rest.map(function(it){ return itemHtml(it, false); }).join("") + "</div>" +
      "</div>";
    var all = root.querySelector(".xj-all");
    if(all) all.addEventListener("click", function(e){
      e.preventDefault();
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

  function mount(){
    var existing = document.getElementById("homeXuejie");
    if(existing){
      place(existing);
      if(!existing.querySelector(".xj-layout")) paint(existing);
      return !!(afterNews() || document.querySelector("#sportsPortal .sp-grid"));
    }
    var host = afterNews() || document.querySelector("#sportsPortal .sp-grid");
    if(!host || !host.parentNode) return false;
    var sec = document.createElement("section");
    sec.className = "xj";
    sec.id = "homeXuejie";
    sec.setAttribute("aria-labelledby", "homeXuejieTitle");
    sec.hidden = true;
    place(sec);
    try{ paint(sec); }catch(e){ sec.remove(); }
    return true;
  }

  function watch(){
    if(mount()){
      var n = 0;
      var t = setInterval(function(){
        mount();
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
