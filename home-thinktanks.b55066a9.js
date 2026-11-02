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
