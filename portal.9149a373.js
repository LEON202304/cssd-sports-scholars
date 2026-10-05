(function(){
const spSet=(id,html)=>{const el=document.getElementById(id);if(el)el.innerHTML=html;};
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
/* Quiet linear logos — brand blues + teal/gold accents */
const logos={
user:`<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="18" r="8" fill="#2C6E9E"/><path d="M10 40c2.5-9 9-13 14-13s11.5 4 14 13" fill="#5B6575"/><circle cx="24" cy="18" r="5.5" fill="#E8EEF8"/></svg>`,
chart:`<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="28" width="8" height="12" rx="2" fill="#8A93A3"/><rect x="20" y="18" width="8" height="22" rx="2" fill="#2C6E9E"/><rect x="32" y="10" width="8" height="30" rx="2" fill="currentColor"/></svg>`,
uni:`<svg viewBox="0 0 48 48" fill="none"><path d="M24 8L6 18l18 10 18-10L24 8z" fill="#2C6E9E"/><path d="M12 22v12l12 6 12-6V22" fill="#5B6575"/><rect x="21" y="28" width="6" height="10" fill="#E8EEF8"/><path d="M40 20v14" stroke="#2C6E9E" stroke-width="2.5"/><circle cx="40" cy="18" r="2" fill="#C8A24B"/></svg>`,
news:`<svg viewBox="0 0 48 48" fill="none"><rect x="10" y="8" width="28" height="34" rx="3" fill="currentColor"/><rect x="14" y="12" width="20" height="10" rx="1.5" fill="#E8EEF8"/><rect x="14" y="26" width="12" height="2.5" rx="1" fill="#C5D4EF"/><rect x="14" y="31" width="16" height="2.5" rx="1" fill="#C5D4EF"/><rect x="14" y="36" width="10" height="2.5" rx="1" fill="#C5D4EF"/><circle cx="30" cy="17" r="3" fill="#0A2A43"/></svg>`,
books:`<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="14" width="12" height="26" rx="2" fill="#5B6575" transform="rotate(-8 14 27)"/><rect x="18" y="12" width="12" height="28" rx="2" fill="#2C6E9E"/><rect x="28" y="14" width="12" height="26" rx="2" fill="currentColor" transform="rotate(8 34 27)"/><rect x="20" y="16" width="8" height="3" rx="1" fill="#E8EEF8"/></svg>`,
scope:`<svg viewBox="0 0 48 48" fill="none"><circle cx="22" cy="20" r="11" fill="#E8EEF8" stroke="currentColor" stroke-width="3"/><circle cx="22" cy="20" r="5" fill="#C5D4EF"/><rect x="30" y="28" width="12" height="4" rx="2" fill="#2C6E9E" transform="rotate(45 36 30)"/><circle cx="22" cy="20" r="2" fill="#0A2A43"/></svg>`,
cap:`<svg viewBox="0 0 48 48" fill="none"><path d="M24 10L4 20l20 10 20-10L24 10z" fill="#5B6575"/><path d="M12 24v8c4 4 12 6 12 6s8-2 12-6v-8" fill="#8A93A3"/><path d="M40 20v12" stroke="#5B6575" stroke-width="2"/><circle cx="40" cy="18" r="2.5" fill="#C8A24B"/><rect x="20" y="30" width="8" height="3" fill="#1A2332"/></svg>`,
star:`<svg viewBox="0 0 48 48" fill="none"><path d="M24 6l5.2 12.2L42 20l-9.5 8.2L35 42 24 34.8 13 42l2.5-13.8L6 20l12.8-1.8L24 6z" fill="#C8A24B"/><path d="M24 14l2.8 6.6L34 22l-5.2 4.5.1 7.5L24 30l-4.9 4-0.1-7.5L14 22l7.2-1.4L24 14z" fill="#F5E6C0"/></svg>`,
play:`<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="32" height="32" rx="10" fill="#5B6575"/><path d="M20 16l14 8-14 8V16z" fill="#FFF"/></svg>`,
school:`<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="18" width="32" height="22" rx="2" fill="#2C6E9E"/><path d="M6 18h36l-18-10L6 18z" fill="#0A2A43"/><rect x="20" y="28" width="8" height="12" fill="#E8EEF8"/><rect x="12" y="24" width="6" height="6" rx="1" fill="#C5D4EF"/><rect x="30" y="24" width="6" height="6" rx="1" fill="#C5D4EF"/><circle cx="24" cy="14" r="2" fill="#C8A24B"/></svg>`,
bot:`<svg viewBox="0 0 48 48" fill="none"><rect x="12" y="14" width="24" height="22" rx="8" fill="#5B6575"/><rect x="16" y="20" width="6" height="6" rx="2" fill="#E8EEF8"/><rect x="26" y="20" width="6" height="6" rx="2" fill="#E8EEF8"/><rect x="18" y="30" width="12" height="3" rx="1.5" fill="#C5D4EF"/><rect x="21" y="8" width="6" height="6" rx="3" fill="currentColor"/><path d="M10 22h2M36 22h2" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
trend:`<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="32" height="32" rx="6" fill="#F5F7FA"/><path d="M12 32l8-10 6 6 10-14" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="36" cy="14" r="2.5" fill="#2C6E9E"/><path d="M12 36h24" stroke="#E6EAF0" stroke-width="2"/></svg>`
};
const icon=(k,cls='')=>'<span class="sp-logo'+(cls?' '+cls:'')+'" aria-hidden="true">'+logos[k]+'</span>';

/* Top IA: 首页 学者库 院校机构 期刊数据库 科研项目 学科分类 — rest in 全部导航 */
const nav=[
  ['home','首页'],
  ['scholars','学者库'],
  ['institutions','院校机构'],
  ['journals','期刊数据库'],
  ['projects','科研项目'],
  ['disciplines','学科分类']
];
const quick=[
  ['scholars','学者目录','检索与浏览学者信息','user'],
  ['classify','学者分类总览','按人才计划、学术领域','chart'],
  ['institutions','院校机构导航','高校、科研院所、团队','uni'],
  ['academicnews','学术动态','会议、通知、成果、新闻','news'],
  ['journals','期刊数据库','收录期刊、影响力、投稿','books'],
  ['projects','科研项目查询','国家级、省部级、纵向横向','scope'],
  ['degreepoint','学位点专栏','博士点、硕士点、学科评估','cap'],
  ['hats','人才计划','院士、长江、青年项目','star']
];
const moreExtra=[
  ['hats','人才计划'],
  ['degreepoint','学位点专栏'],
  ['founders','体育学奠基人'],
  ['classify','学者分类总览'],
  ['academicnews','学术动态'],
  ['courses','精品课程'],
  ['sportscolleges','体育院校师资'],
  ['aitools','学术 AI 工具'],
  ['yangtze','长江学者'],
  ['youthscholar','青年学者'],
  ['majorcat','本科专业目录'],
  ['phdschools','博士授权院校']
];
const routeJumps=[
  ['home','首页'],['scholars','学者库'],['institutions','院校机构'],['journals','期刊数据库'],
  ['projects','科研项目'],['disciplines','学科分类'],['hats','人才计划'],['degreepoint','学位点'],
  ['founders','奠基人'],['classify','分类总览'],['academicnews','学术动态'],['courses','精品课程'],
  ['sportscolleges','体育院校'],['aitools','学术工具'],['yangtze','长江学者'],['youthscholar','青年学者'],
  ['majorcat','专业目录'],['phdschools','博士授权']
];

const strokePaths={user:'M20 21v-2a7 7 0 0 0-14 0v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',school:'M3 21h18M5 21V8l7-5 7 5v13M9 10h1m4 0h1m-6 4h1m4 0h1m-4 7v-4h2v4',book:'M12 5C7 2 3 3 2 4v16c3-2 7-1 10 1 3-2 7-3 10-1V4c-2-1-6-2-10 1v16',layers:'m12 3 10 5-10 5L2 8l10-5M2 12l10 5 10-5M2 16l10 5 10-5',flask:'M9 3h6m-5 0v7l-6 9q-1 2 2 2h12q3 0 2-2l-6-9V3M8 15h8',star:'m12 2 3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1 3-7',news:'M4 3h16v18H4zM8 7h8M8 11h8M8 15h5',cap:'m2 9 10-5 10 5-10 5L2 9m4 3v6l6 3 6-3v-6M22 9v8',search:'M19 19l-4-4M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0'};
const strokeIcon=k=>'<span class="sp-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="'+(strokePaths[k]||strokePaths.user)+'"/></svg></span>';

function spSyncShell(route){
  const portal=document.getElementById('sportsPortal');
  const home=document.getElementById('vw-home');
  const isHome=route==='home';
  if(portal){
    if(isHome){
      portal.style.display='';
      portal.removeAttribute('hidden');
    }else{
      portal.style.display='none';
    }
  }
  if(home && isHome && !home.classList.contains('on')){
    /* go() already toggles .vw.on; keep portal visible when home */
  }
  document.querySelectorAll('.sp-links button').forEach(b=>{
    const on=b.dataset.route===route;
    b.classList.toggle('active',on);
    if(on)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');
  });
  const tools=document.getElementById('sp-scholars-tools');
  const filter=document.getElementById('sp-scholars-filter');
  if(tools)tools.classList.toggle('on',route==='scholars');
  if(filter)filter.classList.toggle('on',route==='scholars');
  const skip=document.querySelector('.sp-skip');
  if(skip){
    if(isHome)skip.setAttribute('href','#sportsPortal');
    else{
      const main=document.getElementById('main-view')||document.getElementById('vw-'+route)||document.querySelector('.vw.on');
      skip.setAttribute('href', main && main.id ? ('#'+main.id) : '#vw-scholars');
    }
  }
}

window.spNavigate=function(route){
  if(typeof go==='function')go(route);
  document.querySelectorAll('.sp-more').forEach(d=>d.open=false);
  spSyncShell(route||'home');
  if(route==='home'){
    /* defer home portal refresh so route paint wins first */
    requestAnimationFrame(function(){try{spRefresh();}catch(e){}});
  }
  /* scholars tools: go.__spPatched already schedules once — avoid double rAF */
  if(route==='scholars' && !(typeof go==='function' && go.__spPatched)){
    spScheduleScholarsTools();
  }
};

window.spSearch=function(term){
  const q=document.getElementById('sp-query');
  const text=term??(q&&q.value||'').trim();
  if(typeof openGlobalSearch==='function')openGlobalSearch();
  const input=document.getElementById('globalSearchInput');
  if(input){input.value=text;if(typeof renderGSR==='function')renderGSR(text);}
};
window.spOpen=function(id){
  if(typeof S==='undefined'||!S)return;
  const person=S.find(s=>String(s.id)===String(id));
  if(person&&typeof openMod==='function')openMod(person);
};
window.spPeople=function(type){
  if(typeof S==='undefined'||!S)return;
  let list=S.filter(s=>s.n&&s.institution);
  if(type==='youth')list=list.filter(s=>{
    if(s.isYouth===false)return false;
    const role=String(s.role||'');
    const title=String(s.title||'');
    if(role==='former'||role==='president'||role==='party'||role==='vp')return false;
    if(/校长|党委书记|院士/.test(title))return false;
    const hats=(s.hats||[]).map(String);
    if(hats.some(t=>t.includes('院士')||(/长江学者特聘|长江特聘教授/.test(t)&&!t.includes('青年'))||t.includes('国家级领军')))return false;
    const SENIOR={陈佩杰:1,虞重干:1,白晋湘:1,刘宇:1,冯连世:1,汪晓赞:1,胡扬:1,张忠秋:1,李艳翎:1,陈小平:1,高炳宏:1,殷恒婵:1,黄强民:1,周成林:1,蒋长好:1,陈世益:1};
    if(SENIOR[s.n])return false;
    if(s.cat==='youth'||s.cat==='youthscholar')return true;
    if(s.isYouth&&s.youthLevel)return true;
    const YK=['青年长江','长江学者青年','国家优秀青年','优秀青年科学基金','优秀青年教师','优青','万人计划青年','青年拔尖','东方英才计划青年','青年科技','青年英才','青年骨干','青年人才','青年学者','青年项目','青年岐黄','春苗','晨光计划','扬帆','青托','霍英东'];
    return hats.some(t=>{
      if(t.length>60)return false;
      if(/杰出青年/.test(t))return false;
      if(/中青年/.test(t)&&!/青年拔尖|青年长江|优秀青年|青年英才|青年学者/.test(t))return false;
      if(/青年教师(?:教学|讲课|创新|多媒体|竞赛)/.test(t))return false;
      if(YK.some(k=>t.includes(k)))return true;
      return /青年(?:长江|拔尖|英才|骨干|人才|学者|科技|项目|标兵|科研|燕京|新星)/.test(t);
    });
  });
  else if(type==='yangtze')list=list.filter(s=>(s.hats||[]).some(h=>h.includes('长江')));
  spSet('sp-people',list.slice(0,8).map(person).join(''));
  document.querySelectorAll('.sp-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.kind===type));
};
function person(s){
  const nm=String(s.n||'');
  const av=nm.slice(0,1);
  const inst=String(s.institution||'');
  return '<button class="sp-person" onclick="spOpen('+Number(s.id)+')"><span class="sp-avatar" aria-hidden="true">'+safe(av)+'</span><span class="sp-person-body"><strong title="'+safe(nm)+'">'+safe(nm)+'</strong><small title="'+safe(inst)+'">'+safe(inst)+'</small><em>'+safe(s.dL||s.title||'体育学')+'</em></span></button>';
}
function panel(title,route,content,eyebrow){
  const eye=eyebrow?'<p class="sp-eyebrow">'+eyebrow+'</p>':'';
  return '<section class="sp-panel"><header><div class="sp-panel-titles">'+eye+'<h2>'+title+'</h2></div><button onclick="spNavigate(\''+route+'\')" class="sp-link-more">更多</button></header>'+content+'</section>';
}
function spRefresh(){
  if(typeof S==='undefined')return;
  const scholars=S;
  const projects=typeof NOPSS_SPORTS_PROJECTS!=='undefined'?NOPSS_SPORTS_PROJECTS:[];
  const journals=(typeof JNL_CN!=='undefined'?JNL_CN:[]);
  const international=typeof JNL_INT!=='undefined'?JNL_INT:[];
  const metrics=[
    [scholars.length,'收录学者','user','scholars'],
    [new Set(scholars.map(s=>s.institution).filter(Boolean)).size,'覆盖机构','school','institutions'],
    [journals.length+international.length,'收录期刊','book','journals'],
    [projects.length,'项目记录','flask','projects'],
    [4,'研究生学科大类','layers','disciplines'],
    [18,'本科专业目录','cap','majorcat']
  ];
  spSet('sp-metrics',metrics.map(m=>'<button onclick="spNavigate(\''+m[3]+'\')">'+strokeIcon(m[2])+'<span><b>'+m[0].toLocaleString('zh-CN')+'</b><small>'+m[1]+'</small></span></button>').join(''));
  spPeople('all');
  const ds=[
    ['sci','运动人体科学','flask'],['psych','运动心理学','user'],['pe','体育教育学','cap'],['hu','体育人文社会学','book'],
    ['mgmt','体育管理学','school'],['train','运动训练学','star'],['trad','民族传统体育学','layers'],['rehab','运动康复学','user']
  ];
  spSet('sp-disc',ds.map(d=>'<button onclick="'+(typeof goDsc==='function'?'goDsc(\''+d[0]+'\')':'spNavigate(\'disciplines\')')+'">'+strokeIcon(d[2])+'<span><b>'+d[1]+'</b><small>'+scholars.filter(s=>s.disc===d[0]).length+' 位学者</small></span></button>').join(''));
  const institutions=['北京体育大学','上海体育大学','武汉体育学院','成都体育学院','首都体育学院','天津体育学院','广州体育学院','沈阳体育学院'];
  spSet('sp-institutions',institutions.map(n=>'<button onclick="'+(typeof goInst==='function'?'goInst(\''+n+'\')':'spNavigate(\'institutions\')')+'"><span>'+n.slice(0,2)+'</span>'+n+'</button>').join(''));
}

/* —— Scholars CSV export + filter —— */
function csvCell(v){
  const s=String(v??'');
  if(/[",\n\r]/.test(s))return '"'+s.replace(/"/g,'""')+'"';
  return s;
}
window.spExportScholarsCsv=function(){
  if(typeof S==='undefined'||!S||!S.length){alert('暂无学者数据可导出');return;}
  const qEl=document.getElementById('sp-scholars-q');
  const q=(qEl&&qEl.value||'').trim().toLowerCase();
  let list=S.slice();
  if(q){
    list=list.filter(s=>{
      const blob=((s.n||'')+' '+(s.institution||'')+' '+(s.s||'')+' '+(s.dL||'')+' '+(s.title||'')+' '+((s.hats||[]).join(' '))).toLowerCase();
      return blob.includes(q);
    });
  }
  const rows=[['id','姓名','机构','院系','职称','学科','研究方向','人才称号']];
  list.forEach(s=>{
    rows.push([
      s.id,
      s.n||'',
      s.institution||s.s||'',
      s.dept||'',
      s.title||'',
      s.dL||'',
      s.r||'',
      (s.hats||[]).join('；')
    ]);
  });
  const body=rows.map(r=>r.map(csvCell).join(',')).join('\r\n');
  const bom='\uFEFF';
  const blob=new Blob([bom+body],{type:'text/csv;charset=utf-8'});
  const a=document.createElement('a');
  const url=URL.createObjectURL(blob);
  a.href=url;
  a.download='中国体育学人-学者导出.csv';
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>{URL.revokeObjectURL(url);a.remove();},500);
};

let _schFilterTimer=null;
function spFilterScholarsLive(){
  const qEl=document.getElementById('sp-scholars-q');
  if(!qEl)return;
  const text=qEl.value.trim();
  /* Drive SPA search box if present — single pass only when value changes */
  const spaQ=document.getElementById('qinp')||document.getElementById('q')||document.querySelector('#vw-scholars input[type="search"], #vw-scholars input[placeholder*="姓名"], #vw-scholars input[placeholder*="检索"]');
  const prev=(typeof window.q!=='undefined')?String(window.q||''):((spaQ&&spaQ.value)||'');
  if(text===prev)return;
  if(typeof window.q!=='undefined'){
    if(spaQ)spaQ.value=text;
    window.q=text;
    if(typeof _scholarsLimit!=='undefined')try{_scholarsLimit=60;}catch(e){}
    if(typeof renderSc==='function')renderSc();
  }else if(spaQ){
    spaQ.value=text;
    spaQ.dispatchEvent(new Event('input',{bubbles:true}));
  }
}

let _spScholarsToolsTimer=null;
function spScheduleScholarsTools(){
  if(_spScholarsToolsTimer)return;
  const run=function(){_spScholarsToolsTimer=null;try{spEnsureScholarsTools();}catch(e){}};
  /* After first table paint: idle if available, else timeout(0) */
  if(typeof requestIdleCallback==='function'){
    _spScholarsToolsTimer=requestIdleCallback(run,{timeout:400});
  }else{
    _spScholarsToolsTimer=setTimeout(run,0);
  }
}
function spEnsureScholarsTools(){
  /* Idempotent: never rebuild filter UI if already present */
  let tools=document.getElementById('sp-scholars-tools');
  if(!tools){
    tools=document.createElement('div');
    tools.id='sp-scholars-tools';
    tools.className='sp-scholars-tools';
    tools.innerHTML=
      '<button type="button" class="sp-btn sp-btn--primary" onclick="spExportScholarsCsv()">导出 CSV</button>'+
      '<button type="button" class="sp-btn sp-btn--ghost" onclick="spOpenCmd()">命令面板 /</button>';
    document.body.appendChild(tools);
  }
  let filter=document.getElementById('sp-scholars-filter');
  const vw=document.getElementById('vw-scholars');
  if(!filter && vw){
    filter=document.createElement('div');
    filter.id='sp-scholars-filter';
    filter.className='sp-scholars-filter';
    filter.innerHTML='<input id="sp-scholars-q" type="search" placeholder="筛选姓名 / 院校机构…" aria-label="筛选学者" autocomplete="off"/>'+
      '<button type="button" class="sp-btn sp-btn--ghost" onclick="spExportScholarsCsv()">导出</button>';
    const phi=vw.querySelector('.phi')||vw.querySelector('.ph')||vw.firstElementChild;
    if(phi&&phi.parentNode)phi.parentNode.insertBefore(filter, phi.nextSibling);
    else vw.insertBefore(filter, vw.firstChild);
    const input=filter.querySelector('#sp-scholars-q');
    if(input && !input.dataset.spBound){
      input.dataset.spBound='1';
      input.addEventListener('input',function(){
        clearTimeout(_schFilterTimer);
        /* Skip no-op empty→empty full filt on accidental mount events */
        _schFilterTimer=setTimeout(spFilterScholarsLive,200);
      });
    }
  }
  if(tools)tools.classList.add('on');
  if(filter)filter.classList.add('on');
}

/* —— Command palette —— */
let _cmdIndex=0;
let _cmdItems=[];
function spCmdIsOpen(){
  const el=document.getElementById('sp-cmd');
  return el&&el.classList.contains('open');
}
window.spOpenCmd=function(){
  const el=document.getElementById('sp-cmd');
  if(!el)return;
  el.classList.add('open');
  el.setAttribute('aria-hidden','false');
  const input=document.getElementById('sp-cmd-q');
  if(input){input.value='';input.focus();}
  spCmdRender('');
};
window.spCloseCmd=function(){
  const el=document.getElementById('sp-cmd');
  if(!el)return;
  el.classList.remove('open');
  el.setAttribute('aria-hidden','true');
};
function spCmdBuild(query){
  const q=(query||'').trim().toLowerCase();
  const items=[];
  routeJumps.forEach(r=>{
    if(!q || r[0].includes(q) || r[1].toLowerCase().includes(q)){
      items.push({kind:'route',route:r[0],label:r[1],sub:'页面 · '+r[0]});
    }
  });
  if(typeof S!=='undefined' && S && q){
    let n=0;
    for(let i=0;i<S.length && n<12;i++){
      const s=S[i];
      const blob=((s.n||'')+' '+(s.institution||'')+' '+(s.s||'')+' '+(s.dL||'')).toLowerCase();
      if(blob.includes(q)){
        items.push({kind:'scholar',id:s.id,label:s.n||'学者',sub:(s.institution||s.s||'')+' · '+(s.dL||'')});
        n++;
      }
    }
  }
  if(!q){
    items.push({kind:'action',action:'export',label:'导出学者 CSV',sub:'工具'});
  }
  return items.slice(0,24);
}
function spCmdRender(query){
  _cmdItems=spCmdBuild(query);
  _cmdIndex=0;
  const list=document.getElementById('sp-cmd-list');
  if(!list)return;
  if(!_cmdItems.length){
    list.innerHTML='<div class="sp-cmd-empty">无匹配结果</div>';
    return;
  }
  list.innerHTML=_cmdItems.map((it,i)=>
    '<button type="button" class="sp-cmd-item'+(i===_cmdIndex?' active':'')+'" data-i="'+i+'">'+
      '<strong>'+safe(it.label)+'</strong><small>'+safe(it.sub||'')+'</small></button>'
  ).join('');
  list.querySelectorAll('.sp-cmd-item').forEach(btn=>{
    btn.addEventListener('click',()=>spCmdRun(Number(btn.dataset.i)));
  });
}
function spCmdRun(i){
  const it=_cmdItems[i];
  if(!it)return;
  spCloseCmd();
  if(it.kind==='route')spNavigate(it.route);
  else if(it.kind==='scholar')spOpen(it.id);
  else if(it.kind==='action' && it.action==='export'){
    spNavigate('scholars');
    setTimeout(()=>spExportScholarsCsv(),50);
  }
}
function spEnsureCmd(){
  if(document.getElementById('sp-cmd'))return;
  const wrap=document.createElement('div');
  wrap.id='sp-cmd';
  wrap.setAttribute('role','dialog');
  wrap.setAttribute('aria-modal','true');
  wrap.setAttribute('aria-label','命令面板');
  wrap.setAttribute('aria-hidden','true');
  wrap.innerHTML=
    '<div class="sp-cmd-panel">'+
      '<input id="sp-cmd-q" class="sp-cmd-input" type="search" placeholder="搜索学者或跳转页面…" aria-label="命令面板搜索" autocomplete="off"/>'+
      '<div id="sp-cmd-list" class="sp-cmd-list"></div>'+
      '<div class="sp-cmd-foot"><span>↑↓ 选择</span><span>Enter 打开</span><span>Esc 关闭</span></div>'+
    '</div>';
  document.body.appendChild(wrap);
  wrap.addEventListener('click',e=>{if(e.target===wrap)spCloseCmd();});
  const input=document.getElementById('sp-cmd-q');
  input.addEventListener('input',()=>spCmdRender(input.value));
  input.addEventListener('keydown',e=>{
    if(e.key==='ArrowDown'){e.preventDefault();_cmdIndex=Math.min(_cmdIndex+1,_cmdItems.length-1);spCmdHighlight();}
    else if(e.key==='ArrowUp'){e.preventDefault();_cmdIndex=Math.max(_cmdIndex-1,0);spCmdHighlight();}
    else if(e.key==='Enter'){e.preventDefault();spCmdRun(_cmdIndex);}
    else if(e.key==='Escape'){e.preventDefault();spCloseCmd();}
  });
}
function spCmdHighlight(){
  const list=document.getElementById('sp-cmd-list');
  if(!list)return;
  list.querySelectorAll('.sp-cmd-item').forEach((el,i)=>el.classList.toggle('active',i===_cmdIndex));
  const active=list.querySelector('.sp-cmd-item.active');
  if(active)active.scrollIntoView({block:'nearest'});
}

/* —— Modal a11y (non-invasive wrap) —— */
function spEnhanceModalA11y(){
  const ov=document.getElementById('ov');
  if(!ov)return;
  const mo=ov.querySelector('.mo');
  if(mo){
    mo.setAttribute('role','dialog');
    mo.setAttribute('aria-modal','true');
    if(!mo.getAttribute('aria-label'))mo.setAttribute('aria-label','学者详情');
  }
  if(typeof openMod==='function' && !openMod.__spWrapped){
    const orig=openMod;
    window.openMod=function(s){
      const r=orig.apply(this,arguments);
      try{
        const dialog=document.querySelector('#ov .mo')||document.getElementById('ov');
        if(dialog){
          dialog.setAttribute('role','dialog');
          dialog.setAttribute('aria-modal','true');
          const closeBtn=dialog.querySelector('.mcl, .close, [onclick*="closeMod"]');
          if(closeBtn && typeof closeBtn.focus==='function')closeBtn.focus();
        }
      }catch(e){}
      return r;
    };
    openMod.__spWrapped=true;
  }
}

function spOnKeydown(e){
  const tag=(e.target&&e.target.tagName||'').toLowerCase();
  const typing=tag==='input'||tag==='textarea'||tag==='select'||(e.target&&e.target.isContentEditable);
  if(e.key==='/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey){
    e.preventDefault();
    spOpenCmd();
    return;
  }
  if(e.key==='Escape'){
    if(spCmdIsOpen()){e.preventDefault();spCloseCmd();return;}
    const ov=document.getElementById('ov');
    if(ov&&ov.classList.contains('on')){
      const closeBtn=ov.querySelector('.mcl, .close, [onclick*="closeMod"]');
      if(closeBtn)closeBtn.click();
      else if(typeof closeMod==='function')closeMod();
    }
  }
}

function start(){
  if(typeof cssdSetTheme==='function')try{cssdSetTheme('light');}catch(e){}
  try{
  document.documentElement.classList.add('cssd-light');
  document.documentElement.classList.add('cssd-portal-ready');
  document.documentElement.classList.remove('cssd-dark');
  try{localStorage.setItem('cssd-theme','light');}catch(e){}
  // lock: ignore dark theme forever
  window.cssdToggleTheme=function(){document.documentElement.classList.add('cssd-light');document.documentElement.classList.remove('cssd-dark');try{localStorage.setItem('cssd-theme','light');}catch(e){}};
  window.cssdSetTheme=function(){document.documentElement.classList.add('cssd-light');document.documentElement.classList.remove('cssd-dark');try{localStorage.setItem('cssd-theme','light');}catch(e){}};
}catch(e){}
  document.title='体育学人 · 中国体育学术资源数据库';

  /* Skip link */
  if(!document.querySelector('.sp-skip')){
    const skip=document.createElement('a');
    skip.className='sp-skip';
    skip.href='#sportsPortal';
    skip.textContent='跳到主内容';
    document.body.prepend(skip);
  }

  const head=document.createElement('header');
  head.className='sp-header';
  const moreItems=moreExtra.slice();
  /* dedupe against top nav */
  const topSet=new Set(nav.map(n=>n[0]));
  const moreFiltered=moreItems.filter(n=>!topSet.has(n[0]));
  head.innerHTML=
    '<button class="sp-brand" onclick="spNavigate(\'home\')" aria-label="体育学人首页">'+
      '<span class="sp-brandmark" aria-hidden="true"><svg viewBox="0 0 48 48" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="22" stroke="rgba(255,255,255,.35)" stroke-width="2"/><path d="M24 10c4 6 8 10 8 16a8 8 0 1 1-16 0c0-6 4-10 8-16z" fill="#F6C453"/><path d="M24 18c2.2 3.5 4.5 6 4.5 9.2a4.5 4.5 0 1 1-9 0c0-3.2 2.3-5.7 4.5-9.2z" fill="#FFE9A8"/><path d="M20 34h8v3h-8z" fill="#fff" opacity=".9"/></svg></span>'+
      '<span><strong>体育学人</strong><small>SPORTS SCHOLARS</small></span>'+
      '<span class="sp-brand-divider" aria-hidden="true"></span>'+
      '<span class="sp-brand-sub"><b>中国体育学术资源数据库</b><small>CHINA SPORTS ACADEMIC RESOURCES DATABASE</small></span>'+
    '</button>'+
    '<nav class="sp-links" aria-label="主要导航">'+
      nav.map(n=>'<button data-route="'+n[0]+'" class="'+(n[0]==='home'?'active':'')+'" '+(n[0]==='home'?'aria-current="page" ':'')+'onclick="spNavigate(\''+n[0]+'\')">'+n[1]+'</button>').join('')+
    '</nav>'+
    '<div class="sp-tools">'+
      '<span class="sp-cmd-hint" title="打开命令面板" onclick="spOpenCmd()">/</span>'+
      '<button type="button" class="sp-en" title="Language">EN</button>'+
      '<button type="button" class="sp-btn sp-btn--ghost sp-login" onclick="if(typeof openClaimModal===\'function\')openClaimModal(null);">登录</button>'+
      '<button type="button" class="sp-btn sp-btn--primary sp-register" onclick="if(typeof openClaimModal===\'function\')openClaimModal(null);">注册</button>'+
      '<details class="sp-more"><summary>全部导航</summary><div>'+
        moreFiltered.map(n=>'<button onclick="spNavigate(\''+n[0]+'\')">'+n[1]+'</button>').join('')+
        
      '</div></details>'+
    '</div>';
  document.body.prepend(head);

  const portal=document.createElement('main');
  portal.id='sportsPortal';
  portal.tabIndex=-1;
  portal.innerHTML=
    '<section class="sp-banner"><div class="sp-wrap">'+
      '<h1>中国体育学术资源数据库</h1>'+
      '<p class="sp-slogan">发现学者 · 洞见研究 · 连接合作</p>'+
      '<form class="sp-search" onsubmit="event.preventDefault();spSearch()">'+
        '<span>学者检索</span>'+
        '<input id="sp-query" aria-label="检索姓名、院校或研究方向" placeholder="搜索姓名、院校机构、研究方向、人才称号…">'+
        '<button type="submit" class="sp-btn sp-btn--primary">搜索</button>'+
      '</form>'+
      '<div class="sp-hot"><span>研究主题：</span>'+
        ['青少年体育','运动心理','体育教育','运动训练','全民健身','体育产业'].map(x=>'<button type="button" onclick="spSearch(\''+x+'\')">'+x+'</button>').join('')+
      '</div>'+
    '</div></section>'+
    '<div class="sp-wrap">'+
      '<div class="sp-metrics" id="sp-metrics"></div>'+
      '<div class="sp-quick" aria-label="资源快捷入口">'+
        quick.map(n=>'<button type="button" class="sp-quick-card" onclick="spNavigate(\''+n[0]+'\')"><span class="sp-logo-wrap">'+icon(n[3])+'</span><span class="sp-quick-text"><b>'+n[1]+'</b><small>'+n[2]+'</small></span></button>').join('')+
      '</div>'+
      '<div class="sp-grid">'+
        panel('学者发现','scholars',
          '<div class="sp-tabs">'+
            '<button class="active" data-kind="all" onclick="spPeople(\'all\')">学者浏览</button>'+
            '<button data-kind="yangtze" onclick="spPeople(\'yangtze\')">长江学者</button>'+
            '<button data-kind="youth" onclick="spPeople(\'youth\')">青年学者</button>'+
          '</div>'+
          '<div id="sp-people" class="sp-people"></div>'+
          '<p class="sp-note">按本库记录展示，不构成学术排名。点击学者查看研究方向及来源。</p>',
          'SCHOLARS')+
        panel('研究方向总览','disciplines',
          '<div class="sp-tabs sp-tabs--static"><span>全部方向</span><small>点击查看该方向学者分布</small></div>'+
          '<div class="sp-disc" id="sp-disc"></div>'+
          '<p class="sp-note">按本库研究方向归类统计，供学科布局与交叉研究参考。</p>',
          'RESEARCH DIRECTIONS')+
        panel('院校机构导航','institutions',
          '<div class="sp-tabs sp-tabs--static"><span>全部院校</span><small>点击进入机构档案</small></div>'+
          '<div class="sp-inst" id="sp-institutions"></div>'+
          '<p class="sp-note">从机构出发，了解师资与学科布局。</p>',
          'INSTITUTIONS')+
      '</div>'+
    '</div>'+
    '<footer class="sp-footer"><div class="sp-wrap">'+
      '<div><strong>体育学人</strong><p>中国体育学术资源数据库 · SPORTS SCHOLARS</p></div>'+
      '<div>'+
        '<button onclick="spNavigate(\'founders\')">学科溯源</button>'+
        '<button onclick="spNavigate(\'classify\')">分类统计</button>'+
        '<button onclick="spNavigate(\'journals\')">学术资源</button>'+
        '<br><small>数据沿用所提供资料，统计反映当前收录记录。</small>'+
      '</div>'+
    '</div></footer>';

  var home=document.getElementById('vw-home');
  if(!home){home=document.createElement('div');home.id='vw-home';document.body.appendChild(home);}
  home.appendChild(portal);

  spEnsureCmd();
  spEnhanceModalA11y();
  document.addEventListener('keydown',spOnKeydown);

  /* Keep nav/shell in sync if SPA go() is called elsewhere */
  if(typeof go==='function' && !go.__spPatched){
    const origGo=go;
    window.go=function(name,opts){
      /* Prefer table mode before first scholars paint to avoid grid→table double renderSc */
      if(name==='scholars' && typeof window!=='undefined' && window.innerWidth>=860){
        try{window.scholarsViewMode='table';}catch(e){}
        try{if(typeof _scholarsLimit==='number' && _scholarsLimit>60)_scholarsLimit=60;}catch(e){}
      }
      const r=origGo.apply(this,arguments);
      try{
        spSyncShell(name||'home');
        if(name==='scholars')spScheduleScholarsTools();
      }catch(e){}
      return r;
    };
    go.__spPatched=true;
  }

  try{spRefresh();}catch(e){console.warn('spRefresh',e);}
  spSyncShell('home');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
