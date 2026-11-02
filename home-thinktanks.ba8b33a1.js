/* 体育智库名录：数据及逐项收录依据来自 docs/sports-thinktanks.json。
   星标严格对应总局2026—2030周期17家入选公示单位，不代表本名录排名。 */
(function(){
  'use strict';
  var units = [
  {
    "school": "清华大学",
    "name": "清华大学体育发展研究院",
    "url": "https://www.thsports.tsinghua.edu.cn/xkjs1/gzgk.htm",
    "kind": "官方介绍",
    "highEnd": true,
    "category": "高端智库",
    "region": "北京",
    "source": "https://www.sport.gov.cn/n315/n20001395/c30128047/content.html",
    "evidence": "2026—2030年入选单位公示",
    "note": "星标依据2026年10月23日公示，最终认定以正式公布为准。"
  },
  {
    "school": "北京师范大学",
    "name": "全民健身与全民健康高质量融合发展高端智库",
    "url": "https://news.bnu.edu.cn/zx/zhxw/131365.htm",
    "kind": "官方介绍",
    "highEnd": true,
    "category": "高端智库",
    "region": "北京",
    "source": "https://www.sport.gov.cn/n315/n20001395/c30128047/content.html",
    "evidence": "2026—2030年入选单位公示",
    "note": "星标依据2026年10月23日公示，最终认定以正式公布为准。"
  },
  {
    "school": "首都体育学院",
    "name": "体育治理现代化研究中心",
    "url": "https://www.cupes.edu.cn/",
    "kind": "学校官网",
    "highEnd": true,
    "category": "高端智库",
    "region": "北京",
    "source": "https://www.sport.gov.cn/n315/n20001395/c30128047/content.html",
    "evidence": "2026—2030年入选单位公示",
    "note": "星标依据2026年10月23日公示，最终认定以正式公布为准。"
  },
  {
    "school": "北京体育大学",
    "name": "中国体育发展研究院",
    "url": "https://kjc.bsu.edu.cn/kypt/3afe09fad6504f6ea86f39e59f89c417.htm",
    "kind": "官方介绍",
    "highEnd": true,
    "category": "高端智库",
    "region": "北京",
    "source": "https://www.sport.gov.cn/n315/n20001395/c30128047/content.html",
    "evidence": "2026—2030年入选单位公示",
    "note": "星标依据2026年10月23日公示，最终认定以正式公布为准。"
  },
  {
    "school": "中国政法大学",
    "name": "体育法治研究基地",
    "url": "https://www.cupl.edu.cn/",
    "kind": "学校官网",
    "highEnd": true,
    "category": "高端智库",
    "region": "北京",
    "source": "https://www.sport.gov.cn/n315/n20001395/c30128047/content.html",
    "evidence": "2026—2030年入选单位公示",
    "note": "星标依据2026年10月23日公示，最终认定以正式公布为准。"
  },
  {
    "school": "天津体育学院",
    "name": "“三大球”发展研究院",
    "url": "https://www.tjus.edu.cn/",
    "kind": "学校官网",
    "highEnd": true,
    "category": "高端智库",
    "region": "天津",
    "source": "https://www.sport.gov.cn/n315/n20001395/c30128047/content.html",
    "evidence": "2026—2030年入选单位公示",
    "note": "星标依据2026年10月23日公示，最终认定以正式公布为准。"
  },
  {
    "school": "沈阳体育学院",
    "name": "中国冰雪运动发展研究院",
    "url": "https://www.syty.edu.cn/",
    "kind": "学校官网",
    "highEnd": true,
    "category": "高端智库",
    "region": "辽宁",
    "source": "https://www.sport.gov.cn/n315/n20001395/c30128047/content.html",
    "evidence": "2026—2030年入选单位公示",
    "note": "星标依据2026年10月23日公示，最终认定以正式公布为准。"
  },
  {
    "school": "哈尔滨体育学院",
    "name": "（国家冰雪运动学院）冰雪运动发展高端智库",
    "url": "https://www.hrbipe.edu.cn/",
    "kind": "学校官网",
    "highEnd": true,
    "category": "高端智库",
    "region": "黑龙江",
    "source": "https://www.sport.gov.cn/n315/n20001395/c30128047/content.html",
    "evidence": "2026—2030年入选单位公示",
    "note": "星标依据2026年10月23日公示，最终认定以正式公布为准。"
  },
  {
    "school": "上海体育大学",
    "name": "体育科学创新研究院",
    "url": "https://www.sh-popss.gov.cn/newsInfo.asp?idval=8231",
    "kind": "官方介绍",
    "highEnd": true,
    "category": "高端智库",
    "region": "上海",
    "source": "https://www.sport.gov.cn/n315/n20001395/c30128047/content.html",
    "evidence": "2026—2030年入选单位公示",
    "note": "星标依据2026年10月23日公示，最终认定以正式公布为准。"
  },
  {
    "school": "上海政法学院",
    "name": "体育风险治理与涉外体育法治高端智库",
    "url": "https://www.shupl.edu.cn/",
    "kind": "学校官网",
    "highEnd": true,
    "category": "高端智库",
    "region": "上海",
    "source": "https://www.sport.gov.cn/n315/n20001395/c30128047/content.html",
    "evidence": "2026—2030年入选单位公示",
    "note": "星标依据2026年10月23日公示，最终认定以正式公布为准。"
  },
  {
    "school": "苏州大学",
    "name": "东吴体育智库",
    "url": "https://www.suda.edu.cn/suda_news/jxky/202403/b3b3a2f6-4f01-4944-a677-320cd50835ca.html",
    "kind": "官方报道",
    "highEnd": true,
    "category": "高端智库",
    "region": "江苏",
    "source": "https://www.sport.gov.cn/n315/n20001395/c30128047/content.html",
    "evidence": "2026—2030年入选单位公示",
    "note": "星标依据2026年10月23日公示，最终认定以正式公布为准。"
  },
  {
    "school": "南京体育学院",
    "name": "中国竞技体育研究院",
    "url": "https://www.nsi.edu.cn/45/20/c2348a83232/page.htm",
    "kind": "官方报道",
    "highEnd": true,
    "category": "高端智库",
    "region": "江苏",
    "source": "https://www.sport.gov.cn/n315/n20001395/c30128047/content.html",
    "evidence": "2026—2030年入选单位公示",
    "note": "星标依据2026年10月23日公示，最终认定以正式公布为准。"
  },
  {
    "school": "浙江大学",
    "name": "体育现代化高端智库",
    "url": "https://www.zju.edu.cn/",
    "kind": "学校官网",
    "highEnd": true,
    "category": "高端智库",
    "region": "浙江",
    "source": "https://www.sport.gov.cn/n315/n20001395/c30128047/content.html",
    "evidence": "2026—2030年入选单位公示",
    "note": "星标依据2026年10月23日公示，最终认定以正式公布为准。"
  },
  {
    "school": "福建师范大学",
    "name": "闽台体育融合发展智库",
    "url": "https://www.fjnu.edu.cn/",
    "kind": "学校官网",
    "highEnd": true,
    "category": "高端智库",
    "region": "福建",
    "source": "https://www.sport.gov.cn/n315/n20001395/c30128047/content.html",
    "evidence": "2026—2030年入选单位公示",
    "note": "星标依据2026年10月23日公示，最终认定以正式公布为准。"
  },
  {
    "school": "武汉体育学院",
    "name": "中国体育治理与体教融合研究中心",
    "url": "https://www.whsu.edu.cn/",
    "kind": "学校官网",
    "highEnd": true,
    "category": "高端智库",
    "region": "湖北",
    "source": "https://www.sport.gov.cn/n315/n20001395/c30128047/content.html",
    "evidence": "2026—2030年入选单位公示",
    "note": "星标依据2026年10月23日公示，最终认定以正式公布为准。"
  },
  {
    "school": "成都体育学院",
    "name": "体育文化与宣传战略研究中心",
    "url": "https://yjs.cdsu.edu.cn/info/1054/38906.htm",
    "kind": "官方报道",
    "highEnd": true,
    "category": "高端智库",
    "region": "四川",
    "source": "https://www.sport.gov.cn/n315/n20001395/c30128047/content.html",
    "evidence": "2026—2030年入选单位公示",
    "note": "星标依据2026年10月23日公示，最终认定以正式公布为准。"
  },
  {
    "school": "西安体育学院",
    "name": "西部体育发展智库",
    "url": "https://www.xaipe.edu.cn/",
    "kind": "学校官网",
    "highEnd": true,
    "category": "高端智库",
    "region": "陕西",
    "source": "https://www.sport.gov.cn/n315/n20001395/c30128047/content.html",
    "evidence": "2026—2030年入选单位公示",
    "note": "星标依据2026年10月23日公示，最终认定以正式公布为准。"
  },
  {
    "name": "北京大学国家体育产业研究基地",
    "school": "北京大学",
    "region": "北京",
    "category": "高校智库",
    "url": "https://pe.pku.edu.cn/tyky/gjtycyyjjd.htm",
    "kind": "官方介绍",
    "evidence": "官方介绍明确其体育产业新型智库定位",
    "topics": "体育产业、产业政策、咨询服务",
    "source": "https://pe.pku.edu.cn/tyky/gjtycyyjjd.htm",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "长三角体育一体化研究中心",
    "school": "上海体育大学",
    "region": "上海 / 长三角",
    "category": "高校智库",
    "url": "https://www.sport.gov.cn/n14471/n14482/n14519/c935618/content.html",
    "kind": "官方报道",
    "evidence": "总局报道确认特色新型体育智库平台定位",
    "topics": "区域协同、群众体育、竞技体育、体育产业",
    "source": "https://www.sport.gov.cn/n14471/n14482/n14519/c935618/content.html",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "中国特色社会主义体育强国建设研究中心",
    "school": "上海体育大学",
    "region": "上海",
    "category": "高校智库",
    "url": "https://yjsc.sus.edu.cn/__local/C/D8/CD/95D279D5D045BC9687E8960D84F_41EE46AC_891B75.pdf",
    "kind": "官方材料（PDF）",
    "evidence": "校方材料列明上海高校马克思主义理论智库身份",
    "topics": "体育强国、体育政策、全民健身",
    "source": "https://yjsc.sus.edu.cn/__local/C/D8/CD/95D279D5D045BC9687E8960D84F_41EE46AC_891B75.pdf",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "城市体育研究院",
    "school": "深圳大学",
    "region": "广东",
    "category": "地方智库",
    "url": "https://www.gdskl.com.cn/news_7538.shtml",
    "kind": "官方名录",
    "evidence": "2026年广东省社科新型重点智库名单",
    "topics": "城市体育、体育发展、政策咨询",
    "source": "https://www.gdskl.com.cn/news_7538.shtml",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "河南体育强省研究院",
    "school": "河南科技学院",
    "region": "河南",
    "category": "地方智库",
    "url": "https://tyxy.hist.edu.cn/xnry.jsp?urltype=news.NewsContentUrl&wbnewsid=10096&wbtreeid=2172",
    "kind": "官方报道",
    "evidence": "2026年校方报道明确省新型高校备案智库身份",
    "topics": "体育强省、地方体育、决策咨询",
    "source": "https://tyxy.hist.edu.cn/xnry.jsp?urltype=news.NewsContentUrl&wbnewsid=10096&wbtreeid=2172",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "河北体育智库",
    "school": "河北省体育局 / 河北省燕赵体育经济研究服务中心",
    "region": "河北",
    "category": "专家智库",
    "url": "https://sport.hebei.gov.cn/shengjuyaowen/2017/0331/7064.html",
    "kind": "官方报道",
    "evidence": "2017年成立报道；不据此推定当前运行状态",
    "topics": "地方体育、冰雪运动、竞技体育",
    "source": "https://sport.hebei.gov.cn/shengjuyaowen/2017/0331/7064.html",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "浙江省体育改革发展研究会",
    "school": "浙江省体育改革发展研究会",
    "region": "浙江",
    "category": "地方智库",
    "url": "https://www.sport.gov.cn/n315/n20066836/c20657241/content.html",
    "kind": "官方报道",
    "evidence": "总局报道明确其体育改革决策咨询智库作用",
    "topics": "体育改革、全民健身、地方规划",
    "source": "https://www.sport.gov.cn/n315/n20066836/c20657241/content.html",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "江苏体育健康产业研究院",
    "school": "苏州大学",
    "region": "江苏",
    "category": "高校智库",
    "url": "https://sici.suda.edu.cn/27417/list.htm",
    "kind": "官方介绍",
    "evidence": "研究院宗旨明确建设智库团队及战略咨询任务",
    "topics": "体育健康、体育产业、战略咨询",
    "source": "https://sici.suda.edu.cn/27417/list.htm",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "贵州体育旅游研究院",
    "school": "贵州省体育局、凯里学院、多彩贵州文化产业集团共建",
    "region": "贵州",
    "category": "地方智库",
    "url": "https://www.sport.gov.cn/n14471/n14495/n14543/c894125/content.html",
    "kind": "官方报道",
    "evidence": "2019年正式挂牌报道；不据此推定当前运行状态",
    "topics": "体育旅游、产业规划、民族体育",
    "source": "https://www.sport.gov.cn/n14471/n14495/n14543/c894125/content.html",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "山东省乡村振兴体育研究院",
    "school": "曲阜师范大学",
    "region": "山东",
    "category": "高校智库",
    "url": "https://sd.people.com.cn/n2/2022/0731/c386785-40061549.html",
    "kind": "媒体报道",
    "evidence": "总局报道确认挂牌及乡村振兴体育智库服务定位",
    "topics": "乡村振兴、农村体育、政策研究",
    "source": "https://sd.people.com.cn/n2/2022/0731/c386785-40061549.html",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "山东省体医融合发展研究院",
    "school": "山东省体育、卫生健康系统相关单位",
    "region": "山东",
    "category": "研究平台",
    "url": "https://www.sport.gov.cn/n20001280/n20745751/n20767239/c23443300/content.html",
    "kind": "官方报道",
    "evidence": "总局报道明确综合性、开放式、智库型工作平台定位",
    "topics": "体医融合、全民健身、健康促进",
    "source": "https://www.sport.gov.cn/n20001280/n20745751/n20767239/c23443300/content.html",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "湖南省体育公共服务研究基地",
    "school": "湖南师范大学",
    "region": "湖南",
    "category": "研究平台",
    "url": "https://news.hunnu.edu.cn/info/1009/84954.htm",
    "kind": "官方报道",
    "evidence": "2026年校方报道明确省级平台与决策智库定位",
    "topics": "体育公共服务、健康湖南、政策咨询",
    "source": "https://news.hunnu.edu.cn/info/1009/84954.htm",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "湖北体育产业研究中心",
    "school": "武汉体育学院",
    "region": "湖北",
    "category": "研究平台",
    "url": "https://csir.whsu.edu.cn/zxjj/jbjs.htm",
    "kind": "官方介绍",
    "evidence": "官方介绍明确产业政策、战略规划与咨询服务职能",
    "topics": "体育产业、休闲体育、体育消费",
    "source": "https://csir.whsu.edu.cn/zxjj/jbjs.htm",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "体育科学研究院（辽宁省文体旅融合发展研究院）",
    "school": "沈阳体育学院",
    "region": "辽宁",
    "category": "地方智库",
    "url": "https://www.syty.edu.cn/info/1036/12793.htm",
    "kind": "官方报道",
    "evidence": "2026年校方报道明确2024年获批新型智库",
    "topics": "文体旅融合、政策研究、产业赋能",
    "source": "https://www.syty.edu.cn/info/1036/12793.htm",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "广东奥林匹克体育中心专家智库",
    "school": "广东奥林匹克体育中心",
    "region": "广东",
    "category": "专家智库",
    "url": "https://www.sport.gov.cn/n14471/n14490/n14527/c29795333/content.html",
    "kind": "官方报道",
    "evidence": "2026年总局报道确认专家智库成立",
    "topics": "体育场馆、体育产业、融合发展",
    "source": "https://www.sport.gov.cn/n14471/n14490/n14527/c29795333/content.html",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "京张体育文化旅游带专家智库",
    "school": "京张体育文化旅游带相关地方与合作单位",
    "region": "北京 / 河北 / 内蒙古",
    "category": "专家智库",
    "url": "https://www.xiongan.gov.cn/2021-05/10/c_1211148260.htm",
    "kind": "官方报道",
    "evidence": "2021年成立报道；属专家咨询网络",
    "topics": "体育文化、体育旅游、区域发展",
    "source": "https://www.xiongan.gov.cn/2021-05/10/c_1211148260.htm",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "北京民生智库体育发展研究中心",
    "school": "北京民生智库",
    "region": "北京",
    "category": "社会智库",
    "url": "https://www.pishu.com.cn/skwx_ps/literature/16940052.html",
    "kind": "出版机构页面",
    "evidence": "2026年出版报告列明中心课题组及政策研究成果",
    "topics": "群众体育、全民健身、公共服务",
    "source": "https://www.pishu.com.cn/skwx_ps/literature/16940052.html",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "四川竞技体育智库",
    "school": "四川省体育局相关智库项目团队",
    "region": "四川",
    "category": "专家智库",
    "url": "https://www.sport.gov.cn/n14471/n14494/n14544/c25101217/content.html",
    "kind": "官方报道",
    "evidence": "2022年度项目评审报道；按项目型智库收录",
    "topics": "竞技体育、奥运会、全运会、战略规划",
    "source": "https://www.sport.gov.cn/n14471/n14494/n14544/c25101217/content.html",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "中国体育经济研究中心",
    "school": "国家体育总局体育科学研究所",
    "region": "北京",
    "category": "研究平台",
    "url": "https://www.sport.gov.cn/n20001280/n20745751/n20767297/c21188941/content.html",
    "kind": "官方报道",
    "evidence": "官方成立报道明确规划政策研究与专家咨询职能",
    "topics": "体育经济、重大规划、体育改革",
    "source": "https://www.sport.gov.cn/n20001280/n20745751/n20767297/c21188941/content.html",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "山东省体育政策研究院",
    "school": "山东体育学院",
    "region": "山东",
    "category": "研究平台",
    "url": "https://fx.xwapp.moe.gov.cn/article/202112/61cd4e46695ccf00015c702f.html",
    "kind": "教育部门报道",
    "evidence": "2021年报道列明体育政策研究平台及智库服务职能",
    "topics": "体育政策、体教融合、决策咨询",
    "source": "https://fx.xwapp.moe.gov.cn/article/202112/61cd4e46695ccf00015c702f.html",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "体育旅游高端智库联盟",
    "school": "贵州体育旅游研究院等发起单位",
    "region": "贵州 / 跨区域",
    "category": "智库联盟",
    "url": "https://wb.gywb.cn/epaper/gywb/html/2026-04/01/content_1918.htm",
    "kind": "媒体报道",
    "evidence": "2026年成立报道；联盟称谓不等同于总局17家公示单位",
    "topics": "体育旅游、产业评价、指数研究",
    "source": "https://wb.gywb.cn/epaper/gywb/html/2026-04/01/content_1918.htm",
    "highEnd": false,
    "note": ""
  },
  {
    "name": "冬奥文化与冰雪运动发展研究基地",
    "school": "北京体育大学",
    "region": "北京",
    "category": "研究平台",
    "url": "https://kjc.bsu.edu.cn/xwjb/29b47b8ad61c4970a017bfa6ba7e3031.htm",
    "source": "https://kjc.bsu.edu.cn/xwjb/29b47b8ad61c4970a017bfa6ba7e3031.htm",
    "kind": "官方报道",
    "evidence": "校方获批报道明确冬奥、冰雪运动与决策咨询研究职能",
    "topics": "冬奥遗产、冰雪运动、区域发展",
    "note": "研究基地按决策咨询平台收录。",
    "highEnd": false
  }
];
  var PAGE_SIZE = 12;
  function esc(s){
    return String(s == null ? '' : s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});
  }
  function external(url,text,cls){
    return '<a'+(cls?' class="'+esc(cls)+'"':'')+' href="'+esc(url)+'" target="_blank" rel="noopener noreferrer" aria-label="'+esc(text+'，在新标签页打开')+'">'+esc(text)+'</a>';
  }
  function matches(u,query,mode,category){
    if(mode === 'high' && !u.highEnd || mode === 'other' && u.highEnd) return false;
    if(category && u.category !== category) return false;
    var text = [u.name,u.school,u.region,u.category,u.topics,u.evidence].join(' ').toLowerCase();
    return query.toLowerCase().trim().split(/\s+/).every(function(word){return text.indexOf(word) !== -1;});
  }
  function row(u,i){
    var star=u.highEnd?'<span class="tt-star" title="2026—2030年入选公示名单">★ 高端智库</span>':'<span class="tt-category">'+esc(u.category)+'</span>';
    return '<tr><td>'+(i+1)+'</td><th scope="row">'+external(u.url,u.name,'tt-name-link')+'<div class="tt-meta">'+star+'<span>'+esc(u.region)+'</span></div><small class="tt-destination">'+esc(u.kind+' · '+new URL(u.url).hostname)+'</small></th>'+
      '<td><span class="tt-owner">'+esc(u.school)+'</span><small class="tt-topics">'+esc(u.topics||'')+'</small><small class="tt-evidence">'+external(u.source,'收录依据')+'：'+esc(u.evidence)+'</small></td></tr>';
  }
  function mount(){
    if(document.getElementById('homeThinkTanks')) return true;
    var quick=document.querySelector('#sportsPortal .sp-quick');
    if(!quick || !quick.parentNode) return false;
    var section=document.createElement('section');
    section.id='homeThinkTanks';
    section.className='tt-topic';
    section.setAttribute('aria-labelledby','thinkTankTitle');
    var highCount=units.filter(function(u){return u.highEnd;}).length;
    var categories=Array.from(new Set(units.map(function(u){return u.category;})));
    section.innerHTML=
      '<header class="tt-header"><div><h2 id="thinkTankTitle">体育智库名录</h2><p class="tt-subtitle">高端智库 · 地方与行业智库 · 决策咨询平台</p></div><span class="tt-status">'+units.length+'家 / 平台</span></header>'+
      '<p class="tt-intro">从体育政策、产业与健康到体旅融合，查找智库、专家咨询网络及具有决策咨询职能的研究平台。点击名称访问相关网站，每条记录均附收录依据。</p>'+
      '<div class="tt-controls"><label class="tt-search"><span>搜索智库</span><input id="ttQuery" type="search" placeholder="名称、单位、地区或研究方向" autocomplete="off"></label>'+
      '<label class="tt-select"><span>机构类型</span><select id="ttCategory"><option value="">全部类型</option>'+categories.map(function(c){return '<option value="'+esc(c)+'">'+esc(c)+'</option>';}).join('')+'</select></label></div>'+
      '<div class="tt-filter-row"><div class="tt-filters" role="group" aria-label="按星标筛选">'+
      '<button type="button" data-mode="all" aria-pressed="true">全部 '+units.length+'</button><button type="button" data-mode="high" aria-pressed="false">★ 高端智库 '+highCount+'</button><button type="button" data-mode="other" aria-pressed="false">其他智库与平台 '+(units.length-highCount)+'</button></div><button type="button" id="ttReset">重置筛选</button></div>'+
      '<p class="tt-results" id="ttResults" role="status" aria-live="polite" aria-atomic="true"></p>'+
      '<div class="tt-table-wrap"><table class="tt-table"><caption>体育智库与决策咨询平台名录，星标17家公示单位优先展示</caption><thead><tr><th scope="col">序号</th><th scope="col">智库 / 平台名称</th><th scope="col">所属或相关单位 · 收录依据</th></tr></thead><tbody id="ttRows"></tbody></table></div>'+
      '<div class="tt-list-actions"><button type="button" id="ttShowAll" aria-controls="ttRows"></button></div>'+
      '<p class="tt-source">★ 高端智库：标记依据'+external('https://www.sport.gov.cn/n315/n20001395/c30128047/content.html','国家体育总局2026—2030年入选单位公示')+'中的17家名单，最终认定以主管部门正式公布为准。其他类型为本名录按公开资料归类，不等同于官方等级认定。</p>'+
      '<p class="tt-source tt-coverage">资料整理：2026-10-26。名录持续补充，非全国全量清单；历史成立报道仅作为收录依据，不据此推定当前运行状态。研究基地、专家网络和联盟均已单独标注。</p>';
    quick.parentNode.insertBefore(section,quick.nextSibling);
    var input=section.querySelector('#ttQuery'),category=section.querySelector('#ttCategory'),body=section.querySelector('#ttRows'),count=section.querySelector('#ttResults'),showAll=section.querySelector('#ttShowAll');
    var buttons=section.querySelectorAll('.tt-filters button'),mode='all',limit=PAGE_SIZE;
    function render(){
      var filtered=units.filter(function(u){return matches(u,input.value,mode,category.value);});
      var visible=filtered.slice(0,limit);
      body.innerHTML=visible.length?visible.map(row).join(''):'<tr><td colspan="3" class="tt-empty">没有匹配的智库，请调整关键词或重置筛选。</td></tr>';
      count.textContent='匹配 '+filtered.length+' 条 · 当前显示 '+visible.length+' 条';
      showAll.hidden=visible.length >= filtered.length;
      showAll.textContent='显示全部 '+filtered.length+' 条（还有 '+(filtered.length-visible.length)+' 条）';
      buttons.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.mode === mode));});
    }
    input.addEventListener('input',function(){limit=PAGE_SIZE;render();});
    category.addEventListener('change',function(){limit=PAGE_SIZE;render();});
    buttons.forEach(function(b){b.addEventListener('click',function(){mode=b.dataset.mode;limit=PAGE_SIZE;render();});});
    showAll.addEventListener('click',function(){limit=units.length;render();});
    section.querySelector('#ttReset').addEventListener('click',function(){input.value='';category.value='';mode='all';limit=PAGE_SIZE;render();input.focus();});
    render();
    return true;
  }
  function start(){
    if(mount()) return;
    var observer=new MutationObserver(function(){if(mount()) observer.disconnect();});
    observer.observe(document.documentElement,{childList:true,subtree:true});
    window.addEventListener('pagehide',function(){observer.disconnect();},{once:true});
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();

