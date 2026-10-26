/* 体育高端智库常驻名录。名单依据国家体育总局2026-10-23公示。
   链接优先采用官方介绍或报道；未找到独立页面的单位使用所属学校官网。 */
(function(){
  'use strict';
  var units = [
  {
    "school": "清华大学",
    "name": "清华大学体育发展研究院",
    "url": "https://www.thsports.tsinghua.edu.cn/xkjs1/gzgk.htm",
    "kind": "官方介绍"
  },
  {
    "school": "北京师范大学",
    "name": "全民健身与全民健康高质量融合发展高端智库",
    "url": "https://news.bnu.edu.cn/zx/zhxw/131365.htm",
    "kind": "官方介绍"
  },
  {
    "school": "首都体育学院",
    "name": "体育治理现代化研究中心",
    "url": "https://www.cupes.edu.cn/",
    "kind": "学校官网"
  },
  {
    "school": "北京体育大学",
    "name": "中国体育发展研究院",
    "url": "https://kjc.bsu.edu.cn/kypt/3afe09fad6504f6ea86f39e59f89c417.htm",
    "kind": "官方介绍"
  },
  {
    "school": "中国政法大学",
    "name": "体育法治研究基地",
    "url": "https://www.cupl.edu.cn/",
    "kind": "学校官网"
  },
  {
    "school": "天津体育学院",
    "name": "“三大球”发展研究院",
    "url": "https://www.tjus.edu.cn/",
    "kind": "学校官网"
  },
  {
    "school": "沈阳体育学院",
    "name": "中国冰雪运动发展研究院",
    "url": "https://www.syty.edu.cn/",
    "kind": "学校官网"
  },
  {
    "school": "哈尔滨体育学院",
    "name": "（国家冰雪运动学院）冰雪运动发展高端智库",
    "url": "https://www.hrbipe.edu.cn/",
    "kind": "学校官网"
  },
  {
    "school": "上海体育大学",
    "name": "体育科学创新研究院",
    "url": "https://www.sh-popss.gov.cn/newsInfo.asp?idval=8231",
    "kind": "官方介绍"
  },
  {
    "school": "上海政法学院",
    "name": "体育风险治理与涉外体育法治高端智库",
    "url": "https://www.shupl.edu.cn/",
    "kind": "学校官网"
  },
  {
    "school": "苏州大学",
    "name": "东吴体育智库",
    "url": "https://www.suda.edu.cn/suda_news/jxky/202403/b3b3a2f6-4f01-4944-a677-320cd50835ca.html",
    "kind": "官方报道"
  },
  {
    "school": "南京体育学院",
    "name": "中国竞技体育研究院",
    "url": "https://www.nsi.edu.cn/45/20/c2348a83232/page.htm",
    "kind": "官方报道"
  },
  {
    "school": "浙江大学",
    "name": "体育现代化高端智库",
    "url": "https://www.zju.edu.cn/",
    "kind": "学校官网"
  },
  {
    "school": "福建师范大学",
    "name": "闽台体育融合发展智库",
    "url": "https://www.fjnu.edu.cn/",
    "kind": "学校官网"
  },
  {
    "school": "武汉体育学院",
    "name": "中国体育治理与体教融合研究中心",
    "url": "https://www.whsu.edu.cn/",
    "kind": "学校官网"
  },
  {
    "school": "成都体育学院",
    "name": "体育文化与宣传战略研究中心",
    "url": "https://yjs.cdsu.edu.cn/info/1054/38906.htm",
    "kind": "官方报道"
  },
  {
    "school": "西安体育学院",
    "name": "西部体育发展智库",
    "url": "https://www.xaipe.edu.cn/",
    "kind": "学校官网"
  }
];
  function esc(s){
    return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});
  }
  function link(url,label,kind){
    var host = new URL(url).hostname;
    return '<a class="tt-name-link" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer" aria-label="'+esc(label+'，'+kind+'，在新标签页打开')+'">'+esc(label)+'<svg class="tt-external" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7M21 3l-10 10M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"/></svg></a><small class="tt-destination">'+esc(kind+' · '+host)+'</small>';
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
      '<p class="tt-subtitle">2026—2030年周期 · 智库名录</p></div>'+
      '<span class="tt-status">17家单位</span></header>'+
      '<p class="tt-intro">汇集体育治理、冰雪运动、全民健身、体育法治、体教融合与区域体育发展等领域的智库资源。点击智库名称，访问对应官方介绍、官方报道或所属学校官网。</p>'+
      '<div class="tt-table-wrap"><table class="tt-table"><caption>体育高端智库名录，按所在学校标识码排序</caption><thead><tr><th scope="col">序号</th><th scope="col">所在学校</th><th scope="col">智库名称与链接</th></tr></thead><tbody>'+
      units.map(function(u,i){return '<tr><td>'+(i+1)+'</td><th scope="row">'+esc(u.school)+'</th><td>'+link(u.url,u.name,u.kind)+'</td></tr>';}).join('')+
      '</tbody></table></div>'+
      '<p class="tt-source">名单依据：<a href="https://www.sport.gov.cn/n315/n20001395/c30128047/content.html" target="_blank" rel="noopener noreferrer">国家体育总局《体育高端智库（2026—2030年）入选单位公示》</a>（2026年10月23日）。本名录按公示信息收录，最终认定以主管部门正式公布为准。链接类型已逐项标注，均在新标签页打开。</p>';
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

