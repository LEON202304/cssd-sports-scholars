/**
 * CSSD 体育学人 - 全站终极增强套件 v12.0
 * 1. 【智能日期语义标注 & 倒计时】：自动区分「🗓️ 会议举办日期 (距今X天)」「🗓️ 征文会议期」与「📢 发布日期 / 📖 发表日期」，还原如「2026-12-18~20日 · 📍泰山学院」等完整会议时间地点
 * 2. 【📅 体育学术会议与征文日历】：在「学界动态」上方直接内嵌可视化【体育学术日历】横向时间轴，并支持弹窗全景日历、按月份筛选及一键导出手机/电脑日历提醒 (.ics)
 * 3. 【全站 15px 字体统一美化】：利用精准单日期节点不变量定位每张动态卡片，强制左右分栏标题统一为 15px 现代无衬线粗体 + 单行截断
 * 4. 【首页科研项目动态大屏 + 2026国家社科/教育部双专刊】：完整支持全名单检索、TOP25高校榜、14大热点主题分布、引文复制与CSV导出
 */
(function () {
  'use strict';
  var DISC_NAMES = ['体育人文社会学','运动人体科学','体育教育训练学','民族传统体育学'];
  var DISC_CODES = ['soc','hum-sci','pe','trad'];
  var MOE_RAW = [[88,1,"全球体育治理共同体的构建路径与中国方案研究","任振朋","四川师范大学",0,"四川"],[89,0,"县域中小学实施“学生体质强健计划”的创新机制与适配路径研究","刘海东","成都师范学院",2,"四川"],[90,0,"家校社协同育人视域下国家级非遗“红拳”大中小学一体化传承研究","高野","西安外国语大学",3,"陕西"],[1360,0,"主动健康视域下城市老旧社区公共体育空间的效能评估与靶向更新机制研究","丁国胜","湖南大学",1,"湖南"],[1361,1,"数智赋能小学生体育与健康核心素养情境化测评工具的开发与应用研究","刁玉翠","苏州大学",1,"江苏"],[1362,1,"数智赋能青少年运动习惯养成的作用机制与优化路径研究","杨安禄","中国矿业大学（北京）",0,"北京"],[1363,0,"中小学生每天2小时体育活动执行难点、推进策略与干预评估研究","周玉兰","浙江师范大学",2,"浙江"],[1364,0,"多模态AI赋能下幼儿基本运动技能滞后风险早期识别与“家园协同”靶向干预的模式研究","周喆啸","宁波大学",2,"浙江"],[1365,1,"碎片化运动对久坐大学生注意网络的影响：时间窗、最佳剂量及脑机制研究","曾佳","福州大学",1,"福建"],[1366,0,"智慧教育背景下我国青少年运动健康风险的数字画像与预警机制研究","陈海鸥","广东医科大学",1,"广东"],[1367,1,"健康第一视域下生成式AI驱动的青少年不良体态运动矫正模式构建与实证研究","刘琳","南京体育学院",1,"江苏"],[1368,0,"体卫融合视域下青少年血压偏高精准运动干预的家校社协同模式构建与实证研究","付常喜","徐州工程学院",1,"江苏"],[1369,1,"青少年生物节律紊乱相关行为的形成机制及体卫融合干预研究","韩一鸣","广西师范大学",1,"广西"],[1370,0,"数智赋能西南民族特色村寨体文旅融合的创新机制与实践路径研究","戴朝","四川师范大学",3,"四川"],[1371,1,"户外运动改善大学生抑郁症状的“情绪—认知”通路与脑网络机制研究","史冀龙","厦门大学",1,"福建"],[1372,0,"“家—校—医”协同视域下青少年脊柱侧弯数智预警与精准运动干预研究","杨惠","康复大学",1,"全国"],[1373,0,"我国青少年身体功能评估体系构建、常模制定与协同治理路径研究","周霄","华中科技大学",1,"湖北"],[1374,0,"“两创”视域下岭南非遗传统体育文化的AI知识图谱构建与数字人传承创新研究","关博","广州体育学院",3,"广东"],[1375,0,"县域枢纽型体育社会组织推动公共服务下沉的范式重构与机制优化研究","白杨","宁波职业技术大学",0,"浙江"],[1376,0,"体育特色城市的类型生成机制与分类治理研究","王成","南京大学",0,"江苏"],[1377,0,"数智促进我国残疾人康复健身体育高质量发展的实现机制与协同路径研究","谢恩礼","南京体育学院",0,"江苏"],[1378,0,"中国近代体育慈善文献资料整理与研究","牟艳","山东体育学院",0,"山东"],[1379,0,"我国中小学健康学校建设的典型模式与推进路径研究","李志强","临沂职业学院",1,"山东"],[1380,0,"我国学龄前儿童（3—6岁）身体素养多模态评估与追踪干预研究","谷颖","沈阳师范大学",2,"辽宁"],[1381,1,"银发经济视域下老年体育服务消费需求分层与精准供给研究","周冲","武汉体育学院",1,"湖北"],[1382,0,"“票根经济”视域下我国群众性体育赛事品牌培育机制与路径研究","李勇","山东体育学院",0,"山东"],[1383,1,"2型糖尿病（T2DM）患者运动功能监测与干预效果多维度评价体系构建研究","程经纬","河南体育学院",1,"河南"],[1384,1,"面向VR体育动作训练的多模态感知与智能交互机制研究","李慧宇","山东财经大学",2,"山东"],[1385,0,"数智赋能大学生体质健康管理：机制构建、平台验证与路径优化研究","姜卫芬","天津医科大学",1,"天津"],[1386,1,"具身认知视域下认知—运动双任务训练促进小学生身心健康的机制研究","陈娟","湖北文理学院",1,"湖北"],[1387,0,"社区体育公共服务“数字悬浮”的形成机理与治理策略研究","杜兴彬","山东华宇工学院",0,"山东"],[1388,1,"“行为—认知”视角下大学生抑郁症状风险分层与精准运动干预研究","石林","成都体育学院",1,"四川"],[1389,0,"“体教融合”背景下高校肥胖学生体育课程精准化重构与实证研究","李燕春","北京体育大学",2,"北京"],[1390,1,"基于多源数据融合的大学生运动员学业倦怠预警模型与干预策略研究","武欣然","中山大学",2,"全国"],[1391,0,"义务教育阶段“每天综合体育活动2小时”落实中的有效运动时间测度与提升机制研究","张艳","河海大学",2,"江苏"],[1392,1,"数智赋能儿童青少年体态健康动态监测与协同干预机制研究","唐芳","安庆师范大学",1,"安徽"],[1393,1,"赛事经济对城际消费资源的分配效应与包容性治理研究","韩苗苗","山东工商学院",0,"山东"],[1394,1,"“十五五”时期数智体育赋能老年慢病主动健康的风险预警机制与公共服务治理研究","宋杨","宁波大学",1,"浙江"],[1395,1,"基于多模态数据融合的儿童少年基础运动技能发展评估与预测模型构建研究","赵刚","苏州大学",2,"江苏"],[1396,1,"多模态运动矫正儿童青少年不良体态干预模式构建与应用研究","梁计陵","中南大学",1,"湖南"],[1397,0,"群众体育赛事促进各民族交往交流交融的机制研究","王继雄","内蒙古财经大学",3,"内蒙古"],[1398,0,"青少年运动猝死多模态智能风险评估与防范应用研究","吴卫兵","上海体育大学",1,"上海"],[1399,0,"数字脱瘾与大学生运动行为的双向关联机制及协同促进研究","周俣涛","湖南工业大学",0,"湖南"],[1400,0,"乡村振兴背景下农村“一老一小”代际体育康养的促进机制与干预模式研究","徐国琴","广州体育学院",0,"广东"],[1401,0,"生成式人工智能嵌入体育消费场景创新的实现机制与路径研究","王冠瑛","燕山大学",0,"河北"],[1402,0,"体医融合视域下青少年抑郁症状的“校—医—家”协同运动干预模式构建与实证研究","尹剑春","上海师范大学",1,"上海"],[1403,1,"数智赋能社区运动健康中心效能跃升影响因素、作用机理及推进路径研究","李紫浩","湖南农业大学",1,"湖南"],[1404,1,"主动健康视域下数智赋能“三高”人群运动干预的多模态模型构建研究","罗维","南京体育学院",1,"江苏"],[1405,0,"数字包容视域下城乡老年人体育参与鸿沟的形成机制与治理路径研究","谢劲","台州学院",1,"浙江"],[1406,1,"认知参与型身体活动对手机依赖青少年执行功能的干预效果及机制研究","孟繁莹","湖州师范大学",1,"浙江"],[1407,0,"闽籍华侨华人体育史料的搜集、整理与研究（1900—2000）","傅亮","厦门大学",0,"福建"],[1408,1,"老年慢性病人群运动依从性的障碍生成机制及多模态干预研究","李红梅","中南民族大学",1,"湖北"],[1409,1,"积极老龄化视域下社区老年膝骨关节炎患者跌倒风险分层预测与数智化运动康复服务路径研究","沈培鑫","山东体育学院",1,"山东"],[1410,0,"青少年24h活动行为聚类的社会生态机制及其靶向干预策略研究","马生霞","四川师范大学",0,"四川"],[1411,0,"中央苏区学校体育治理的制度逻辑与历史经验研究","贺鑫森","江西水利电力大学",2,"江西"],[1412,0,"“两个结合”视域下奥林匹克价值观的代际传承张力与本土化实践策略研究","闫丽敏","河南师范大学",0,"河南"],[1413,0,"我国学校体育数字化场景建构的应然图景与行动路径研究","代方梅","湖北大学",2,"湖北"],[1414,0,"青少年运动动机的生态培育机制与身体活动精准促进研究","李娟","河北师范大学",0,"河北"],[1415,1,"运动技术话语具身语义编码体系构建及项群效度检验研究","赵飞达","湖州师范大学",0,"浙江"],[1416,1,"黄河滩区村落民俗体育口述史料搜集、整理与研究","窦圣浩","济宁学院",3,"山东"],[1417,0,"“十五五”时期健康学校建设的体育资源城乡联动模式研究","郭良如","衡阳师范学院",1,"湖南"],[1418,1,"中华传统体育“走出去”的国别适应机制研究","陈静越","韩山师范学院",3,"广东"],[1419,1,"3—6岁幼儿运动智能结构模型、发展规律与体育促进路径研究","武继莹","沈阳体育学院",2,"辽宁"],[1420,1,"老旧小区嵌入式体育场地设施协同供给的理论逻辑与实现路径研究","欧亚","湖南网络工程职业学院",0,"湖南"],[1421,0,"体教医融合视域下小学生近视防控与学校体育活动协同推进的机制与路径研究","林文弢","珠海科技学院",2,"广东"],[1422,0,"基于多模态AI情绪识别的大学生抑郁倾向运动处方动态干预研究","汪君民","淮阴师范学院",1,"江苏"],[1423,1,"具身正念促进大学生运动参与的驱动机制与路径研究","张曜","苏州大学",0,"江苏"],[1424,0,"混合现实技术和人工智能技术赋能基层裁判员训练的机制、路径与应用研究","邵坚博","新疆理工学院",2,"新疆"],[1425,0,"大学生24小时活动行为失衡的抑郁风险评估及精准干预研究","王军利","中国矿业大学",1,"全国"],[1426,0,"新中国成立以来国乒荣耀创造者集体记忆的社会建构研究","何敬堂","淮南师范学院",0,"安徽"],[1427,0,"场景创新赋能体育旅游消费潜力释放长效机制与优化策略研究","唐月亮","湖南财政经济学院",0,"湖南"],[1428,1,"基于大语言模型的世居高原老年人KOA个性化运动干预研究","周惠宣","北京体育大学",1,"北京"],[1429,1,"数智技术介入运动训练的经验与数据协同机制及路径研究","张泽英","太原理工大学",2,"山西"],[1430,1,"基于行动者网络理论的青少年体质健康多元协同网络的构建与实践研究","范卉颖","上海师范大学",1,"上海"],[1431,0,"儿童身体姿态与基本运动技能的动态互馈机制及模型构建研究","荆文","山东师范大学",2,"山东"],[1432,1,"数智赋能社区老年人运动功能衰退风险识别与分层干预研究","董芮","华南师范大学",1,"全国"],[1433,1,"青少年攻击行为的跨诊断运动干预研究","温朋飞","广州体育学院",0,"广东"],[1434,1,"基于健康画像的碎片化运动促进农村女性产后康复模式构建及实证研究","程林","广东技术师范大学",1,"广东"],[1435,1,"体育锻炼增益升学关键期青少年学业情绪的作用机制与靶向干预研究","程文娟","山东青年政治学院",2,"山东"],[1436,0,"赛事驱动城乡文体旅融合共同体构建机制研究","孙中芹","曲阜师范大学",0,"山东"],[1437,0,"殷墟甲骨文体育元素的系统考释、理论阐释与活化传承研究","郭宇刚","安阳师范学院",3,"河南"],[1438,0,"基于AI赋能的乒乓球技战术诊断体系构建与应用研究","徐君伟","河南财经政法大学",0,"河南"],[1439,1,"数智赋能老年人肌少症风险预警与传统体育干预体系的建设路径研究","李新星","沈阳体育学院",1,"辽宁"],[1440,0,"“城超”激活“城市文化资本”的机理与路径研究","张庆如","苏州大学",0,"江苏"],[1441,1,"运动联合正念干预缓解阈下抑郁大学生认知情绪失调的机制与路径研究","李夏雯","上海健康医学院",1,"上海"],[1442,0,"基于数字画像的大学生体质健康精准干预机制与实现路径研究","耿元文","燕山大学",1,"河北"],[1443,1,"中小学生体质健康监测大数据驱动的精准干预与动态评价体系构建","赵怀超","河南大学",1,"河南"],[1444,1,"城市社区智慧体育服务适老化的水平测度与驱动机制研究","罗恒","湘南学院",0,"湖南"],[1445,1,"数据驱动的体育公园夜间建成环境对老年人身体活动的影响及适老化研究","林桐","常州工学院",1,"江苏"],[1446,1,"数智赋能我国青少年有氧和力量协同发展的理论建构与应用研究","李振","中国石油大学（华东）",0,"全国"],[1447,1,"中国式现代化视域下全民健身公共服务均等化评估与区域差异调控机制研究","郭琪","西安工程大学",0,"陕西"],[1448,0,"健康生态学视角下社区老年人认知衰弱影响因素多维评估与运动营养联合干预模式实证研究","蔡明","上海健康医学院",1,"上海"],[1449,0,"大型体育赛事媒介生态中的中华文化符号转译机制与传播效应研究","刘金锋","淮南师范学院",0,"安徽"],[1450,1,"残疾人体育公共服务供需动态适配模型构建与实证研究","张巧","闽江大学",0,"福建"],[1451,0,"多智能体赋能学生终身运动习惯养成的系统与实践干预研究","孙国欣","西南交通大学",0,"四川"],[1452,1,"“面向人人”班级联赛促进中小学生体育深度学习的作用机制及实现路径研究","郭洪亮","北京体育大学",2,"北京"],[1453,0,"乡村振兴背景下西部特岗体育教师职业承诺的影响机制与长效激励：基于“留任导向”的研究","崔昌水","西安外事学院",0,"陕西"],[1454,1,"藏羌彝走廊体育非物质文化遗产采辑与数字资源库建设研究","严小英","成都师范学院",3,"四川"],[1455,0,"民族传统体育铸牢边境青少年中华民族共同体意识的心理机制与组态路径研究","黄华敏","广西民族师范学院",3,"广西"],[1456,0,"群众体育赛事赛后效应转化与基层长效治理机制研究","宋述光","中国石油大学（华东）",0,"全国"],[1457,0,"城市社区体育组织服务能力的数智化动态评估与精准建设","丁洁","河南师范大学",0,"河南"],[1458,1,"我国运动训练本科专业布点的数量扩张与质量保障研究","吴彰忠","武汉体育学院",2,"湖北"],[1459,0,"地方营造与认同重建中的老工业城市群众体育赛事田野研究","孙素玲","沈阳体育学院",0,"辽宁"],[1460,0,"长三角城市边角空间体育化微更新的场景创新与治理体系研究","吴明华","常州大学",0,"江苏"],[1461,1,"数智技术赋能户外运动消费场景创新的作用机制与组态路径研究","刘超","安徽师范大学",0,"安徽"],[1462,0,"主动健康视域下青少年生活体育化服务体系研究","陆贝","潍坊学院",1,"山东"],[1463,1,"扩大内需战略下居民体育消费惯性的形成机理与释放路径研究","李一易","山东体育学院",0,"山东"],[1464,1,"我国职业体育联盟交叉补贴政策失灵的制度归因与治理路径研究","周腾军","西南财经大学",0,"四川"]];
  var MOE_2026 = MOE_RAW.map(function(x) {
    return [x[0], x[0] <= 90 ? '西部和边疆地区' : '规划基金/青年基金', x[2], x[1] ? '青年基金项目' : '规划基金项目', x[3], x[4], DISC_NAMES[x[5]], DISC_CODES[x[5]], x[6]];
  });
  var MOE_TOP25 = [["苏州大学",4,"3.7%"],["山东体育学院",4,"3.7%"],["四川师范大学",3,"2.8%"],["南京体育学院",3,"2.8%"],["广州体育学院",3,"2.8%"],["北京体育大学",3,"2.8%"],["沈阳体育学院",3,"2.8%"],["成都师范学院",2,"1.9%"],["宁波大学",2,"1.9%"],["厦门大学",2,"1.9%"],["武汉体育学院",2,"1.9%"],["燕山大学",2,"1.9%"],["上海师范大学",2,"1.9%"],["湖州师范大学",2,"1.9%"],["河南师范大学",2,"1.9%"],["淮南师范学院",2,"1.9%"],["上海健康医学院",2,"1.9%"],["中国石油大学（华东）",2,"1.9%"],["西安外国语大学",1,"0.9%"],["湖南大学",1,"0.9%"],["中国矿业大学（北京）",1,"0.9%"],["浙江师范大学",1,"0.9%"],["福州大学",1,"0.9%"],["广东医科大学",1,"0.9%"],["徐州工程学院",1,"0.9%"]];
  var MOE_THEMES = [["机制/路径研究",58,"53.7%","机制|路径"],["数智/AI/大数据赋能",41,"38.0%","数智|AI|人工智能|多模态|数字|大数据|大语言|VR|智能"],["运动干预/运动处方",33,"30.6%","干预|处方|矫正|康复"],["青少年/儿童/幼儿体质健康",28,"25.9%","青少年|儿童|幼儿|小学生|中小学生"],["老年/银发/慢病",12,"11.1%","老年|银发|慢病|適老|适老|三高|糖尿病|肌少症"],["社区体育与公共服务",12,"11.1%","社区|公共服务|老旧小区"],["赛事经济/联赛",9,"8.3%","赛事|联赛|城超|票根"],["心理健康（抑郁/情绪/正念）",9,"8.3%","抑郁|情绪|正念|心理|倦怠|攻击"],["体育消费/体旅融合",7,"6.5%","消费|旅游|文旅|文体旅"],["学校体育/体教融合",7,"6.5%","学校体育|体教|体育课程|体育活动"],["传统体育/非遗",6,"5.6%","传统体育|非遗|红拳|民俗|甲骨文"],["乡村振兴/县域",5,"4.6%","乡村|农村|县域"],["国际传播/全球治理",3,"2.8%","全球|走出去|奥林匹克|华侨"],["残疾人/特殊人群",3,"2.8%","残疾"]];
  var NSSFC_SEED = [["2026-序号366","重点项目","中国特色体育治理自主知识体系建构与创新发展路径研究","韩春利","山东体育学院","体育人文社会学","山东"],["2026-序号367","重点项目","中国式现代化进程中体育强国建设的制度逻辑与实践路径研究","鲍明晓","北京体育大学","体育人文社会学","北京"],["2026-序号368","重点项目","数智时代全民健身公共服务精准供给体系与治理能力现代化研究","陈佩杰","上海体育大学","体育人文社会学","上海"],["2026-序号369","重点项目","新质生产力赋能我国体育产业高质量发展的理论机制与政策路径研究","黄海燕","上海体育大学","体育人文社会学","上海"],["2026-序号370","重点项目","新时代学校体育“健康第一”教育理念落实机制与评价体系重构研究","季浏","华东师范大学","体育教育训练学","上海"],["2026-序号371","重点项目","体卫融合视域下慢性病运动干预处方库建设与社区推广机制研究","王正珍","北京体育大学","运动人体科学","北京"],["2026-序号372","一般项目","数字经济赋能冰雪体育消费场景创新与长效扩容机制研究","张瑞林","北京师范大学","体育人文社会学","北京"],["2026-序号373","一般项目","主动健康导向下社区老年人防跌倒多模态运动干预模式与实证研究","刘宇","上海体育大学","运动人体科学","上海"],["2026-序号374","一般项目","中华传统体育非物质文化遗产铸牢中华民族共同体意识的机制与路径研究","白晋湘","吉首大学","民族传统体育学","湖南"],["2026-序号375","青年项目","生成式人工智能驱动青少年运动技能智能诊断与个性化训练研究","李翰","武汉体育学院","体育教育训练学","湖北"],["2026-序号376","青年项目","新型城镇化进程中县域全民健身场地设施空间均衡配置研究","王志强","成都体育学院","体育人文社会学","四川"],["2026-序号377","西部项目","西部民族地区体文旅深度融合赋能乡村振兴的内生机制与路径研究","马成","西北师范大学","体育人文社会学","甘肃"]];
  var THEME_RULES = [
    ['机制/路径/模式研究','机制|路径|模式|逻辑|体系'],['数智/AI/大数据赋能','数智|AI|人工智能|多模态|数字|大数据|大语言|VR|智能|智慧|算法'],
    ['全民健身与公共体育服务','全民健身|公共服务|公共体育|社区|场地设施|空间|老旧小区|均等化'],['青少年体质与学校体育/体教融合','青少年|儿童|幼儿|小学生|中小学生|大学生|学校体育|体教|体育课程|体育教学'],
    ['体育产业/赛事经济/文体旅消费','产业|消费|赛事|联赛|旅游|文旅|文体旅|票根|城超|品牌|户外运动|数字经济'],['主动健康/运动干预/体卫融合','主动健康|干预|处方|矫正|康复|体卫|体医|慢病|肥胖|近视|抑郁|心理'],
    ['积极老龄化/银发体育/老年健康','老年|银发|老龄|适老|养老|肌少症|跌倒'],['民族传统体育/非遗/共同体意识','民族|传统体育|非遗|武术|民俗|共同体|龙舟|太极|气功|红拳|甲骨文'],
    ['体育治理现代化与体育法治','治理|法治|制度|政策|协同|监管|组织|协会|改革'],['竞技体育/运动训练/三大球/奥运','竞技|运动训练|奥运|奥林匹克|冠军|体能|技战术|足球|篮球|排球|三大球|乒乓|冰雪'],
    ['全球体育治理与国际传播','全球|国际|传播|话语|走出去|跨文化|外交'],['自主知识体系与中国式体育现代化','自主知识|中国式现代化|体育强国|新质生产力|高质量发展|中国特色'],
    ['乡村振兴与县域/农村体育','乡村|农村|县域|农民|新型城镇化'],['特殊人群/残疾人/女性体育','残疾|特殊|女性|残奥|弱势']
  ];
  var SANS = '-apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Noto Sans SC",sans-serif';

  // 内置基准体育学术会议日历库（同时自动吸纳页面实时抓取到的最新会议）
  var CALENDAR_EVENTS = [
    { start: '2026-10-30', end: '2026-10-31', title: '2026年中国学校体育理论创新与自主知识体系构建学术研讨会', type: '学术会议', loc: '山东济南', host: '山东体育学院', status: '即将召开' },
    { start: '2026-11-13', end: '2026-11-15', title: '2026年山东省第三届休闲体育与体育旅游学术论坛（征文）', type: '征文/论坛', loc: '山东日照/济南', host: '山东体育学院', status: '征文进行中' },
    { start: '2026-12-04', end: '2026-12-06', title: '第二届中国体育科学学会女科技工作者工作委员会学术交流会（征文）', type: '征文/会议', loc: '山东体育学院', host: '中国体育科学学会 / 山东体育学院', status: '征文进行中' },
    { start: '2026-12-18', end: '2026-12-20', title: '2026年体育文化与社会学学术研讨会（征文）', type: '征文/会议', loc: '山东泰安·泰山学院', host: '山东体育学院 / 泰山学院', status: '征文进行中' }
  ];

  function getS() { try { if (typeof S !== 'undefined' && Array.isArray(S)) return S; } catch (e) {} return Array.isArray(window.S) ? window.S : null; }
  function getP() { try { if (typeof NOPSS_SPORTS_PROJECTS !== 'undefined' && Array.isArray(NOPSS_SPORTS_PROJECTS)) return NOPSS_SPORTS_PROJECTS; } catch (e) {} return Array.isArray(window.NOPSS_SPORTS_PROJECTS) ? window.NOPSS_SPORTS_PROJECTS : null; }

  // 获取页面基准参考日期（优先读取页面上的「更新于 YYYY-MM-DD」，否则取当前系统日期）
  function getRefTodayStr() {
    var bodyTxt = (document.body && document.body.innerText) ? document.body.innerText : '';
    var m = bodyTxt.match(/更新于\s*(202\d-\d{2}-\d{2})/);
    if (m && m[1]) return m[1];
    var d = new Date();
    var mm = String(d.getMonth() + 1).padStart(2, '0'), dd = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + mm + '-' + dd;
  }

  function calcDiffDays(targetDateStr, refDateStr) {
    var t1 = new Date(targetDateStr + 'T00:00:00').getTime();
    var t0 = new Date(refDateStr + 'T00:00:00').getTime();
    if (isNaN(t1) || isNaN(t0)) return 0;
    return Math.round((t1 - t0) / 86400000);
  }

  function addCalendarEvent(ev) {
    if (!ev || !ev.title || !ev.start) return;
    var exists = CALENDAR_EVENTS.some(function(x) { return x.start === ev.start && (x.title.indexOf(ev.title.slice(0, 10)) >= 0 || ev.title.indexOf(x.title.slice(0, 10)) >= 0); });
    if (!exists) {
      CALENDAR_EVENTS.push(ev);
      CALENDAR_EVENTS.sort(function(a, b) { return a.start.localeCompare(b.start); });
    }
  }

  // 一键导出 .ics 日历文件（支持导入手机日历、Apple Calendar、Outlook）
  function downloadICS(ev) {
    var dtStart = (ev.start || '2026-12-18').replace(/-/g, '');
    var dtEnd = (ev.end || ev.start || '2026-12-20').replace(/-/g, '');
    var ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//CSSD 体育学人//Academic Calendar//CN',
      'BEGIN:VEVENT',
      'DTSTART;VALUE=DATE:' + dtStart,
      'DTEND;VALUE=DATE:' + dtEnd,
      'SUMMARY:' + ev.title,
      'LOCATION:' + (ev.loc || ev.host || '详见会议通知'),
      'DESCRIPTION:主办/来源：' + (ev.host || '体育学人学术日历') + ' | 状态：' + (ev.status || '学术会议'),
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = '体育学术日历_' + ev.title.slice(0, 16) + '.ics'; a.click();
    showToast('📅 已导出日历文件 (.ics)，可直接添加至手机或电脑日历提醒');
  }

  // 1. 【核心升级】统一「学界动态」「每日动态」字体大小 (15px) + 智能标注「会议举办期/倒计时」与「发布日期」+ 自动采集学术日历
  function unifyPageTypography() {
    var refToday = getRefTodayStr();
    var exactDateRx = /^202\d-\d{2}-\d{2}$/;
    var allEls = document.querySelectorAll('#vw-home *, #vw-xuejie *, #vw-news *, [class*="xuejie"] *, [class*="daily"] *, [class*="dyn"] *');
    if (!allEls.length) allEls = document.body.querySelectorAll('span, time, div, small');

    for (var i = 0; i < allEls.length; i++) {
      var node = allEls[i];
      if (node.children.length > 0 || node.closest('#cssd-home-projects-showcase') || node.closest('#cssd-academic-calendar-bar') || node.closest('#cssd-custom-modal')) continue;

      var rawDate = node.getAttribute('data-cssd-rawdate');
      if (!rawDate) {
        var txt = (node.textContent || '').trim();
        if (!exactDateRx.test(txt)) continue;
        // 排除章节右上角的「更新于 2026-10-26」
        if (node.parentElement && /更新于/.test(node.parentElement.textContent || '')) continue;
        rawDate = txt;
        node.setAttribute('data-cssd-rawdate', rawDate);
      }

      // 利用「单日期节点不变量」向上寻找该条动态的独立卡片容器（绝不会误伤整个列表父容器）
      var card = node.parentElement;
      for (var up = 0; up < 5 && card && card !== document.body; up++) {
        var cTxt = (card.textContent || '').trim();
        var dateMatches = cTxt.match(/202\d-\d{2}-\d{2}/g) || [];
        if (dateMatches.length > 1) {
          // 已经到了包含多条动态的列表容器，退回上一层
          break;
        }
        if (dateMatches.length === 1 && cTxt.length > 20 && card.children.length >= 2) {
          break;
        }
        if (card.parentElement && ((card.parentElement.textContent || '').match(/202\d-\d{2}-\d{2}/g) || []).length > 1) {
          break;
        }
        card = card.parentElement;
      }
      if (!card || card === document.body) continue;

      // 在卡片内定位分类角标 (会议/活动/期刊/院校)、主标题、底部来源院校
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
        var t = (el.getAttribute('data-cssd-rawtitle') || el.textContent || '').trim();
        if (!t || t === rawDate || t.indexOf('🗓️') >= 0 || t.indexOf('📢') >= 0 || t.indexOf('📖') >= 0) continue;
        if (/^(会议|活动|讲座|征文|通知|资讯|期刊|院校|公告)$/.test(t)) {
          badgeTxt = t;
          el.style.cssText += ';font-size:12px!important;font-family:' + SANS + '!important;';
          continue;
        }
        if (t.length > maxLen) {
          maxLen = t.length;
          titleEl = el;
        }
      }

      if (!titleEl || maxLen < 6) continue;
      var rawTitle = titleEl.getAttribute('data-cssd-rawtitle');
      if (!rawTitle) {
        rawTitle = (titleEl.textContent || '').trim();
        titleEl.setAttribute('data-cssd-rawtitle', rawTitle);
      }

      // 寻找底部来源院校节点
      for (var m = 0; m < cands.length; m++) {
        var sub = cands[m];
        if (sub === titleEl || sub === node || sub.contains(titleEl) || sub.contains(node) || sub.children.length > 0) continue;
        var st = (sub.getAttribute('data-cssd-rawsub') || sub.textContent || '').trim();
        if (st && !/^(会议|活动|讲座|征文|通知|资讯|期刊|院校|公告)$/.test(st) && st !== rawDate && st.indexOf('🗓️') < 0 && st.indexOf('📢') < 0 && st.indexOf('📖') < 0) {
          if (!sub.getAttribute('data-cssd-rawsub')) sub.setAttribute('data-cssd-rawsub', st);
          sourceEl = sub;
        }
      }

      // 解析标题中因爬虫提取残留的「时间：-20日」「地点：泰山学院」
      var endDayMatch = rawTitle.match(/时间[：:]\s*[-—~至]?(\d{1,2})日/);
      var locMatch = rawTitle.match(/地点[：:]\s*([^\s]+)/);
      var extractedEndDay = endDayMatch ? endDayMatch[1].padStart(2, '0') : '';
      var extractedLoc = locMatch ? locMatch[1].trim() : '';

      // 清理主标题末尾残缺字符
      var cleanTitle = rawTitle
        .replace(/\s*时间[：:][^\s]*.*$/, '')
        .replace(/\s*地点[：:][^\s]*.*$/, '')
        .replace(/\s*时[间：:…\.\s]*$/, '')
        .trim();
      if (!cleanTitle || cleanTitle.length < 5) cleanTitle = rawTitle;
      titleEl.textContent = cleanTitle;
      titleEl.setAttribute('title', rawTitle);

      // 强制统一左右分栏主标题字体：15px、600粗体、现代无衬线、单行省略号截断
      titleEl.style.cssText += ';font-size:15px!important;line-height:1.5!important;font-weight:600!important;font-family:' + SANS + '!important;color:#0f172a!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;display:block!important;margin:6px 0 4px 0!important;letter-spacing:0!important;';

      // 判断该日期是「未来会议举办/征文日期」还是「常规发布/发表日期」
      var diffDays = calcDiffDays(rawDate, refToday);
      var isFutureOrConf = (diffDays > 0) || !!extractedEndDay || !!extractedLoc || (/征文通知|研讨会|学术论坛|学术交流会|关于召开/.test(rawTitle) && diffDays >= 0);

      var hostName = sourceEl ? (sourceEl.getAttribute('data-cssd-rawsub') || sourceEl.textContent || '').trim() : '体育院校';
      var endFullDate = extractedEndDay ? (rawDate.slice(0, 8) + extractedEndDay) : rawDate;

      if (isFutureOrConf) {
        var dateRangeDisp = extractedEndDay ? (rawDate + '~' + extractedEndDay + '日') : rawDate;
        var countTag = diffDays > 0 ? (' · 距今' + diffDays + '天') : (diffDays === 0 ? ' · 今日举办' : '');
        var prefix = /征文|征稿/.test(rawTitle) ? '🗓️ 会议举办期(征文中)：' : '🗓️ 会议举办日期：';
        node.textContent = prefix + dateRangeDisp + countTag;
        node.style.cssText += ';font-size:11.5px!important;font-family:' + SANS + '!important;color:#c2410c!important;background:#fff7ed!important;border:1px solid #fed7aa!important;padding:1px 7px!important;border-radius:6px!important;font-weight:600!important;display:inline-block!important;';

        if (sourceEl) {
          sourceEl.textContent = hostName + (extractedLoc ? (' · 📍 会议地点：' + extractedLoc) : '') + ' · ⏳ 未来会议日程';
          sourceEl.style.cssText += ';font-size:12.5px!important;line-height:1.4!important;font-weight:500!important;font-family:' + SANS + '!important;color:#475569!important;';
        }

        // 自动收入体育学术会议日历库
        addCalendarEvent({
          start: rawDate,
          end: endFullDate,
          title: cleanTitle,
          type: /征文|征稿/.test(rawTitle) ? '征文/会议' : '学术会议',
          loc: extractedLoc || hostName,
          host: hostName,
          status: diffDays > 0 ? ('距举办 ' + diffDays + ' 天') : '近期举办'
        });
      } else {
        var pubPrefix = badgeTxt === '期刊' ? '📖 期刊发表：' : '📢 发布日期：';
        node.textContent = pubPrefix + rawDate;
        node.style.cssText += ';font-size:12px!important;font-family:' + SANS + '!important;color:#64748b!important;background:#f8fafc!important;border:1px solid #e2e8f0!important;padding:1px 6px!important;border-radius:5px!important;font-weight:400!important;';
        if (sourceEl) {
          sourceEl.textContent = hostName;
          sourceEl.style.cssText += ';font-size:12.5px!important;line-height:1.4!important;font-weight:400!important;font-family:' + SANS + '!important;color:#64748b!important;';
        }
      }
    }
  }

  // 2. 【新增核心功能】在「学界动态」上方内嵌可视化【📅 体育学术会议与征文日历】横向时间轴 + 弹窗完整日历
  function showAcademicCalendarModal() {
    unifyPageTypography();
    var refToday = getRefTodayStr();
    var html = '<div class="c-fxb" style="margin-bottom:12px;background:#f8fafc;padding:10px 14px;border-radius:10px;border:1px solid #e2e8f0;">' +
      '<div class="c-fx"><span style="font-size:12.5px;color:#475569;">💡 自动汇总全站「未来时」会议通知、征文截稿与论坛日程，点击右侧按钮可一键导入手机/电脑日历提醒 (.ics)</span></div>' +
      '<div class="c-fx" id="cal-month-tabs">' +
        '<button type="button" class="cssd-tb-btn active" data-m="">全部日程 (' + CALENDAR_EVENTS.length + ')</button>' +
        '<button type="button" class="cssd-tb-btn" data-m="2026-10">2026年10月</button>' +
        '<button type="button" class="cssd-tb-btn" data-m="2026-11">2026年11月</button>' +
        '<button type="button" class="cssd-tb-btn" data-m="2026-12">2026年12月</button>' +
      '</div></div>' +
      '<div id="cal-modal-list" style="display:grid;grid-template-columns:1fr;gap:10px;"></div>';

    openModal('📅 中国体育学术会议与征文日历 (2026 近期会议与征稿日程表)', html, function(body) {
      var listBox = body.querySelector('#cal-modal-list');
      function renderCal(monthFilter) {
        var rows = CALENDAR_EVENTS.filter(function(ev) { return !monthFilter || ev.start.indexOf(monthFilter) === 0; });
        listBox.innerHTML = rows.map(function(ev, idx) {
          var diff = calcDiffDays(ev.start, refToday);
          var badge = diff > 0 ? '<span class="c-bdg b-key">⏳ 距会议举办还有 ' + diff + ' 天</span>' : '<span class="c-bdg b-gen">🗓️ 近期会议</span>';
          var dateRange = (ev.end && ev.end !== ev.start) ? (ev.start + ' 至 ' + ev.end.slice(5)) : ev.start;
          return '<div class="c-card c-fxb" style="border-left:4px solid #ea580c;padding:12px 16px;">' +
            '<div style="display:flex;align-items:center;gap:14px;flex:1;min-width:240px;">' +
              '<div style="min-width:74px;text-align:center;background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:6px 8px;">' +
                '<div style="font-size:11px;color:#9a3412;font-weight:700;">' + ev.start.slice(0, 7) + '</div>' +
                '<div style="font-size:18px;font-weight:800;color:#ea580c;line-height:1.2;">' + ev.start.slice(8) + '日</div>' +
              '</div>' +
              '<div style="flex:1;min-width:180px;">' +
                '<div class="c-fx" style="margin-bottom:4px;"><span class="c-bdg b-my">' + ev.type + '</span>' + badge + '<span style="font-size:12px;color:#64748b;">🗓️ 会议举办期：' + dateRange + '</span></div>' +
                '<div style="font-size:15px;font-weight:700;color:#0f172a;margin-bottom:4px;">' + ev.title + '</div>' +
                '<div style="font-size:12.5px;color:#475569;">📍 举办地点：<b>' + ev.loc + '</b> · 🏛️ 主办/发布单位：' + ev.host + '</div>' +
              '</div>' +
            '</div>' +
            '<div><button type="button" class="cssd-tb-btn moe cal-dl-ics" data-idx="' + idx + '">📅 + 加入手机/电脑日历 (.ics)</button></div>' +
          '</div>';
        }).join('') || '<div style="padding:24px;text-align:center;color:#94a3b8;">该月份暂无收录的学术会议</div>';

        listBox.querySelectorAll('.cal-dl-ics').forEach(function(b) {
          b.onclick = function() { downloadICS(rows[Number(b.getAttribute('data-idx'))]); };
        });
      }
      body.querySelectorAll('#cal-month-tabs button').forEach(function(btn) {
        btn.onclick = function() {
          body.querySelectorAll('#cal-month-tabs button').forEach(function(x) { x.classList.remove('active'); });
          btn.classList.add('active');
          renderCal(btn.getAttribute('data-m'));
        };
      });
      renderCal('');
    });
  }

  function mountAcademicCalendarBar() {
    if (document.getElementById('cssd-academic-calendar-bar')) return;
    // 定位首页「学界动态」标题所在区块
    var headings = document.querySelectorAll('h2, h3, .sec-title, [class*="title"]');
    var xuejieHeader = null;
    for (var i = 0; i < headings.length; i++) {
      if ((headings[i].textContent || '').trim() === '学界动态') {
        xuejieHeader = headings[i];
        break;
      }
    }
    if (!xuejieHeader) return;
    var secContainer = xuejieHeader.parentElement;
    for (var up = 0; up < 3 && secContainer && secContainer.parentElement; up++) {
      if (secContainer.children.length >= 2 && (secContainer.textContent || '').indexOf('2026-') >= 0) break;
      secContainer = secContainer.parentElement;
    }
    if (!secContainer) return;

    var refToday = getRefTodayStr();
    var bar = document.createElement('div');
    bar.id = 'cssd-academic-calendar-bar';
    bar.style.cssText = 'background:linear-gradient(95deg,#fff7ed 0%,#eff6ff 100%);border:1px solid #fed7aa;border-radius:12px;padding:12px 16px;margin:10px 0 14px;font-family:' + SANS + ';';

    var cardsHtml = CALENDAR_EVENTS.slice(0, 4).map(function(ev, i) {
      var diff = calcDiffDays(ev.start, refToday);
      var rangeTxt = (ev.end && ev.end !== ev.start) ? (ev.start.slice(5) + '~' + ev.end.slice(8) + '日') : ev.start.slice(5);
      return '<div style="background:#fff;border:1px solid #ffedd5;border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;justify-content:space-between;gap:4px;">' +
        '<div class="c-fxb"><span style="background:#ffedd5;color:#c2410c;font-size:11px;font-weight:700;padding:1px 6px;border-radius:4px;">🗓️ 会议期 ' + rangeTxt + '</span>' +
        '<span style="font-size:11px;color:#ea580c;font-weight:600;">' + (diff > 0 ? ('⏳ 距今 ' + diff + ' 天') : '近期举办') + '</span></div>' +
        '<div title="' + ev.title + '" style="font-size:13.5px;font-weight:700;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:2px 0;">' + ev.title.replace(/（征文）/, '') + '</div>' +
        '<div class="c-fxb" style="font-size:11.5px;color:#64748b;"><span>📍 ' + ev.loc + '</span><a href="javascript:void(0)" class="cal-bar-ics" data-i="' + i + '" style="color:#2563eb;text-decoration:none;font-weight:600;">+提醒</a></div>' +
      '</div>';
    }).join('');

    bar.innerHTML =
      '<div class="c-fxb" style="margin-bottom:10px;">' +
        '<div class="c-fx">' +
          '<span style="background:#ea580c;color:#fff;font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">📅 体育学术日历</span>' +
          '<b style="font-size:13.5px;color:#0f172a;">2026 近期体育学术会议与征文日程表（按会议举办日期排序）</b>' +
          '<span style="font-size:12px;color:#64748b;">下方列表已为您自动区分「🗓️ 会议举办日期」与「📢 新闻发布日期」</span>' +
        '</div>' +
        '<button type="button" class="cssd-tb-btn" id="open-full-cal" style="border-color:#fdba74;color:#c2410c;font-weight:600;">📅 查看完整学术日历 & 导出提醒 →</button>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px;">' + cardsHtml + '</div>';

    // 插入到「学界动态」标题行下方
    var headerRow = xuejieHeader.parentElement;
    if (headerRow && headerRow.parentElement === secContainer) {
      secContainer.insertBefore(bar, headerRow.nextSibling);
    } else {
      secContainer.insertBefore(bar, secContainer.firstChild);
    }

    bar.querySelector('#open-full-cal').onclick = showAcademicCalendarModal;
    bar.querySelectorAll('.cal-bar-ics').forEach(function(a) {
      a.onclick = function() { downloadICS(CALENDAR_EVENTS[Number(a.getAttribute('data-i'))]); };
    });
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

  // 3. 提取并实时构建【2026国家社科基金·体育学专刊】全名单与统计数据
  var _nssfcCache = null;
  function getNSSFC2026Data() {
    var projects = getP() || [], scholars = getS() || [];
    if (_nssfcCache && _nssfcCache.rawLen === projects.length && _nssfcCache.fromReal && _nssfcCache.list.length > 0) return _nssfcCache;
    var seen = new Set(), list = [];
    function addRec(code, pType, title, leader, unit, prov, disc) {
      var ct = String(title || '').trim();
      if (!ct || seen.has(ct)) return;
      seen.add(ct);
      var cat = String(pType || '一般项目').trim();
      cat = cat.indexOf('重点') >= 0 ? '重点项目' : (cat.indexOf('青年') >= 0 ? '青年项目' : (cat.indexOf('西部') >= 0 ? '西部项目' : (cat.indexOf('重大') >= 0 ? '重大项目' : (cat.indexOf('后期') >= 0 ? '后期资助项目' : '一般项目'))));
      var cc = String(code || '').trim() || ('2026-序号' + (list.length + 1)), m = cc.match(/(\d+)$/), cu = String(unit || '').trim() || '高校/科研院所';
      list.push({ seq: m ? Number(m[1]) : (list.length + 1), code: cc, title: ct, pType: cat, leader: String(leader || '').trim() || '课题负责人', unit: cu, disc: disc || inferDisc(ct), prov: inferProv(cu, prov) });
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
    list.sort(function(a, b) { return a.seq - b.seq; });
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

  // 4. 后台合入 108 项教育部项目 & 注入拼音首字母索引
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
    for (var j = MOE_2026.length - 1; j >= 0; j--) {
      var it = MOE_2026[j], code = it[0], subCat = it[1], title = it[2], pType = it[3], name = it[4], unit = it[5], dL = it[6], dC = it[7], prov = it[8];
      var pCode = '2026-教育部序号' + code, catFull = '教育部人文社科' + pType, sProj = { code: pCode, category: catFull, title: title, unit: unit, year: 2026 };
      var found = scholarMap.get(name + '_' + unit) || scholars.find(function(x) { return x.n === name && ((x.institution || '').indexOf(unit) >= 0 || unit.indexOf(x.institution || '') >= 0); });
      if (found) {
        if (!Array.isArray(found.fundedProjects)) found.fundedProjects = [];
        if (!found.fundedProjects.some(function(p) { return p.title === title; })) { found.fundedProjects.unshift(sProj); found.projectCount = (found.projectCount || 0) + 1; }
        if (!Array.isArray(found.hats)) found.hats = [];
        if (found.hats.indexOf('2026教育部社科') < 0) found.hats.push('2026教育部社科');
      } else {
        maxId++;
        var ns = { id: maxId, n: name, e: name, institution: unit, s: unit, dept: '体育学院', title: pType.indexOf('青年') >= 0 ? '青年学者' : '教授/副教授', disc: dC, dL: dL, hats: ['2026教育部社科'], hon: ['2026教育部人文社科立项'], r: title, i: name ? name[0] : '学', c: '#2563eb', projectCount: 1, fundedProjects: [sProj] };
        scholars.unshift(ns); scholarMap.set(name + '_' + unit, ns);
      }
      if (projects && !projects.some(function(p) { return p.title === title; })) {
        projects.unshift({ year: 2026, y: 2026, code: pCode, category: pType.indexOf('青年') >= 0 ? '青年项目' : '规划基金项目', type: catFull, subject: '体育学', title: title, leader: name, pi: name, name: name, unit: unit, institution: unit, approvedDate: '2026', province: prov, outcome: subCat, unitSystem: '教育部人文社科项目', source: '教育部社科司', sourceUrl: '' });
      }
    }
    _nssfcCache = null;
    try {
      var nssfc = getNSSFC2026Data();
      document.querySelectorAll('.cssd-nssfc-cnt').forEach(function(el) { if (nssfc.total > 0) el.textContent = '(' + nssfc.total + '项)'; });
      var hn = document.getElementById('cssd-hm-nssfc-num'), hs = document.getElementById('cssd-hm-nssfc-sub');
      if (hn) hn.textContent = nssfc.total + ' 项';
      if (hs) hs.textContent = '重点 ' + (nssfc.catMap['重点项目'] || 0) + ' / 一般 ' + (nssfc.catMap['一般项目'] || 0) + ' / 青年 ' + (nssfc.catMap['青年项目'] || 0) + ' · ' + nssfc.unitTotal + ' 家高校';
      if (typeof window._cssdRenderHomeShowcase === 'function') window._cssdRenderHomeShowcase();
      if (typeof window.spRefresh === 'function') window.spRefresh();
      if (typeof window.renderSc === 'function') window.renderSc();
      if (typeof window.renderPr === 'function') window.renderPr();
    } catch (e) {}
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
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(function() { showToast('✅ 已复制 ' + (type === 'bib' ? 'BibTeX' : 'GB/T 7714') + ' 引文'); });
      else prompt('请复制引文：', txt);
    }
  };

  function exportCSV(filename, hd, rows) {
    var blob = new Blob(['\uFEFF' + hd + '\n' + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click();
    showToast('✅ 已导出 ' + rows.length + ' 项课题数据 (Excel/CSV)');
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
    m.innerHTML = '<div class="cssd-c-content"><div class="cssd-c-hd"><h3>' + title + '</h3><button type="button" class="cssd-c-close" id="cssd-c-close">✕</button></div><div class="cssd-c-body" id="cssd-c-body">' + html + '</div></div>';
    document.getElementById('cssd-c-close').onclick = function() { m.className = ''; };
    m.onclick = function(e) { if (e.target === m) m.className = ''; };
    if (onMount) onMount(document.getElementById('cssd-c-body'));
  }

  // 5. 【2026国家社科基金 & 2026教育部人文社科】双专刊一体化交互看板
  function show2026PortalModal(source, defaultTab) {
    tryEnrichDatasets();
    var isN = (source === 'nssfc'), nssfc = getNSSFC2026Data(), nTot = nssfc.total, totSafe = nTot || 1;
    var kC = nssfc.catMap['重点项目'] || 0, gC = nssfc.catMap['一般项目'] || 0, yC = nssfc.catMap['青年项目'] || 0, wC = nssfc.catMap['西部项目'] || 0;
    var swHtml = '<div class="c-fxb" style="margin-bottom:12px;background:#f8fafc;padding:8px 12px;border-radius:10px;border:1px solid #e2e8f0;">' +
      '<div class="c-fx"><span style="font-size:12px;font-weight:700;color:#475569;">切换 2026 立项专刊：</span>' +
      '<button type="button" id="sw-nssfc" class="cssd-tb-btn ' + (isN ? 'nssfc-active' : '') + '">🇨🇳 2026国家社科基金专刊 (' + nTot + '项)</button>' +
      '<button type="button" id="sw-moe" class="cssd-tb-btn ' + (!isN ? 'active' : '') + '">🏅 2026教育部人文社科专刊 (108项)</button></div>' +
      '<div class="c-fx"><button type="button" class="cssd-tb-btn active" id="p26-tab-list">📋 立项全名单</button>' +
      '<button type="button" class="cssd-tb-btn" id="p26-tab-stat">📊 统计分析报告</button>' +
      '<button type="button" class="cssd-tb-btn moe" id="p26-exp-btn">📥 导出 Excel/CSV</button></div></div>';

    var typeOpts = isN
      ? '<option value="">全部项目类别 (' + nTot + '项)</option><option value="重点项目">重点项目 (' + kC + '项 · ' + ((kC / totSafe) * 100).toFixed(1) + '%)</option><option value="一般项目">一般项目 (' + gC + '项 · ' + ((gC / totSafe) * 100).toFixed(1) + '%)</option><option value="青年项目">青年项目 (' + yC + '项 · ' + ((yC / totSafe) * 100).toFixed(1) + '%)</option><option value="西部项目">西部项目 (' + wC + '项 · ' + ((wC / totSafe) * 100).toFixed(1) + '%)</option>'
      : '<option value="">全部类型 (108项)</option><option value="规划基金项目">规划基金项目 (58项 · 53.7%)</option><option value="青年基金项目">青年基金项目 (50项 · 46.3%)</option><option value="西部和边疆地区">西部和边疆地区 (3项 · 2.8%)</option>';

    var kpiItems = isN
      ? [['#fef2f2','#991b1b','#dc2626','2026国家社科总数',nTot+' 项','共 '+nssfc.unitTotal+' 家单位获批'],['#fff7ed','#9a3412','#ea580c','重点项目',kC+' 项','占比 '+((kC/totSafe)*100).toFixed(1)+'%'],['#eff6ff','#1e40af','#2563eb','一般项目',gC+' 项','占比 '+((gC/totSafe)*100).toFixed(1)+'%'],['#f0fdf4','#166534','#16a34a','青年项目',yC+' 项','占比 '+((yC/totSafe)*100).toFixed(1)+'%'],['#fdf2f8','#9d174d','#db2777','西部项目',wC+' 项','占比 '+((wC/totSafe)*100).toFixed(1)+'%']]
      : [['#eff6ff','#1e40af','#1d4ed8','教育部立项总数','108 项','共 81 家单位获批'],['#f0fdf4','#166534','#15803d','规划基金项目','58 项','占比 53.7%'],['#fefce8','#854d0e','#a16207','青年基金项目','50 项','占比 46.3%'],['#fdf2f8','#9d174d','#be185d','西部和边疆项目','3 项','规划/青年 105 项(97.2%)']];
    var kpiHtml = kpiItems.map(function(k) { return '<div style="background:'+k[0]+';padding:10px 12px;border-radius:8px;"><div style="font-size:11px;color:'+k[1]+';">'+k[3]+'</div><div style="font-size:20px;font-weight:800;color:'+k[2]+';">'+k[4]+'</div><div style="font-size:11px;color:#64748b;">'+k[5]+'</div></div>'; }).join('');

    var top25Rows = isN
      ? nssfc.top25.map(function(u, idx) { return '<tr class="p26-filter-unit" data-u="' + u.name + '" style="cursor:pointer;"><td>' + (idx + 1) + '</td><td><b style="color:#dc2626;">' + u.name + '</b><div style="font-size:11px;color:#64748b;">' + u.detail + '</div></td><td style="text-align:right;font-weight:bold;">' + u.count + ' 项</td><td style="text-align:right;color:#64748b;">' + u.pct + '</td></tr>'; }).join('')
      : MOE_TOP25.map(function(u, idx) { return '<tr class="p26-filter-unit" data-u="' + u[0] + '" style="cursor:pointer;"><td>' + (idx + 1) + '</td><td><b style="color:#2563eb;">' + u[0] + '</b></td><td style="text-align:right;font-weight:bold;">' + u[1] + ' 项</td><td style="text-align:right;color:#64748b;">' + u[2] + '</td></tr>'; }).join('');

    var themeList = isN ? nssfc.themes : MOE_THEMES, barCol = isN ? '#dc2626' : '#2563eb', txtCol = isN ? '#991b1b' : '#1e40af';
    var themeBars = themeList.map(function(th) {
      return '<div class="p26-filter-theme" data-rx="' + th[3] + '" data-label="' + th[0] + '" style="margin-bottom:8px;cursor:pointer;"><div class="c-fxb" style="font-size:12px;margin-bottom:2px;"><span style="color:' + txtCol + ';font-weight:600;">' + th[0] + '</span><span>' + th[1] + ' 项 (' + th[2] + ')</span></div><div style="height:7px;background:#e2e8f0;border-radius:4px;overflow:hidden;"><div style="width:' + th[2] + ';height:100%;background:' + barCol + ';"></div></div></div>';
    }).join('');

    var html = swHtml +
      '<div id="p26-pane-list"><div class="c-fx" style="margin-bottom:10px;">' +
      '<input type="search" id="p26-q" class="c-inp" placeholder="搜索项目名称 / 负责人 / 立项单位 / 二级学科...">' +
      '<select id="p26-type" class="c-sel">' + typeOpts + '</select></div>' +
      '<div id="p26-theme-chips" class="c-fx" style="margin-bottom:10px;"></div><div id="p26-count-bar" style="font-size:12px;color:#64748b;margin-bottom:8px;"></div>' +
      '<div style="max-height:50vh;overflow-y:auto;border:1px solid #e2e8f0;border-radius:8px;"><table class="cssd-c-table"><thead><tr><th style="width:88px;">编号/序号</th><th>项目名称</th><th style="width:86px;">类别</th><th style="width:74px;">负责人</th><th style="width:135px;">立项单位</th><th style="width:66px;">操作</th></tr></thead><tbody id="p26-tbody"></tbody></table></div></div>' +
      '<div id="p26-pane-stat" style="display:none;"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(135px,1fr));gap:10px;margin-bottom:16px;">' + kpiHtml + '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px;">' +
      '<div><h4 style="margin:0 0 8px;font-size:13px;">三、立项单位分布 TOP25（点击高校直接筛选课题）</h4><div style="max-height:42vh;overflow-y:auto;border:1px solid #e2e8f0;border-radius:6px;"><table class="cssd-c-table"><thead><tr><th style="width:42px;">排名</th><th>立项单位</th><th style="text-align:right;">数量</th><th style="text-align:right;">占比</th></tr></thead><tbody>' + top25Rows + '</tbody></table></div></div>' +
      '<div><h4 style="margin:0 0 8px;font-size:13px;">四、研究主题分布（14大热点主题，点击过滤课题）</h4><div style="max-height:42vh;overflow-y:auto;padding-right:4px;">' + themeBars + '</div></div></div></div>';

    openModal(isN ? ('🇨🇳 2026年度国家社科基金·体育学立项专刊 (共' + nTot + '项)') : '🏅 2026年度教育部人文社会科学研究项目·体育学立项专刊 (共108项)', html, function(body) {
      body.querySelector('#sw-nssfc').onclick = function() { show2026PortalModal('nssfc', defaultTab); };
      body.querySelector('#sw-moe').onclick = function() { show2026PortalModal('moe', defaultTab); };
      var curRows = [], activeRx = null, activeThemeLabel = '';
      var qInput = body.querySelector('#p26-q'), typeSel = body.querySelector('#p26-type'), tbody = body.querySelector('#p26-tbody'), cntBar = body.querySelector('#p26-count-bar'), chipsBox = body.querySelector('#p26-theme-chips');

      chipsBox.innerHTML = '<span style="font-size:11px;color:#64748b;">热点主题：</span>' +
        themeList.slice(0, 8).map(function(th) { return '<button type="button" class="cssd-cite-btn p26-chip" data-rx="' + th[3] + '" data-label="' + th[0] + '">' + th[0].split('/')[0] + '(' + th[1] + ')</button>'; }).join('') +
        '<button type="button" class="cssd-cite-btn" id="p26-reset-chip" style="display:none;color:#dc2626;">✕ 清除主题</button>';

      function renderRows() {
        var q = (qInput.value || '').trim().toLowerCase(), tVal = typeSel.value;
        if (isN) {
          curRows = nssfc.list.filter(function(r) { return (!tVal || r.pType === tVal) && (!activeRx || activeRx.test(r.title)) && (!q || (r.title + ' ' + r.leader + ' ' + r.unit + ' ' + r.code + ' ' + r.disc + ' ' + r.prov).toLowerCase().indexOf(q) >= 0); });
          cntBar.innerHTML = '当前显示 <b>' + curRows.length + '</b> / ' + nTot + ' 项' + (activeThemeLabel ? ' · 主题筛选：<b style="color:#dc2626;">' + activeThemeLabel + '</b>' : '');
          tbody.innerHTML = curRows.map(function(r) {
            var cls = r.pType === '重点项目' ? 'b-key' : (r.pType === '青年项目' ? 'b-yth' : 'b-gen');
            return '<tr><td style="color:#64748b;font-size:12px;">' + r.code + '</td><td><div style="font-weight:600;color:#0f172a;">' + r.title + '</div><div style="font-size:11px;color:#64748b;">' + r.disc + ' · ' + r.prov + '</div></td><td><span class="c-bdg ' + cls + '">' + r.pType + '</span></td><td><a href="javascript:void(0)" class="p26-go-sch" data-name="' + r.leader + '" style="color:#dc2626;font-weight:600;text-decoration:none;">' + r.leader + '</a></td><td><a href="javascript:void(0)" class="p26-go-unit" data-u="' + r.unit + '" style="color:#334155;text-decoration:none;">' + r.unit + '</a></td><td><button type="button" class="cssd-cite-btn p26-cite" data-a="' + r.leader + '" data-t="' + r.title.replace(/"/g, '&quot;') + '" data-u="' + r.unit + '" data-c="国家社科基金' + r.pType + '" data-no="' + r.code + '">📋 引文</button></td></tr>';
          }).join('');
        } else {
          curRows = MOE_2026.filter(function(r) {
            if (tVal === '西部和边疆地区' && r[1] !== '西部和边疆地区') return false;
            if (tVal && tVal !== '西部和边疆地区' && r[3] !== tVal) return false;
            return (!activeRx || activeRx.test(r[2])) && (!q || (r[2] + ' ' + r[4] + ' ' + r[5] + ' ' + r[0] + ' ' + r[6]).toLowerCase().indexOf(q) >= 0);
          });
          cntBar.innerHTML = '当前显示 <b>' + curRows.length + '</b> / 108 项' + (activeThemeLabel ? ' · 主题筛选：<b style="color:#2563eb;">' + activeThemeLabel + '</b>' : '');
          tbody.innerHTML = curRows.map(function(r) {
            var isY = r[3].indexOf('青年') >= 0;
            return '<tr><td style="color:#64748b;font-size:12px;">' + r[0] + '</td><td><div style="font-weight:600;color:#0f172a;">' + r[2] + '</div><div style="font-size:11px;color:#64748b;">' + r[6] + ' · ' + r[8] + '</div></td><td><span class="c-bdg ' + (isY ? 'b-my' : 'b-mp') + '">' + (isY ? '青年基金' : '规划基金') + '</span></td><td><a href="javascript:void(0)" class="p26-go-sch" data-name="' + r[4] + '" style="color:#2563eb;font-weight:600;text-decoration:none;">' + r[4] + '</a></td><td><a href="javascript:void(0)" class="p26-go-unit" data-u="' + r[5] + '" style="color:#334155;text-decoration:none;">' + r[5] + '</a></td><td><button type="button" class="cssd-cite-btn p26-cite" data-a="' + r[4] + '" data-t="' + r[2].replace(/"/g, '&quot;') + '" data-u="' + r[5] + '" data-c="教育部人文社科' + r[3] + '" data-no="公示序号' + r[0] + '">📋 引文</button></td></tr>';
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

  // 6. 院校立项榜 Top 25 与 学科全景看板
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
      return '<tr><td>' + (i + 1) + '</td><td><a href="javascript:void(0)" class="cssd-jump" data-kw="' + it.name + '" style="color:#2563eb;font-weight:600;text-decoration:none;">' + it.name + '</a></td><td style="text-align:right;font-weight:bold;">' + it.pj + ' 项</td><td style="text-align:right;color:#dc2626;font-weight:bold;">' + (it.nssfc26 ? it.nssfc26 + ' 项' : '—') + '</td><td style="text-align:right;color:#059669;font-weight:bold;">' + (it.moe ? it.moe + ' 项' : '—') + '</td><td style="text-align:right;color:#64748b;">' + it.sc + ' 人</td></tr>';
    }).join('');
    openModal('🏆 全国高校体育学国家级与教育部课题立项榜 (Top 25)', '<table class="cssd-c-table"><thead><tr><th>排名</th><th>高校/科研院所</th><th style="text-align:right;">历年课题总数</th><th style="text-align:right;">2026国家社科</th><th style="text-align:right;">2026教育部</th><th style="text-align:right;">学者数</th></tr></thead><tbody>' + rows + '</tbody></table>', function(b) {
      b.querySelectorAll('.cssd-jump').forEach(function(a) { a.onclick = function() { triggerSearch(a.getAttribute('data-kw')); }; });
    });
  }

  // 7. 【首页大屏：科研项目动态 (2026国家社科 & 教育部双栏大屏)】
  function mountHomeProjectsBigScreen() {
    var homeTarget = document.getElementById('sp-metrics') || document.getElementById('vw-home');
    if (!homeTarget || document.getElementById('cssd-home-projects-showcase')) return;
    var nssfc = getNSSFC2026Data(), sec = document.createElement('section');
    sec.id = 'cssd-home-projects-showcase';
    sec.innerHTML =
      '<div class="c-fxb" style="margin-bottom:14px;">' +
        '<div><div class="c-fx"><h2 style="margin:0;font-size:24px;font-weight:800;color:#0f172a;">科研项目动态</h2><span style="background:linear-gradient(135deg,#dc2626,#2563eb);color:#fff;font-size:11px;font-weight:700;padding:3px 9px;border-radius:20px;">2026双专刊 · 首页大屏</span></div>' +
        '<div style="font-size:11px;color:#64748b;margin-top:3px;font-weight:600;">FUNDED RESEARCH PROJECTS · 2026 国家社科基金 & 教育部人文社科立项课题透视</div></div>' +
        '<div class="c-fx">' +
          '<button type="button" class="cssd-tb-btn nssfc-active" id="hm-btn-nssfc">🇨🇳 2026国家社科专刊 <span class="cssd-nssfc-cnt">(' + nssfc.total + '项)</span></button>' +
          '<button type="button" class="cssd-tb-btn moe" id="hm-btn-moe">🏅 2026教育部专刊 (108项)</button>' +
          '<button type="button" class="cssd-tb-btn" id="hm-btn-cal">📅 体育学术日历</button>' +
          '<button type="button" class="cssd-tb-btn" id="hm-btn-rank">🏆 高校立项榜 TOP25</button>' +
        '</div></div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-bottom:14px;">' +
        '<div id="hm-kpi-nssfc" class="c-card" style="border-left:4px solid #dc2626;cursor:pointer;">' +
          '<div class="c-fxb"><span style="font-size:12px;font-weight:700;color:#991b1b;">🇨🇳 2026国家社科基金·体育学</span><span style="font-size:11px;color:#dc2626;font-weight:600;">统计报告 →</span></div>' +
          '<div id="cssd-hm-nssfc-num" style="font-size:22px;font-weight:800;color:#dc2626;margin:4px 0 2px;">' + nssfc.total + ' 项</div>' +
          '<div id="cssd-hm-nssfc-sub" style="font-size:12px;color:#64748b;">重点 ' + (nssfc.catMap['重点项目'] || 0) + ' / 一般 ' + (nssfc.catMap['一般项目'] || 0) + ' / 青年 ' + (nssfc.catMap['青年项目'] || 0) + ' · ' + nssfc.unitTotal + ' 家高校</div></div>' +
        '<div id="hm-kpi-moe" class="c-card" style="border-left:4px solid #2563eb;cursor:pointer;">' +
          '<div class="c-fxb"><span style="font-size:12px;font-weight:700;color:#1e40af;">🏅 2026教育部人文社科·体育学</span><span style="font-size:11px;color:#2563eb;font-weight:600;">统计报告 →</span></div>' +
          '<div style="font-size:22px;font-weight:800;color:#2563eb;margin:4px 0 2px;">108 项</div>' +
          '<div style="font-size:12px;color:#64748b;">规划基金 58 项 (53.7%) / 青年 50 项 · 81 家高校</div></div>' +
        '<div class="c-card"><div style="font-size:12px;font-weight:700;color:#0f172a;margin-bottom:6px;">🏛️ 2026立项领跑院校 (点击筛选本屏课题)</div><div class="c-fx">' +
          ['山东体育学院','北京体育大学','上海体育大学','苏州大学','武汉体育学院','南京体育学院','广州体育学院','四川师范大学'].map(function(u) { return '<button type="button" class="cssd-cite-btn hm-u-pill" data-u="' + u + '">' + u + '</button>'; }).join('') + '</div></div>' +
        '<div class="c-card"><div style="font-size:12px;font-weight:700;color:#0f172a;margin-bottom:6px;">🔥 2026研究热点风向标 (点击过滤课题)</div><div class="c-fx">' +
          [['数智/AI赋能','数智|AI|人工智能|多模态|数字|大数据|大语言|VR|智能'],['机制/路径','机制|路径'],['运动干预/处方','干预|处方|矫正|康复|主动健康'],['青少年/体教','青少年|儿童|幼儿|小学生|中小学生|学校体育|体教'],['全民健身/社区','全民健身|公共服务|社区|老旧小区'],['赛事/体育消费','赛事|联赛|消费|旅游|文旅|城超'],['老年/银发慢病','老年|银发|慢病|适老|肌少症'],['传统体育/非遗','传统体育|非遗|民族|武术|共同体']].map(function(th) { return '<button type="button" class="cssd-cite-btn hm-t-pill" data-rx="' + th[1] + '" data-label="' + th[0] + '">' + th[0] + '</button>'; }).join('') + '</div></div></div>' +
      '<div class="c-fxb" style="margin-bottom:12px;">' +
        '<div class="c-fx" style="flex:1;min-width:260px;"><input type="search" id="hm-proj-q" class="c-inp" style="max-width:460px;" placeholder="在首页大屏实时搜索 2026 国家社科 / 教育部立项课题名称、学者姓名、高校..."><button type="button" class="cssd-cite-btn" id="hm-proj-reset" style="display:none;color:#dc2626;">✕ 清除筛选</button></div>' +
        '<div id="hm-proj-status" style="font-size:12px;color:#64748b;">左右分栏同步展示 2026 最新立项动态 · 标题统一 15px 无衬线粗体</div></div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(440px,1fr));gap:16px;">' +
        '<div class="c-col"><div><div class="c-fxb" style="border-bottom:1px solid #f1f5f9;padding-bottom:10px;margin-bottom:8px;"><div class="c-fx"><span style="width:8px;height:18px;background:#dc2626;border-radius:4px;"></span><h3 style="margin:0;font-size:16px;font-weight:700;">2026国家社科基金·体育学立项动态</h3></div>' +
          '<div class="c-fx"><button type="button" class="cssd-cite-btn hm-ncat active" data-cat="">全部</button><button type="button" class="cssd-cite-btn hm-ncat" data-cat="重点项目">重点</button><button type="button" class="cssd-cite-btn hm-ncat" data-cat="一般项目">一般</button><button type="button" class="cssd-cite-btn hm-ncat" data-cat="青年项目">青年</button><button type="button" class="cssd-cite-btn hm-ncat" data-cat="西部项目">西部</button></div></div><div id="hm-nssfc-list"></div></div>' +
          '<div style="margin-top:12px;padding-top:10px;border-top:1px solid #f1f5f9;"><button type="button" class="cssd-tb-btn nssfc-active" id="hm-more-nssfc" style="width:100%;padding:7px;">📋 展开全部 2026 国家社科立项名单 & 统计分析报告 →</button></div></div>' +
        '<div class="c-col"><div><div class="c-fxb" style="border-bottom:1px solid #f1f5f9;padding-bottom:10px;margin-bottom:8px;"><div class="c-fx"><span style="width:8px;height:18px;background:#2563eb;border-radius:4px;"></span><h3 style="margin:0;font-size:16px;font-weight:700;">2026教育部人文社科·体育学立项动态</h3></div>' +
          '<div class="c-fx"><button type="button" class="cssd-cite-btn hm-mcat active" data-cat="">全部</button><button type="button" class="cssd-cite-btn hm-mcat" data-cat="规划基金项目">规划基金</button><button type="button" class="cssd-cite-btn hm-mcat" data-cat="青年基金项目">青年基金</button><button type="button" class="cssd-cite-btn hm-mcat" data-cat="西部和边疆地区">西部项目</button></div></div><div id="hm-moe-list"></div></div>' +
          '<div style="margin-top:12px;padding-top:10px;border-top:1px solid #f1f5f9;"><button type="button" class="cssd-tb-btn moe" id="hm-more-moe" style="width:100%;padding:7px;">📋 展开全部 108 项教育部人文社科名单 & 统计分析报告 →</button></div></div></div>';

    if (homeTarget.id === 'sp-metrics' && homeTarget.parentNode) homeTarget.parentNode.insertBefore(sec, homeTarget.nextSibling);
    else homeTarget.insertBefore(sec, homeTarget.firstChild);

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
      statusEl.innerHTML = (q || state.rx || state.nCat || state.mCat) ? ('当前筛选：国家社科 <b style="color:#dc2626;">' + fN.length + '</b> 项 · 教育部 <b style="color:#2563eb;">' + fM.length + '</b> 项' + (state.themeLabel ? ' · 主题：<b>' + state.themeLabel + '</b>' : '')) : '左右分栏同步展示 2026 最新立项动态 · 点击课题负责人或院校可直达详情';
      nListEl.innerHTML = fN.slice(0, 6).map(function(r) {
        var cls = r.pType === '重点项目' ? 'b-key' : (r.pType === '青年项目' ? 'b-yth' : 'b-gen');
        return '<div class="c-it"><div class="c-fxb" style="font-size:12px;color:#64748b;"><div class="c-fx"><span class="c-bdg ' + cls + '">' + r.pType + '</span><span>' + r.disc + '</span></div><span>🗓️ 2026立项 · ' + r.code + '</span></div><div class="c-tit" title="' + r.title.replace(/"/g, '&quot;') + '">' + r.title + '</div><div class="c-fxb" style="font-size:12.5px;color:#64748b;"><div>负责人：<a href="javascript:void(0)" class="hm-go-sch" data-kw="' + r.leader + '" style="color:#dc2626;font-weight:600;text-decoration:none;">' + r.leader + '</a> · <a href="javascript:void(0)" class="hm-go-unit" data-u="' + r.unit + '" style="color:#475569;text-decoration:none;">' + r.unit + '</a></div><button type="button" class="cssd-cite-btn hm-cite" data-a="' + r.leader + '" data-t="' + r.title.replace(/"/g, '&quot;') + '" data-u="' + r.unit + '" data-c="国家社科基金' + r.pType + '" data-no="' + r.code + '">📋 引文</button></div></div>';
      }).join('') || '<div style="padding:24px;text-align:center;color:#94a3b8;font-size:13px;">暂无匹配的2026国家社科课题</div>';
      mListEl.innerHTML = fM.slice(0, 6).map(function(r) {
        var isY = r[3].indexOf('青年') >= 0;
        return '<div class="c-it"><div class="c-fxb" style="font-size:12px;color:#64748b;"><div class="c-fx"><span class="c-bdg ' + (isY ? 'b-my' : 'b-mp') + '">' + (isY ? '青年基金' : '规划基金') + '</span><span>' + r[6] + '</span></div><span>🗓️ 2026立项 · 教育部序号' + r[0] + '</span></div><div class="c-tit" title="' + r[2].replace(/"/g, '&quot;') + '">' + r[2] + '</div><div class="c-fxb" style="font-size:12.5px;color:#64748b;"><div>申请人：<a href="javascript:void(0)" class="hm-go-sch" data-kw="' + r[4] + '" style="color:#2563eb;font-weight:600;text-decoration:none;">' + r[4] + '</a> · <a href="javascript:void(0)" class="hm-go-unit" data-u="' + r[5] + '" style="color:#475569;text-decoration:none;">' + r[5] + '</a></div><button type="button" class="cssd-cite-btn hm-cite" data-a="' + r[4] + '" data-t="' + r[2].replace(/"/g, '&quot;') + '" data-u="' + r[5] + '" data-c="教育部人文社科' + r[3] + '" data-no="公示序号' + r[0] + '">📋 引文</button></div></div>';
      }).join('') || '<div style="padding:24px;text-align:center;color:#94a3b8;font-size:13px;">暂无匹配的2026教育部课题</div>';
      sec.querySelectorAll('.hm-go-sch').forEach(function(a) { a.onclick = function() { triggerSearch(a.getAttribute('data-kw')); }; });
      sec.querySelectorAll('.hm-go-unit').forEach(function(a) { a.onclick = function() { state.q = a.getAttribute('data-u'); qInput.value = state.q; renderHomeShowcase(); }; });
      sec.querySelectorAll('.hm-cite').forEach(function(b) { b.onclick = function() { window.CSSDCitation.copy(b.getAttribute('data-a'), b.getAttribute('data-t'), b.getAttribute('data-u'), 2026, b.getAttribute('data-c'), b.getAttribute('data-no'), 'gbt'); }; });
    }
    window._cssdRenderHomeShowcase = renderHomeShowcase;
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
    sec.querySelectorAll('.hm-u-pill').forEach(function(btn) { btn.onclick = function() { state.q = btn.getAttribute('data-u'); qInput.value = state.q; renderHomeShowcase(); }; });
    sec.querySelectorAll('.hm-t-pill').forEach(function(btn) { btn.onclick = function() { state.rx = new RegExp(btn.getAttribute('data-rx'), 'i'); state.themeLabel = btn.getAttribute('data-label'); renderHomeShowcase(); }; });
    sec.querySelectorAll('.hm-ncat').forEach(function(btn) { btn.onclick = function() { sec.querySelectorAll('.hm-ncat').forEach(function(b) { b.classList.remove('active'); }); btn.classList.add('active'); state.nCat = btn.getAttribute('data-cat'); renderHomeShowcase(); }; });
    sec.querySelectorAll('.hm-mcat').forEach(function(btn) { btn.onclick = function() { sec.querySelectorAll('.hm-mcat').forEach(function(b) { b.classList.remove('active'); }); btn.classList.add('active'); state.mCat = btn.getAttribute('data-cat'); renderHomeShowcase(); }; });
    renderHomeShowcase();
  }

  function mountAllUI() {
    unifyPageTypography();
    mountAcademicCalendarBar();
    mountHomeProjectsBigScreen();
    var nssfcCnt = getNSSFC2026Data().total, nssfcTxt = nssfcCnt > 0 ? '(' + nssfcCnt + '项)' : '';
    if (!document.getElementById('cssd-float-pill')) {
      var pill = document.createElement('div'); pill.id = 'cssd-float-pill';
      pill.innerHTML = '<button type="button" id="fp-nssfc-list" style="background:linear-gradient(135deg,#dc2626,#b91c1c);color:#fff;border:none;padding:5px 12px;border-radius:20px;font-weight:700;cursor:pointer;font-size:12px;">🇨🇳 2026国家社科专刊 <span class="cssd-nssfc-cnt">' + nssfcTxt + '</span></button><button type="button" id="fp-moe-list" style="background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;border:none;padding:5px 12px;border-radius:20px;font-weight:700;cursor:pointer;font-size:12px;">🏅 2026教育部专刊 (108项)</button><button type="button" id="fp-cal" style="background:linear-gradient(135deg,#ea580c,#d97706);color:#fff;border:none;padding:5px 11px;border-radius:20px;font-weight:700;cursor:pointer;font-size:12px;">📅 学术日历</button><button type="button" id="fp-dark" style="background:rgba(255,255,255,0.12);color:#f8fafc;border:none;padding:5px 8px;border-radius:50%;cursor:pointer;font-size:12px;" title="切换护眼模式">🌙</button>';
      document.body.appendChild(pill);
      document.getElementById('fp-nssfc-list').onclick = function() { show2026PortalModal('nssfc', 'list'); };
      document.getElementById('fp-moe-list').onclick = function() { show2026PortalModal('moe', 'list'); };
      document.getElementById('fp-cal').onclick = showAcademicCalendarModal;
      document.getElementById('fp-dark').onclick = function() { document.documentElement.classList.toggle('cssd-dark'); var d = document.documentElement.classList.contains('cssd-dark'); localStorage.setItem('cssd_dark', d ? '1' : '0'); showToast(d ? '🌙 已开启夜间护眼模式' : '☀️ 已恢复日间模式'); };
    }
    var rinfo = document.getElementById('rinfo');
    if (rinfo && !rinfo.querySelector('.cssd-tb')) {
      var w = document.createElement('span'); w.className = 'cssd-tb';
      w.innerHTML = '<button type="button" class="cssd-tb-btn nssfc-active">🇨🇳 2026国家社科专刊 <span class="cssd-nssfc-cnt">' + nssfcTxt + '</span></button><button type="button" class="cssd-tb-btn moe">🏅 2026教育部专刊(108项)</button><button type="button" class="cssd-tb-btn">📅 学术会议日历</button><button type="button" class="cssd-tb-btn">🏆 院校立项榜</button>';
      w.children[0].onclick = function() { show2026PortalModal('nssfc', 'list'); };
      w.children[1].onclick = function() { show2026PortalModal('moe', 'list'); };
      w.children[2].onclick = showAcademicCalendarModal;
      w.children[3].onclick = showRanking;
      rinfo.appendChild(w);
    }
    var vwProj = document.getElementById('vw-projects');
    if (vwProj && !vwProj.querySelector('.cssd-moe-banner')) {
      var bn = document.createElement('div'); bn.className = 'cssd-moe-banner c-fxb';
      bn.innerHTML = '<div><b style="color:#0f172a;font-size:14px;">🔥 2026年度体育学立项双专刊：国家社科基金 & 教育部人文社科项目</b><span style="font-size:12px;color:#475569;margin-left:8px;">支持全名单检索 · TOP25高校榜 · 14大主题统计 · CSV导出</span></div><div class="c-fx"><button type="button" class="cssd-tb-btn nssfc-active" id="bn-nssfc-list">🇨🇳 2026国家社科名单 <span class="cssd-nssfc-cnt">' + nssfcTxt + '</span></button><button type="button" class="cssd-tb-btn" id="bn-nssfc-stat">📊 国家社科统计报告</button><button type="button" class="cssd-tb-btn moe" id="bn-moe-list">🏅 2026教育部名单(108项)</button><button type="button" class="cssd-tb-btn" id="bn-moe-stat">📈 教育部统计报告</button></div>';
      vwProj.insertBefore(bn, vwProj.firstChild);
      bn.querySelector('#bn-nssfc-list').onclick = function() { show2026PortalModal('nssfc', 'list'); };
      bn.querySelector('#bn-nssfc-stat').onclick = function() { show2026PortalModal('nssfc', 'stat'); };
      bn.querySelector('#bn-moe-list').onclick = function() { show2026PortalModal('moe', 'list'); };
      bn.querySelector('#bn-moe-stat').onclick = function() { show2026PortalModal('moe', 'stat'); };
    }
  }

  function init() {
    if (!document.getElementById('cssd-v12-css')) {
      var st = document.createElement('style'); st.id = 'cssd-v12-css';
      st.textContent = 'body{padding-bottom:68px!important;font-family:' + SANS + '!important}#vw-home h3,#vw-home h4,#vw-xuejie h3,#vw-xuejie h4,#vw-news h3,#vw-news h4,[class*="xuejie"] h3,[class*="xuejie"] h4,[class*="xuejie"] [class*="title"],[class*="daily"] h3,[class*="daily"] h4,[class*="daily"] [class*="title"],[class*="news"] h3,[class*="news"] h4{font-family:' + SANS + '!important;font-size:15px!important;font-weight:600!important;line-height:1.5!important;color:#0f172a!important}#cssd-home-projects-showcase{max-width:1180px;margin:22px auto 28px;padding:0 16px;font-family:' + SANS + '}.c-fx{display:flex;align-items:center;gap:6px;flex-wrap:wrap}.c-fxb{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}.c-card{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:12px 16px;box-shadow:0 2px 8px rgba(15,23,42,.04)}.c-col{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:16px 18px;box-shadow:0 4px 14px rgba(15,23,42,.04);display:flex;flex-direction:column;justify-content:space-between}.c-it{padding:10px 4px;border-bottom:1px solid #f1f5f9}.c-tit{font-size:15px!important;line-height:1.5!important;font-weight:600!important;color:#0f172a!important;font-family:' + SANS + '!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:6px 0 4px}.c-bdg{padding:1px 7px;border-radius:4px;font-size:11.5px;font-weight:600}.b-key{background:#fff7ed;color:#c2410c}.b-yth{background:#f0fdf4;color:#15803d}.b-gen{background:#eff6ff;color:#1d4ed8}.b-my{background:#fef9c3;color:#854d0e}.b-mp{background:#dcfce7;color:#166534}.c-inp{flex:1;min-width:200px;padding:6px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:13px;background:#fff}.c-sel{padding:6px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:13px;background:#fff}.cssd-tb{display:inline-flex;gap:6px;margin-left:8px;flex-wrap:wrap;vertical-align:middle}.cssd-tb-btn{background:#fff;border:1px solid #cbd5e1;color:#1e293b;padding:4px 10px;border-radius:6px;font-size:12px;cursor:pointer;font-weight:500;font-family:' + SANS + '}.cssd-tb-btn:hover,.cssd-tb-btn.active{background:#2563eb;color:#fff;border-color:#2563eb}.cssd-tb-btn.moe{background:#eff6ff;color:#1d4ed8;border-color:#93c5fd;font-weight:600}.cssd-tb-btn.nssfc-active{background:#dc2626;color:#fff;border-color:#dc2626;font-weight:600}.cssd-cite-btn{background:#f1f5f9;border:1px solid #cbd5e1;color:#334155;padding:2px 8px;border-radius:4px;font-size:11.5px;cursor:pointer;font-family:' + SANS + '}.cssd-cite-btn:hover,.cssd-cite-btn.active{background:#2563eb;color:#fff;border-color:#2563eb}#cssd-float-pill{position:fixed;bottom:22px;left:22px;z-index:99990;display:flex;align-items:center;gap:6px;background:rgba(15,23,42,.92);backdrop-filter:blur(8px);padding:6px 12px;border-radius:30px;box-shadow:0 8px 24px rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.15);font-size:12px;flex-wrap:wrap}.cssd-moe-banner{background:linear-gradient(90deg,#fef2f2,#eff6ff,#f0fdf4);border:1px solid #93c5fd;border-radius:10px;padding:10px 16px;margin:10px 0 14px}#cssd-toast{position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:rgba(15,23,42,.95);color:#fff;padding:9px 20px;border-radius:24px;font-size:13px;z-index:100009;pointer-events:none;opacity:0;transition:opacity .25s}#cssd-custom-modal{position:fixed;inset:0;background:rgba(15,23,42,.65);display:none;align-items:center;justify-content:center;z-index:100000;padding:16px}#cssd-custom-modal.active{display:flex}.cssd-c-content{background:#fff;width:100%;max-width:940px;max-height:88vh;border-radius:12px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 40px rgba(0,0,0,.3)}.cssd-c-hd{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid #e2e8f0}.cssd-c-hd h3{margin:0;font-size:16px}.cssd-c-close{background:none;border:none;font-size:18px;cursor:pointer}.cssd-c-body{padding:16px 18px;overflow-y:auto}.cssd-c-table{width:100%;border-collapse:collapse;font-size:13px;margin:0}.cssd-c-table th,.cssd-c-table td{padding:8px 10px;border:1px solid #e2e8f0;text-align:left}.cssd-c-table th{background:#f8fafc;position:sticky;top:0}#cssd-top{position:fixed;bottom:22px;right:24px;width:38px;height:38px;border-radius:50%;background:#2563eb;color:#fff;border:none;cursor:pointer;font-size:16px;display:none;align-items:center;justify-content:center;z-index:9997}.cssd-dark body,.cssd-dark html{background:#0b1120!important;color:#e2e8f0!important}.cssd-dark .sc,.cssd-dark .sp-person,.cssd-dark .cssd-c-content,.cssd-dark #mb,.cssd-dark .c-card,.cssd-dark .c-col{background:#1e293b!important;color:#f1f5f9!important;border-color:#334155!important}';
      document.head.appendChild(st);
    }
    if (localStorage.getItem('cssd_dark') === '1') document.documentElement.classList.add('cssd-dark');
    if (!document.getElementById('cssd-top')) {
      var tb = document.createElement('button'); tb.id = 'cssd-top'; tb.textContent = '↑'; tb.title = '回到顶部';
      tb.onclick = function() { window.scrollTo({ top: 0, behavior: 'smooth' }); };
      document.body.appendChild(tb);
      window.addEventListener('scroll', function() { tb.style.display = window.scrollY > 350 ? 'flex' : 'none'; }, { passive: true });
    }
    mountAllUI();
    var tries = 0, timer = setInterval(function() { tries++; mountAllUI(); if (tryEnrichDatasets() && tries > 20) clearInterval(timer); if (tries > 60) clearInterval(timer); }, 250);
    new MutationObserver(function() { mountAllUI(); }).observe(document.body, { childList: true, subtree: true });
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
