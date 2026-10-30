/**
 * CSSD 体育学人 - 全站终极增强套件 v15.4 (全新会议门户级倒计时看板 UI + 学界动态排版修复旗舰版)
 * 本次升级与修复要点：
 * 1. [移除右下角突兀悬浮条]: 彻底删除右下角黑色胶囊悬浮条 (#cssd-float-pill)，保持页面清爽通透
 * 2. [调整首页模块顺序]: 将「科研项目动态」大屏调整至首页顶部 8 大板块导航卡片（学者目录/科研项目查询/人才计划等）的正下方，保留原站导航在最上方
 * 3. [修复类别标签四字换行]: 为「重点项目/一般项目/青年项目/规划基金」等表格列与标签强制设置 white-space:nowrap 与充足列宽，全部单行整齐显示
 * 4. [修复立项领跑院校文字看不清]: 移除可能与原站样式冲突的 button/[data-u] 属性，改用独立高对比度标签 (.cssd-unit-chip) 并锁定 #0f172a 深墨色字体，上海体育大学、广州体育学院等全部清晰锐利
 * 5. [全网重点体育学术会议日历]: 搜集并内置中国体育科学学会、全国体育博士高层论坛、全国青年体育科学学术会议、全国体育信息科技大会、上海体大、成都体院、沈阳体院、哈体院、浙大及 ECSS/ACSM 等 18 场全国与国际重点体育学术会议
 */
(function () {
  'use strict';
  if (window.__CSSD_V15_4_LOADED__) return;
  window.__CSSD_V15_4_LOADED__ = true;

  var DISC_NAMES = ['体育人文社会学','运动人体科学','体育教育训练学','民族传统体育学'];
  var DISC_CODES = ['soc','hum-sci','pe','trad'];
  var MOE_RAW = [[88,1,"全球体育治理共同体的构建路径与中国方案研究","任振朋","四川师范大学",0,"四川"],[89,0,"县域中小学实施“学生体质强健计划”的创新机制与适配路径研究","刘海东","成都师范学院",2,"四川"],[90,0,"家校社协同育人视域下国家级非遗“红拳”大中小学一体化传承研究","高野","西安外国语大学",3,"陕西"],[1360,0,"主动健康视域下城市老旧社区公共体育空间的效能评估与靶向更新机制研究","丁国胜","湖南大学",1,"湖南"],[1361,1,"数智赋能小学生体育与健康核心素养情境化测评工具的开发与应用研究","刁玉翠","苏州大学",1,"江苏"],[1362,1,"数智赋能青少年运动习惯养成的作用机制与优化路径研究","杨安禄","中国矿业大学（北京）",0,"北京"],[1363,0,"中小学生每天2小时体育活动执行难点、推进策略与干预评估研究","周玉兰","浙江师范大学",2,"浙江"],[1364,0,"多模态AI赋能下幼儿基本运动技能滞后风险早期识别与“家园协同”靶向干预的模式研究","周喆啸","宁波大学",2,"浙江"],[1365,1,"碎片化运动对久坐大学生注意网络的影响：时间窗、最佳剂量及脑机制研究","曾佳","福州大学",1,"福建"],[1366,0,"智慧教育背景下我国青少年运动健康风险的数字画像与预警机制研究","陈海鸥","广东医科大学",1,"广东"],[1367,1,"健康第一视域下生成式AI驱动的青少年不良体态运动矫正模式构建与实证研究","刘琳","南京体育学院",1,"江苏"],[1368,0,"体卫融合视域下青少年血压偏高精准运动干预的家校社协同模式构建与实证研究","付常喜","徐州工程学院",1,"江苏"],[1369,1,"青少年生物节律紊乱相关行为的形成机制及体卫融合干预研究","韩一鸣","广西师范大学",1,"广西"],[1370,0,"数智赋能西南民族特色村寨体文旅融合的创新机制与实践路径研究","戴朝","四川师范大学",3,"四川"],[1371,1,"户外运动改善大学生抑郁症状的“情绪—认知”通路与脑网络机制研究","史冀龙","厦门大学",1,"福建"],[1372,0,"“家—校—医”协同视域下青少年脊柱侧弯数智预警与精准运动干预研究","杨惠","康复大学",1,"全国"],[1373,0,"我国青少年身体功能评估体系构建、常模制定与协同治理路径研究","周霄","华中科技大学",1,"湖北"],[1374,0,"“两创”视域下岭南非遗传统体育文化的AI知识图谱构建与数字人传承创新研究","关博","广州体育学院",3,"广东"],[1375,0,"县域枢纽型体育社会组织推动公共服务下沉的范式重构与机制优化研究","白杨","宁波职业技术大学",0,"浙江"],[1376,0,"体育特色城市的类型生成机制与分类治理研究","王成","南京大学",0,"江苏"],[1377,0,"数智促进我国残疾人康复健身体育高质量发展的实现机制与协同路径研究","谢恩礼","南京体育学院",0,"江苏"],[1378,0,"中国近代体育慈善文献资料整理与研究","牟艳","山东体育学院",0,"山东"],[1379,0,"我国中小学健康学校建设的典型模式与推进路径研究","李志强","临沂职业学院",1,"山东"],[1380,0,"我国学龄前儿童（3—6岁）身体素养多模态评估与追踪干预研究","谷颖","沈阳师范大学",2,"辽宁"],[1381,1,"银发经济视域下老年体育服务消费需求分层与精准供给研究","周冲","武汉体育学院",1,"湖北"],[1382,0,"“票根经济”视域下我国群众性体育赛事品牌培育机制与路径研究","李勇","山东体育学院",0,"山东"],[1383,1,"2型糖尿病（T2DM）患者运动功能监测与干预效果多维度评价体系构建研究","程经纬","河南体育学院",1,"河南"],[1384,1,"面向VR体育动作训练的多模态感知与智能交互机制研究","李慧宇","山东财经大学",2,"山东"],[1385,0,"数智赋能大学生体质健康管理：机制构建、平台验证与路径优化研究","姜卫芬","天津医科大学",1,"天津"],[1386,1,"具身认知视域下认知—运动双任务训练促进小学生身心健康的机制研究","陈娟","湖北文理学院",1,"湖北"],[1387,0,"社区体育公共服务“数字悬浮”的形成机理与治理策略研究","杜兴彬","山东华宇工学院",0,"山东"],[1388,1,"“行为—认知”视角下大学生抑郁症状风险分层与精准运动干预研究","石林","成都体育学院",1,"四川"],[1389,0,"“体教融合”背景下高校肥胖学生体育课程精准化重构与实证研究","李燕春","北京体育大学",2,"北京"],[1390,1,"基于多源数据融合的大学生运动员学业倦怠预警模型与干预策略研究","武欣然","中山大学",2,"全国"],[1391,0,"义务教育阶段“每天综合体育活动2小时”落实中的有效运动时间测度与提升机制研究","张艳","河海大学",2,"江苏"],[1392,1,"数智赋能儿童青少年体态健康动态监测与协同干预机制研究","唐芳","安庆师范大学",1,"安徽"],[1393,1,"赛事经济对城际消费资源的分配效应与包容性治理研究","韩苗苗","山东工商学院",0,"山东"],[1394,1,"“十五五”时期数智体育赋能老年慢病主动健康的风险预警机制与公共服务治理研究","宋杨","宁波大学",1,"浙江"],[1395,1,"基于多模态数据融合的儿童少年基础运动技能发展评估与预测模型构建研究","赵刚","苏州大学",2,"江苏"],[1396,1,"多模态运动矫正儿童青少年不良体态干预模式构建与应用研究","梁计陵","中南大学",1,"湖南"],[1397,0,"群众体育赛事促进各民族交往交流交融的机制研究","王继雄","内蒙古财经大学",3,"内蒙古"],[1398,0,"青少年运动猝死多模态智能风险评估与防范应用研究","吴卫兵","上海体育大学",1,"上海"],[1399,0,"数字脱瘾与大学生运动行为的双向关联机制及协同促进研究","周俣涛","湖南工业大学",0,"湖南"],[1400,0,"乡村振兴背景下农村“一老一小”代际体育康养的促进机制与干预模式研究","徐国琴","广州体育学院",0,"广东"],[1401,0,"生成式人工智能嵌入体育消费场景创新的实现机制与路径研究","王冠瑛","燕山大学",0,"河北"],[1402,0,"体医融合视域下青少年抑郁症状的“校—医—家”协同运动干预模式构建与实证研究","尹剑春","上海师范大学",1,"上海"],[1403,1,"数智赋能社区运动健康中心效能跃升影响因素、作用机理及推进路径研究","李紫浩","湖南农业大学",1,"湖南"],[1404,1,"主动健康视域下数智赋能“三高”人群运动干预的多模态模型构建研究","罗维","南京体育学院",1,"江苏"],[1405,0,"数字包容视域下城乡老年人体育参与鸿沟的形成机制与治理路径研究","谢劲","台州学院",1,"浙江"],[1406,1,"认知参与型身体活动对手机依赖青少年执行功能的干预效果及机制研究","孟繁莹","湖州师范大学",1,"浙江"],[1407,0,"闽籍华侨华人体育史料的搜集、整理与研究（1900—2000）","傅亮","厦门大学",0,"福建"],[1408,1,"老年慢性病人群运动依从性的障碍生成机制及多模态干预研究","李红梅","中南民族大学",1,"湖北"],[1409,1,"积极老龄化视域下社区老年膝骨关节炎患者跌倒风险分层预测与数智化运动康复服务路径研究","沈培鑫","山东体育学院",1,"山东"],[1410,0,"青少年24h活动行为聚类的社会生态机制及其靶向干预策略研究","马生霞","四川师范大学",0,"四川"],[1411,0,"中央苏区学校体育治理的制度逻辑与历史经验研究","贺鑫森","江西水利电力大学",2,"江西"],[1412,0,"“两个结合”视域下奥林匹克价值观的代际传承张力与本土化实践策略研究","闫丽敏","河南师范大学",0,"河南"],[1413,0,"我国学校体育数字化场景建构的应然图景与行动路径研究","代方梅","湖北大学",2,"湖北"],[1414,0,"青少年运动动机的生态培育机制与身体活动精准促进研究","李娟","河北师范大学",0,"河北"],[1415,1,"运动技术话语具身语义编码体系构建及项群效度检验研究","赵飞达","湖州师范大学",0,"浙江"],[1416,1,"黄河滩区村落民俗体育口述史料搜集、整理与研究","窦圣浩","济宁学院",3,"山东"],[1417,0,"“十五五”时期健康学校建设的体育资源城乡联动模式研究","郭良如","衡阳师范学院",1,"湖南"],[1418,1,"中华传统体育“走出去”的国别适应机制研究","陈静越","韩山师范学院",3,"广东"],[1419,1,"3—6岁幼儿运动智能结构模型、发展规律与体育促进路径研究","武继莹","沈阳体育学院",2,"辽宁"],[1420,1,"老旧小区嵌入式体育场地设施协同供给的理论逻辑与实现路径研究","欧亚","湖南网络工程职业学院",0,"湖南"],[1421,0,"体教医融合视域下小学生近视防控与学校体育活动协同推进的机制与路径研究","林文弢","珠海科技学院",2,"广东"],[1422,0,"基于多模态AI情绪识别的大学生抑郁倾向运动处方动态干预研究","汪君民","淮阴师范学院",1,"江苏"],[1423,1,"具身正念促进大学生运动参与的驱动机制与路径研究","张曜","苏州大学",0,"江苏"],[1424,0,"混合现实技术和人工智能技术赋能基层裁判员训练的机制、路径与应用研究","邵坚博","新疆理工学院",2,"新疆"],[1425,0,"大学生24小时活动行为失衡的抑郁风险评估及精准干预研究","王军利","中国矿业大学",1,"全国"],[1426,0,"新中国成立以来国乒荣耀创造者集体记忆的社会建构研究","何敬堂","淮南师范学院",0,"安徽"],[1427,0,"场景创新赋能体育旅游消费潜力释放长效机制与优化策略研究","唐月亮","湖南财政经济学院",0,"湖南"],[1428,1,"基于大语言模型的世居高原老年人KOA个性化运动干预研究","周惠宣","北京体育大学",1,"北京"],[1429,1,"数智技术介入运动训练的经验与数据协同机制及路径研究","张泽英","太原理工大学",2,"山西"],[1430,1,"基于行动者网络理论的青少年体质健康多元协同网络的构建与实践研究","范卉颖","上海师范大学",1,"上海"],[1431,0,"儿童身体姿态与基本运动技能的动态互馈机制及模型构建研究","荆文","山东师范大学",2,"山东"],[1432,1,"数智赋能社区老年人运动功能衰退风险识别与分层干预研究","董芮","华南师范大学",1,"全国"],[1433,1,"青少年攻击行为的跨诊断运动干预研究","温朋飞","广州体育学院",0,"广东"],[1434,1,"基于健康画像的碎片化运动促进农村女性产后康复模式构建及实证研究","程林","广东技术师范大学",1,"广东"],[1435,1,"体育锻炼增益升学关键期青少年学业情绪的作用机制与靶向干预研究","程文娟","山东青年政治学院",2,"山东"],[1436,0,"赛事驱动城乡文体旅融合共同体构建机制研究","孙中芹","曲阜师范大学",0,"山东"],[1437,0,"殷墟甲骨文体育元素的系统考释、理论阐释与活化传承研究","郭宇刚","安阳师范学院",3,"河南"],[1438,0,"基于AI赋能的乒乓球技战术诊断体系构建与应用研究","徐君伟","河南财经政法大学",0,"河南"],[1439,1,"数智赋能老年人肌少症风险预警与传统体育干预体系的建设路径研究","李新星","沈阳体育学院",1,"辽宁"],[1440,0,"“城超”激活“城市文化资本”的机理与路径研究","张庆如","苏州大学",0,"江苏"],[1441,1,"运动联合正念干预缓解阈下抑郁大学生认知情绪失调的机制与路径研究","李夏雯","上海健康医学院",1,"上海"],[1442,0,"基于数字画像的大学生体质健康精准干预机制与实现路径研究","耿元文","燕山大学",1,"河北"],[1443,1,"中小学生体质健康监测大数据驱动的精准干预与动态评价体系构建","赵怀超","河南大学",1,"河南"],[1444,1,"城市社区智慧体育服务适老化的水平测度与驱动机制研究","罗恒","湘南学院",0,"湖南"],[1445,1,"数据驱动的体育公园夜间建成环境对老年人身体活动的影响及适老化研究","林桐","常州工学院",1,"江苏"],[1446,1,"数智赋能我国青少年有氧和力量协同发展的理论建构与应用研究","李振","中国石油大学（华东）",0,"全国"],[1447,1,"中国式现代化视域下全民健身公共服务均等化评估与区域差异调控机制研究","郭琪","西安工程大学",0,"陕西"],[1448,0,"健康生态学视角下社区老年人认知衰弱影响因素多维评估与运动营养联合干预模式实证研究","蔡明","上海健康医学院",1,"上海"],[1449,0,"大型体育赛事媒介生态中的中华文化符号转译机制与传播效应研究","刘金锋","淮南师范学院",0,"安徽"],[1450,1,"残疾人体育公共服务供需动态适配模型构建与实证研究","张巧","闽江大学",0,"福建"],[1451,0,"多智能体赋能学生终身运动习惯养成的系统与实践干预研究","孙国欣","西南交通大学",0,"四川"],[1452,1,"“面向人人”班级联赛促进中小学生体育深度学习的作用机制及实现路径研究","郭洪亮","北京体育大学",2,"北京"],[1453,0,"乡村振兴背景下西部特岗体育教师职业承诺的影响机制与长效激励：基于“留任导向”的研究","崔昌水","西安外事学院",0,"陕西"],[1454,1,"藏羌彝走廊体育非物质文化遗产采辑与数字资源库建设研究","严小英","成都师范学院",3,"四川"],[1455,0,"民族传统体育铸牢边境青少年中华民族共同体意识的心理机制与组态路径研究","黄华敏","广西民族师范学院",3,"广西"],[1456,0,"群众体育赛事赛后效应转化与基层长效治理机制研究","宋述光","中国石油大学（华东）",0,"全国"],[1457,0,"城市社区体育组织服务能力的数智化动态评估与精准建设","丁洁","河南师范大学",0,"河南"],[1458,1,"我国运动训练本科专业布点的数量扩张与质量保障研究","吴彰忠","武汉体育学院",2,"湖北"],[1459,0,"地方营造与认同重建中的老工业城市群众体育赛事田野研究","孙素玲","沈阳体育学院",0,"辽宁"],[1460,0,"长三角城市边角空间体育化微更新的场景创新与治理体系研究","吴明华","常州大学",0,"江苏"],[1461,1,"数智技术赋能户外运动消费场景创新的作用机制与组态路径研究","刘超","安徽师范大学",0,"安徽"],[1462,0,"主动健康视域下青少年生活体育化服务体系研究","陆贝","潍坊学院",1,"山东"],[1463,1,"扩大内需战略下居民体育消费惯性的形成机理与释放路径研究","李一易","山东体育学院",0,"山东"],[1464,1,"我国职业体育联盟交叉补贴政策失灵的制度归因与治理路径研究","周腾军","西南财经大学",0,"四川"]];
  var MOE_2026 = MOE_RAW.map(function(x) {
    return [x[0], x[0] <= 90 ? '西部和边疆地区' : '规划基金/青年基金', x[2], x[1] ? '青年基金项目' : '规划基金项目', x[3], x[4], DISC_NAMES[x[5]], DISC_CODES[x[5]], x[6]];
  });
  var MOE_TOP25 = [["苏州大学",4,"3.7%"],["山东体育学院",4,"3.7%"],["四川师范大学",3,"2.8%"],["南京体育学院",3,"2.8%"],["广州体育学院",3,"2.8%"],["北京体育大学",3,"2.8%"],["沈阳体育学院",3,"2.8%"],["成都师范学院",2,"1.9%"],["宁波大学",2,"1.9%"],["厦门大学",2,"1.9%"],["武汉体育学院",2,"1.9%"],["燕山大学",2,"1.9%"],["上海师范大学",2,"1.9%"],["湖州师范大学",2,"1.9%"],["河南师范大学",2,"1.9%"],["淮南师范学院",2,"1.9%"],["上海健康医学院",2,"1.9%"],["中国石油大学（华东）",2,"1.9%"],["西安外国语大学",1,"0.9%"],["湖南大学",1,"0.9%"],["中国矿业大学（北京）",1,"0.9%"],["浙江师范大学",1,"0.9%"],["福州大学",1,"0.9%"],["广东医科大学",1,"0.9%"],["徐州工程学院",1,"0.9%"]];
  var MOE_THEMES = [["机制/路径研究",58,"53.7%","机制|路径"],["数智/AI/大数据赋能",41,"38.0%","数智|AI|人工智能|多模态|数字|大数据|大语言|VR|智能"],["运动干预/运动处方",33,"30.6%","干预|处方|矫正|康复"],["青少年/儿童/幼儿体质健康",28,"25.9%","青少年|儿童|幼儿|小学生|中小学生"],["老年/银发/慢病",12,"11.1%","老年|银发|慢病|適老|适老|三高|糖尿病|肌少症"],["社区体育与公共服务",12,"11.1%","社区|公共服务|老旧小区"],["赛事经济/联赛",9,"8.3%","赛事|联赛|城超|票根"],["心理健康（抑郁/情绪/正念）",9,"8.3%","抑郁|情绪|正念|心理|倦怠|攻击"],["体育消费/体旅融合",7,"6.5%","消费|旅游|文旅|文体旅"],["学校体育/体教融合",7,"6.5%","学校体育|体教|体育课程|体育活动"],["传统体育/非遗",6,"5.6%","传统体育|非遗|红拳|民俗|甲骨文"],["乡村振兴/县域",5,"4.6%","乡村|农村|县域"],["国际传播/全球治理",3,"2.8%","全球|走出去|奥林匹克|华侨"],["残疾人/特殊人群",3,"2.8%","残疾"]];
  var NSSFC_SEED = [["2026-序号366","重点项目","中国特色体育治理自主知识体系建构与创新发展路径研究","韩春利","山东体育学院","体育人文社会学","山东"],["2026-序号367","重点项目","中国共产党革命根据地体育史研究","崔乐泉","北京师范大学","体育人文社会学","北京"],["2026-序号368","重点项目","中国武术文化标识体系建构及创新传承路径研究","王海鸥","山东师范大学","民族传统体育学","山东"],["2026-序号369","重点项目","新质生产力赋能我国体育产业高质量发展的理论机制与政策路径研究","黄海燕","上海体育大学","体育人文社会学","上海"],["2026-序号370","重点项目","新时代学校体育“健康第一”教育理念落实机制与评价体系重构研究","季浏","华东师范大学","体育教育训练学","上海"],["2026-序号371","重点项目","体卫融合视域下慢性病运动干预处方库建设与社区推广机制研究","王正珍","北京体育大学","运动人体科学","北京"],["2026-序号372","一般项目","数字经济赋能冰雪体育消费场景创新与长效扩容机制研究","张瑞林","北京师范大学","体育人文社会学","北京"],["2026-序号373","一般项目","主动健康导向下社区老年人防跌倒多模态运动干预模式与实证研究","刘宇","上海体育大学","运动人体科学","上海"],["2026-序号374","一般项目","中华传统体育非物质文化遗产铸牢中华民族共同体意识的机制与路径研究","白晋湘","吉首大学","民族传统体育学","湖南"],["2026-序号375","青年项目","生成式人工智能驱动青少年运动技能智能诊断与个性化训练研究","李翰","武汉体育学院","体育教育训练学","湖北"],["2026-序号376","青年项目","新型城镇化进程中县域全民健身场地设施空间均衡配置研究","王志强","成都体育学院","体育人文社会学","四川"],["2026-序号377","西部项目","西部民族地区体文旅深度融合赋能乡村振兴的内生机制与路径研究","马成","西北师范大学","体育人文社会学","甘肃"]];
  var THEME_RULES = [
    ['机制/路径/模式研究','机制|路径|模式|逻辑|体系'],['数智/AI/大数据赋能','数智|AI|人工智能|多模态|数字|大数据|大语言|VR|智能|智慧|算法'],
    ['全民健身与公共体育服务','全民健身|公共服务|公共体育|社区|场地设施|空间|老旧小区|均等化'],['青少年体质与学校体育/体教融合','青少年|儿童|幼儿|小学生|中小学生|大学生|学校体育|体教|体育课程|体育教学'],
    ['体育产业/赛事经济/文体旅消费','产业|消费|赛事|联赛|旅游|文旅|文体旅|票根|城超|品牌|户外运动|数字经济'],['主动健康/运动干预/体卫融合','主动健康|干预|处方|矫正|康复|体卫|体医|慢病|肥胖|近视|抑郁|心理'],
    ['积极老龄化/银发体育/老年健康','老年|银发|老龄|适老|养老|肌少症|跌倒'],['民族传统体育/非遗/共同体意识','民族|传统体育|非遗|武术|民俗|共同体|龙舟|太极|气功|红拳|甲骨文'],
    ['体育治理现代化与体育法治','治理|法治|制度|政策|协同|监管|组织|协会|改革'],['竞技体育/运动训练/三大球/奥运','竞技|运动训练|奥运|奥林匹克|冠军|体能|技战术|足球|篮球|排球|三大球|乒乓|冰雪'],
    ['全球体育治理与国际传播','全球|国际|传播|话语|走出去|跨文化|外交'],['自主知识体系与中国式体育现代化','自主知识|中国式现代化|体育强国|新质生产力|高质量发展|中国特色'],
    ['乡村振兴与县域/农村体育','乡村|农村|县域|农民|新型城镇化'],['特殊人群/残疾人/女性体育','残疾|特殊|女性|残奥|弱势']
  ];
  var SANS = '"Manrope","Geist",-apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Noto Sans SC",sans-serif';

  // 全网搜集的全国与国际重点体育学术会议日历（覆盖中国体育科学学会、各大体院、综合名校及国际顶会）
  var CALENDAR_EVENTS = [
    { start: '2026-11-06', end: '2026-11-08', cfp: '2026年10月15日', notice: '2026年10月25日', reg: '2026年11月06日', hold: '2026年11月06-08日', title: '运动健康与产业发展专业委员会第四届学术年会', shortTitle: '运动健康与产业发展年会(上体)', type: '全国专委会年会', level: 'national', loc: '上海·上海体育大学', host: '中国康复医学会 / 上海体育大学运动健康学院', status: '即将召开', url: 'https://www.carm.org.cn/kyxs/tzgg/art/2026/art_2f000dbfa8f64e509d9eff05bbb9c6fb.html', featured: 1 },
    { start: '2026-11-07', end: '2026-11-09', cfp: '2026年09月10日', notice: '2026年10月15日', reg: '2026年11月07日', hold: '2026年11月07-09日', title: '第十六届全国体育信息科技学术大会（人工智能与体育数据要素）', shortTitle: '第十六届全国体育信息科技大会', type: '国家级分会年会', level: 'national', loc: '四川成都·成都体育学院', host: '中国体育科学学会体育信息分会 / 成都体育学院', status: '即将召开', url: 'https://www.sport.gov.cn/xxzx/n5594/c29787992/content.html', featured: 1 },
    { start: '2026-11-14', end: '2026-11-16', cfp: '2026年09月20日', notice: '2026年10月20日', reg: '2026年11月14日', hold: '2026年11月14-16日', title: '第十届全国青年体育科学学术会议（主题：体育强国 青年担当）', shortTitle: '第十届全国青年体育科学会议', type: '国家级品牌会议', level: 'national', loc: '河南郑州/新乡', host: '中国体育科学学会', status: '即将召开', url: 'https://www.sohu.com/a/1031231158_121124683', featured: 1 },
    { start: '2026-11-20', end: '2026-11-22', cfp: '2026年09月15日', notice: '2026年09月30日', reg: '2026年10月09日', hold: '2026年11月20-22日', title: '第十届中国体育博士高层论坛（学科交叉引领体育科学前沿新发展）', shortTitle: '第十届中国体育博士高层论坛', type: '国家级高层论坛', level: 'national', loc: '河北石家庄·河北师范大学', host: '中国体育科学学会 / 河北师范大学', status: '即将召开', url: 'https://www.51huiyi.org/Web/Page?_pid=conf&cid=3a246fa7-75cd-36e4-79bb-597a3b247844', featured: 1 },
    { start: '2026-11-27', end: '2026-11-29', cfp: '2026年10月31日', notice: '2026年11月10日', reg: '2026年11月27日', hold: '2026年11月27-29日', title: '第二十一届全国体育新闻传播学术研讨会', shortTitle: '全国体育新闻传播学术研讨会', type: '国家级分会年会', level: 'national', loc: '辽宁沈阳·沈阳体育学院', host: '中国体育科学学会体育新闻传播分会 / 沈阳体育学院', status: '征文/即将召开', url: 'https://www.sohu.com/a/1070121631_121124683', featured: 1 },
    { start: '2026-12-04', end: '2026-12-06', cfp: '2026年11月15日', notice: '2026年11月22日', reg: '2026年12月04日', hold: '2026年12月04-06日', title: '第二届中国体育科学学会女科技工作者工作委员会学术交流会', shortTitle: '中国体育科学学会女科技工作者会', type: '国家级工委会会议', level: 'national', loc: '山东济南·山东体育学院', host: '中国体育科学学会女科技工作者工委会 / 山东体育学院', status: '征文进行中', url: 'https://www.sdpei.edu.cn/2026/1023/c1393a87395/page.htm', featured: 1 },
    { start: '2026-12-11', end: '2026-12-13', cfp: '2026年11月20日', notice: '2026年11月30日', reg: '2026年12月11日', hold: '2026年12月11-13日', title: '2026年体育教育、运动心理学与健康管理国际会议 (IPESPH 2026)', shortTitle: '体育教育与运动心理学国际会议', type: '国际学术会议', level: 'intl', loc: '江西南昌', host: 'IPESPH 国际组委会', status: '征文进行中', url: 'https://www.allconfs.org/meeting_type.asp?id=68', featured: 1 },
    { start: '2026-12-18', end: '2026-12-20', cfp: '2026年11月25日', notice: '2026年12月05日', reg: '2026年12月18日', hold: '2026年12月18-20日', title: '2026年体育文化与社会学学术研讨会（征文）', shortTitle: '2026体育文化与社会学研讨会', type: '区域/专题研讨会', level: 'provincial', loc: '山东泰安·泰山学院', host: '山东省体育社会学研究会 / 泰山学院', status: '征文进行中', url: 'https://www.sdpei.edu.cn/2026/1023/c1393a87390/page.htm', featured: 1 },
    { start: '2026-10-28', end: '2026-10-30', cfp: '2026年08月05日', notice: '2026年09月25日', reg: '2026年10月15日', hold: '2026年10月28-30日', title: '2026年全国全民健身科学大会（主题：数字赋能全民健身高质量发展）', shortTitle: '2026全国全民健身科学大会', type: '国家级一级会议', level: 'national', loc: '北京', host: '中国体育科学学会', status: '即将召开', url: 'https://www.sohu.com/a/1055414239_121124683', featured: 1 },
    { start: '2026-10-25', end: '2026-10-27', cfp: '2026年07月31日', notice: '2026年08月20日', reg: '2026年08月30日', hold: '2026年10月25-27日', title: '运动生物力学与大健康学术研讨会', shortTitle: '运动生物力学与大健康研讨会', type: '全国专题研讨会', level: 'national', loc: '浙江·宁波（宁波大学）', host: '《医用生物力学》编辑部 / 宁波大学体育学院(大健康研究院)', status: '近期举办', url: 'https://assbgh2026.meeting666.com/', featured: 1 },
    { start: '2026-10-30', end: '2026-10-31', cfp: '2026年10月15日', notice: '2026年10月22日', reg: '2026年10月29日', hold: '2026年10月30-31日', title: '2026年中国学校体育理论创新与自主知识体系构建学术研讨会', shortTitle: '中国学校体育理论创新研讨会', type: '专题学术研讨会', level: 'provincial', loc: '山东济南', host: '山东体育学院', status: '即将召开', url: '', featured: 0 },
    { start: '2026-11-13', end: '2026-11-15', cfp: '2026年10月30日', notice: '2026年11月05日', reg: '2026年11月13日', hold: '2026年11月13-15日', title: '2026年山东省第三届休闲体育与体育旅游学术论坛', shortTitle: '山东省休闲体育与体育旅游论坛', type: '专题学术论坛', level: 'provincial', loc: '山东济南/日照', host: '山东体育学院', status: '征文进行中', url: '', featured: 0 },
    { start: '2026-11-28', end: '2026-11-30', cfp: '2026年11月10日', notice: '2026年11月18日', reg: '2026年11月28日', hold: '2026年11月28-30日', title: '首届黑龙江省体育科学大会（冰雪体育与寒地运动健康）', shortTitle: '首届黑龙江省体育科学大会', type: '省部级重点会议', level: 'provincial', loc: '黑龙江哈尔滨', host: '黑龙江省体育局 / 黑龙江省体育科学学会', status: '征文进行中', url: 'https://tyj.hlj.gov.cn/tyj/c112436/202610/c00_31981104.shtml', featured: 0 },
    { start: '2026-09-18', end: '2026-09-20', cfp: '2026年07月20日', notice: '2026年08月15日', reg: '2026年09月01日', hold: '2026年09月18-20日', title: '第二十四届全国运动生物力学学术交流大会', shortTitle: '全国运动生物力学学术大会', type: '国家级分会年会', level: 'national', loc: '黑龙江哈尔滨·哈尔滨体育学院', host: '中国体育科学学会运动生物力学分会 / 哈尔滨体育学院', status: '年度重点回顾', url: 'https://www.sohu.com/a/1020029937_121124683', featured: 0 },
    { start: '2026-08-21', end: '2026-08-23', cfp: '2026年06月30日', notice: '2026年07月20日', reg: '2026年08月10日', hold: '2026年08月21-23日', title: '2026年全国运动增强体质与健康学术会议', shortTitle: '全国运动增强体质与健康会议', type: '国家级分会年会', level: 'national', loc: '黑龙江哈尔滨·哈尔滨体育学院', host: '中国体育科学学会体质与健康分会 / 哈尔滨体育学院', status: '年度重点回顾', url: 'https://www.sohu.com/a/1023191928_121124683', featured: 0 },
    { start: '2026-07-07', end: '2026-07-10', cfp: '2026年02月15日', notice: '2026年04月01日', reg: '2026年05月15日', hold: '2026年07月07-10日', title: '第31届欧洲体育科学学会年会 (ECSS Lausanne 2026)', shortTitle: 'ECSS 2026 瑞士洛桑年会', type: '国际顶级会议', level: 'intl', loc: '瑞士洛桑 (Lausanne)', host: 'European College of Sport Science (ECSS)', status: '国际顶会回顾', url: 'https://sport-science.org/', featured: 0 },
    { start: '2026-05-29', end: '2026-05-31', cfp: '2026年04月15日', notice: '2026年05月05日', reg: '2026年05月20日', hold: '2026年05月29-31日', title: '2026第十四届全国体育管理科学大会', shortTitle: '第十四届全国体育管理科学大会', type: '国家级分会年会', level: 'national', loc: '山东济南', host: '中国体育科学学会体育管理分会', status: '年度重点回顾', url: 'https://www.sohu.com/a/986304381_121124683', featured: 0 },
    { start: '2026-05-26', end: '2026-05-29', cfp: '2025年11月20日', notice: '2026年01月30日', reg: '2026年03月31日', hold: '2026年05月26-29日', title: '2026年第73届美国运动医学会年会 (ACSM Annual Meeting 2026)', shortTitle: 'ACSM 2026 美国运动医学年会', type: '国际顶级会议', level: 'intl', loc: '美国盐湖城 (Salt Lake City)', host: 'American College of Sports Medicine (ACSM)', status: '国际顶会回顾', url: 'https://www.medicalconfs.com/md/13136', featured: 0 },
    { start: '2026-05-22', end: '2026-05-24', cfp: '2026年04月10日', notice: '2026年04月30日', reg: '2026年05月15日', hold: '2026年05月22-24日', title: '2026年全国体育社会科学大会', shortTitle: '2026全国体育社会科学大会', type: '国家级分会年会', level: 'national', loc: '浙江杭州·浙江大学', host: '中国体育科学学会体育社会科学分会 / 浙江大学教育学院', status: '年度重点回顾', url: 'https://www.51huiyi.org/Web/Page?_pid=conf&cid=3a2011ac-7d52-36e7-a720-f065b5e2f4a1', featured: 0 },
    { start: '2027-07-06', end: '2027-07-09', cfp: '2027年02月15日', notice: '2027年04月01日', reg: '2027年05月01日', hold: '2027年07月06-09日', title: '第32届欧洲体育科学学会年会 (ECSS Manchester 2027)', shortTitle: 'ECSS 2027 曼彻斯特年会', type: '国际顶级会议', level: 'intl', loc: '英国曼彻斯特 (Manchester)', host: 'European College of Sport Science (ECSS)', status: '2027国际顶会预告', url: 'https://sport-science.org/', featured: 1 }
  ];

  function setTxt(el, val) {
    if (el && el.textContent !== val) el.textContent = val;
  }

  function getS() { try { if (typeof S !== 'undefined' && Array.isArray(S)) return S; } catch (e) {} return Array.isArray(window.S) ? window.S : null; }
  function getP() { try { if (typeof NOPSS_SPORTS_PROJECTS !== 'undefined' && Array.isArray(NOPSS_SPORTS_PROJECTS)) return NOPSS_SPORTS_PROJECTS; } catch (e) {} return Array.isArray(window.NOPSS_SPORTS_PROJECTS) ? window.NOPSS_SPORTS_PROJECTS : null; }

  var _cachedRefToday = '';
  function getRefTodayStr() {
    if (_cachedRefToday) return _cachedRefToday;
    var d = new Date();
    _cachedRefToday = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    return _cachedRefToday;
  }

  function calcDiffDays(targetDateStr, refDateStr) {
    var t1 = new Date(targetDateStr + 'T00:00:00').getTime(), t0 = new Date(refDateStr + 'T00:00:00').getTime();
    return (isNaN(t1) || isNaN(t0)) ? 0 : Math.round((t1 - t0) / 86400000);
  }

  function addCalendarEvent(ev) {
    if (!ev || !ev.title || !ev.start) return;
    var exists = CALENDAR_EVENTS.some(function(x) { return x.start === ev.start && (x.title.indexOf(ev.title.slice(0, 8)) >= 0 || ev.title.indexOf(x.title.slice(0, 8)) >= 0); });
    if (!exists) {
      CALENDAR_EVENTS.push(ev);
    }
  }

  function downloadICS(ev) {
    function parseDay(value) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
      var date = new Date(value + 'T00:00:00Z');
      return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null;
    }
    function escapeText(value) {
      return String(value || '').replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
    }
    function foldLine(line) {
      var parts = [], part = '', bytes = 0, encoder = new TextEncoder();
      Array.from(line).forEach(function(ch) {
        var size = encoder.encode(ch).length;
        if (bytes + size > 75) { parts.push(part); part = ' '; bytes = 1; }
        part += ch; bytes += size;
      });
      parts.push(part);
      return parts.join('\r\n');
    }
    var start = parseDay(ev.start), end = parseDay(ev.end || ev.start);
    if (!start || !end || end < start || !ev.title) {
      showToast('会议日期不完整，暂不能导出，请查看官方通知');
      return;
    }
    // RFC 5545: an all-day DTEND is exclusive, so include the final meeting day.
    end.setUTCDate(end.getUTCDate() + 1);
    var dtStart = start.toISOString().slice(0, 10).replace(/-/g, '');
    var dtEnd = end.toISOString().slice(0, 10).replace(/-/g, '');
    var identity = ev.title + '|' + ev.start + '|' + (ev.loc || ''), uid = 2166136261;
    for (var i = 0; i < identity.length; i++) uid = Math.imul(uid ^ identity.charCodeAt(i), 16777619);
    var stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
    var description = '主办/来源：' + (ev.host || '体育学人学术日历') + ' | 状态：' + (ev.status || '学术会议') + (ev.url ? ' | 链接：' + ev.url : '');
    var lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//CSSD 体育学人//Academic Calendar//CN','CALSCALE:GREGORIAN','BEGIN:VEVENT',
      'UID:cssd-' + (uid >>> 0).toString(16) + '@tiyuxueren.com','DTSTAMP:' + stamp,
      'DTSTART;VALUE=DATE:' + dtStart,'DTEND;VALUE=DATE:' + dtEnd,'SUMMARY:' + escapeText(ev.title),
      'LOCATION:' + escapeText(ev.loc || ev.host || '详见会议通知'),'DESCRIPTION:' + escapeText(description),'END:VEVENT','END:VCALENDAR'];
    var ics = lines.map(foldLine).join('\r\n') + '\r\n';
    var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    var a = document.createElement('a'), blobUrl = URL.createObjectURL(blob);
    a.href = blobUrl; a.download = '体育学术日历_' + ev.title.slice(0, 16).replace(/[<>:"/\\|?*]/g, '_') + '.ics'; a.click();
    setTimeout(function() { URL.revokeObjectURL(blobUrl); }, 10000);
    showToast('已导出日历文件 (.ics)，可直接添加至手机或电脑日历提醒');
  }

  // 1. 幂等单次执行的动态卡片字号对齐与未来会议标注
  function unifyPageTypography() {
    var refToday = getRefTodayStr();
    var exactDateRx = /^202\d-\d{2}-\d{2}$/;
    var containers = document.querySelectorAll('#vw-xuejie, #vw-news, [class*="xuejie"], [class*="daily"], [class*="dyn"], #vw-home');
    var allEls = [];
    if (containers.length) {
      for (var cIdx = 0; cIdx < containers.length; cIdx++) {
        var subEls = containers[cIdx].querySelectorAll('span:not([data-cssd-done]), time:not([data-cssd-done]), small:not([data-cssd-done]), div:not([data-cssd-done])');
        for (var sIdx = 0; sIdx < subEls.length; sIdx++) allEls.push(subEls[sIdx]);
      }
    } else {
      allEls = document.body.querySelectorAll('span:not([data-cssd-done]), time:not([data-cssd-done]), small:not([data-cssd-done])');
    }

    for (var i = 0; i < allEls.length; i++) {
      var node = allEls[i];
      if (node.children.length > 0 || node.getAttribute('data-cssd-done') === '1') continue;
      if (node.closest('#cssd-home-projects-showcase') || node.closest('#cssd-academic-calendar-bar') || node.closest('#cssd-custom-modal') || node.closest('#homeXuejie')) {
        node.setAttribute('data-cssd-done', '1');
        continue;
      }

      var txt = (node.textContent || '').trim();
      if (!exactDateRx.test(txt)) continue;
      if (node.parentElement && /更新于|最后更新/.test(node.parentElement.textContent || '')) {
        node.setAttribute('data-cssd-done', '1');
        continue;
      }
      var rawDate = txt;

      var card = node.parentElement;
      for (var up = 0; up < 5 && card && card !== document.body; up++) {
        var cTxt = (card.textContent || '').trim();
        var cleanLen = cTxt.replace(/\s+/g, '').length;
        var dateMatches = cTxt.match(/202\d-\d{2}-\d{2}/g) || [];
        if (dateMatches.length > 1) break;
        // 完整单张卡片去空白后至少 24 个字符（仅含「会议+日期」的顶部小行只有 12 个字符，必须继续向上找完整卡片）
        if (dateMatches.length === 1 && cleanLen >= 24 && card.children.length >= 2) break;
        if (card.parentElement) {
          var pTxt = (card.parentElement.textContent || '').trim();
          if ((pTxt.match(/202\d-\d{2}-\d{2}/g) || []).length > 1) break;
        }
        card = card.parentElement;
      }
      if (!card || card === document.body || (card.textContent || '').replace(/\s+/g, '').length > 360) continue;

      var cands = card.querySelectorAll('h1,h2,h3,h4,h5,a,div,p,span');
      var titleEl = null, maxLen = 0, badgeTxt = '', sourceEl = null;

      for (var k = 0; k < cands.length; k++) {
        var el = cands[k];
        if (el === node || el.contains(node)) continue;
        var hasBlk = false;
        for (var c = 0; c < el.children.length; c++) {
          if (/^(DIV|P|H1|H2|H3|H4|H5|UL|LI)$/.test(el.children[c].tagName)) { hasBlk = true; break; }
        }
        if (hasBlk) continue;
        var t = (el.textContent || '').trim();
        if (!t || t === rawDate || t.indexOf('🗓️') >= 0 || t.indexOf('📢') >= 0 || t.indexOf('📖') >= 0) continue;
        if (/^(会议|活动|讲座|征文|通知|资讯|期刊|院校|公告)$/.test(t)) {
          badgeTxt = t;
          el.style.setProperty('font-size', '12px', 'important');
          el.style.setProperty('line-height', '16px', 'important');
          el.style.setProperty('font-weight', '600', 'important');
          el.style.setProperty('font-family', SANS, 'important');
          continue;
        }
        if (t.length > maxLen) { maxLen = t.length; titleEl = el; }
      }

      if (!titleEl || maxLen < 6) continue;
      node.setAttribute('data-cssd-done', '1');
      var rawTitle = (titleEl.textContent || '').trim();

      for (var m = 0; m < cands.length; m++) {
        var sub = cands[m];
        if (sub === titleEl || sub === node || sub.contains(titleEl) || sub.contains(node) || sub.children.length > 0) continue;
        var st = (sub.textContent || '').trim();
        if (st && !/^(会议|活动|讲座|征文|通知|资讯|期刊|院校|公告)$/.test(st) && st !== rawDate && st.indexOf('🗓️') < 0 && st.indexOf('📢') < 0 && st.indexOf('📖') < 0) {
          sourceEl = sub;
        }
      }

      var endDayMatch = rawTitle.match(/时间[：:]\s*[-—~至]?(\d{1,2})日/);
      var locMatch = rawTitle.match(/地点[：:]\s*([^\s]+)/);
      var extractedEndDay = endDayMatch ? endDayMatch[1].padStart(2, '0') : '';
      var extractedLoc = locMatch ? locMatch[1].trim() : '';

      var cleanTitle = rawTitle
        .replace(/\s*时间[：:][^\s]*.*$/, '')
        .replace(/\s*地点[：:][^\s]*.*$/, '')
        .replace(/\s*时[间：:…\.\s]*$/, '')
        .trim();
      if (!cleanTitle || cleanTitle.length < 5) cleanTitle = rawTitle;
      setTxt(titleEl, cleanTitle);
      titleEl.setAttribute('title', rawTitle);

      titleEl.style.setProperty('font-size', '16px', 'important');
      titleEl.style.setProperty('line-height', '24px', 'important');
      titleEl.style.setProperty('font-weight', '600', 'important');
      titleEl.style.setProperty('font-style', 'normal', 'important');
      titleEl.style.setProperty('font-family', SANS, 'important');
      titleEl.style.setProperty('white-space', 'nowrap', 'important');
      titleEl.style.setProperty('overflow', 'hidden', 'important');
      titleEl.style.setProperty('text-overflow', 'ellipsis', 'important');
      titleEl.style.setProperty('display', 'block', 'important');
      titleEl.style.setProperty('margin', '8px 0 4px 0', 'important');

      var diffDays = calcDiffDays(rawDate, refToday);
      var isFutureOrConf = (diffDays > 0) || !!extractedEndDay || !!extractedLoc || (/征文通知|研讨会|学术论坛|学术交流会|关于召开/.test(rawTitle) && diffDays >= 0);
      var hostName = sourceEl ? (sourceEl.textContent || '').trim() : '体育院校';
      var endFullDate = extractedEndDay ? (rawDate.slice(0, 8) + extractedEndDay) : rawDate;

      if (isFutureOrConf) {
        var dateRangeDisp = extractedEndDay ? (rawDate + '~' + extractedEndDay + '日') : rawDate;
        var countTag = diffDays > 0 ? (' · 距今' + diffDays + '天') : (diffDays === 0 ? ' · 今日举办' : '');
        var prefix = /征文|征稿/.test(rawTitle) ? '🗓️ 会议举办期(征文中)：' : '🗓️ 会议举办日期：';
        setTxt(node, prefix + dateRangeDisp + countTag);
        node.style.setProperty('font-size', '12px', 'important');
        node.style.setProperty('line-height', '16px', 'important');
        node.style.setProperty('font-family', SANS, 'important');
        node.style.setProperty('font-variant-numeric', 'tabular-nums', 'important');
        node.style.setProperty('color', '#c2410c', 'important');
        node.style.setProperty('background', '#fff7ed', 'important');
        node.style.setProperty('border', '1px solid #fed7aa', 'important');
        node.style.setProperty('padding', '2px 8px', 'important');
        node.style.setProperty('border-radius', '4px', 'important');
        node.style.setProperty('font-weight', '600', 'important');

        if (sourceEl) {
          setTxt(sourceEl, hostName + (extractedLoc ? (' · 📍 会议地点：' + extractedLoc) : '') + ' · ⏳ 未来会议日程');
          sourceEl.style.setProperty('font-size', '12px', 'important');
          sourceEl.style.setProperty('line-height', '16px', 'important');
          sourceEl.style.setProperty('font-family', SANS, 'important');
        }

        addCalendarEvent({
          start: rawDate,
          end: endFullDate,
          title: cleanTitle,
          type: /征文|征稿/.test(rawTitle) ? '征文/会议' : '学术会议',
          level: 'provincial',
          loc: extractedLoc || hostName,
          host: hostName,
          status: diffDays > 0 ? ('距举办 ' + diffDays + ' 天') : '近期举办',
          featured: 0
        });
      } else {
        var pubPrefix = badgeTxt === '期刊' ? '📖 期刊发表：' : '📢 发布日期：';
        setTxt(node, pubPrefix + rawDate);
        node.style.setProperty('font-size', '12px', 'important');
        node.style.setProperty('line-height', '16px', 'important');
        node.style.setProperty('font-variant-numeric', 'tabular-nums', 'important');
        node.style.setProperty('font-family', SANS, 'important');
        if (sourceEl) {
          sourceEl.style.setProperty('font-size', '12px', 'important');
          sourceEl.style.setProperty('line-height', '16px', 'important');
          sourceEl.style.setProperty('font-family', SANS, 'important');
        }
      }
    }
  }

  // 2. 【⌘K / Ctrl+K 全站学术快搜指挥台 (Command Palette)】
  function showCommandPalette() {
    tryEnrichDatasets();
    var html = '<div style="margin-bottom:16px;">' +
      '<input type="search" id="cmd-q" class="c-inp" style="width:100%;font-size:16px!important;line-height:24px!important;padding:12px 16px;" placeholder="输入学者姓名、拼音首字母、高校名称、2026国家社科/教育部课题关键词或学术会议...">' +
      '<div class="c-fx" style="margin-top:8px;">' +
        '<span style="font-size:12px;line-height:16px;color:#52525b!important;">快捷直达：</span>' +
        '<button type="button" class="cssd-cite-btn cmd-quick" data-act="nssfc">🇨🇳 2026国家社科专刊</button>' +
        '<button type="button" class="cssd-cite-btn cmd-quick" data-act="moe">🏅 2026教育部108项专刊</button>' +
        '<button type="button" class="cssd-cite-btn cmd-quick" data-act="cal">📅 体育学术会议日历</button>' +
        '<button type="button" class="cssd-cite-btn cmd-quick" data-act="rank">🏆 全国高校立项榜 TOP25</button>' +
        '<button type="button" class="cssd-cite-btn cmd-quick" data-act="ana">📊 中国体育学学科全景看板</button>' +
      '</div></div>' +
      '<div id="cmd-results" style="max-height:56vh;overflow-y:auto;display:flex;flex-direction:column;gap:12px;"></div>';

    openModal('🔍 全站学术快搜指挥台 (Command Palette · 快捷键 Ctrl+K / ⌘K)', html, function(body) {
      var inp = body.querySelector('#cmd-q'), resBox = body.querySelector('#cmd-results');
      setTimeout(function() { inp.focus(); }, 50);

      body.querySelectorAll('.cmd-quick').forEach(function(b) {
        b.onclick = function() {
          var act = b.getAttribute('data-act');
          if (act === 'nssfc') show2026PortalModal('nssfc', 'list');
          else if (act === 'moe') show2026PortalModal('moe', 'list');
          else if (act === 'cal') showAcademicCalendarModal();
          else if (act === 'rank') showRanking();
          else if (act === 'ana') showAnalytics();
        };
      });

      function runCmdSearch() {
        var q = (inp.value || '').trim().toLowerCase();
        var scholars = getS() || [];
        var nssfcList = getNSSFC2026Data().list;

        var matchedSch = scholars.filter(function(s) {
          if (!q) return s.hats && s.hats.length > 0;
          return ((s.n || '') + ' ' + (s.e || '') + ' ' + (s.institution || s.s || '') + ' ' + (s.dL || '') + ' ' + (s.r || '')).toLowerCase().indexOf(q) >= 0;
        }).slice(0, 6);

        var matchedNssfc = nssfcList.filter(function(r) {
          if (!q) return r.pType === '重点项目';
          return (r.title + ' ' + r.leader + ' ' + r.unit + ' ' + r.disc + ' ' + r.code).toLowerCase().indexOf(q) >= 0;
        }).slice(0, 5);

        var matchedMoe = MOE_2026.filter(function(r) {
          if (!q) return r[0] <= 1365;
          return (r[2] + ' ' + r[4] + ' ' + r[5] + ' ' + r[6]).toLowerCase().indexOf(q) >= 0;
        }).slice(0, 5);

        var schHtml = '<div style="background:#fafafa!important;border:1px solid #e4e4e7;border-radius:8px;padding:12px;">' +
          '<div style="font-size:12px;line-height:16px;font-weight:600;color:#52525b!important;margin-bottom:8px;">👤 体育学者匹配 (' + matchedSch.length + ' 条预览 · 点击直达学者档案)</div>' +
          (matchedSch.map(function(s) {
            var pCnt = s.projectCount || (s.fundedProjects ? s.fundedProjects.length : 0);
            return '<div class="c-fxb cmd-go-sch" data-kw="' + s.n + '" style="padding:8px;border-radius:4px;background:#ffffff!important;border:1px solid #f4f4f5;margin-bottom:4px;cursor:pointer;">' +
              '<div><b style="font-size:14px;line-height:20px;color:#0f172a!important;">' + s.n + '</b> <span style="font-size:12px;line-height:16px;color:#52525b!important;">' + (s.institution || s.s || '') + ' · ' + (s.dL || '体育学') + '</span></div>' +
              '<span class="c-bdg b-gen" style="font-variant-numeric:tabular-nums;">课题 ' + pCnt + ' 项 →</span></div>';
          }).join('') || '<div style="font-size:12px;color:#52525b!important;">无匹配学者</div>') + '</div>';

        var projHtml = '<div style="background:#fafafa!important;border:1px solid #e4e4e7;border-radius:8px;padding:12px;">' +
          '<div style="font-size:12px;line-height:16px;font-weight:600;color:#52525b!important;margin-bottom:8px;">📚 2026 国家社科 & 教育部课题匹配 (点击复制标准引文)</div>' +
          matchedNssfc.map(function(r) {
            return '<div class="c-fxb" style="padding:8px;border-radius:4px;background:#ffffff!important;border:1px solid #f4f4f5;margin-bottom:4px;">' +
              '<div style="flex:1;min-width:200px;"><span class="c-bdg b-key" style="margin-right:8px;">国家社科·' + r.pType + '</span><b style="font-size:14px;line-height:20px;color:#0f172a!important;">' + r.title + '</b> <span style="font-size:12px;color:#52525b!important;">(' + r.leader + ' · ' + r.unit + ')</span></div>' +
              '<button type="button" class="cssd-cite-btn cmd-cite" data-a="' + r.leader + '" data-t="' + r.title.replace(/"/g, '&quot;') + '" data-u="' + r.unit + '" data-c="国家社科基金' + r.pType + '" data-no="' + r.code + '">📋 引文</button></div>';
          }).join('') +
          matchedMoe.map(function(r) {
            return '<div class="c-fxb" style="padding:8px;border-radius:4px;background:#ffffff!important;border:1px solid #f4f4f5;margin-bottom:4px;">' +
              '<div style="flex:1;min-width:200px;"><span class="c-bdg b-gen" style="margin-right:8px;">教育部·' + r[3] + '</span><b style="font-size:14px;line-height:20px;color:#0f172a!important;">' + r[2] + '</b> <span style="font-size:12px;color:#52525b!important;">(' + r[4] + ' · ' + r[5] + ')</span></div>' +
              '<button type="button" class="cssd-cite-btn cmd-cite" data-a="' + r[4] + '" data-t="' + r[2].replace(/"/g, '&quot;') + '" data-u="' + r[5] + '" data-c="教育部人文社科' + r[3] + '" data-no="公示序号' + r[0] + '">📋 引文</button></div>';
          }).join('') + '</div>';

        resBox.innerHTML = schHtml + projHtml;
        resBox.querySelectorAll('.cmd-go-sch').forEach(function(el) { el.onclick = function() { triggerSearch(el.getAttribute('data-kw')); }; });
        resBox.querySelectorAll('.cmd-cite').forEach(function(b) { b.onclick = function() { window.CSSDCitation.copy(b.getAttribute('data-a'), b.getAttribute('data-t'), b.getAttribute('data-u'), 2026, b.getAttribute('data-c'), b.getAttribute('data-no'), 'gbt'); }; });
      }

      inp.oninput = runCmdSearch;
      runCmdSearch();
    });
  }

  // 3. 【📅 全网体育学术会议与征文日历】涵盖中国体育科学学会、各大高校承办及 ECSS/ACSM 国际顶会
  function showAcademicCalendarModal() {
    unifyPageTypography();
    var refToday = getRefTodayStr();
    var html = '<div class="c-fxb" style="margin-bottom:16px;background:#fafafa!important;padding:12px 16px;border-radius:8px;border:1px solid #e4e4e7;">' +
      '<div class="c-fx" style="flex:1;min-width:220px;"><input type="search" id="cal-q" class="c-inp" placeholder="搜索会议名称、主办学会（如中国体育科学学会）、承办高校、举办城市..."></div>' +
      '<div class="c-fx" id="cal-filter-tabs">' +
        '<button type="button" class="cssd-tb-btn active" data-f="upcoming">🔥 近期与待开会议</button>' +
        '<button type="button" class="cssd-tb-btn" data-f="national">🏆 国家级/学会重点</button>' +
        '<button type="button" class="cssd-tb-btn" data-f="intl">🌐 国际顶会 (ECSS/ACSM)</button>' +
        '<button type="button" class="cssd-tb-btn" data-f="all">📅 全部收录 (' + CALENDAR_EVENTS.length + ')</button>' +
      '</div></div>' +
      '<div id="cal-modal-list" style="display:grid;grid-template-columns:1fr;gap:12px;max-height:62vh;overflow-y:auto;padding-right:4px;"></div>';

    openModal('体育学术会议日历（' + CALENDAR_EVENTS.length + ' 场）', html, function(body) {
      var listBox = body.querySelector('#cal-modal-list'), qInp = body.querySelector('#cal-q');
      var curFilter = 'upcoming';

      function renderCal() {
        var q = (qInp.value || '').trim().toLowerCase();
        var rows = CALENDAR_EVENTS.filter(function(ev) {
          var diff = calcDiffDays(ev.end || ev.start, refToday);
          if (curFilter === 'upcoming' && diff < -5) return false;
          if (curFilter === 'national' && ev.level !== 'national') return false;
          if (curFilter === 'intl' && ev.level !== 'intl') return false;
          if (q && (ev.title + ' ' + ev.loc + ' ' + ev.host + ' ' + ev.type).toLowerCase().indexOf(q) < 0) return false;
          return true;
        }).sort(function(a, b) {
          var da = calcDiffDays(a.end || a.start, refToday), db = calcDiffDays(b.end || b.start, refToday);
          var aFuture = da >= -2 ? 0 : 1, bFuture = db >= -2 ? 0 : 1;
          if (aFuture !== bFuture) return aFuture - bFuture;
          return aFuture === 0 ? a.start.localeCompare(b.start) : b.start.localeCompare(a.start);
        });

        listBox.innerHTML = rows.map(function(ev, idx) {
          var diff = calcDiffDays(ev.start, refToday);
          var badge = diff > 0
            ? '<span class="c-bdg b-key">⏳ 距举办 ' + diff + ' 天</span>'
            : (diff >= -3 ? '<span class="c-bdg b-yth">🟢 正在/近期举办</span>' : '<span class="c-bdg b-gen">📌 ' + (ev.status || '年度重点会议') + '</span>');
          var lvlBadge = ev.level === 'national'
            ? '<span class="c-bdg" style="background:#fef2f2!important;color:#dc2626!important;border:1px solid #fecaca;">🏆 ' + ev.type + '</span>'
            : (ev.level === 'intl' ? '<span class="c-bdg" style="background:#f0f9ff!important;color:#0284c7!important;border:1px solid #bae6fd;">🌐 ' + ev.type + '</span>' : '<span class="c-bdg b-my">' + ev.type + '</span>');
          var dateRange = (ev.end && ev.end !== ev.start) ? (ev.start + ' 至 ' + ev.end.slice(5)) : ev.start;
          var linkBtn = ev.url ? '<a href="' + ev.url + '" target="_blank" rel="noopener" class="cssd-cite-btn" style="text-decoration:none;padding:6px 10px;">🔗 官方通知/详情 ↗</a>' : '';
          return '<div class="c-card c-fxb" style="background:#ffffff!important;border:1px solid #e4e4e7!important;border-radius:16px;padding:16px;">' +
            '<div style="display:flex;align-items:center;gap:16px;flex:1;min-width:260px;">' +
              '<div style="min-width:76px;text-align:center;background:#fff7ed!important;border:1px solid #fed7aa;border-radius:8px;padding:8px;">' +
                '<div style="font-size:12px;line-height:16px;color:#9a3412!important;font-weight:600;font-variant-numeric:tabular-nums;">' + ev.start.slice(0, 7) + '</div>' +
                '<div style="font-size:20px;line-height:28px;font-weight:700;color:#ea580c!important;font-variant-numeric:tabular-nums;">' + ev.start.slice(8) + '日</div>' +
              '</div>' +
              '<div style="flex:1;min-width:200px;">' +
                '<div class="c-fx" style="margin-bottom:4px;">' + lvlBadge + badge + '<span style="font-size:12px;line-height:16px;color:#52525b!important;font-variant-numeric:tabular-nums;">🗓️ 会议举办期：' + dateRange + '</span></div>' +
                '<div style="font-size:16px!important;line-height:24px!important;font-weight:600!important;color:#0f172a!important;margin-bottom:4px;">' + ev.title + '</div>' +
                '<div style="font-size:14px;line-height:20px;color:#334155!important;">📍 举办城市/院校：<b style="color:#0f172a!important;font-weight:600;">' + ev.loc + '</b> · 🏛️ 主办/承办：' + ev.host + '</div>' +
              '</div>' +
            '</div>' +
            '<div class="c-fx">' + linkBtn + '<button type="button" class="cssd-tb-btn moe cal-dl-ics" data-idx="' + idx + '">📅 导出日历提醒 (.ics)</button></div>' +
          '</div>';
        }).join('') || '<div style="padding:24px;text-align:center;color:#52525b!important;font-size:14px;line-height:20px;">暂无匹配的学术会议</div>';

        listBox.querySelectorAll('.cal-dl-ics').forEach(function(b) {
          b.onclick = function() { downloadICS(rows[Number(b.getAttribute('data-idx'))]); };
        });
      }

      body.querySelectorAll('#cal-filter-tabs button').forEach(function(btn) {
        btn.onclick = function() {
          body.querySelectorAll('#cal-filter-tabs button').forEach(function(x) { x.classList.remove('active'); });
          btn.classList.add('active');
          curFilter = btn.getAttribute('data-f');
          renderCal();
        };
      });
      qInp.oninput = renderCal;
      renderCal();
    });
  }

  var _calCountdownTimer = null;
  var _activeCalIdx = 0;

  function placeConfCal(calSec) {
    if (!calSec) return;
    var xj = document.getElementById('homeXuejie');
    if (xj && xj.parentNode) {
      if (xj.nextElementSibling !== calSec) xj.parentNode.insertBefore(calSec, xj.nextSibling);
      return;
    }
    var grid = document.querySelector('#sportsPortal .sp-grid');
    if (grid && grid.parentNode) {
      if (grid.nextElementSibling !== calSec) grid.parentNode.insertBefore(calSec, grid.nextSibling);
    }
  }

  function mountAcademicCalendarBar() {
    var existingSec = document.getElementById('confcal');
    if (document.getElementById('cssd-academic-calendar-bar')) {
      placeConfCal(existingSec);
      return;
    }
    // The consolidated academic feed no longer renders the old 学界动态 heading.
    // Mount against the stable homepage anchor used by placeConfCal instead.
    if (!document.querySelector('#sportsPortal .sp-grid')) return;

    var featuredList = CALENDAR_EVENTS.slice(0, 10);
    var nConf = CALENDAR_EVENTS.length;
    /* 倒计时只读 CALENDAR_EVENTS，不借用学界动态 / academicnews */
    var calSec = document.createElement('section');
    calSec.id = 'confcal';
    calSec.className = 'cssd-cal-sec';
    calSec.setAttribute('aria-labelledby', 'confcalTitle');
    calSec.innerHTML =
      '<p class="cssd-cal-eye">SPORTS CONFERENCE CALENDAR</p>' +
      '<h2 id="confcalTitle">体育学术会议日历</h2>';
    placeConfCal(calSec);

    var bar = document.createElement('div');
    bar.id = 'cssd-academic-calendar-bar';
    bar.className = 'cssd-cal-bar';

    var tabsHtml = featuredList.map(function(ev, idx) {
      var activeCls = idx === _activeCalIdx ? 'active' : '';
      return '<button type="button" class="cssd-cal-tab ' + activeCls + '" data-idx="' + idx + '">' + (ev.shortTitle || ev.title.slice(0, 14)) + '</button>';
    }).join('');

    bar.innerHTML =
      '<div class="cssd-cal-tools">' +
        '<button type="button" class="cssd-cal-all" id="open-full-cal">查看全部 ' + nConf + ' 场国内外重点会议</button>' +
      '</div>' +
      '<div id="cssd-cal-tabs" class="cssd-cal-tabs" role="tablist" aria-label="点击标签切换重点会议倒计时与关键时间节点" title="点击标签切换重点会议倒计时与关键时间节点">' + tabsHtml + '</div>' +

      '<div class="cssd-cal-hero">' +
        '<div class="cssd-cal-hero-main">' +
          '<div id="cal-hero-badge" class="cssd-cal-badge"></div>' +
          '<h3 id="cal-hero-title" class="cssd-cal-hero-title"></h3>' +
          '<div id="cal-hero-host" class="cssd-cal-host"></div>' +
        '</div>' +
        '<div class="cssd-cal-switch">' +
          '<button type="button" id="cal-prev-btn" class="cssd-cal-navbtn">上一场</button>' +
          '<button type="button" id="cal-next-btn" class="cssd-cal-navbtn">下一场</button>' +
        '</div>' +
      '</div>' +
      '<div class="cssd-cal-meta">' +
        '<span id="cal-pill-time" class="cssd-cal-meta-item"></span>' +
        '<span id="cal-pill-loc" class="cssd-cal-meta-item"></span>' +
      '</div>' +
      '<div class="cssd-cal-acts">' +
        '<button type="button" id="cal-act-cfp" class="cssd-cal-act cssd-m6-act"><b>在线论文投稿</b><small>Abstract / CFP</small></button>' +
        '<button type="button" id="cal-act-reg" class="cssd-cal-act cssd-m6-act"><b>会议参会注册</b><small>Registration</small></button>' +
        '<button type="button" id="cal-act-ics" class="cssd-cal-act cssd-m6-act"><b>会议日程提醒</b><small>.ics</small></button>' +
        '<button type="button" id="cal-act-all" class="cssd-cal-act cssd-m6-act"><b>全网重点会议总览</b><small>All ' + nConf + ' Conferences</small></button>' +
      '</div>' +
      '<div class="cssd-cal-grid">' +
        '<div class="cssd-cal-count">' +
          '<div class="cssd-cal-count-kicker">距开幕<span>Countdown</span></div>' +
          '<div class="cssd-cal-digits">' +
            '<div><div id="cd-d" class="cal-digit">00</div><div class="cal-unit">天</div></div>' +
            '<div><div id="cd-h" class="cal-digit">00</div><div class="cal-unit">时</div></div>' +
            '<div><div id="cd-m" class="cal-digit">00</div><div class="cal-unit">分</div></div>' +
            '<div><div id="cd-s" class="cal-digit">00</div><div class="cal-unit">秒</div></div>' +
          '</div>' +
        '</div>' +
        '<div class="cssd-cal-nodes">' +
          '<div class="cal-node cal-node--cfp" hidden><div class="t">征文投稿截止</div><div id="cal-node-cfp" class="cssd-cal-node-date"></div></div>' +
          '<div class="cal-node cal-node--accept" hidden><div class="t">录用通知发布</div><div id="cal-node-notice" class="cssd-cal-node-date"></div></div>' +
          '<div class="cal-node cal-node--reg" hidden><div class="t">注册缴费 / 报到</div><div id="cal-node-reg" class="cssd-cal-node-date"></div></div>' +
          '<div class="cal-node cal-node--event" hidden><div class="t">会议正式举办</div><div id="cal-node-hold" class="cssd-cal-node-date"></div></div>' +
        '</div>' +
      '</div>';

    calSec.appendChild(bar);

    function updateCountdownDigits() {
      var ev = featuredList[_activeCalIdx] || featuredList[0];
      var ids = ['#cd-d', '#cd-h', '#cd-m', '#cd-s'];
      if (!ev || !ev.start) {
        ids.forEach(function(id){ setTxt(bar.querySelector(id), '—'); });
        return;
      }
      var targetMs = new Date(ev.start + 'T09:00:00').getTime();
      if (isNaN(targetMs)) {
        ids.forEach(function(id){ setTxt(bar.querySelector(id), '—'); });
        return;
      }
      var nowMs = Date.now();
      var diffSec = Math.max(0, Math.floor((targetMs - nowMs) / 1000));
      var d = Math.floor(diffSec / 86400);
      var h = Math.floor((diffSec % 86400) / 3600);
      var m = Math.floor((diffSec % 3600) / 60);
      var s = diffSec % 60;
      setTxt(bar.querySelector('#cd-d'), String(d).padStart(2, '0'));
      setTxt(bar.querySelector('#cd-h'), String(h).padStart(2, '0'));
      setTxt(bar.querySelector('#cd-m'), String(m).padStart(2, '0'));
      setTxt(bar.querySelector('#cd-s'), String(s).padStart(2, '0'));
    }

    function showCalNode(sel, value) {
      var el = bar.querySelector(sel);
      var node = el ? el.closest('.cal-node') : null;
      var text = String(value || '').trim();
      if (!text || text === '—' || /^待定|详见|未知|TBD$/i.test(text)) {
        if (node) node.hidden = true;
        if (el) setTxt(el, '');
        return;
      }
      if (node) node.hidden = false;
      setTxt(el, text);
    }

    function selectConf(idx) {
      _activeCalIdx = (idx + featuredList.length) % featuredList.length;
      var ev = featuredList[_activeCalIdx];
      bar.querySelectorAll('.cssd-cal-tab').forEach(function(btn, bIdx) {
        var on = bIdx === _activeCalIdx;
        btn.classList.toggle('active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      setTxt(bar.querySelector('#cal-hero-badge'), (ev.type || '') + (ev.status ? ' · ' + ev.status : ''));
      setTxt(bar.querySelector('#cal-hero-title'), ev.title);
      setTxt(bar.querySelector('#cal-hero-host'), ev.host ? ('主办 / 承办：' + ev.host) : '');
      var when = ev.hold || ((ev.start && ev.end) ? (ev.start + ' ~ ' + ev.end) : (ev.start || ''));
      setTxt(bar.querySelector('#cal-pill-time'), when ? ('时间　' + when) : '');
      setTxt(bar.querySelector('#cal-pill-loc'), ev.loc ? ('地点　' + ev.loc) : '');
      showCalNode('#cal-node-cfp', ev.cfp);
      showCalNode('#cal-node-notice', ev.notice);
      showCalNode('#cal-node-reg', ev.reg);
      showCalNode('#cal-node-hold', ev.hold);
      updateCountdownDigits();
    }

    bar.querySelectorAll('.cssd-cal-tab').forEach(function(btn) {
      btn.onclick = function() { selectConf(Number(btn.getAttribute('data-idx'))); };
    });
    bar.querySelector('#cal-prev-btn').onclick = function() { selectConf(_activeCalIdx - 1); };
    bar.querySelector('#cal-next-btn').onclick = function() { selectConf(_activeCalIdx + 1); };
    bar.querySelector('#open-full-cal').onclick = showAcademicCalendarModal;
    bar.querySelector('#cal-act-all').onclick = showAcademicCalendarModal;
    bar.querySelector('#cal-act-ics').onclick = function() { downloadICS(featuredList[_activeCalIdx]); };
    bar.querySelector('#cal-act-cfp').onclick = function() {
      var ev = featuredList[_activeCalIdx];
      if (ev.url) window.open(ev.url, '_blank', 'noopener');
      else showAcademicCalendarModal();
    };
    bar.querySelector('#cal-act-reg').onclick = function() {
      var ev = featuredList[_activeCalIdx];
      if (ev.url) window.open(ev.url, '_blank', 'noopener');
      else showAcademicCalendarModal();
    };

    selectConf(_activeCalIdx);
    clearInterval(_calCountdownTimer);
    _calCountdownTimer = setInterval(updateCountdownDigits, 1000);
  }

  function inferDisc(t) {
    t = String(t || '');
    if (/民族|非遗|武术|传统体育|民俗|太极|气功|龙舟|红拳|八段锦|甲骨文|共同体/.test(t)) return '民族传统体育学';
    if (/脑|神经|基因|蛋白|代谢|细胞|分子|生理|生化|生物力学|肌少症|糖尿病|血压|心率|体态|脊柱|骨|认知|抑郁|注意|多模态|运动干预|处方|康复|体质监测|睡眠|有氧/.test(t)) return '运动人体科学';
    if (/教学|课程|体育教师|运动员|训练|技战术|体能|班级联赛|基本运动技能|体育活动|体教|学业|裁判|专项|体校/.test(t)) return '体育教育训练学';
    return '体育人文社会学';
  }

  function inferProv(u, fb) {
    if (fb && fb.length >= 2 && fb !== '2026') return fb;
    u = String(u || '');
    var mp = [['北京','北京'],['上海','上海'],['天津','天津'],['重庆','重庆'],['广东','广东'],['广州','广东'],['深圳','广东'],['珠海','广东'],['韩山','广东'],['江苏','江苏'],['南京','江苏'],['苏州','江苏'],['常州','江苏'],['徐州','江苏'],['河海','江苏'],['淮阴','江苏'],['浙江','浙江'],['杭州','浙江'],['宁波','浙江'],['温州','浙江'],['湖州','浙江'],['台州','浙江'],['山东','山东'],['济南','山东'],['青岛','山东'],['曲阜','山东'],['潍坊','山东'],['临沂','山东'],['济宁','山东'],['湖北','湖北'],['武汉','湖北'],['华中','湖北'],['中南民族','湖北'],['湖南','湖南'],['长沙','湖南'],['中南大学','湖南'],['衡阳','湖南'],['湘南','湖南'],['吉首','湖南'],['四川','四川'],['成都','四川'],['西南','四川'],['陕西','陕西'],['西安','陕西'],['河南','河南'],['郑州','河南'],['安阳','河南'],['福建','福建'],['厦门','福建'],['福州','福建'],['闽江','福建'],['辽宁','辽宁'],['沈阳','辽宁'],['大连','辽宁'],['吉林','吉林'],['东北师','吉林'],['黑龙江','黑龙江'],['哈尔滨','黑龙江'],['安徽','安徽'],['安庆','安徽'],['淮南','安徽'],['江西','江西'],['河北','河北'],['燕山','河北'],['山西','山西'],['太原','山西'],['广西','广西'],['云南','云南'],['贵州','贵州'],['内蒙古','内蒙古'],['新疆','新疆'],['甘肃','甘肃'],['西北师','甘肃']];
    for (var i = 0; i < mp.length; i++) if (u.indexOf(mp[i][0]) >= 0) return mp[i][1];
    return '全国';
  }

  // 4. 提取并实时构建【2026国家社科基金·体育学专刊】（纯体育学与重点项目优先置顶排序）
  var _nssfcCache = null;
  function getNSSFC2026Data() {
    var projects = getP() || [], scholars = getS() || [];
    if (_nssfcCache && _nssfcCache.rawLen === projects.length && _nssfcCache.fromReal && _nssfcCache.list.length > 0) return _nssfcCache;
    var seen = new Set(), list = [];
    var sportsKwRx = /体育|运动|健身|武术|赛事|奥运|奥林匹克|球|体质|体卫|体医|体教|体旅|文体旅|户外|冰雪|太极|气功|龙舟|红拳|八段锦|训练|竞赛|康复|肌少症|场馆|兴奋剂|身体活动|体能/;

    function addRec(code, pType, title, leader, unit, prov, disc) {
      var ct = String(title || '').trim();
      if (!ct || seen.has(ct)) return;
      seen.add(ct);
      var cat = String(pType || '一般项目').trim();
      cat = cat.indexOf('重点') >= 0 ? '重点项目' : (cat.indexOf('青年') >= 0 ? '青年项目' : (cat.indexOf('西部') >= 0 ? '西部项目' : (cat.indexOf('重大') >= 0 ? '重大项目' : (cat.indexOf('后期') >= 0 ? '后期资助项目' : '一般项目'))));
      var cc = String(code || '').trim() || ('2026-序号' + (list.length + 1)), m = cc.match(/(\d+)$/), cu = String(unit || '').trim() || '高校/科研院所';
      var isSportsTitle = sportsKwRx.test(ct);
      list.push({
        seq: m ? Number(m[1]) : (list.length + 1),
        code: cc,
        title: ct,
        pType: cat,
        leader: String(leader || '').trim() || '课题负责人',
        unit: cu,
        disc: disc || inferDisc(ct),
        prov: inferProv(cu, prov),
        prio: (isSportsTitle ? 0 : 100) + (cat === '重点项目' ? 0 : (cat === '一般项目' ? 10 : (cat === '青年项目' ? 20 : 30)))
      });
    }
    for (var i = 0; i < projects.length; i++) {
      var p = projects[i], yr = String(p.year || p.y || ''), cd = String(p.code || p.projectNo || p.id || ''), uSys = String(p.unitSystem || p.source || ''), tp = String(p.category || p.type || '');
      if (cd.indexOf('教育部') >= 0 || uSys.indexOf('教育部') >= 0 || tp.indexOf('教育部') >= 0) continue;
      if (yr === '2026' || cd.indexOf('2026') === 0 || cd.indexOf('26') === 0) {
        var ldr = p.leader || p.pi || p.applicant || p.name || ((!isNaN(Number(p.approvedDate)) ? '' : p.approvedDate)) || '';
        addRec(cd, tp, p.title || p.name, ldr, p.unit || p.institution || p.org || '', p.province || '', '');
      }
    }
    for (var j = 0; j < scholars.length; j++) {
      var s = scholars[j], fps = s.fundedProjects;
      if (!Array.isArray(fps)) continue;
      for (var k = 0; k < fps.length; k++) {
        var fp = fps[k], fyr = String(fp.year || ''), fcd = String(fp.code || ''), fcat = String(fp.category || fp.type || '');
        if (fcd.indexOf('教育部') >= 0 || fcat.indexOf('教育部') >= 0) continue;
        if (fyr === '2026' || fcd.indexOf('2026') === 0) addRec(fcd, fcat, fp.title, s.n, fp.unit || s.institution || s.s, '', s.dL || '');
      }
    }
    var fromReal = list.length > 0;
    if (!fromReal) NSSFC_SEED.forEach(function(sd) { addRec(sd[0], sd[1], sd[2], sd[3], sd[4], sd[6], sd[5]); });
    list.sort(function(a, b) { return a.prio - b.prio || a.seq - b.seq; });

    var total = list.length || 1, catMap = { '重点项目': 0, '一般项目': 0, '青年项目': 0, '西部项目': 0, '其他项目': 0 }, unitMap = {};
    list.forEach(function(it) {
      if (catMap[it.pType] !== undefined) catMap[it.pType]++; else catMap['其他项目']++;
      if (!unitMap[it.unit]) unitMap[it.unit] = { name: it.unit, count: 0, key: 0, gen: 0, youth: 0, west: 0 };
      var u = unitMap[it.unit]; u.count++;
      if (it.pType === '重点项目') u.key++; else if (it.pType === '一般项目') u.gen++; else if (it.pType === '青年项目') u.youth++; else if (it.pType === '西部项目') u.west++;
    });
    var unitList = Object.values(unitMap).sort(function(a, b) { return b.count - a.count || b.key - a.key; });
    var top25 = unitList.slice(0, 25).map(function(u) {
      return { name: u.name, count: u.count, pct: ((u.count / total) * 100).toFixed(1) + '%', detail: [u.key ? '重点' + u.key : '', u.gen ? '一般' + u.gen : '', u.youth ? '青年' + u.youth : '', u.west ? '西部' + u.west : ''].filter(Boolean).join(' / ') };
    });
    var themes = THEME_RULES.map(function(r) {
      var rx = new RegExp(r[1], 'i'), c = 0;
      for (var m = 0; m < list.length; m++) if (rx.test(list[m].title)) c++;
      return [r[0], c, ((c / total) * 100).toFixed(1) + '%', r[1]];
    }).sort(function(a, b) { return b[1] - a[1]; });
    _nssfcCache = { rawLen: projects.length, fromReal: fromReal, list: list, total: list.length, unitTotal: unitList.length, multiUnitCount: unitList.filter(function(u) { return u.count >= 2; }).length, catMap: catMap, top25: top25, themes: themes };
    return _nssfcCache;
  }

  // 5. 后台合入 108 项教育部项目 & 注入拼音首字母索引
  var _merged = false;
  function tryEnrichDatasets() {
    if (_merged) return true;
    var scholars = getS();
    if (!scholars || !scholars.length) return false;
    _merged = true; window.S = scholars;
    var projects = getP(); if (projects) window.NOPSS_SPORTS_PROJECTS = projects;
    var scholarMap = new Map();
    for (var i = 0; i < scholars.length; i++) {
      var s = scholars[i];
      scholarMap.set((s.n || '').trim() + '_' + (s.institution || s.s || '').trim(), s);
      if (s.e && !s._pyEnriched) {
        var tk = s.e.toLowerCase().split(/\s+/).filter(Boolean);
        s.e = s.e + ' ' + tk.map(function(w) { return w[0] || ''; }).join('') + ' ' + tk.join('');
        s._pyEnriched = true;
      }
    }
    var maxId = scholars.reduce(function(a, c) { var n = Number(c.id); return (!isNaN(n) && n > a) ? n : a; }, 10000);
    for (var j = 0; j < MOE_2026.length; j++) {
      var it = MOE_2026[j], code = it[0], subCat = it[1], title = it[2], pType = it[3], name = it[4], unit = it[5], dL = it[6], dC = it[7], prov = it[8];
      var pCode = '2026-教育部序号' + code, catFull = '教育部人文社科' + pType, sProj = { code: pCode, category: catFull, title: title, unit: unit, year: 2026 };
      var found = scholarMap.get(name + '_' + unit);
      if (found) {
        if (!Array.isArray(found.fundedProjects)) found.fundedProjects = [];
        if (!found.fundedProjects.some(function(p) { return p.title === title; })) { found.fundedProjects.push(sProj); found.projectCount = (found.projectCount || 0) + 1; }
        if (!Array.isArray(found.hats)) found.hats = [];
        if (found.hats.indexOf('2026教育部社科') < 0) found.hats.push('2026教育部社科');
      } else {
        maxId++;
        var ns = { id: maxId, n: name, e: name, institution: unit, s: unit, dept: '体育学院', title: pType.indexOf('青年') >= 0 ? '青年学者' : '教授/副教授', disc: dC, dL: dL, hats: ['2026教育部社科'], hon: ['2026教育部人文社科立项'], r: title, i: name ? name[0] : '学', c: '#2563eb', projectCount: 1, fundedProjects: [sProj] };
        scholars.push(ns); scholarMap.set(name + '_' + unit, ns);
      }
      if (projects) {
        projects.push({ year: 2026, y: 2026, code: pCode, category: pType.indexOf('青年') >= 0 ? '青年项目' : '规划基金项目', type: catFull, subject: '体育学', title: title, leader: name, pi: name, name: name, unit: unit, institution: unit, approvedDate: '2026', province: prov, outcome: subCat, unitSystem: '教育部人文社科项目', source: '教育部社科司', sourceUrl: '' });
      }
    }
    _nssfcCache = null;
    try {
      var nssfc = getNSSFC2026Data();
      document.querySelectorAll('.cssd-nssfc-cnt').forEach(function(el) { if (nssfc.total > 0) setTxt(el, '(' + nssfc.total + '项)'); });
      var hn = document.getElementById('cssd-hm-nssfc-num'), hs = document.getElementById('cssd-hm-nssfc-sub');
      if (hn) setTxt(hn, nssfc.total + ' 项');
      if (hs) setTxt(hs, '重点 ' + (nssfc.catMap['重点项目'] || 0) + ' · 一般 ' + (nssfc.catMap['一般项目'] || 0) + ' · 青年 ' + (nssfc.catMap['青年项目'] || 0) + ' · ' + nssfc.unitTotal + ' 家高校');
      if (typeof window._cssdRenderHomeShowcase === 'function') window._cssdRenderHomeShowcase();
    } catch (e) {}
    window.dispatchEvent(new Event('cssd:data-updated'));
    return true;
  }

  function showToast(msg) {
    var t = document.getElementById('cssd-toast');
    if (!t) { t = document.createElement('div'); t.id = 'cssd-toast'; document.body.appendChild(t); }
    t.textContent = msg; t.style.opacity = '1';
    clearTimeout(t._tm); t._tm = setTimeout(function() { t.style.opacity = '0'; }, 2200);
  }

  window.CSSDCitation = {
    copy: function(author, title, inst, year, cat, code, type) {
      var y = year || 2026, c = cat || '国家社科/教育部人文社科项目', cd = code ? ' (' + code + ')' : '';
      var txt = type === 'bib' ? '@techreport{CSSD_' + y + ',\n  author = {' + author + '},\n  title = {' + title + '},\n  institution = {' + inst + '},\n  year = {' + y + '},\n  type = {' + c + '}\n}' : author + '. ' + title + '[R]. ' + inst + ', ' + y + '. ' + c + cd + '.';
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(function() { showToast('已复制 ' + (type === 'bib' ? 'BibTeX' : 'GB/T 7714') + ' 标准引文'); });
      else prompt('请复制引文：', txt);
    }
  };

  function exportCSV(filename, hd, rows) {
    var blob = new Blob(['\uFEFF' + hd + '\n' + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click();
    showToast('已导出 ' + rows.length + ' 项课题数据 (CSV)');
  }

  function triggerSearch(kw) {
    var m = document.getElementById('cssd-custom-modal'); if (m) m.className = '';
    var tab = document.querySelector('[onclick*="scholars"], [data-vw="scholars"], #nav-scholars'); if (tab) tab.click();
    var qEl = document.getElementById('sp-scholars-q') || document.getElementById('q');
    if (qEl) {
      qEl.value = kw; qEl.dispatchEvent(new Event('input', { bubbles: true }));
      if (typeof window.spFilterScholarsLive === 'function') window.spFilterScholarsLive();
      else if (typeof window.renderSc === 'function') window.renderSc();
      qEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function openModal(title, html, onMount) {
    var m = document.getElementById('cssd-custom-modal');
    if (!m) { m = document.createElement('div'); m.id = 'cssd-custom-modal'; document.body.appendChild(m); }
    m.className = 'active';
    m.innerHTML = '<div class="cssd-c-content" style="background:#ffffff!important;color:#0f172a!important;"><div class="cssd-c-hd"><h3 style="color:#0f172a!important;font-size:18px!important;line-height:28px!important;font-weight:600!important;">' + title + '</h3><button type="button" class="cssd-c-close" id="cssd-c-close" style="color:#334155!important;">✕</button></div><div class="cssd-c-body" id="cssd-c-body" style="color:#0f172a!important;">' + html + '</div></div>';
    document.getElementById('cssd-c-close').onclick = function() { m.className = ''; };
    m.onclick = function(e) { if (e.target === m) m.className = ''; };
    if (onMount) onMount(document.getElementById('cssd-c-body'));
  }

  // 6. 【2026国家社科基金 & 2026教育部人文社科】双专刊一体化交互看板（修复类别标签与编号单行不换行）
  function show2026PortalModal(source, defaultTab) {
    tryEnrichDatasets();
    var isN = (source === 'nssfc'), nssfc = getNSSFC2026Data(), nTot = nssfc.total, totSafe = nTot || 1;
    var kC = nssfc.catMap['重点项目'] || 0, gC = nssfc.catMap['一般项目'] || 0, yC = nssfc.catMap['青年项目'] || 0, wC = nssfc.catMap['西部项目'] || 0;
    var swHtml = '<div class="c-fxb" style="margin-bottom:16px;background:#fafafa!important;padding:12px 16px;border-radius:8px;border:1px solid #e4e4e7;">' +
      '<div class="c-fx"><span style="font-size:14px;line-height:20px;font-weight:600;color:#334155!important;">切换 2026 立项专刊：</span>' +
      '<button type="button" id="sw-nssfc" class="cssd-tb-btn ' + (isN ? 'nssfc-active' : '') + '">🇨🇳 2026国家社科基金专刊 (' + nTot + '项)</button>' +
      '<button type="button" id="sw-moe" class="cssd-tb-btn ' + (!isN ? 'active' : '') + '">🏅 2026教育部人文社科专刊 (108项)</button></div>' +
      '<div class="c-fx"><button type="button" class="cssd-tb-btn active" id="p26-tab-list">📋 立项全名单</button>' +
      '<button type="button" class="cssd-tb-btn" id="p26-tab-stat">📊 统计分析报告</button>' +
      '<button type="button" class="cssd-tb-btn moe" id="p26-exp-btn">📥 导出 CSV</button></div></div>';

    var typeOpts = isN
      ? '<option value="">全部项目类别 (' + nTot + '项)</option><option value="重点项目">重点项目 (' + kC + '项 · ' + ((kC / totSafe) * 100).toFixed(1) + '%)</option><option value="一般项目">一般项目 (' + gC + '项 · ' + ((gC / totSafe) * 100).toFixed(1) + '%)</option><option value="青年项目">青年项目 (' + yC + '项 · ' + ((yC / totSafe) * 100).toFixed(1) + '%)</option><option value="西部项目">西部项目 (' + wC + '项 · ' + ((wC / totSafe) * 100).toFixed(1) + '%)</option>'
      : '<option value="">全部类型 (108项)</option><option value="规划基金项目">规划基金项目 (58项 · 53.7%)</option><option value="青年基金项目">青年基金项目 (50项 · 46.3%)</option><option value="西部和边疆地区">西部和边疆地区 (3项 · 2.8%)</option>';

    var kpiItems = isN
      ? [['#fafafa','#991b1b','#dc2626','2026国家社科总数',nTot+' 项','共 '+nssfc.unitTotal+' 家单位获批'],['#fafafa','#9a3412','#ea580c','重点项目',kC+' 项','占比 '+((kC/totSafe)*100).toFixed(1)+'%'],['#fafafa','#1e40af','#2563eb','一般项目',gC+' 项','占比 '+((gC/totSafe)*100).toFixed(1)+'%'],['#fafafa','#166534','#16a34a','青年项目',yC+' 项','占比 '+((yC/totSafe)*100).toFixed(1)+'%'],['#fafafa','#9d174d','#db2777','西部项目',wC+' 项','占比 '+((wC/totSafe)*100).toFixed(1)+'%']]
      : [['#fafafa','#1e40af','#1d4ed8','教育部立项总数','108 项','共 81 家单位获批'],['#fafafa','#166534','#15803d','规划基金项目','58 项','占比 53.7%'],['#fafafa','#854d0e','#a16207','青年基金项目','50 项','占比 46.3%'],['#fafafa','#9d174d','#be185d','西部和边疆项目','3 项','规划/青年 105 项(97.2%)']];
    var kpiHtml = kpiItems.map(function(k) { return '<div style="background:'+k[0]+'!important;border:1px solid #e4e4e7;padding:12px 16px;border-radius:8px;"><div style="font-size:12px;line-height:16px;font-weight:600;color:'+k[1]+'!important;">'+k[3]+'</div><div style="font-size:24px;line-height:32px;font-weight:700;font-variant-numeric:tabular-nums;color:'+k[2]+'!important;margin:4px 0;">'+k[4]+'</div><div style="font-size:12px;line-height:16px;color:#52525b!important;font-variant-numeric:tabular-nums;">'+k[5]+'</div></div>'; }).join('');

    var top25Rows = isN
      ? nssfc.top25.map(function(u, idx) { return '<tr class="p26-filter-unit" data-u="' + u.name + '" style="cursor:pointer;"><td style="color:#52525b!important;font-variant-numeric:tabular-nums;white-space:nowrap;">' + (idx + 1) + '</td><td><b style="color:#dc2626!important;font-weight:600;">' + u.name + '</b><div style="font-size:12px;line-height:16px;color:#52525b!important;">' + u.detail + '</div></td><td style="text-align:right;font-weight:600;color:#0f172a!important;font-variant-numeric:tabular-nums;white-space:nowrap;">' + u.count + ' 项</td><td style="text-align:right;color:#52525b!important;font-variant-numeric:tabular-nums;white-space:nowrap;">' + u.pct + '</td></tr>'; }).join('')
      : MOE_TOP25.map(function(u, idx) { return '<tr class="p26-filter-unit" data-u="' + u[0] + '" style="cursor:pointer;"><td style="color:#52525b!important;font-variant-numeric:tabular-nums;white-space:nowrap;">' + (idx + 1) + '</td><td><b style="color:#2563eb!important;font-weight:600;">' + u[0] + '</b></td><td style="text-align:right;font-weight:600;color:#0f172a!important;font-variant-numeric:tabular-nums;white-space:nowrap;">' + u[1] + ' 项</td><td style="text-align:right;color:#52525b!important;font-variant-numeric:tabular-nums;white-space:nowrap;">' + u[2] + '</td></tr>'; }).join('');

    var themeList = isN ? nssfc.themes : MOE_THEMES, barCol = isN ? '#dc2626' : '#2563eb', txtCol = isN ? '#991b1b' : '#1e40af';
    var themeBars = themeList.map(function(th) {
      return '<div class="p26-filter-theme" data-rx="' + th[3] + '" data-label="' + th[0] + '" style="margin-bottom:12px;cursor:pointer;"><div class="c-fxb" style="font-size:12px;line-height:16px;margin-bottom:4px;"><span style="color:' + txtCol + '!important;font-weight:600;">' + th[0] + '</span><span style="color:#334155!important;font-variant-numeric:tabular-nums;">' + th[1] + ' 项 (' + th[2] + ')</span></div><div style="height:8px;background:#f4f4f5;border-radius:4px;overflow:hidden;"><div style="width:' + th[2] + ';height:100%;background:' + barCol + ';"></div></div></div>';
    }).join('');

    var html = swHtml +
      '<div id="p26-pane-list"><div class="c-fx" style="margin-bottom:12px;">' +
      '<input type="search" id="p26-q" class="c-inp" placeholder="搜索项目名称、负责人、立项单位、二级学科...">' +
      '<select id="p26-type" class="c-sel">' + typeOpts + '</select></div>' +
      '<div id="p26-theme-chips" class="c-fx" style="margin-bottom:12px;"></div><div id="p26-count-bar" style="font-size:12px;line-height:16px;color:#52525b!important;margin-bottom:8px;font-variant-numeric:tabular-nums;"></div>' +
      '<div style="max-height:52vh;overflow-y:auto;border:1px solid #e4e4e7;border-radius:8px;"><table class="cssd-c-table"><thead><tr><th style="width:110px;white-space:nowrap;">编号/序号</th><th>项目名称</th><th style="width:98px;white-space:nowrap;">类别</th><th style="width:84px;white-space:nowrap;">负责人</th><th style="width:150px;white-space:nowrap;">立项单位</th><th style="width:82px;white-space:nowrap;">操作</th></tr></thead><tbody id="p26-tbody"></tbody></table></div></div>' +
      '<div id="p26-pane-stat" style="display:none;"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:16px;">' + kpiHtml + '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px;">' +
      '<div><h4 style="margin:0 0 8px;font-size:14px;line-height:20px;font-weight:600;color:#0f172a!important;">立项单位分布 TOP25（点击高校直接筛选课题）</h4><div style="max-height:42vh;overflow-y:auto;border:1px solid #e4e4e7;border-radius:8px;"><table class="cssd-c-table"><thead><tr><th style="width:48px;white-space:nowrap;">排名</th><th>立项单位</th><th style="text-align:right;white-space:nowrap;">数量</th><th style="text-align:right;white-space:nowrap;">占比</th></tr></thead><tbody>' + top25Rows + '</tbody></table></div></div>' +
      '<div><h4 style="margin:0 0 8px;font-size:14px;line-height:20px;font-weight:600;color:#0f172a!important;">研究主题分布（14大热点主题，点击过滤课题）</h4><div style="max-height:42vh;overflow-y:auto;padding-right:4px;">' + themeBars + '</div></div></div></div>';

    openModal(isN ? ('🇨🇳 2026年度国家社科基金·体育学立项专刊 (共' + nTot + '项)') : '🏅 2026年度教育部人文社会科学研究项目·体育学立项专刊 (共108项)', html, function(body) {
      body.querySelector('#sw-nssfc').onclick = function() { show2026PortalModal('nssfc', defaultTab); };
      body.querySelector('#sw-moe').onclick = function() { show2026PortalModal('moe', defaultTab); };
      var curRows = [], activeRx = null, activeThemeLabel = '';
      var qInput = body.querySelector('#p26-q'), typeSel = body.querySelector('#p26-type'), tbody = body.querySelector('#p26-tbody'), cntBar = body.querySelector('#p26-count-bar'), chipsBox = body.querySelector('#p26-theme-chips');

      chipsBox.innerHTML = '<span style="font-size:12px;line-height:16px;color:#52525b!important;">热点主题：</span>' +
        themeList.slice(0, 8).map(function(th) { return '<button type="button" class="cssd-cite-btn p26-chip" data-rx="' + th[3] + '" data-label="' + th[0] + '">' + th[0].split('/')[0] + ' (' + th[1] + ')</button>'; }).join('') +
        '<button type="button" class="cssd-cite-btn" id="p26-reset-chip" style="display:none;color:#dc2626!important;">✕ 清除主题</button>';

      function renderRows() {
        var q = (qInput.value || '').trim().toLowerCase(), tVal = typeSel.value;
        if (isN) {
          curRows = nssfc.list.filter(function(r) { return (!tVal || r.pType === tVal) && (!activeRx || activeRx.test(r.title)) && (!q || (r.title + ' ' + r.leader + ' ' + r.unit + ' ' + r.code + ' ' + r.disc + ' ' + r.prov).toLowerCase().indexOf(q) >= 0); });
          cntBar.innerHTML = '当前显示 <b style="color:#0f172a!important;">' + curRows.length + '</b> / ' + nTot + ' 项' + (activeThemeLabel ? ' · 主题筛选：<b style="color:#dc2626!important;">' + activeThemeLabel + '</b>' : '');
          tbody.innerHTML = curRows.map(function(r) {
            var cls = r.pType === '重点项目' ? 'b-key' : (r.pType === '青年项目' ? 'b-yth' : 'b-gen');
            return '<tr><td style="color:#52525b!important;font-size:12px;line-height:16px;font-variant-numeric:tabular-nums;white-space:nowrap!important;">' + r.code + '</td><td><div style="font-size:14px;line-height:20px;font-weight:600;color:#0f172a!important;">' + r.title + '</div><div style="font-size:12px;line-height:16px;color:#52525b!important;">' + r.disc + ' · ' + r.prov + '</div></td><td style="white-space:nowrap!important;"><span class="c-bdg ' + cls + '" style="white-space:nowrap!important;display:inline-block!important;">' + r.pType + '</span></td><td style="white-space:nowrap!important;"><a href="javascript:void(0)" class="p26-go-sch" data-name="' + r.leader + '" style="color:#dc2626!important;font-weight:600;text-decoration:none;white-space:nowrap!important;">' + r.leader + '</a></td><td style="white-space:nowrap!important;"><a href="javascript:void(0)" class="p26-go-unit" data-u="' + r.unit + '" style="color:#18181b!important;text-decoration:none;white-space:nowrap!important;">' + r.unit + '</a></td><td style="white-space:nowrap!important;"><button type="button" class="cssd-cite-btn p26-cite" data-a="' + r.leader + '" data-t="' + r.title.replace(/"/g, '&quot;') + '" data-u="' + r.unit + '" data-c="国家社科基金' + r.pType + '" data-no="' + r.code + '" style="white-space:nowrap!important;">📋 引文</button></td></tr>';
          }).join('');
        } else {
          curRows = MOE_2026.filter(function(r) {
            if (tVal === '西部和边疆地区' && r[1] !== '西部和边疆地区') return false;
            if (tVal && tVal !== '西部和边疆地区' && r[3] !== tVal) return false;
            return (!activeRx || activeRx.test(r[2])) && (!q || (r[2] + ' ' + r[4] + ' ' + r[5] + ' ' + r[0] + ' ' + r[6]).toLowerCase().indexOf(q) >= 0);
          });
          cntBar.innerHTML = '当前显示 <b style="color:#0f172a!important;">' + curRows.length + '</b> / 108 项' + (activeThemeLabel ? ' · 主题筛选：<b style="color:#2563eb!important;">' + activeThemeLabel + '</b>' : '');
          tbody.innerHTML = curRows.map(function(r) {
            var isY = r[3].indexOf('青年') >= 0;
            return '<tr><td style="color:#52525b!important;font-size:12px;line-height:16px;font-variant-numeric:tabular-nums;white-space:nowrap!important;">' + r[0] + '</td><td><div style="font-size:14px;line-height:20px;font-weight:600;color:#0f172a!important;">' + r[2] + '</div><div style="font-size:12px;line-height:16px;color:#52525b!important;">' + r[6] + ' · ' + r[8] + '</div></td><td style="white-space:nowrap!important;"><span class="c-bdg ' + (isY ? 'b-my' : 'b-mp') + '" style="white-space:nowrap!important;display:inline-block!important;">' + (isY ? '青年基金' : '规划基金') + '</span></td><td style="white-space:nowrap!important;"><a href="javascript:void(0)" class="p26-go-sch" data-name="' + r[4] + '" style="color:#2563eb!important;font-weight:600;text-decoration:none;white-space:nowrap!important;">' + r[4] + '</a></td><td style="white-space:nowrap!important;"><a href="javascript:void(0)" class="p26-go-unit" data-u="' + r[5] + '" style="color:#18181b!important;text-decoration:none;white-space:nowrap!important;">' + r[5] + '</a></td><td style="white-space:nowrap!important;"><button type="button" class="cssd-cite-btn p26-cite" data-a="' + r[4] + '" data-t="' + r[2].replace(/"/g, '&quot;') + '" data-u="' + r[5] + '" data-c="教育部人文社科' + r[3] + '" data-no="公示序号' + r[0] + '" style="white-space:nowrap!important;">📋 引文</button></td></tr>';
          }).join('');
        }
        tbody.querySelectorAll('.p26-go-sch').forEach(function(a) { a.onclick = function() { triggerSearch(a.getAttribute('data-name')); }; });
        tbody.querySelectorAll('.p26-go-unit').forEach(function(a) { a.onclick = function() { qInput.value = a.getAttribute('data-u'); renderRows(); }; });
        tbody.querySelectorAll('.p26-cite').forEach(function(b) { b.onclick = function() { window.CSSDCitation.copy(b.getAttribute('data-a'), b.getAttribute('data-t'), b.getAttribute('data-u'), 2026, b.getAttribute('data-c'), b.getAttribute('data-no'), 'gbt'); }; });
      }

      var tabList = body.querySelector('#p26-tab-list'), tabStat = body.querySelector('#p26-tab-stat'), paneList = body.querySelector('#p26-pane-list'), paneStat = body.querySelector('#p26-pane-stat');
      function switchTab(isS) { tabList.classList.toggle('active', !isS); tabStat.classList.toggle('active', isS); paneList.style.display = isS ? 'none' : 'block'; paneStat.style.display = isS ? 'block' : 'none'; }
      tabList.onclick = function() { switchTab(false); }; tabStat.onclick = function() { switchTab(true); };
      if (defaultTab === 'stat') switchTab(true);
      qInput.oninput = renderRows; typeSel.onchange = renderRows;
      body.querySelector('#p26-exp-btn').onclick = function() {
        if (isN) exportCSV('2026国家社科基金_体育学_' + curRows.length + '项.csv', '立项编号,项目类别,项目名称,负责人,立项单位,二级学科,省份', curRows.map(function(r) { return ['"' + r.code + '"', '"' + r.pType + '"', '"' + r.title.replace(/"/g, '""') + '"', '"' + r.leader + '"', '"' + r.unit + '"', '"' + r.disc + '"', '"' + r.prov + '"'].join(','); }));
        else exportCSV('2026教育部人文社科_体育学_' + curRows.length + '项.csv', '公示序号,项目类别,项目名称,项目类型,申请人,立项单位,二级学科,省份', curRows.map(function(r) { return [r[0], '"' + r[1] + '"', '"' + r[2].replace(/"/g, '""') + '"', '"' + r[3] + '"', '"' + r[4] + '"', '"' + r[5] + '"', '"' + r[6] + '"', '"' + r[8] + '"'].join(','); }));
      };
      var resetChip = body.querySelector('#p26-reset-chip');
      chipsBox.querySelectorAll('.p26-chip').forEach(function(c) { c.onclick = function() { activeRx = new RegExp(c.getAttribute('data-rx'), 'i'); activeThemeLabel = c.getAttribute('data-label'); resetChip.style.display = 'inline-block'; renderRows(); }; });
      resetChip.onclick = function() { activeRx = null; activeThemeLabel = ''; resetChip.style.display = 'none'; renderRows(); };
      body.querySelectorAll('.p26-filter-unit').forEach(function(tr) { tr.onclick = function() { switchTab(false); qInput.value = tr.getAttribute('data-u'); renderRows(); }; });
      body.querySelectorAll('.p26-filter-theme').forEach(function(dv) { dv.onclick = function() { switchTab(false); activeRx = new RegExp(dv.getAttribute('data-rx'), 'i'); activeThemeLabel = dv.getAttribute('data-label'); resetChip.style.display = 'inline-block'; renderRows(); }; });
      renderRows();
    });
  }

  // 7. 院校立项榜 Top 25 与 学科全景数据看板
  function showRanking() {
    tryEnrichDatasets();
    var list = getS() || [], st = {}, nMap = {};
    getNSSFC2026Data().list.forEach(function(r) { nMap[r.unit] = (nMap[r.unit] || 0) + 1; });
    list.forEach(function(s) {
      var u = s.institution || s.s || '其他单位';
      if (!st[u]) st[u] = { name: u, sc: 0, pj: 0, moe: 0, nssfc26: nMap[u] || 0 };
      st[u].sc++; st[u].pj += (s.projectCount || (s.fundedProjects ? s.fundedProjects.length : 0));
      if (s.hats && s.hats.indexOf('2026教育部社科') >= 0) st[u].moe++;
    });
    var rows = Object.values(st).sort(function(a, b) { return b.pj - a.pj || b.sc - a.sc; }).slice(0, 25).map(function(it, i) {
      return '<tr><td style="color:#52525b!important;font-variant-numeric:tabular-nums;">' + (i + 1) + '</td><td><a href="javascript:void(0)" class="cssd-jump" data-kw="' + it.name + '" style="color:#2563eb!important;font-weight:600;text-decoration:none;">' + it.name + '</a></td><td style="text-align:right;font-weight:600;color:#0f172a!important;font-variant-numeric:tabular-nums;">' + it.pj + ' 项</td><td style="text-align:right;color:#dc2626!important;font-weight:600;font-variant-numeric:tabular-nums;">' + (it.nssfc26 ? it.nssfc26 + ' 项' : '—') + '</td><td style="text-align:right;color:#059669!important;font-weight:600;font-variant-numeric:tabular-nums;">' + (it.moe ? it.moe + ' 项' : '—') + '</td><td style="text-align:right;color:#52525b!important;font-variant-numeric:tabular-nums;">' + it.sc + ' 人</td></tr>';
    }).join('');
    openModal('🏆 全国高校体育学国家级与教育部课题立项榜 (Top 25)', '<table class="cssd-c-table"><thead><tr><th>排名</th><th>高校/科研院所</th><th style="text-align:right;">历年课题总数</th><th style="text-align:right;">2026国家社科</th><th style="text-align:right;">2026教育部</th><th style="text-align:right;">学者数</th></tr></thead><tbody>' + rows + '</tbody></table>', function(b) {
      b.querySelectorAll('.cssd-jump').forEach(function(a) { a.onclick = function() { triggerSearch(a.getAttribute('data-kw')); }; });
    });
  }

  function showAnalytics() {
    tryEnrichDatasets();
    var list = getS() || [], tot = list.length || 1, dm = {}, pjTot = 0, nssfc = getNSSFC2026Data();
    list.forEach(function(s) { var d = s.dL || '体育学'; dm[d] = (dm[d] || 0) + 1; pjTot += (s.projectCount || (s.fundedProjects ? s.fundedProjects.length : 0)); });
    var bars = Object.entries(dm).sort(function(a, b) { return b[1] - a[1]; }).map(function(e) {
      var p = ((e[1] / tot) * 100).toFixed(1);
      return '<div class="cssd-jump" data-kw="' + e[0] + '" style="margin-bottom:12px;cursor:pointer;"><div class="c-fxb" style="font-size:14px;line-height:20px;margin-bottom:4px;"><span style="font-weight:600;color:#2563eb!important;">' + e[0] + '</span><span style="color:#334155!important;font-variant-numeric:tabular-nums;">' + e[1] + ' 人 (' + p + '%)</span></div><div style="height:8px;background:#f4f4f5;border-radius:4px;overflow:hidden;"><div style="width:' + p + '%;height:100%;background:#2563eb;"></div></div></div>';
    }).join('');
    openModal('📊 中国体育学学科全景数据看板', '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:16px;"><div style="background:#fafafa!important;border:1px solid #e4e4e7;padding:12px 16px;border-radius:8px;"><div style="font-size:12px;line-height:16px;font-weight:600;color:#1e40af!important;">收录体育学者</div><div style="font-size:24px;line-height:32px;font-weight:700;color:#1d4ed8!important;font-variant-numeric:tabular-nums;margin-top:4px;">' + list.length.toLocaleString() + ' 人</div></div><div style="background:#fafafa!important;border:1px solid #e4e4e7;padding:12px 16px;border-radius:8px;"><div style="font-size:12px;line-height:16px;font-weight:600;color:#166534!important;">关联科研课题</div><div style="font-size:24px;line-height:32px;font-weight:700;color:#15803d!important;font-variant-numeric:tabular-nums;margin-top:4px;">' + pjTot.toLocaleString() + ' 项</div></div><div style="background:#fafafa!important;border:1px solid #e4e4e7;padding:12px 16px;border-radius:8px;cursor:pointer;" id="go-nssfc-stat"><div style="font-size:12px;line-height:16px;font-weight:600;color:#991b1b!important;">2026国家社科专刊 (点击看报告)</div><div style="font-size:24px;line-height:32px;font-weight:700;color:#dc2626!important;font-variant-numeric:tabular-nums;margin-top:4px;">' + nssfc.total + ' 项 →</div></div><div style="background:#fafafa!important;border:1px solid #e4e4e7;padding:12px 16px;border-radius:8px;cursor:pointer;" id="go-moe-stat"><div style="font-size:12px;line-height:16px;font-weight:600;color:#854d0e!important;">2026教育部新立项 (点击看报告)</div><div style="font-size:24px;line-height:32px;font-weight:700;color:#a16207!important;font-variant-numeric:tabular-nums;margin-top:4px;">108 项 →</div></div></div><h4 style="margin:0 0 12px;font-size:14px;line-height:20px;font-weight:600;color:#0f172a!important;">二级学科分布（点击学科条可直接过滤学者）</h4>' + bars, function(b) {
      b.querySelector('#go-nssfc-stat').onclick = function() { show2026PortalModal('nssfc', 'stat'); };
      b.querySelector('#go-moe-stat').onclick = function() { show2026PortalModal('moe', 'stat'); };
      b.querySelectorAll('.cssd-jump').forEach(function(r) { r.onclick = function() { triggerSearch(r.getAttribute('data-kw')); }; });
    });
  }

  // 8. 学者横向对比池 & 学术名片海报生成 (PNG) & 详情弹窗增强
  var cmpList = [];
  function toggleCompare(s) {
    var idx = cmpList.findIndex(function(x) { return x.n === s.n && x.institution === s.institution; });
    if (idx >= 0) { cmpList.splice(idx, 1); showToast('已移出对比：' + s.n); }
    else { if (cmpList.length >= 3) return showToast('最多支持同时对比 3 位学者'); cmpList.push(s); showToast('已加入横向对比：' + s.n); }
    var d = document.getElementById('cssd-compare-dock');
    if (!d) { d = document.createElement('div'); d.id = 'cssd-compare-dock'; document.body.appendChild(d); }
    if (!cmpList.length) { d.style.display = 'none'; return; }
    d.style.display = 'flex';
    d.innerHTML = '<span>⚖️ 学者对比 (' + cmpList.length + '/3)</span>' + cmpList.map(function(x, i) { return '<span class="cssd-dock-tag">' + x.n + ' <b data-i="' + i + '">×</b></span>'; }).join('') + '<button type="button" class="cssd-dock-btn" id="cssd-go-cmp">开始对比</button>';
    d.querySelectorAll('b').forEach(function(b) { b.onclick = function() { cmpList.splice(Number(b.getAttribute('data-i')), 1); toggleCompare(s); toggleCompare(s); }; });
    document.getElementById('cssd-go-cmp').onclick = function() {
      openModal('⚖️ 学者综合学术画像横向对比', '<table class="cssd-c-table"><thead><tr><th>对比维度</th>' + cmpList.map(function(x) { return '<th>' + x.n + '<div style="font-size:12px;line-height:16px;color:#52525b!important;font-weight:400;">' + (x.institution || '') + '</div></th>'; }).join('') + '</tr></thead><tbody><tr><td>职称 / 院系</td>' + cmpList.map(function(x) { return '<td>' + (x.title || '学者') + ' · ' + (x.dept || '体育院系') + '</td>'; }).join('') + '</tr><tr><td>二级学科</td>' + cmpList.map(function(x) { return '<td>' + (x.dL || '体育学') + '</td>'; }).join('') + '</tr><tr><td>学术头衔</td>' + cmpList.map(function(x) { return '<td>' + ((x.hats && x.hats.length) ? x.hats.join('、') : '—') + '</td>'; }).join('') + '</tr><tr><td>研究方向</td>' + cmpList.map(function(x) { return '<td>' + (x.r || '—') + '</td>'; }).join('') + '</tr><tr><td>主持课题数</td>' + cmpList.map(function(x) { return '<td><b style="color:#2563eb!important;font-variant-numeric:tabular-nums;">' + (x.projectCount || (x.fundedProjects ? x.fundedProjects.length : 0)) + ' 项</b></td>'; }).join('') + '</tr></tbody></table>');
    };
  }

  function makePoster(s) {
    var cv = document.createElement('canvas'); cv.width = 720; cv.height = 960;
    var ctx = cv.getContext('2d');
    ctx.fillStyle = '#18181b'; ctx.fillRect(0, 0, 720, 960);
    ctx.fillStyle = '#38bdf8'; ctx.font = '600 18px sans-serif'; ctx.fillText('CSSD 体育学人 · 中国体育学者学术名片', 48, 64);
    ctx.fillStyle = '#ffffff'; ctx.font = '700 36px sans-serif'; ctx.fillText(s.n + '  ' + (s.title || ''), 48, 136);
    ctx.fillStyle = '#60a5fa'; ctx.font = '600 20px sans-serif'; ctx.fillText((s.institution || '') + ' · ' + (s.dL || '体育学'), 48, 176);
    ctx.fillStyle = '#d4d4d8'; ctx.font = '400 16px sans-serif'; ctx.fillText('研究方向：' + (s.r || '').slice(0, 36), 48, 224);
    var pList = s.fundedProjects || [];
    ctx.fillStyle = '#fafafa'; ctx.font = '600 20px sans-serif'; ctx.fillText('主持国家级 / 教育部科研项目 (' + (s.projectCount || pList.length) + ' 项)', 48, 288);
    var py = 336;
    pList.slice(0, 6).forEach(function(p) {
      ctx.fillStyle = '#38bdf8'; ctx.font = '600 14px sans-serif'; ctx.fillText('[' + (p.year || 2026) + '] ' + (p.category || '科研项目'), 48, py);
      ctx.fillStyle = '#f4f4f5'; ctx.font = '400 16px sans-serif'; ctx.fillText((p.title || '').slice(0, 34), 48, py + 24); py += 64;
    });
    ctx.fillStyle = '#a1a1aa'; ctx.font = '400 14px sans-serif'; ctx.fillText('中国体育学术资源数据库 · www.tiyuxueren.com', 48, 912);
    var a = document.createElement('a'); a.href = cv.toDataURL('image/png'); a.download = 'CSSD学术名片_' + s.n + '.png'; a.click();
    showToast('已生成并下载【' + s.n + '】学术名片海报');
  }

  function enhanceModal() {
    var ov = document.getElementById('ov'), mb = document.getElementById('mb'), mtp = document.getElementById('mtp');
    if (!ov || !ov.classList.contains('on') || !mb) return;
    var name = mtp ? ((mtp.querySelector('h2,h3,.mn,.m-name') || {}).textContent || '').trim().split(/\s+/)[0] : '';
    var inst = mtp ? ((mtp.querySelector('.m-inst,.inst,p') || {}).textContent || '').trim().split(/[·\s]/)[0] : '';
    var list = getS() || [];
    var cur = list.find(function(x) { return x.n === name && (!inst || (x.institution || '').indexOf(inst) >= 0); }) || list.find(function(x) { return x.n === name; });

    if (mtp && cur && !mtp.querySelector('.cssd-m-tools')) {
      var bar = document.createElement('div'); bar.className = 'cssd-m-tools c-fx'; bar.style.marginTop = '8px';
      bar.innerHTML = '<button type="button" class="cssd-cite-btn">⚖️ 加入对比</button><button type="button" class="cssd-cite-btn">📤 学术海报</button><button type="button" class="cssd-cite-btn">🔗 分享学者链接</button>';
      bar.children[0].onclick = function() { toggleCompare(cur); };
      bar.children[1].onclick = function() { makePoster(cur); };
      bar.children[2].onclick = function() { var u = new URL(location.href); u.searchParams.set('scholar', cur.n); navigator.clipboard && navigator.clipboard.writeText(u.toString()); showToast('已复制学者专属直达链接'); };
      mtp.appendChild(bar);
    }

    mb.querySelectorAll('.pj, .proj, .project, li').forEach(function(el) {
      if (el.dataset.cssdCited || (el.textContent || '').trim().length < 6) return;
      el.dataset.cssdCited = '1';
      var t = el.querySelector('strong') ? el.querySelector('strong').textContent.trim() : el.textContent.trim().split('\n')[0];
      var b = document.createElement('div'); b.className = 'c-fx'; b.style.marginTop = '4px';
      b.innerHTML = '<button type="button" class="cssd-cite-btn">📋 复制 GB/T 7714</button><button type="button" class="cssd-cite-btn">BibTeX</button>';
      b.children[0].onclick = function(e) { e.stopPropagation(); window.CSSDCitation.copy(name, t, inst, 2026, '国家级/教育部社科项目', '', 'gbt'); };
      b.children[1].onclick = function(e) { e.stopPropagation(); window.CSSDCitation.copy(name, t, inst, 2026, 'Research Project', '', 'bib'); };
      el.appendChild(b);
    });

    if (!mb.querySelector('.cssd-fb')) {
      var fb = document.createElement('div'); fb.className = 'c-fxb cssd-fb';
      fb.style.cssText = 'background:#fafafa!important;border:1px solid #e4e4e7!important;border-radius:8px;padding:12px 16px;margin-top:16px;font-size:12px;line-height:16px;color:#334155!important;';
      var url = 'https://github.com/LEON202304/cssd-sports-scholars/issues/new?template=scholar-update.yml&title=' + encodeURIComponent('【信息更新】' + name + ' - ' + inst);
      fb.innerHTML = '<span style="color:#334155!important;">发现学者单位调动、新增课题或信息有误？</span><a href="' + url + '" target="_blank" rel="noopener" class="cssd-tb-btn moe" style="text-decoration:none;padding:4px 12px;font-size:12px;line-height:16px;">✏️ 提交勘误 / 认领</a>';
      mb.appendChild(fb);
    }
  }

  // 定位首页 8 大板块导航卡片容器（学者目录 / 学者分类总览 / 院校机构导航 / 学术动态 / 期刊数据库 / 科研项目查询 / 学位点专栏 / 人才计划）
  function findNavGridBlock(root) {
    if (!root) return null;
    var metrics = document.getElementById('sp-metrics');
    if (metrics && metrics.parentNode) {
      var sib = metrics.nextElementSibling;
      while (sib) {
        var stxt = (sib.textContent || '');
        if (stxt.indexOf('学者目录') >= 0 && (stxt.indexOf('科研项目查询') >= 0 || stxt.indexOf('期刊数据库') >= 0 || stxt.indexOf('院校机构导航') >= 0)) {
          return sib;
        }
        sib = sib.nextElementSibling;
      }
    }
    var divs = root.querySelectorAll('section, div');
    var best = null;
    for (var i = 0; i < divs.length; i++) {
      var d = divs[i];
      if (d.id === 'vw-home' || d.id === 'cssd-home-projects-showcase') continue;
      var txt = (d.textContent || '');
      if (txt.length > 80 && txt.length < 1200 && txt.indexOf('学者目录') >= 0 && txt.indexOf('院校机构导航') >= 0 && txt.indexOf('期刊数据库') >= 0 && txt.indexOf('科研项目查询') >= 0) {
        best = d;
      }
    }
    if (best) {
      while (best.parentElement && best.parentElement !== root && best.parentElement !== document.body && (best.parentElement.textContent || '').length < 1500) {
        best = best.parentElement;
      }
    }
    return best;
  }

  // 9. 【首页大屏：科研项目动态 — 置于首页 8 大导航板块卡片的正下方】
  function mountHomeProjectsBigScreen() {
    var vwHome = document.getElementById('vw-home') || (document.getElementById('sp-metrics') && document.getElementById('sp-metrics').parentNode);
    if (!vwHome || document.getElementById('cssd-home-projects-showcase')) return;
    var nssfc = getNSSFC2026Data(), sec = document.createElement('section');
    sec.id = 'cssd-home-projects-showcase';

    // 使用独立 span.cssd-unit-chip (避免 button 与 [data-u] 被原站深色/高亮样式污染导致上海体大、广州体院变白字)
    var unitChipsHtml = ['山东体育学院','北京体育大学','上海体育大学','苏州大学','武汉体育学院','南京体育学院','广州体育学院','四川师范大学'].map(function(u) {
      return '<span role="button" tabindex="0" class="cssd-unit-chip hm-u-pill" data-unit="' + u + '"><b style="color:#0f172a!important;-webkit-text-fill-color:#0f172a!important;font-weight:600!important;">' + u + '</b></span>';
    }).join('');

    var themeChipsHtml = [
      ['数智/AI赋能','数智|AI|人工智能|多模态|数字|大数据|大语言|VR|智能'],
      ['机制/路径','机制|路径'],
      ['运动干预/处方','干预|处方|矫正|康复|主动健康'],
      ['青少年/体教','青少年|儿童|幼儿|小学生|中小学生|学校体育|体教'],
      ['全民健身/社区','全民健身|公共服务|社区|老旧小区'],
      ['赛事/体育消费','赛事|联赛|消费|旅游|文旅|城超'],
      ['老年/银发慢病','老年|银发|慢病|适老|肌少症'],
      ['传统体育/非遗','传统体育|非遗|民族|武术|共同体']
    ].map(function(th) {
      return '<span role="button" tabindex="0" class="cssd-unit-chip hm-t-pill" data-rx="' + th[1] + '" data-label="' + th[0] + '"><b style="color:#0f172a!important;-webkit-text-fill-color:#0f172a!important;font-weight:600!important;">' + th[0] + '</b></span>';
    }).join('');

    sec.innerHTML =
      '<div class="c-fxb" style="margin-bottom:16px;">' +
        '<div><div class="c-fx"><h2 style="margin:0;font-size:24px!important;line-height:32px!important;font-weight:700!important;color:#0f172a!important;text-wrap:balance;">科研项目动态</h2><span style="background:#18181b!important;color:#ffffff!important;font-size:12px;line-height:16px;font-weight:600;padding:4px 8px;border-radius:4px;">2026双专刊</span></div>' +
        '<div style="font-size:12px;line-height:16px;color:#52525b!important;margin-top:4px;font-weight:500;">FUNDED RESEARCH PROJECTS · 2026 国家社科基金与教育部人文社科立项课题透视</div></div>' +
        '<div class="c-fx">' +
          '<button type="button" class="cssd-tb-btn" id="hm-btn-cmd" title="快捷键 Ctrl+K / ⌘K">🔍 全站快搜 (⌘K)</button>' +
          '<button type="button" class="cssd-tb-btn nssfc-active" id="hm-btn-nssfc">🇨🇳 2026国家社科专刊 <span class="cssd-nssfc-cnt">(' + nssfc.total + '项)</span></button>' +
          '<button type="button" class="cssd-tb-btn moe" id="hm-btn-moe">🏅 2026教育部专刊 (108项)</button>' +
          '<button type="button" class="cssd-tb-btn" id="hm-btn-cal">📅 会议日历 (' + CALENDAR_EVENTS.length + '场)</button>' +
          '<button type="button" class="cssd-tb-btn" id="hm-btn-rank">🏆 高校立项榜 TOP25</button>' +
        '</div></div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-bottom:16px;">' +
        '<div id="hm-kpi-nssfc" class="c-card" style="background:#ffffff!important;cursor:pointer;">' +
          '<div class="c-fxb"><span style="font-size:12px;line-height:16px;font-weight:600;color:#991b1b!important;">🇨🇳 2026国家社科基金·体育学</span><span style="font-size:12px;line-height:16px;color:#dc2626!important;font-weight:600;">统计报告 →</span></div>' +
          '<div id="cssd-hm-nssfc-num" style="font-size:24px;line-height:32px;font-weight:700;font-variant-numeric:tabular-nums;margin:4px 0;">' + nssfc.total + ' 项</div>' +
          '<div id="cssd-hm-nssfc-sub" style="font-size:12px;line-height:16px;color:#52525b!important;font-variant-numeric:tabular-nums;">重点 ' + (nssfc.catMap['重点项目'] || 0) + ' · 一般 ' + (nssfc.catMap['一般项目'] || 0) + ' · 青年 ' + (nssfc.catMap['青年项目'] || 0) + ' · ' + nssfc.unitTotal + ' 家高校</div></div>' +
        '<div id="hm-kpi-moe" class="c-card" style="background:#ffffff!important;cursor:pointer;">' +
          '<div class="c-fxb"><span style="font-size:12px;line-height:16px;font-weight:600;color:#1e40af!important;">🏅 2026教育部人文社科·体育学</span><span style="font-size:12px;line-height:16px;color:#2563eb!important;font-weight:600;">统计报告 →</span></div>' +
          '<div style="font-size:24px;line-height:32px;font-weight:700;font-variant-numeric:tabular-nums;color:#2563eb!important;margin:4px 0;">108 项</div>' +
          '<div style="font-size:12px;line-height:16px;color:#52525b!important;font-variant-numeric:tabular-nums;">规划基金 58 项 (53.7%) · 青年 50 项 · 81 家高校</div></div>' +
        '<div class="c-card" style="background:#ffffff!important;"><div style="font-size:12px;line-height:16px;font-weight:600;color:#0f172a!important;margin-bottom:8px;">🏛️ 2026立项领跑院校 (点击筛选本屏课题)</div><div class="c-fx">' + unitChipsHtml + '</div></div>' +
        '<div class="c-card" style="background:#ffffff!important;"><div style="font-size:12px;line-height:16px;font-weight:600;color:#0f172a!important;margin-bottom:8px;">🔥 2026研究热点风向标 (点击过滤课题)</div><div class="c-fx">' + themeChipsHtml + '</div></div></div>' +
      '<div class="c-fxb" style="margin-bottom:16px;">' +
        '<div class="c-fx" style="flex:1;min-width:260px;"><input type="search" id="hm-proj-q" class="c-inp" style="max-width:480px;color:#0f172a!important;background:#ffffff!important;" placeholder="在首页大屏实时搜索 2026 国家社科 / 教育部立项课题名称、学者姓名、高校..."><button type="button" class="cssd-cite-btn" id="hm-proj-reset" style="display:none;color:#dc2626!important;">✕ 清除筛选</button></div>' +
        '<div id="hm-proj-status" style="font-size:12px;line-height:16px;color:#52525b!important;font-variant-numeric:tabular-nums;">左右分栏同步展示 2026 最新立项动态 · 点击课题负责人或院校可直达详情</div></div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(440px,1fr));gap:16px;">' +
        '<div class="c-col" style="background:#ffffff!important;"><div><div class="c-fxb" style="border-bottom:1px solid #e4e4e7;padding-bottom:12px;margin-bottom:8px;"><div class="c-fx"><span style="width:8px;height:8px;background:#dc2626;border-radius:9999px;"></span><h3 style="margin:0;font-size:18px!important;line-height:28px!important;font-weight:600!important;color:#0f172a!important;">2026国家社科基金·体育学立项动态</h3></div>' +
          '<div class="c-fx"><button type="button" class="cssd-cite-btn hm-ncat active" data-cat="">全部</button><button type="button" class="cssd-cite-btn hm-ncat" data-cat="重点项目">重点</button><button type="button" class="cssd-cite-btn hm-ncat" data-cat="一般项目">一般</button><button type="button" class="cssd-cite-btn hm-ncat" data-cat="青年项目">青年</button><button type="button" class="cssd-cite-btn hm-ncat" data-cat="西部项目">西部</button></div></div><div id="hm-nssfc-list"></div></div>' +
          '<div style="margin-top:16px;padding-top:12px;border-top:1px solid #f4f4f5;"><button type="button" class="cssd-tb-btn nssfc-active" id="hm-more-nssfc" style="width:100%;padding:8px 12px;">📋 展开全部 2026 国家社科立项名单 & 统计分析报告 →</button></div></div>' +
        '<div class="c-col" style="background:#ffffff!important;"><div><div class="c-fxb" style="border-bottom:1px solid #e4e4e7;padding-bottom:12px;margin-bottom:8px;"><div class="c-fx"><span style="width:8px;height:8px;background:#2563eb;border-radius:9999px;"></span><h3 style="margin:0;font-size:18px!important;line-height:28px!important;font-weight:600!important;color:#0f172a!important;">2026教育部人文社科·体育学立项动态</h3></div>' +
          '<div class="c-fx"><button type="button" class="cssd-cite-btn hm-mcat active" data-cat="">全部</button><button type="button" class="cssd-cite-btn hm-mcat" data-cat="规划基金项目">规划基金</button><button type="button" class="cssd-cite-btn hm-mcat" data-cat="青年基金项目">青年基金</button><button type="button" class="cssd-cite-btn hm-mcat" data-cat="西部和边疆地区">西部项目</button></div></div><div id="hm-moe-list"></div></div>' +
          '<div style="margin-top:16px;padding-top:12px;border-top:1px solid #f4f4f5;"><button type="button" class="cssd-tb-btn moe" id="hm-more-moe" style="width:100%;padding:8px 12px;">📋 展开全部 108 项教育部人文社科名单 & 统计分析报告 →</button></div></div></div>';

    // 优先将「科研项目动态」挂载在 8 大板块导航卡片（学者目录 / 科研项目查询 / 人才计划）的正下方
    var navBlock = findNavGridBlock(vwHome);
    if (navBlock && navBlock.parentNode) {
      navBlock.parentNode.insertBefore(sec, navBlock.nextSibling);
    } else {
      var metrics = document.getElementById('sp-metrics');
      if (metrics && metrics.parentNode) {
        var afterEl = metrics.nextElementSibling || metrics;
        afterEl.parentNode.insertBefore(sec, afterEl.nextSibling);
      } else {
        vwHome.insertBefore(sec, vwHome.firstChild);
      }
    }

    var state = { q: '', rx: null, themeLabel: '', nCat: '', mCat: '' }, qInput = sec.querySelector('#hm-proj-q'), resetBtn = sec.querySelector('#hm-proj-reset'), statusEl = sec.querySelector('#hm-proj-status'), nListEl = sec.querySelector('#hm-nssfc-list'), mListEl = sec.querySelector('#hm-moe-list');
    function renderHomeShowcase() {
      var curN = getNSSFC2026Data().list, q = (state.q || '').trim().toLowerCase();
      var fN = curN.filter(function(r) { return (!state.nCat || r.pType === state.nCat) && (!state.rx || state.rx.test(r.title)) && (!q || (r.title + ' ' + r.leader + ' ' + r.unit + ' ' + r.disc + ' ' + r.code).toLowerCase().indexOf(q) >= 0); });
      var fM = MOE_2026.filter(function(r) {
        if (state.mCat === '西部和边疆地区' && r[1] !== '西部和边疆地区') return false;
        if (state.mCat && state.mCat !== '西部和边疆地区' && r[3] !== state.mCat) return false;
        return (!state.rx || state.rx.test(r[2])) && (!q || (r[2] + ' ' + r[4] + ' ' + r[5] + ' ' + r[6] + ' ' + r[0]).toLowerCase().indexOf(q) >= 0);
      });
      resetBtn.style.display = (q || state.rx || state.nCat || state.mCat) ? 'inline-block' : 'none';
      statusEl.innerHTML = (q || state.rx || state.nCat || state.mCat) ? ('当前筛选：国家社科 <b style="color:#dc2626!important;">' + fN.length + '</b> 项 · 教育部 <b style="color:#2563eb!important;">' + fM.length + '</b> 项' + (state.themeLabel ? ' · 主题：<b style="color:#0f172a!important;">' + state.themeLabel + '</b>' : '')) : '左右分栏同步展示 2026 最新立项动态 · 点击课题负责人或院校可直达详情';
      nListEl.innerHTML = fN.slice(0, 6).map(function(r) {
        var cls = r.pType === '重点项目' ? 'b-key' : (r.pType === '青年项目' ? 'b-yth' : 'b-gen');
        return '<div class="c-it"><div class="c-fxb" style="font-size:12px;line-height:16px;color:#52525b!important;"><div class="c-fx"><span class="c-bdg ' + cls + '">' + r.pType + '</span><span style="color:#52525b!important;font-weight:500;">' + r.disc + '</span></div><span style="color:#52525b!important;font-variant-numeric:tabular-nums;">2026立项 · ' + r.code + '</span></div><div class="c-tit" title="' + r.title.replace(/"/g, '&quot;') + '" style="font-size:16px!important;line-height:24px!important;font-weight:600!important;color:#0f172a!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:8px 0 4px;">' + r.title + '</div><div class="c-fxb" style="font-size:14px;line-height:20px;color:#334155!important;"><div style="color:#334155!important;">负责人：<a href="javascript:void(0)" class="hm-go-sch" data-kw="' + r.leader + '" style="color:#dc2626!important;font-weight:600!important;text-decoration:none;">' + r.leader + '</a> · <a href="javascript:void(0)" class="hm-go-unit" data-unit="' + r.unit + '" style="color:#0f172a!important;font-weight:600!important;text-decoration:none;">' + r.unit + '</a></div><button type="button" class="cssd-cite-btn hm-cite" data-a="' + r.leader + '" data-t="' + r.title.replace(/"/g, '&quot;') + '" data-u="' + r.unit + '" data-c="国家社科基金' + r.pType + '" data-no="' + r.code + '" style="color:#0f172a!important;">📋 引文</button></div></div>';
      }).join('') || '<div style="padding:24px;text-align:center;color:#52525b!important;font-size:14px;line-height:20px;">暂无匹配的2026国家社科课题</div>';
      mListEl.innerHTML = fM.slice(0, 6).map(function(r) {
        var isY = r[3].indexOf('青年') >= 0;
        return '<div class="c-it"><div class="c-fxb" style="font-size:12px;line-height:16px;color:#52525b!important;"><div class="c-fx"><span class="c-bdg ' + (isY ? 'b-my' : 'b-mp') + '">' + (isY ? '青年基金' : '规划基金') + '</span><span style="color:#52525b!important;font-weight:500;">' + r[6] + '</span></div><span style="color:#52525b!important;font-variant-numeric:tabular-nums;">2026立项 · 教育部序号' + r[0] + '</span></div><div class="c-tit" title="' + r[2].replace(/"/g, '&quot;') + '" style="font-size:16px!important;line-height:24px!important;font-weight:600!important;color:#0f172a!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:8px 0 4px;">' + r[2] + '</div><div class="c-fxb" style="font-size:14px;line-height:20px;color:#334155!important;"><div style="color:#334155!important;">申请人：<a href="javascript:void(0)" class="hm-go-sch" data-kw="' + r[4] + '" style="color:#2563eb!important;font-weight:600!important;text-decoration:none;">' + r[4] + '</a> · <a href="javascript:void(0)" class="hm-go-unit" data-unit="' + r[5] + '" style="color:#0f172a!important;font-weight:600!important;text-decoration:none;">' + r[5] + '</a></div><button type="button" class="cssd-cite-btn hm-cite" data-a="' + r[4] + '" data-t="' + r[2].replace(/"/g, '&quot;') + '" data-u="' + r[5] + '" data-c="教育部人文社科' + r[3] + '" data-no="公示序号' + r[0] + '" style="color:#0f172a!important;">📋 引文</button></div></div>';
      }).join('') || '<div style="padding:24px;text-align:center;color:#52525b!important;font-size:14px;line-height:20px;">暂无匹配的2026教育部课题</div>';
      sec.querySelectorAll('.hm-go-sch').forEach(function(a) { a.onclick = function() { triggerSearch(a.getAttribute('data-kw')); }; });
      sec.querySelectorAll('.hm-go-unit').forEach(function(a) { a.onclick = function() { state.q = a.getAttribute('data-unit'); qInput.value = state.q; renderHomeShowcase(); }; });
      sec.querySelectorAll('.hm-cite').forEach(function(b) { b.onclick = function() { window.CSSDCitation.copy(b.getAttribute('data-a'), b.getAttribute('data-t'), b.getAttribute('data-u'), 2026, b.getAttribute('data-c'), b.getAttribute('data-no'), 'gbt'); }; });
    }
    window._cssdRenderHomeShowcase = renderHomeShowcase;
    sec.querySelector('#hm-btn-cmd').onclick = showCommandPalette;
    sec.querySelector('#hm-btn-nssfc').onclick = function() { show2026PortalModal('nssfc', 'list'); };
    sec.querySelector('#hm-btn-moe').onclick = function() { show2026PortalModal('moe', 'list'); };
    sec.querySelector('#hm-btn-cal').onclick = showAcademicCalendarModal;
    sec.querySelector('#hm-btn-rank').onclick = showRanking;
    sec.querySelector('#hm-kpi-nssfc').onclick = function() { show2026PortalModal('nssfc', 'stat'); };
    sec.querySelector('#hm-kpi-moe').onclick = function() { show2026PortalModal('moe', 'stat'); };
    sec.querySelector('#hm-more-nssfc').onclick = function() { show2026PortalModal('nssfc', 'list'); };
    sec.querySelector('#hm-more-moe').onclick = function() { show2026PortalModal('moe', 'list'); };
    qInput.oninput = function() { state.q = qInput.value; renderHomeShowcase(); };
    resetBtn.onclick = function() { state = { q: '', rx: null, themeLabel: '', nCat: '', mCat: '' }; qInput.value = ''; sec.querySelectorAll('.hm-ncat,.hm-mcat').forEach(function(b) { b.classList.remove('active'); }); sec.querySelector('.hm-ncat[data-cat=""]').classList.add('active'); sec.querySelector('.hm-mcat[data-cat=""]').classList.add('active'); renderHomeShowcase(); };
    sec.querySelectorAll('.hm-u-pill').forEach(function(btn) { btn.onclick = function() { state.q = btn.getAttribute('data-unit'); qInput.value = state.q; renderHomeShowcase(); }; });
    sec.querySelectorAll('.hm-t-pill').forEach(function(btn) { btn.onclick = function() { state.rx = new RegExp(btn.getAttribute('data-rx'), 'i'); state.themeLabel = btn.getAttribute('data-label'); renderHomeShowcase(); }; });
    sec.querySelectorAll('.hm-ncat').forEach(function(btn) { btn.onclick = function() { sec.querySelectorAll('.hm-ncat').forEach(function(b) { b.classList.remove('active'); }); btn.classList.add('active'); state.nCat = btn.getAttribute('data-cat'); renderHomeShowcase(); }; });
    sec.querySelectorAll('.hm-mcat').forEach(function(btn) { btn.onclick = function() { sec.querySelectorAll('.hm-mcat').forEach(function(b) { b.classList.remove('active'); }); btn.classList.add('active'); state.mCat = btn.getAttribute('data-cat'); renderHomeShowcase(); }; });
    renderHomeShowcase();
  }

  var _isMounting = false;
  var _mo = null;
  var _moTimer = null;

  function mountAllUI() {
    if (_isMounting) return;
    _isMounting = true;
    if (_mo) { try { _mo.disconnect(); } catch (e) {} }
    try {
      // 确保移除任何残留的右下角突兀黑色悬浮胶囊
      var oldPill = document.getElementById('cssd-float-pill');
      if (oldPill) oldPill.remove();

      unifyPageTypography();
      mountAcademicCalendarBar();
      mountHomeProjectsBigScreen();
      enhanceModal();

      // 若科研项目大屏已挂载，校验其是否处于 8 大导航板块下方
      var showcase = document.getElementById('cssd-home-projects-showcase');
      var vwHome = document.getElementById('vw-home');
      if (showcase && vwHome) {
        var navBlock = findNavGridBlock(vwHome);
        if (navBlock && navBlock.parentNode === showcase.parentNode && showcase.nextElementSibling === navBlock) {
          navBlock.parentNode.insertBefore(showcase, navBlock.nextSibling);
        }
      }

      var nssfcCnt = getNSSFC2026Data().total, nssfcTxt = nssfcCnt > 0 ? '(' + nssfcCnt + '项)' : '';
      var rinfo = document.getElementById('rinfo');
      if (rinfo && !rinfo.querySelector('.cssd-tb')) {
        var w = document.createElement('span'); w.className = 'cssd-tb';
        w.innerHTML = '<button type="button" class="cssd-tb-btn">🔍 快搜 (⌘K)</button><button type="button" class="cssd-tb-btn nssfc-active">🇨🇳 2026国家社科专刊 <span class="cssd-nssfc-cnt">' + nssfcTxt + '</span></button><button type="button" class="cssd-tb-btn moe">🏅 2026教育部专刊 (108项)</button><button type="button" class="cssd-tb-btn">📅 会议日历</button><button type="button" class="cssd-tb-btn">🏆 院校立项榜</button><button type="button" class="cssd-tb-btn">📊 学科全景</button>';
        w.children[0].onclick = showCommandPalette;
        w.children[1].onclick = function() { show2026PortalModal('nssfc', 'list'); };
        w.children[2].onclick = function() { show2026PortalModal('moe', 'list'); };
        w.children[3].onclick = showAcademicCalendarModal;
        w.children[4].onclick = showRanking;
        w.children[5].onclick = showAnalytics;
        rinfo.appendChild(w);
      }
      var vwProj = document.getElementById('vw-projects');
      if (vwProj && !vwProj.querySelector('.cssd-moe-banner')) {
        var bn = document.createElement('div'); bn.className = 'cssd-moe-banner c-fxb';
        bn.innerHTML = '<div><b style="color:#0f172a!important;font-size:16px;line-height:24px;font-weight:600;">🔥 2026年度体育学立项双专刊：国家社科基金 & 教育部人文社科项目</b><span style="font-size:14px;line-height:20px;color:#52525b!important;margin-left:8px;">支持全名单检索 · TOP25高校榜 · 14大主题统计 · CSV导出</span></div><div class="c-fx"><button type="button" class="cssd-tb-btn nssfc-active" id="bn-nssfc-list">🇨🇳 2026国家社科名单 <span class="cssd-nssfc-cnt">' + nssfcTxt + '</span></button><button type="button" class="cssd-tb-btn" id="bn-nssfc-stat">📊 国家社科统计报告</button><button type="button" class="cssd-tb-btn moe" id="bn-moe-list">🏅 2026教育部名单 (108项)</button><button type="button" class="cssd-tb-btn" id="bn-moe-stat">📈 教育部统计报告</button></div>';
        vwProj.insertBefore(bn, vwProj.firstChild);
        bn.querySelector('#bn-nssfc-list').onclick = function() { show2026PortalModal('nssfc', 'list'); };
        bn.querySelector('#bn-nssfc-stat').onclick = function() { show2026PortalModal('nssfc', 'stat'); };
        bn.querySelector('#bn-moe-list').onclick = function() { show2026PortalModal('moe', 'list'); };
        bn.querySelector('#bn-moe-stat').onclick = function() { show2026PortalModal('moe', 'stat'); };
      }
    } catch (err) {
    } finally {
      if (_mo && document.body) {
        try { _mo.observe(document.body, { childList: true, subtree: true }); } catch (e) {}
      }
      _isMounting = false;
    }
  }

  function scheduleMount() {
    if (_isMounting) return;
    clearTimeout(_moTimer);
    _moTimer = setTimeout(mountAllUI, 280);
  }

  function init() {
    try {
      localStorage.removeItem('cssd_dark');
      document.documentElement.classList.remove('cssd-dark');
    } catch (e) {}
    if (!document.getElementById('cssd-v15-css')) {
      var st = document.createElement('style'); st.id = 'cssd-v15-css';
      st.textContent = 'body{font-family:' + SANS + '!important;font-style:normal!important}' +
        '#sp-metrics,#sp-metrics *{font-variant-numeric:tabular-nums!important;font-family:' + SANS + '!important}' +
        '.sc,.sp-person{border-radius:16px!important;transition:transform 250ms cubic-bezier(0.22,1,0.36,1),opacity 250ms cubic-bezier(0.22,1,0.36,1)!important}' +
        '.sc:hover,.sp-person:hover{transform:translateY(-2px)!important}' +
        '#vw-home h3,#vw-home h4,#vw-xuejie h3,#vw-xuejie h4,#vw-news h3,#vw-news h4,[class*="xuejie"] h3,[class*="xuejie"] h4,[class*="xuejie"] [class*="title"],[class*="daily"] h3,[class*="daily"] h4,[class*="daily"] [class*="title"],[class*="news"] h3,[class*="news"] h4{font-family:' + SANS + '!important;font-size:16px!important;line-height:24px!important;font-weight:600!important;font-style:normal!important}' +
        'html body #cssd-home-projects-showcase{max-width:1180px;margin:28px auto;padding:0 16px;font-family:' + SANS + ';color:#0f172a!important}' +
        'html body #cssd-home-projects-showcase h2,html body #cssd-home-projects-showcase h3,html body #cssd-home-projects-showcase .c-tit{color:#0f172a!important;font-style:normal!important}' +
        'html body #cssd-home-projects-showcase .hm-go-unit{color:#0f172a!important}' +
        '.c-fx{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.c-fxb{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}' +
        '.c-card{background:#ffffff!important;color:#0f172a!important;border:1px solid #e4e4e7!important;border-radius:16px;padding:16px;transition:transform 250ms cubic-bezier(0.22,1,0.36,1),opacity 250ms cubic-bezier(0.22,1,0.36,1)}' +
        '.c-card:hover{transform:translateY(-1px)}' +
        '.c-col{background:#ffffff!important;color:#0f172a!important;border:1px solid #e4e4e7!important;border-radius:16px;padding:16px;display:flex;flex-direction:column;justify-content:space-between}' +
        '.c-it{padding:12px 4px;border-bottom:1px solid #f4f4f5;color:#0f172a!important}' +
        '.c-tit{font-size:16px!important;line-height:24px!important;font-weight:600!important;color:#0f172a!important;font-family:' + SANS + '!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:8px 0 4px}' +
        /* 强制所有项目类别徽章单行不折行 */
        '.c-bdg{padding:2px 8px;border-radius:4px;font-size:12px;line-height:16px;font-weight:600;white-space:nowrap!important;display:inline-block!important}' +
        '.b-key{background:#fff7ed!important;color:#c2410c!important;border:1px solid #fed7aa}.b-yth{background:#f0fdf4!important;color:#15803d!important;border:1px solid #bbf7d0}.b-gen{background:#eff6ff!important;color:#1d4ed8!important;border:1px solid #bfdbfe}.b-my{background:#fef9c3!important;color:#854d0e!important;border:1px solid #fde047}.b-mp{background:#dcfce7!important;color:#166534!important;border:1px solid #86efac}' +
        /* 独立高对比度院校与热点胶囊样式，彻底防止上海体育大学、广州体育学院等变白字 */
        '.cssd-unit-chip{display:inline-flex!important;align-items:center!important;background:#f1f5f9!important;border:1px solid #cbd5e1!important;color:#0f172a!important;-webkit-text-fill-color:#0f172a!important;opacity:1!important;padding:4px 10px!important;border-radius:6px!important;font-size:12px!important;line-height:16px!important;font-weight:600!important;cursor:pointer!important;user-select:none;white-space:nowrap!important;transition:transform 200ms cubic-bezier(0.22,1,0.36,1),background-color 200ms}' +
        '.cssd-unit-chip:hover{background:#dbeafe!important;border-color:#93c5fd!important;color:#1d4ed8!important;-webkit-text-fill-color:#1d4ed8!important;transform:translateY(-1px)}' +
        '.cssd-unit-chip:hover b{color:#1d4ed8!important;-webkit-text-fill-color:#1d4ed8!important}' +
        '.cssd-cal-tab{background:#ffffff!important;border:1px solid #cbd5e1!important;color:#1e293b!important;-webkit-text-fill-color:#1e293b!important;padding:6px 12px!important;border-radius:9999px!important;font-size:12px!important;line-height:16px!important;font-weight:600!important;white-space:nowrap!important;cursor:pointer!important;transition:all 200ms}' +
        '.cssd-cal-tab:hover,.cssd-cal-tab.active{background:#1d4ed8!important;border-color:#1d4ed8!important;color:#ffffff!important;-webkit-text-fill-color:#ffffff!important;box-shadow:0 4px 10px rgba(29,78,216,0.22)}' +
        '.cssd-m6-act{transition:transform 200ms cubic-bezier(0.22,1,0.36,1),box-shadow 200ms!important}' +
        '.cssd-m6-act:hover{transform:translateY(-2px)!important;box-shadow:0 8px 20px rgba(15,23,42,0.08)!important;border-color:#93c5fd!important}' +
        '.c-inp{flex:1;min-width:200px;padding:8px 12px;border:1px solid #d4d4d8;border-radius:8px;font-size:14px;line-height:20px;background:#ffffff!important;color:#0f172a!important;font-family:' + SANS + '}' +
        '.c-sel{padding:8px 12px;border:1px solid #d4d4d8;border-radius:8px;font-size:14px;line-height:20px;background:#ffffff!important;color:#0f172a!important;font-family:' + SANS + '}' +
        '.cssd-tb{display:inline-flex;gap:8px;margin-left:8px;flex-wrap:wrap;vertical-align:middle}' +
        '.cssd-tb-btn{background:#ffffff!important;border:1px solid #d4d4d8!important;color:#18181b!important;padding:8px 12px;border-radius:8px;font-size:14px;line-height:20px;cursor:pointer;font-weight:600;white-space:nowrap!important;font-family:' + SANS + ';transition:transform 200ms cubic-bezier(0.22,1,0.36,1),opacity 200ms cubic-bezier(0.22,1,0.36,1)}' +
        '.cssd-tb-btn:hover,.cssd-tb-btn.active{background:#2563eb!important;color:#ffffff!important;border-color:#2563eb!important;transform:translateY(-1px)}' +
        '.cssd-tb-btn:active,.cssd-cite-btn:active{transform:scale(0.98)!important}' +
        '.cssd-tb-btn:focus-visible,.cssd-cite-btn:focus-visible,.c-inp:focus-visible,.c-sel:focus-visible{outline:2px solid #2563eb!important;outline-offset:2px!important}' +
        '.cssd-tb-btn.moe{background:#eff6ff!important;color:#1d4ed8!important;border-color:#93c5fd!important;font-weight:600}' +
        '.cssd-tb-btn.nssfc-active{background:var(--nsfc-chip-bg,#FDEBEC)!important;color:var(--nsfc-chip-fg,#B42318)!important;-webkit-text-fill-color:var(--nsfc-chip-fg,#B42318)!important;border-color:var(--nsfc-chip-line,#B42318)!important;font-weight:600!important;text-shadow:none!important}' +
        '.cssd-tb-btn.nssfc-active:hover{background:var(--nsfc-chip-bg-hover,#FBD5D7)!important;color:var(--nsfc-chip-fg,#B42318)!important;-webkit-text-fill-color:var(--nsfc-chip-fg,#B42318)!important;border-color:var(--nsfc-chip-line,#B42318)!important;text-shadow:none!important}' +
        '.cssd-cite-btn{background:#f4f4f5!important;border:1px solid #e4e4e7!important;color:#0f172a!important;-webkit-text-fill-color:#0f172a!important;padding:4px 8px;border-radius:4px;font-size:12px;line-height:16px;font-weight:600;white-space:nowrap!important;cursor:pointer;font-family:' + SANS + ';transition:transform 200ms cubic-bezier(0.22,1,0.36,1),opacity 200ms cubic-bezier(0.22,1,0.36,1)}' +
        '.cssd-cite-btn:hover,.cssd-cite-btn.active{background:#2563eb!important;color:#ffffff!important;-webkit-text-fill-color:#ffffff!important;border-color:#2563eb!important}' +
        '#cssd-compare-dock{position:fixed;bottom:64px;right:24px;background:#18181b!important;color:#ffffff!important;padding:8px 16px;border-radius:9999px;border:1px solid #27272a;display:none;align-items:center;gap:8px;z-index:99991;font-size:12px;line-height:16px}' +
        '.cssd-dock-tag{background:#27272a;padding:4px 8px;border-radius:4px}.cssd-dock-tag b{cursor:pointer;margin-left:4px;color:#fca5a5}.cssd-dock-btn{background:#2563eb;color:#ffffff;border:none;padding:4px 12px;border-radius:9999px;cursor:pointer;font-size:12px;font-weight:600}' +
        '.cssd-moe-banner{background:#fafafa!important;border:1px solid #e4e4e7!important;border-radius:16px;padding:16px;margin:16px 0}' +
        '#cssd-toast{position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:#18181b;color:#ffffff;padding:8px 16px;border-radius:9999px;font-size:14px;line-height:20px;z-index:100009;pointer-events:none;opacity:0;transition:opacity 250ms cubic-bezier(0.22,1,0.36,1)}' +
        '#cssd-custom-modal{position:fixed;inset:0;background:rgba(24,24,27,.75);backdrop-filter:blur(8px);display:none;align-items:center;justify-content:center;z-index:100000;padding:16px}' +
        '#cssd-custom-modal.active{display:flex}' +
        '.cssd-c-content{background:#ffffff!important;color:#0f172a!important;width:100%;max-width:1060px;max-height:88vh;border-radius:16px;border:1px solid #e4e4e7;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 24px 48px rgba(0,0,0,.25)}' +
        '.cssd-c-hd{display:flex;justify-content:space-between;align-items:center;padding:16px 24px;border-bottom:1px solid #e4e4e7}' +
        '.cssd-c-close{background:none;border:none;font-size:18px;line-height:28px;cursor:pointer;color:#334155!important;padding:4px 8px;border-radius:8px}' +
        '.cssd-c-body{padding:16px 24px;overflow-y:auto;color:#0f172a!important}' +
        '.cssd-c-table{width:100%;border-collapse:collapse;font-size:14px;line-height:20px;margin:0;color:#0f172a!important;font-variant-numeric:tabular-nums}' +
        '.cssd-c-table th,.cssd-c-table td{padding:10px 12px;border:1px solid #e4e4e7;text-align:left;color:#0f172a!important;vertical-align:middle}' +
        '.cssd-c-table th{background:#fafafa!important;color:#18181b!important;font-weight:600;position:sticky;top:0;white-space:nowrap}' +
        '#cssd-top{position:fixed;bottom:16px;right:24px;width:40px;height:40px;border-radius:9999px;background:#18181b;color:#ffffff;border:1px solid #27272a;cursor:pointer;font-size:16px;line-height:24px;display:none;align-items:center;justify-content:center;z-index:9997;transition:transform 200ms cubic-bezier(0.22,1,0.36,1)}';
      document.head.appendChild(st);
    }
    if (!document.getElementById('cssd-top')) {
      var tb = document.createElement('button'); tb.id = 'cssd-top'; tb.className = 'sp-backtop'; tb.textContent = '↑'; tb.title = '回到顶部';
      tb.onclick = function() { window.scrollTo({ top: 0, behavior: 'smooth' }); };
      document.body.appendChild(tb);
      var sentinel = document.createElement('div');
      sentinel.style.cssText = 'position:absolute;top:360px;left:0;width:1px;height:1px;pointer-events:none;';
      document.body.appendChild(sentinel);
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function(entries) {
          tb.style.display = entries[0].isIntersecting ? 'none' : 'flex';
        }).observe(sentinel);
      }
    }

    setTimeout(function() {
      tryEnrichDatasets();
      mountAllUI();
      _mo = new MutationObserver(function(mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var t = mutations[i].target;
          if (t && t.closest && (t.closest('#cssd-home-projects-showcase') || t.closest('#cssd-academic-calendar-bar') || t.closest('#cssd-custom-modal'))) continue;
          scheduleMount();
          break;
        }
      });
      if (document.body) _mo.observe(document.body, { childList: true, subtree: true });
      var ov = document.getElementById('ov');
      if (ov) {
        new MutationObserver(function() { setTimeout(enhanceModal, 60); }).observe(ov, { attributes: true, attributeFilter: ['class'] });
      }
    }, 350);

    var tries = 0, timer = setInterval(function() {
      tries++;
      if (tryEnrichDatasets()) { scheduleMount(); }
      if (tries > 25) clearInterval(timer);
    }, 400);

    window.addEventListener('keydown', function(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        showCommandPalette();
      } else if (e.key === '/' && document.activeElement && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
        var q = document.getElementById('sp-scholars-q') || document.getElementById('q') || document.getElementById('hm-proj-q');
        if (q) { e.preventDefault(); q.focus(); q.select(); }
      } else if (e.key === 'Escape') {
        var cm = document.getElementById('cssd-custom-modal'); if (cm) cm.className = '';
        var ov = document.getElementById('ov'); if (ov && ov.classList.contains('on')) ov.classList.remove('on');
      }
    });

    var p = new URLSearchParams(location.search), kw = p.get('scholar') || p.get('q');
    if (kw) setTimeout(function() { triggerSearch(kw); }, 600);
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
