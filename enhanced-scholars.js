/**
 * CSSD 体育学人 - 全站终极增强套件 v9.0 (含2026教育部社科108项全名单与统计分析专题看板)
 * 1. 修复 const S / NOPSS_SPORTS_PROJECTS 作用域，自动合入 2026 教育部 108 项并刷新首页 KPI
 * 2. 新增【🏅 2026教育部社科(108项) 交互式专题报告】（含立项全名单检索、分类过滤、TOP25高校榜、14大研究主题点击即搜、CSV导出）
 * 3. 在“科研项目”(#vw-projects)与“学者目录”(#vw-scholars)同步挂载专题横幅与快捷按钮
 * 4. 原生搜索框支持拼音首字母检索 + 学者弹窗引文复制(GB/T 7714 & BibTeX)/学术海报/横向对比/勘误认领
 */
(function () {
  'use strict';

  // [0:公示序号, 1:项目类别, 2:项目名称, 3:项目类型, 4:申请人, 5:立项单位, 6:二级学科, 7:学科代码, 8:省份]
  var MOE_2026 = [[88,"西部和边疆地区","全球体育治理共同体的构建路径与中国方案研究","青年基金项目","任振朋","四川师范大学","体育人文社会学","soc","四川"],[89,"西部和边疆地区","县域中小学实施“学生体质强健计划”的创新机制与适配路径研究","规划基金项目","刘海东","成都师范学院","体育教育训练学","pe","四川"],[90,"西部和边疆地区","家校社协同育人视域下国家级非遗“红拳”大中小学一体化传承研究","规划基金项目","高野","西安外国语大学","民族传统体育学","trad","陕西"],[1360,"规划基金/青年基金","主动健康视域下城市老旧社区公共体育空间的效能评估与靶向更新机制研究","规划基金项目","丁国胜","湖南大学","运动人体科学","hum-sci","湖南"],[1361,"规划基金/青年基金","数智赋能小学生体育与健康核心素养情境化测评工具的开发与应用研究","青年基金项目","刁玉翠","苏州大学","运动人体科学","hum-sci","江苏"],[1362,"规划基金/青年基金","数智赋能青少年运动习惯养成的作用机制与优化路径研究","青年基金项目","杨安禄","中国矿业大学（北京）","体育人文社会学","soc","北京"],[1363,"规划基金/青年基金","中小学生每天2小时体育活动执行难点、推进策略与干预评估研究","规划基金项目","周玉兰","浙江师范大学","体育教育训练学","pe","浙江"],[1364,"规划基金/青年基金","多模态AI赋能下幼儿基本运动技能滞后风险早期识别与“家园协同”靶向干预的模式研究","规划基金项目","周喆啸","宁波大学","体育教育训练学","pe","浙江"],[1365,"规划基金/青年基金","碎片化运动对久坐大学生注意网络的影响：时间窗、最佳剂量及脑机制研究","青年基金项目","曾佳","福州大学","运动人体科学","hum-sci","福建"],[1366,"规划基金/青年基金","智慧教育背景下我国青少年运动健康风险的数字画像与预警机制研究","规划基金项目","陈海鸥","广东医科大学","运动人体科学","hum-sci","广东"],[1367,"规划基金/青年基金","健康第一视域下生成式AI驱动的青少年不良体态运动矫正模式构建与实证研究","青年基金项目","刘琳","南京体育学院","运动人体科学","hum-sci","江苏"],[1368,"规划基金/青年基金","体卫融合视域下青少年血压偏高精准运动干预的家校社协同模式构建与实证研究","规划基金项目","付常喜","徐州工程学院","运动人体科学","hum-sci","江苏"],[1369,"规划基金/青年基金","青少年生物节律紊乱相关行为的形成机制及体卫融合干预研究","青年基金项目","韩一鸣","广西师范大学","运动人体科学","hum-sci","广西"],[1370,"规划基金/青年基金","数智赋能西南民族特色村寨体文旅融合的创新机制与实践路径研究","规划基金项目","戴朝","四川师范大学","民族传统体育学","trad","四川"],[1371,"规划基金/青年基金","户外运动改善大学生抑郁症状的“情绪—认知”通路与脑网络机制研究","青年基金项目","史冀龙","厦门大学","运动人体科学","hum-sci","福建"],[1372,"规划基金/青年基金","“家—校—医”协同视域下青少年脊柱侧弯数智预警与精准运动干预研究","规划基金项目","杨惠","康复大学","运动人体科学","hum-sci","山东"],[1373,"规划基金/青年基金","我国青少年身体功能评估体系构建、常模制定与协同治理路径研究","规划基金项目","周霄","华中科技大学","运动人体科学","hum-sci","湖北"],[1374,"规划基金/青年基金","“两创”视域下岭南非遗传统体育文化的AI知识图谱构建与数字人传承创新研究","规划基金项目","关博","广州体育学院","民族传统体育学","trad","广东"],[1375,"规划基金/青年基金","县域枢纽型体育社会组织推动公共服务下沉的范式重构与机制优化研究","规划基金项目","白杨","宁波职业技术大学","体育人文社会学","soc","浙江"],[1376,"规划基金/青年基金","体育特色城市的类型生成机制与分类治理研究","规划基金项目","王成","南京大学","体育人文社会学","soc","江苏"],[1377,"规划基金/青年基金","数智促进我国残疾人康复健身体育高质量发展的实现机制与协同路径研究","规划基金项目","谢恩礼","南京体育学院","体育人文社会学","soc","江苏"],[1378,"规划基金/青年基金","中国近代体育慈善文献资料整理与研究","规划基金项目","牟艳","山东体育学院","体育人文社会学","soc","山东"],[1379,"规划基金/青年基金","我国中小学健康学校建设的典型模式与推进路径研究","规划基金项目","李志强","临沂职业学院","运动人体科学","hum-sci","山东"],[1380,"规划基金/青年基金","我国学龄前儿童（3—6岁）身体素养多模态评估与追踪干预研究","规划基金项目","谷颖","沈阳师范大学","体育教育训练学","pe","辽宁"],[1381,"规划基金/青年基金","银发经济视域下老年体育服务消费需求分层与精准供给研究","青年基金项目","周冲","武汉体育学院","运动人体科学","hum-sci","湖北"],[1382,"规划基金/青年基金","“票根经济”视域下我国群众性体育赛事品牌培育机制与路径研究","规划基金项目","李勇","山东体育学院","体育人文社会学","soc","山东"],[1383,"规划基金/青年基金","2型糖尿病（T2DM）患者运动功能监测与干预效果多维度评价体系构建研究","青年基金项目","程经纬","河南体育学院","运动人体科学","hum-sci","河南"],[1384,"规划基金/青年基金","面向VR体育动作训练的多模态感知与智能交互机制研究","青年基金项目","李慧宇","山东财经大学","体育教育训练学","pe","山东"],[1385,"规划基金/青年基金","数智赋能大学生体质健康管理：机制构建、平台验证与路径优化研究","规划基金项目","姜卫芬","天津医科大学","运动人体科学","hum-sci","天津"],[1386,"规划基金/青年基金","具身认知视域下认知—运动双任务训练促进小学生身心健康的机制研究","青年基金项目","陈娟","湖北文理学院","运动人体科学","hum-sci","湖北"],[1387,"规划基金/青年基金","社区体育公共服务“数字悬浮”的形成机理与治理策略研究","规划基金项目","杜兴彬","山东华宇工学院","体育人文社会学","soc","山东"],[1388,"规划基金/青年基金","“行为—认知”视角下大学生抑郁症状风险分层与精准运动干预研究","青年基金项目","石林","成都体育学院","运动人体科学","hum-sci","四川"],[1389,"规划基金/青年基金","“体教融合”背景下高校肥胖学生体育课程精准化重构与实证研究","规划基金项目","李燕春","北京体育大学","体育教育训练学","pe","北京"],[1390,"规划基金/青年基金","基于多源数据融合的大学生运动员学业倦怠预警模型与干预策略研究","青年基金项目","武欣然","中山大学","体育教育训练学","pe","广东"],[1391,"规划基金/青年基金","义务教育阶段“每天综合体育活动2小时”落实中的有效运动时间测度与提升机制研究","规划基金项目","张艳","河海大学","体育教育训练学","pe","江苏"],[1392,"规划基金/青年基金","数智赋能儿童青少年体态健康动态监测与协同干预机制研究","青年基金项目","唐芳","安庆师范大学","运动人体科学","hum-sci","安徽"],[1393,"规划基金/青年基金","赛事经济对城际消费资源的分配效应与包容性治理研究","青年基金项目","韩苗苗","山东工商学院","体育人文社会学","soc","山东"],[1394,"规划基金/青年基金","“十五五”时期数智体育赋能老年慢病主动健康的风险预警机制与公共服务治理研究","青年基金项目","宋杨","宁波大学","运动人体科学","hum-sci","浙江"],[1395,"规划基金/青年基金","基于多模态数据融合的儿童少年基础运动技能发展评估与预测模型构建研究","青年基金项目","赵刚","苏州大学","体育教育训练学","pe","江苏"],[1396,"规划基金/青年基金","多模态运动矫正儿童青少年不良体态干预模式构建与应用研究","青年基金项目","梁计陵","中南大学","运动人体科学","hum-sci","湖南"],[1397,"规划基金/青年基金","群众体育赛事促进各民族交往交流交融的机制研究","规划基金项目","王继雄","内蒙古财经大学","民族传统体育学","trad","内蒙古"],[1398,"规划基金/青年基金","青少年运动猝死多模态智能风险评估与防范应用研究","规划基金项目","吴卫兵","上海体育大学","运动人体科学","hum-sci","上海"],[1399,"规划基金/青年基金","数字脱瘾与大学生运动行为的双向关联机制及协同促进研究","规划基金项目","周俣涛","湖南工业大学","体育人文社会学","soc","湖南"],[1400,"规划基金/青年基金","乡村振兴背景下农村“一老一小”代际体育康养的促进机制与干预模式研究","规划基金项目","徐国琴","广州体育学院","体育人文社会学","soc","广东"],[1401,"规划基金/青年基金","生成式人工智能嵌入体育消费场景创新的实现机制与路径研究","规划基金项目","王冠瑛","燕山大学","体育人文社会学","soc","河北"],[1402,"规划基金/青年基金","体医融合视域下青少年抑郁症状的“校—医—家”协同运动干预模式构建与实证研究","规划基金项目","尹剑春","上海师范大学","运动人体科学","hum-sci","上海"],[1403,"规划基金/青年基金","数智赋能社区运动健康中心效能跃升影响因素、作用机理及推进路径研究","青年基金项目","李紫浩","湖南农业大学","运动人体科学","hum-sci","湖南"],[1404,"规划基金/青年基金","主动健康视域下数智赋能“三高”人群运动干预的多模态模型构建研究","青年基金项目","罗维","南京体育学院","运动人体科学","hum-sci","江苏"],[1405,"规划基金/青年基金","数字包容视域下城乡老年人体育参与鸿沟的形成机制与治理路径研究","规划基金项目","谢劲","台州学院","运动人体科学","hum-sci","浙江"],[1406,"规划基金/青年基金","认知参与型身体活动对手机依赖青少年执行功能的干预效果及机制研究","青年基金项目","孟繁莹","湖州师范大学","运动人体科学","hum-sci","浙江"],[1407,"规划基金/青年基金","闽籍华侨华人体育史料的搜集、整理与研究（1900—2000）","规划基金项目","傅亮","厦门大学","体育人文社会学","soc","福建"],[1408,"规划基金/青年基金","老年慢性病人群运动依从性的障碍生成机制及多模态干预研究","青年基金项目","李红梅","中南民族大学","运动人体科学","hum-sci","湖南"],[1409,"规划基金/青年基金","积极老龄化视域下社区老年膝骨关节炎患者跌倒风险分层预测与数智化运动康复服务路径研究","青年基金项目","沈培鑫","山东体育学院","运动人体科学","hum-sci","山东"],[1410,"规划基金/青年基金","青少年24h活动行为聚类的社会生态机制及其靶向干预策略研究","规划基金项目","马生霞","四川师范大学","体育人文社会学","soc","四川"],[1411,"规划基金/青年基金","中央苏区学校体育治理的制度逻辑与历史经验研究","规划基金项目","贺鑫森","江西水利电力大学","体育教育训练学","pe","江西"],[1412,"规划基金/青年基金","“两个结合”视域下奥林匹克价值观的代际传承张力与本土化实践策略研究","规划基金项目","闫丽敏","河南师范大学","体育人文社会学","soc","河南"],[1413,"规划基金/青年基金","我国学校体育数字化场景建构的应然图景与行动路径研究","规划基金项目","代方梅","湖北大学","体育教育训练学","pe","湖北"],[1414,"规划基金/青年基金","青少年运动动机的生态培育机制与身体活动精准促进研究","规划基金项目","李娟","河北师范大学","体育人文社会学","soc","河北"],[1415,"规划基金/青年基金","运动技术话语具身语义编码体系构建及项群效度检验研究","青年基金项目","赵飞达","湖州师范大学","体育人文社会学","soc","浙江"],[1416,"规划基金/青年基金","黄河滩区村落民俗体育口述史料搜集、整理与研究","青年基金项目","窦圣浩","济宁学院","民族传统体育学","trad","山东"],[1417,"规划基金/青年基金","“十五五”时期健康学校建设的体育资源城乡联动模式研究","规划基金项目","郭良如","衡阳师范学院","运动人体科学","hum-sci","湖南"],[1418,"规划基金/青年基金","中华传统体育“走出去”的国别适应机制研究","青年基金项目","陈静越","韩山师范学院","民族传统体育学","trad","广东"],[1419,"规划基金/青年基金","3—6岁幼儿运动智能结构模型、发展规律与体育促进路径研究","青年基金项目","武继莹","沈阳体育学院","体育教育训练学","pe","辽宁"],[1420,"规划基金/青年基金","老旧小区嵌入式体育场地设施协同供给的理论逻辑与实现路径研究","青年基金项目","欧亚","湖南网络工程职业学院","体育人文社会学","soc","湖南"],[1421,"规划基金/青年基金","体教医融合视域下小学生近视防控与学校体育活动协同推进的机制与路径研究","规划基金项目","林文弢","珠海科技学院","体育教育训练学","pe","广东"],[1422,"规划基金/青年基金","基于多模态AI情绪识别的大学生抑郁倾向运动处方动态干预研究","规划基金项目","汪君民","淮阴师范学院","运动人体科学","hum-sci","江苏"],[1423,"规划基金/青年基金","具身正念促进大学生运动参与的驱动机制与路径研究","青年基金项目","张曜","苏州大学","体育人文社会学","soc","江苏"],[1424,"规划基金/青年基金","混合现实技术和人工智能技术赋能基层裁判员训练的机制、路径与应用研究","规划基金项目","邵坚博","新疆理工学院","体育教育训练学","pe","新疆"],[1425,"规划基金/青年基金","大学生24小时活动行为失衡的抑郁风险评估及精准干预研究","规划基金项目","王军利","中国矿业大学","运动人体科学","hum-sci","江苏"],[1426,"规划基金/青年基金","新中国成立以来国乒荣耀创造者集体记忆的社会建构研究","规划基金项目","何敬堂","淮南师范学院","体育人文社会学","soc","安徽"],[1427,"规划基金/青年基金","场景创新赋能体育旅游消费潜力释放长效机制与优化策略研究","规划基金项目","唐月亮","湖南财政经济学院","体育人文社会学","soc","湖南"],[1428,"规划基金/青年基金","基于大语言模型的世居高原老年人KOA个性化运动干预研究","青年基金项目","周惠宣","北京体育大学","运动人体科学","hum-sci","北京"],[1429,"规划基金/青年基金","数智技术介入运动训练的经验与数据协同机制及路径研究","青年基金项目","张泽英","太原理工大学","体育教育训练学","pe","山西"],[1430,"规划基金/青年基金","基于行动者网络理论的青少年体质健康多元协同网络的构建与实践研究","青年基金项目","范卉颖","上海师范大学","运动人体科学","hum-sci","上海"],[1431,"规划基金/青年基金","儿童身体姿态与基本运动技能的动态互馈机制及模型构建研究","规划基金项目","荆文","山东师范大学","体育教育训练学","pe","山东"],[1432,"规划基金/青年基金","数智赋能社区老年人运动功能衰退风险识别与分层干预研究","青年基金项目","董芮","华南师范大学","运动人体科学","hum-sci","广东"],[1433,"规划基金/青年基金","青少年攻击行为的跨诊断运动干预研究","青年基金项目","温朋飞","广州体育学院","体育人文社会学","soc","广东"],[1434,"规划基金/青年基金","基于健康画像的碎片化运动促进农村女性产后康复模式构建及实证研究","青年基金项目","程林","广东技术师范大学","运动人体科学","hum-sci","广东"],[1435,"规划基金/青年基金","体育锻炼增益升学关键期青少年学业情绪的作用机制与靶向干预研究","青年基金项目","程文娟","山东青年政治学院","体育教育训练学","pe","山东"],[1436,"规划基金/青年基金","赛事驱动城乡文体旅融合共同体构建机制研究","规划基金项目","孙中芹","曲阜师范大学","体育人文社会学","soc","山东"],[1437,"规划基金/青年基金","殷墟甲骨文体育元素的系统考释、理论阐释与活化传承研究","规划基金项目","郭宇刚","安阳师范学院","民族传统体育学","trad","河南"],[1438,"规划基金/青年基金","基于AI赋能的乒乓球技战术诊断体系构建与应用研究","规划基金项目","徐君伟","河南财经政法大学","体育人文社会学","soc","河南"],[1439,"规划基金/青年基金","数智赋能老年人肌少症风险预警与传统体育干预体系的建设路径研究","青年基金项目","李新星","沈阳体育学院","运动人体科学","hum-sci","辽宁"],[1440,"规划基金/青年基金","“城超”激活“城市文化资本”的机理与路径研究","规划基金项目","张庆如","苏州大学","体育人文社会学","soc","江苏"],[1441,"规划基金/青年基金","运动联合正念干预缓解阈下抑郁大学生认知情绪失调的机制与路径研究","青年基金项目","李夏雯","上海健康医学院","运动人体科学","hum-sci","上海"],[1442,"规划基金/青年基金","基于数字画像的大学生体质健康精准干预机制与实现路径研究","规划基金项目","耿元文","燕山大学","运动人体科学","hum-sci","河北"],[1443,"规划基金/青年基金","中小学生体质健康监测大数据驱动的精准干预与动态评价体系构建","青年基金项目","赵怀超","河南大学","运动人体科学","hum-sci","河南"],[1444,"规划基金/青年基金","城市社区智慧体育服务适老化的水平测度与驱动机制研究","青年基金项目","罗恒","湘南学院","体育人文社会学","soc","湖南"],[1445,"规划基金/青年基金","数据驱动的体育公园夜间建成环境对老年人身体活动的影响及适老化研究","青年基金项目","林桐","常州工学院","运动人体科学","hum-sci","江苏"],[1446,"规划基金/青年基金","数智赋能我国青少年有氧和力量协同发展的理论建构与应用研究","青年基金项目","李振","中国石油大学（华东）","体育人文社会学","soc","山东"],[1447,"规划基金/青年基金","中国式现代化视域下全民健身公共服务均等化评估与区域差异调控机制研究","青年基金项目","郭琪","西安工程大学","体育人文社会学","soc","陕西"],[1448,"规划基金/青年基金","健康生态学视角下社区老年人认知衰弱影响因素多维评估与运动营养联合干预模式实证研究","规划基金项目","蔡明","上海健康医学院","运动人体科学","hum-sci","上海"],[1449,"规划基金/青年基金","大型体育赛事媒介生态中的中华文化符号转译机制与传播效应研究","规划基金项目","刘金锋","淮南师范学院","体育人文社会学","soc","安徽"],[1450,"规划基金/青年基金","残疾人体育公共服务供需动态适配模型构建与实证研究","青年基金项目","张巧","闽江大学","体育人文社会学","soc","福建"],[1451,"规划基金/青年基金","多智能体赋能学生终身运动习惯养成的系统与实践干预研究","规划基金项目","孙国欣","西南交通大学","体育人文社会学","soc","四川"],[1452,"规划基金/青年基金","“面向人人”班级联赛促进中小学生体育深度学习的作用机制及实现路径研究","青年基金项目","郭洪亮","北京体育大学","体育教育训练学","pe","北京"],[1453,"规划基金/青年基金","乡村振兴背景下西部特岗体育教师职业承诺的影响机制与长效激励：基于“留任导向”的研究","规划基金项目","崔昌水","西安外事学院","体育人文社会学","soc","陕西"],[1454,"规划基金/青年基金","藏羌彝走廊体育非物质文化遗产采辑与数字资源库建设研究","青年基金项目","严小英","成都师范学院","民族传统体育学","trad","四川"],[1455,"规划基金/青年基金","民族传统体育铸牢边境青少年中华民族共同体意识的心理机制与组态路径研究","规划基金项目","黄华敏","广西民族师范学院","民族传统体育学","trad","广西"],[1456,"规划基金/青年基金","群众体育赛事赛后效应转化与基层长效治理机制研究","规划基金项目","宋述光","中国石油大学（华东）","体育人文社会学","soc","山东"],[1457,"规划基金/青年基金","城市社区体育组织服务能力的数智化动态评估与精准建设","规划基金项目","丁洁","河南师范大学","体育人文社会学","soc","河南"],[1458,"规划基金/青年基金","我国运动训练本科专业布点的数量扩张与质量保障研究","青年基金项目","吴彰忠","武汉体育学院","体育教育训练学","pe","湖北"],[1459,"规划基金/青年基金","地方营造与认同重建中的老工业城市群众体育赛事田野研究","规划基金项目","孙素玲","沈阳体育学院","体育人文社会学","soc","辽宁"],[1460,"规划基金/青年基金","长三角城市边角空间体育化微更新的场景创新与治理体系研究","规划基金项目","吴明华","常州大学","体育人文社会学","soc","江苏"],[1461,"规划基金/青年基金","数智技术赋能户外运动消费场景创新的作用机制与组态路径研究","青年基金项目","刘超","安徽师范大学","体育人文社会学","soc","安徽"],[1462,"规划基金/青年基金","主动健康视域下青少年生活体育化服务体系研究","规划基金项目","陆贝","潍坊学院","运动人体科学","hum-sci","山东"],[1463,"规划基金/青年基金","扩大内需战略下居民体育消费惯性的形成机理与释放路径研究","青年基金项目","李一易","山东体育学院","体育人文社会学","soc","山东"],[1464,"规划基金/青年基金","我国职业体育联盟交叉补贴政策失灵的制度归因与治理路径研究","青年基金项目","周腾军","西南财经大学","体育人文社会学","soc","四川"]];
  var MOE_TOP25 = [["苏州大学",4,"3.7%"],["山东体育学院",4,"3.7%"],["四川师范大学",3,"2.8%"],["南京体育学院",3,"2.8%"],["广州体育学院",3,"2.8%"],["北京体育大学",3,"2.8%"],["沈阳体育学院",3,"2.8%"],["成都师范学院",2,"1.9%"],["宁波大学",2,"1.9%"],["厦门大学",2,"1.9%"],["武汉体育学院",2,"1.9%"],["燕山大学",2,"1.9%"],["上海师范大学",2,"1.9%"],["湖州师范大学",2,"1.9%"],["河南师范大学",2,"1.9%"],["淮南师范学院",2,"1.9%"],["上海健康医学院",2,"1.9%"],["中国石油大学（华东）",2,"1.9%"],["西安外国语大学",1,"0.9%"],["湖南大学",1,"0.9%"],["中国矿业大学（北京）",1,"0.9%"],["浙江师范大学",1,"0.9%"],["福州大学",1,"0.9%"],["广东医科大学",1,"0.9%"],["徐州工程学院",1,"0.9%"]];
  var MOE_THEMES = [["机制/路径研究",58,"53.7%","机制|路径"],["数智/AI/大数据赋能",41,"38.0%","数智|AI|人工智能|多模态|数字|大数据|大语言|VR|智能"],["运动干预/运动处方",33,"30.6%","干预|处方|矫正|康复"],["青少年/儿童/幼儿体质健康",28,"25.9%","青少年|儿童|幼儿|小学生|中小学生"],["老年/银发/慢病",12,"11.1%","老年|银发|慢病|適老|适老|三高|糖尿病|肌少症"],["社区体育与公共服务",12,"11.1%","社区|公共服务|老旧小区"],["赛事经济/联赛",9,"8.3%","赛事|联赛|城超|票根"],["心理健康（抑郁/情绪/正念）",9,"8.3%","抑郁|情绪|正念|心理|倦怠|攻击"],["体育消费/体旅融合",7,"6.5%","消费|旅游|文旅|文体旅"],["学校体育/体教融合",7,"6.5%","学校体育|体教|体育课程|体育活动"],["传统体育/非遗",6,"5.6%","传统体育|非遗|红拳|民俗|甲骨文"],["乡村振兴/县域",5,"4.6%","乡村|农村|县域"],["国际传播/全球治理",3,"2.8%","全球|走出去|奥林匹克|华侨"],["残疾人/特殊人群",3,"2.8%","残疾"]];

  function getS() { return (typeof S !== 'undefined' && Array.isArray(S)) ? S : (Array.isArray(window.S) ? window.S : null); }
  function getP() { return (typeof NOPSS_SPORTS_PROJECTS !== 'undefined' && Array.isArray(NOPSS_SPORTS_PROJECTS)) ? NOPSS_SPORTS_PROJECTS : (Array.isArray(window.NOPSS_SPORTS_PROJECTS) ? window.NOPSS_SPORTS_PROJECTS : null); }

  // 1. 原位合入 108 项教育部项目 & 注入拼音首字母索引
  var _merged = false;
  function enrichDatasets() {
    if (_merged) return true;
    var scholars = getS();
    if (!scholars || !scholars.length) return false;
    _merged = true;
    window.S = scholars;
    var projects = getP();
    if (projects) window.NOPSS_SPORTS_PROJECTS = projects;

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
      var it = MOE_2026[j];
      var code = it[0], subCat = it[1], title = it[2], pType = it[3], name = it[4], unit = it[5], dL = it[6], dC = it[7], prov = it[8];
      var pCode = '2026-教育部序号' + code, catFull = '教育部人文社科' + pType;
      var sProj = { code: pCode, category: catFull, title: title, unit: unit, year: 2026 };

      var found = scholarMap.get(name + '_' + unit) || scholars.find(function(x) {
        return x.n === name && ((x.institution || '').indexOf(unit) >= 0 || unit.indexOf(x.institution || '') >= 0);
      });

      if (found) {
        if (!Array.isArray(found.fundedProjects)) found.fundedProjects = [];
        if (!found.fundedProjects.some(function(p) { return p.title === title; })) {
          found.fundedProjects.unshift(sProj);
          found.projectCount = (found.projectCount || 0) + 1;
        }
        if (!Array.isArray(found.hats)) found.hats = [];
        if (found.hats.indexOf('2026教育部社科') < 0) found.hats.push('2026教育部社科');
      } else {
        maxId++;
        var ns = { id: maxId, n: name, e: name, institution: unit, s: unit, dept: '体育学院', title: pType.indexOf('青年') >= 0 ? '青年学者' : '教授/副教授', disc: dC, dL: dL, hats: ['2026教育部社科'], hon: ['2026教育部人文社科立项'], r: title, i: name ? name[0] : '学', c: '#2563eb', projectCount: 1, fundedProjects: [sProj] };
        scholars.unshift(ns);
        scholarMap.set(name + '_' + unit, ns);
      }

      if (projects && !projects.some(function(p) { return p.title === title; })) {
        projects.unshift({ year: 2026, y: 2026, code: pCode, category: pType.indexOf('青年') >= 0 ? '青年项目' : '规划基金项目', type: catFull, subject: '体育学', title: title, leader: name, pi: name, name: name, unit: unit, institution: unit, approvedDate: '2026', province: prov, outcome: subCat, unitSystem: '教育部人文社科项目', source: '教育部社科司', sourceUrl: '' });
      }
    }
    try {
      if (typeof window.spRefresh === 'function') window.spRefresh();
      if (typeof window.renderSc === 'function') window.renderSc();
      if (typeof window.renderPr === 'function') window.renderPr();
      if (typeof window.renderProjects === 'function') window.renderProjects();
    } catch (e) {}
    return true;
  }

  // 2. Toast 与标准引文复制 + CSV 导出
  function showToast(msg) {
    var t = document.getElementById('cssd-toast');
    if (!t) {
      t = document.createElement('div'); t.id = 'cssd-toast';
      t.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:rgba(15,23,42,0.94);color:#fff;padding:8px 18px;border-radius:24px;font-size:13px;z-index:100005;box-shadow:0 6px 16px rgba(0,0,0,0.22);transition:opacity 0.25s;pointer-events:none;opacity:0;';
      document.body.appendChild(t);
    }
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

  function exportMOE2026CSV(rows) {
    var data = rows || MOE_2026;
    var hd = '公示序号,项目类别,项目名称,项目类型,申请人,立项单位,二级学科,省份\n';
    var body = data.map(function(r) {
      return [r[0], '"' + r[1] + '"', '"' + r[2].replace(/"/g, '""') + '"', '"' + r[3] + '"', '"' + r[4] + '"', '"' + r[5] + '"', '"' + r[6] + '"', '"' + r[8] + '"'].join(',');
    }).join('\n');
    var blob = new Blob(['\uFEFF' + hd + body], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = '2026教育部人文社科_体育学立项名单_' + data.length + '项.csv'; a.click();
    showToast('✅ 已导出 ' + data.length + ' 项教育部人文社科项目 (Excel/CSV)');
  }

  // 3. 联动原站搜索与自定义弹窗
  function triggerSearch(kw) {
    var m = document.getElementById('cssd-custom-modal'); if (m) m.className = '';
    var tab = document.querySelector('[onclick*="scholars"], [data-vw="scholars"], #nav-scholars');
    if (tab) tab.click();
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

  // 4. 【核心新增】2026教育部人文社科·体育学立项全名单与统计分析专题看板
  function showMOE2026SpecialModal(defaultTab) {
    var html = '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:14px;border-bottom:1px solid #e2e8f0;padding-bottom:10px;">' +
      '<div style="display:flex;gap:8px;">' +
        '<button type="button" class="cssd-tb-btn active" id="moe-tab-list">📋 立项全名单 (108项)</button>' +
        '<button type="button" class="cssd-tb-btn" id="moe-tab-stat">📊 统计分析报告 (TOP25单位 & 14大主题)</button>' +
      '</div>' +
      '<button type="button" class="cssd-tb-btn moe" id="moe-exp-btn">📥 导出 Excel/CSV</button>' +
    '</div>' +
    '<div id="moe-pane-list">' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">' +
        '<input type="search" id="moe-q" placeholder="搜索项目名称 / 申请人 / 立项单位..." style="flex:1;min-width:200px;padding:6px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:13px;">' +
        '<select id="moe-type" style="padding:6px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:13px;">' +
          '<option value="">全部类型 (108项)</option>' +
          '<option value="规划基金项目">规划基金项目 (58项 · 53.7%)</option>' +
          '<option value="青年基金项目">青年基金项目 (50项 · 46.3%)</option>' +
          '<option value="西部和边疆地区">西部和边疆地区 (3项 · 2.8%)</option>' +
        '</select>' +
      '</div>' +
      '<div id="moe-theme-chips" style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px;"></div>' +
      '<div id="moe-count-bar" style="font-size:12px;color:#64748b;margin-bottom:8px;"></div>' +
      '<div style="max-height:52vh;overflow-y:auto;border:1px solid #e2e8f0;border-radius:8px;">' +
        '<table class="cssd-c-table" style="margin:0;"><thead><tr><th style="width:52px;">序号</th><th>项目名称</th><th style="width:86px;">类型</th><th style="width:72px;">申请人</th><th style="width:130px;">立项单位</th><th style="width:66px;">操作</th></tr></thead><tbody id="moe-tbody"></tbody></table>' +
      '</div>' +
    '</div>' +
    '<div id="moe-pane-stat" style="display:none;">' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin-bottom:16px;">' +
        '<div style="background:#eff6ff;padding:10px 12px;border-radius:8px;"><div style="font-size:11px;color:#1e40af;">体育学立项总数</div><div style="font-size:20px;font-weight:800;color:#1d4ed8;">108 项</div><div style="font-size:11px;color:#64748b;">共 81 家单位获批</div></div>' +
        '<div style="background:#f0fdf4;padding:10px 12px;border-radius:8px;"><div style="font-size:11px;color:#166534;">规划基金项目</div><div style="font-size:20px;font-weight:800;color:#15803d;">58 项</div><div style="font-size:11px;color:#64748b;">占比 53.7%</div></div>' +
        '<div style="background:#fefce8;padding:10px 12px;border-radius:8px;"><div style="font-size:11px;color:#854d0e;">青年基金项目</div><div style="font-size:20px;font-weight:800;color:#a16207;">50 项</div><div style="font-size:11px;color:#64748b;">占比 46.3%</div></div>' +
        '<div style="background:#fdf2f8;padding:10px 12px;border-radius:8px;"><div style="font-size:11px;color:#9d174d;">西部和边疆项目</div><div style="font-size:20px;font-weight:800;color:#be185d;">3 项</div><div style="font-size:11px;color:#64748b;">规划/青年 105 项(97.2%)</div></div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px;">' +
        '<div><h4 style="margin:0 0 8px;font-size:13px;">三、立项单位分布 TOP25（18家获批2项及以上，点击筛选）</h4>' +
          '<div style="max-height:42vh;overflow-y:auto;border:1px solid #e2e8f0;border-radius:6px;"><table class="cssd-c-table"><thead><tr><th>单位名称</th><th style="text-align:right;">数量</th><th style="text-align:right;">占比</th></tr></thead><tbody>' +
          MOE_TOP25.map(function(u) { return '<tr class="moe-filter-unit" data-u="' + u[0] + '" style="cursor:pointer;"><td><b style="color:#2563eb;">' + u[0] + '</b></td><td style="text-align:right;font-weight:bold;">' + u[1] + ' 项</td><td style="text-align:right;color:#64748b;">' + u[2] + '</td></tr>'; }).join('') +
          '</tbody></table></div></div>' +
        '<div><h4 style="margin:0 0 8px;font-size:13px;">四、研究主题分布（14大热点主题，点击过滤课题）</h4>' +
          '<div style="max-height:42vh;overflow-y:auto;padding-right:4px;">' +
          MOE_THEMES.map(function(th) {
            return '<div class="moe-filter-theme" data-rx="' + th[3] + '" data-label="' + th[0] + '" style="margin-bottom:8px;cursor:pointer;">' +
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:2px;"><span style="color:#1e40af;font-weight:600;">' + th[0] + '</span><span>' + th[1] + ' 项 (' + th[2] + ')</span></div>' +
              '<div style="height:7px;background:#e2e8f0;border-radius:4px;overflow:hidden;"><div style="width:' + th[2] + ';height:100%;background:#2563eb;"></div></div>' +
            '</div>';
          }).join('') +
          '</div></div>' +
      '</div>' +
    '</div>';

    openModal('🏅 2026年度教育部人文社会科学研究项目·体育学立项专刊 (共108项)', html, function(body) {
      var curRows = MOE_2026.slice();
      var activeRx = null, activeThemeLabel = '';
      var qInput = body.querySelector('#moe-q'), typeSel = body.querySelector('#moe-type'), tbody = body.querySelector('#moe-tbody'), cntBar = body.querySelector('#moe-count-bar'), chipsBox = body.querySelector('#moe-theme-chips');

      chipsBox.innerHTML = '<span style="font-size:11px;color:#64748b;line-height:22px;">热点主题：</span>' +
        MOE_THEMES.slice(0, 8).map(function(th) {
          return '<button type="button" class="cssd-cite-btn moe-chip" data-rx="' + th[3] + '" data-label="' + th[0] + '">' + th[0].split('/')[0] + '(' + th[1] + ')</button>';
        }).join('') + '<button type="button" class="cssd-cite-btn" id="moe-reset-chip" style="display:none;color:#dc2626;">✕ 清除主题</button>';

      function renderRows() {
        var q = (qInput.value || '').trim().toLowerCase();
        var tVal = typeSel.value;
        curRows = MOE_2026.filter(function(r) {
          if (tVal === '西部和边疆地区' && r[1] !== '西部和边疆地区') return false;
          if (tVal && tVal !== '西部和边疆地区' && r[3] !== tVal) return false;
          if (activeRx && !activeRx.test(r[2])) return false;
          if (q && (r[2] + ' ' + r[4] + ' ' + r[5] + ' ' + r[0] + ' ' + r[6]).toLowerCase().indexOf(q) < 0) return false;
          return true;
        });
        cntBar.innerHTML = '当前显示 <b>' + curRows.length + '</b> / 108 项' + (activeThemeLabel ? ' · 主题筛选：<b style="color:#2563eb;">' + activeThemeLabel + '</b>' : '');
        tbody.innerHTML = curRows.map(function(r) {
          var badge = r[3].indexOf('青年') >= 0 ? '<span style="background:#fef9c3;color:#854d0e;padding:1px 5px;border-radius:4px;font-size:11px;">青年基金</span>' : '<span style="background:#dcfce7;color:#166534;padding:1px 5px;border-radius:4px;font-size:11px;">规划基金</span>';
          if (r[1] === '西部和边疆地区') badge += ' <span style="background:#fce7f3;color:#9d174d;padding:1px 4px;border-radius:4px;font-size:10px;">西部</span>';
          return '<tr>' +
            '<td style="color:#64748b;font-size:12px;">' + r[0] + '</td>' +
            '<td><div style="font-weight:600;color:#0f172a;">' + r[2] + '</div><div style="font-size:11px;color:#64748b;">' + r[6] + ' · ' + r[8] + '</div></td>' +
            '<td>' + badge + '</td>' +
            '<td><a href="javascript:void(0)" class="moe-go-sch" data-name="' + r[4] + '" style="color:#2563eb;font-weight:600;text-decoration:none;">' + r[4] + '</a></td>' +
            '<td><a href="javascript:void(0)" class="moe-go-unit" data-u="' + r[5] + '" style="color:#334155;text-decoration:none;">' + r[5] + '</a></td>' +
            '<td><button type="button" class="cssd-cite-btn moe-cite" data-a="' + r[4] + '" data-t="' + r[2].replace(/"/g, '&quot;') + '" data-u="' + r[5] + '" data-c="教育部人文社科' + r[3] + '" data-no="' + r[0] + '">📋 引文</button></td>' +
          '</tr>';
        }).join('');

        tbody.querySelectorAll('.moe-go-sch').forEach(function(a) { a.onclick = function() { triggerSearch(a.getAttribute('data-name')); }; });
        tbody.querySelectorAll('.moe-go-unit').forEach(function(a) { a.onclick = function() { qInput.value = a.getAttribute('data-u'); renderRows(); }; });
        tbody.querySelectorAll('.moe-cite').forEach(function(b) {
          b.onclick = function() { window.CSSDCitation.copy(b.getAttribute('data-a'), b.getAttribute('data-t'), b.getAttribute('data-u'), 2026, b.getAttribute('data-c'), '公示序号' + b.getAttribute('data-no'), 'gbt'); };
        });
      }

      var tabList = body.querySelector('#moe-tab-list'), tabStat = body.querySelector('#moe-tab-stat');
      var paneList = body.querySelector('#moe-pane-list'), paneStat = body.querySelector('#moe-pane-stat');
      function switchTab(isStat) {
        tabList.classList.toggle('active', !isStat); tabStat.classList.toggle('active', isStat);
        paneList.style.display = isStat ? 'none' : 'block'; paneStat.style.display = isStat ? 'block' : 'none';
      }
      tabList.onclick = function() { switchTab(false); };
      tabStat.onclick = function() { switchTab(true); };
      if (defaultTab === 'stat') switchTab(true);

      qInput.oninput = renderRows;
      typeSel.onchange = renderRows;
      body.querySelector('#moe-exp-btn').onclick = function() { exportMOE2026CSV(curRows); };

      var resetChip = body.querySelector('#moe-reset-chip');
      chipsBox.querySelectorAll('.moe-chip').forEach(function(c) {
        c.onclick = function() {
          activeRx = new RegExp(c.getAttribute('data-rx'), 'i');
          activeThemeLabel = c.getAttribute('data-label');
          resetChip.style.display = 'inline-block';
          renderRows();
        };
      });
      resetChip.onclick = function() { activeRx = null; activeThemeLabel = ''; resetChip.style.display = 'none'; renderRows(); };

      body.querySelectorAll('.moe-filter-unit').forEach(function(tr) {
        tr.onclick = function() { switchTab(false); qInput.value = tr.getAttribute('data-u'); renderRows(); };
      });
      body.querySelectorAll('.moe-filter-theme').forEach(function(dv) {
        dv.onclick = function() {
          switchTab(false);
          activeRx = new RegExp(dv.getAttribute('data-rx'), 'i');
          activeThemeLabel = dv.getAttribute('data-label');
          resetChip.style.display = 'inline-block';
          renderRows();
        };
      });

      renderRows();
    });
  }

  // 5. 院校立项榜 Top 25 与 学科全景看板
  function showRanking() {
    var list = getS() || [], st = {};
    list.forEach(function(s) {
      var u = s.institution || s.s || '其他单位';
      if (!st[u]) st[u] = { name: u, sc: 0, pj: 0, moe: 0 };
      st[u].sc++; st[u].pj += (s.projectCount || (s.fundedProjects ? s.fundedProjects.length : 0));
      if (s.hats && s.hats.indexOf('2026教育部社科') >= 0) st[u].moe++;
    });
    var top = Object.values(st).sort(function(a, b) { return b.pj - a.pj || b.sc - a.sc; }).slice(0, 25);
    var rows = top.map(function(it, i) {
      return '<tr><td style="text-align:center;font-weight:bold;">' + (i + 1) + '</td><td><a href="javascript:void(0)" class="cssd-jump" data-kw="' + it.name + '" style="color:#2563eb;font-weight:600;text-decoration:none;">' + it.name + '</a></td><td style="text-align:right;font-weight:bold;">' + it.pj + ' 项</td><td style="text-align:right;color:#059669;font-weight:bold;">' + (it.moe ? it.moe + ' 项' : '—') + '</td><td style="text-align:right;color:#64748b;">' + it.sc + ' 人</td></tr>';
    }).join('');
    openModal('🏆 全国高校体育学国家级与教育部课题立项榜 (Top 25)', '<p style="font-size:12px;color:#64748b;margin:0 0 10px;">点击任意高校名称可一键筛选该校全部学者与课题。</p><table class="cssd-c-table"><thead><tr><th>排名</th><th>高校/科研院所</th><th style="text-align:right;">课题总数</th><th style="text-align:right;">2026教育部</th><th style="text-align:right;">学者数</th></tr></thead><tbody>' + rows + '</tbody></table>', function(b) {
      b.querySelectorAll('.cssd-jump').forEach(function(a) { a.onclick = function() { triggerSearch(a.getAttribute('data-kw')); }; });
    });
  }

  function showAnalytics() {
    var list = getS() || [], tot = list.length || 1, dm = {}, pjTot = 0;
    list.forEach(function(s) { var d = s.dL || '体育学'; dm[d] = (dm[d] || 0) + 1; pjTot += (s.projectCount || (s.fundedProjects ? s.fundedProjects.length : 0)); });
    var bars = Object.entries(dm).sort(function(a, b) { return b[1] - a[1]; }).map(function(e) {
      var p = ((e[1] / tot) * 100).toFixed(1);
      return '<div class="cssd-jump" data-kw="' + e[0] + '" style="margin-bottom:9px;cursor:pointer;"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px;"><span style="font-weight:600;color:#2563eb;">' + e[0] + '</span><span>' + e[1] + ' 人 (' + p + '%)</span></div><div style="height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;"><div style="width:' + p + '%;height:100%;background:#2563eb;"></div></div></div>';
    }).join('');
    openModal('📊 中国体育学学科全景数据看板', '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;"><div style="background:#eff6ff;padding:12px;border-radius:8px;"><div style="font-size:12px;color:#1e40af;">收录体育学者</div><div style="font-size:20px;font-weight:800;color:#1d4ed8;">' + list.length.toLocaleString() + ' 人</div></div><div style="background:#f0fdf4;padding:12px;border-radius:8px;"><div style="font-size:12px;color:#166534;">关联科研课题</div><div style="font-size:20px;font-weight:800;color:#15803d;">' + pjTot.toLocaleString() + ' 项</div></div><div style="background:#fefce8;padding:12px;border-radius:8px;cursor:pointer;" id="go-moe-stat"><div style="font-size:12px;color:#854d0e;">2026教育部新立项 (点击查看报告)</div><div style="font-size:20px;font-weight:800;color:#a16207;">108 项 →</div></div></div><h4 style="margin:0 0 10px;font-size:13px;">二级学科分布（点击学科条可直接过滤学者）</h4>' + bars, function(b) {
      b.querySelector('#go-moe-stat').onclick = function() { showMOE2026SpecialModal('stat'); };
      b.querySelectorAll('.cssd-jump').forEach(function(r) { r.onclick = function() { triggerSearch(r.getAttribute('data-kw')); }; });
    });
  }

  // 6. 学者横向对比池 & 海报生成
  var cmpList = [];
  function toggleCompare(s) {
    var idx = cmpList.findIndex(function(x) { return x.n === s.n && x.institution === s.institution; });
    if (idx >= 0) { cmpList.splice(idx, 1); showToast('已移出对比：' + s.n); }
    else { if (cmpList.length >= 3) return showToast('最多支持同时对比 3 位学者'); cmpList.push(s); showToast('⚖️ 已加入对比：' + s.n); }
    var d = document.getElementById('cssd-compare-dock');
    if (!d) { d = document.createElement('div'); d.id = 'cssd-compare-dock'; document.body.appendChild(d); }
    if (!cmpList.length) { d.style.display = 'none'; return; }
    d.style.display = 'flex';
    d.innerHTML = '<span>⚖️ 对比 (' + cmpList.length + '/3)</span>' + cmpList.map(function(x, i) { return '<span class="cssd-dock-tag">' + x.n + ' <b data-i="' + i + '">×</b></span>'; }).join('') + '<button type="button" class="cssd-dock-btn" id="cssd-go-cmp">开始对比</button>';
    d.querySelectorAll('b').forEach(function(b) { b.onclick = function() { cmpList.splice(Number(b.getAttribute('data-i')), 1); toggleCompare(s); toggleCompare(s); }; });
    document.getElementById('cssd-go-cmp').onclick = function() {
      openModal('⚖️ 学者综合学术画像横向对比', '<table class="cssd-c-table"><thead><tr><th>维度</th>' + cmpList.map(function(x) { return '<th>' + x.n + '<div style="font-size:11px;color:#64748b;font-weight:normal;">' + (x.institution || '') + '</div></th>'; }).join('') + '</tr></thead><tbody><tr><td>职称/院系</td>' + cmpList.map(function(x) { return '<td>' + (x.title || '教师') + ' · ' + (x.dept || '体育院系') + '</td>'; }).join('') + '</tr><tr><td>二级学科</td>' + cmpList.map(function(x) { return '<td>' + (x.dL || '体育学') + '</td>'; }).join('') + '</tr><tr><td>学术头衔</td>' + cmpList.map(function(x) { return '<td>' + ((x.hats && x.hats.length) ? x.hats.join('、') : '—') + '</td>'; }).join('') + '</tr><tr><td>研究方向</td>' + cmpList.map(function(x) { return '<td>' + (x.r || '—') + '</td>'; }).join('') + '</tr><tr><td>课题立项数</td>' + cmpList.map(function(x) { return '<td><b style="color:#2563eb;">' + (x.projectCount || (x.fundedProjects ? x.fundedProjects.length : 0)) + ' 项</b></td>'; }).join('') + '</tr></tbody></table>');
    };
  }

  function makePoster(s) {
    var cv = document.createElement('canvas'); cv.width = 720; cv.height = 960;
    var ctx = cv.getContext('2d'), grd = ctx.createLinearGradient(0, 0, 720, 960);
    grd.addColorStop(0, '#0f172a'); grd.addColorStop(1, '#1e293b'); ctx.fillStyle = grd; ctx.fillRect(0, 0, 720, 960);
    ctx.fillStyle = '#60a5fa'; ctx.font = 'bold 20px sans-serif'; ctx.fillText('CSSD 体育学人 · 中国体育学者学术名片', 44, 58);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 36px sans-serif'; ctx.fillText(s.n + '  ' + (s.title || ''), 44, 130);
    ctx.fillStyle = '#38bdf8'; ctx.font = '20px sans-serif'; ctx.fillText((s.institution || '') + ' · ' + (s.dL || '体育学'), 44, 168);
    ctx.fillStyle = '#cbd5e1'; ctx.font = '16px sans-serif'; ctx.fillText('研究方向：' + (s.r || '').slice(0, 36), 44, 215);
    var pList = s.fundedProjects || [];
    ctx.fillStyle = '#f8fafc'; ctx.font = 'bold 20px sans-serif'; ctx.fillText('主持国家级 / 教育部科研项目 (' + (s.projectCount || pList.length) + ' 项)', 44, 275);
    var py = 320;
    pList.slice(0, 6).forEach(function(p) {
      ctx.fillStyle = '#38bdf8'; ctx.font = 'bold 15px sans-serif'; ctx.fillText('[' + (p.year || 2026) + '] ' + (p.category || '科研项目'), 44, py);
      ctx.fillStyle = '#e2e8f0'; ctx.font = '15px sans-serif'; ctx.fillText((p.title || '').slice(0, 36), 44, py + 24); py += 62;
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '14px sans-serif'; ctx.fillText('中国体育学术资源数据库 · www.tiyuxueren.com', 44, 910);
    var a = document.createElement('a'); a.href = cv.toDataURL('image/png'); a.download = 'CSSD学术名片_' + s.n + '.png'; a.click();
    showToast('✅ 已生成并下载【' + s.n + '】学术名片海报');
  }

  // 7. 详情弹窗增强与工具栏/科研项目页横幅挂载
  function enhanceModal() {
    var ov = document.getElementById('ov'), mb = document.getElementById('mb'), mtp = document.getElementById('mtp');
    if (!ov || !ov.classList.contains('on') || !mb) return;
    var name = mtp ? ((mtp.querySelector('h2,h3,.mn,.m-name') || {}).textContent || '').trim().split(/\s+/)[0] : '';
    var inst = mtp ? ((mtp.querySelector('.m-inst,.inst,p') || {}).textContent || '').trim().split(/[·\s]/)[0] : '';
    var list = getS() || [];
    var cur = list.find(function(x) { return x.n === name && (!inst || (x.institution || '').indexOf(inst) >= 0); }) || list.find(function(x) { return x.n === name; });

    if (mtp && cur && !mtp.querySelector('.cssd-m-tools')) {
      var bar = document.createElement('div'); bar.className = 'cssd-m-tools'; bar.style.cssText = 'display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;';
      bar.innerHTML = '<button type="button" class="cssd-cite-btn">⚖️ 加入对比</button><button type="button" class="cssd-cite-btn">📤 学术海报</button><button type="button" class="cssd-cite-btn">🔗 分享学者链接</button>';
      bar.children[0].onclick = function() { toggleCompare(cur); };
      bar.children[1].onclick = function() { makePoster(cur); };
      bar.children[2].onclick = function() { var u = new URL(location.href); u.searchParams.set('scholar', cur.n); navigator.clipboard && navigator.clipboard.writeText(u.toString()); showToast('🔗 已复制学者专属链接'); };
      mtp.appendChild(bar);
    }

    mb.querySelectorAll('.pj, .proj, .project, li').forEach(function(el) {
      if (el.dataset.cssdCited || (el.textContent || '').trim().length < 6) return;
      el.dataset.cssdCited = '1';
      var t = el.querySelector('strong') ? el.querySelector('strong').textContent.trim() : el.textContent.trim().split('\n')[0];
      var b = document.createElement('div'); b.style.cssText = 'margin-top:5px;display:inline-flex;gap:6px;';
      b.innerHTML = '<button type="button" class="cssd-cite-btn">📋 复制 GB/T 7714</button><button type="button" class="cssd-cite-btn">BibTeX</button>';
      b.children[0].onclick = function(e) { e.stopPropagation(); window.CSSDCitation.copy(name, t, inst, 2026, '国家级/教育部社科项目', '', 'gbt'); };
      b.children[1].onclick = function(e) { e.stopPropagation(); window.CSSDCitation.copy(name, t, inst, 2026, 'Research Project', '', 'bib'); };
      el.appendChild(b);
    });

    if (!mb.querySelector('.cssd-fb')) {
      var fb = document.createElement('div'); fb.className = 'cssd-fb';
      var url = 'https://github.com/LEON202304/cssd-sports-scholars/issues/new?template=scholar-update.yml&title=' + encodeURIComponent('【信息更新】' + name + ' - ' + inst);
      fb.innerHTML = '<span>💡 发现学者单位调动、新增课题或信息有误？</span><a href="' + url + '" target="_blank" rel="noopener" class="cssd-fb-btn">✏️ 提交勘误 / 认领</a>';
      mb.appendChild(fb);
    }
  }

  function mountToolbars() {
    var rinfo = document.getElementById('rinfo');
    if (rinfo && !rinfo.querySelector('.cssd-tb')) {
      var w = document.createElement('span'); w.className = 'cssd-tb';
      w.innerHTML = '<button type="button" class="cssd-tb-btn moe">🏅 2026教育部社科专刊(108项)</button><button type="button" class="cssd-tb-btn">📈 教育部统计报告</button><button type="button" class="cssd-tb-btn">🏆 院校立项榜</button><button type="button" class="cssd-tb-btn">📊 学科全景</button><button type="button" class="cssd-tb-btn">🌙 护眼</button>';
      w.children[0].onclick = function() { showMOE2026SpecialModal('list'); };
      w.children[1].onclick = function() { showMOE2026SpecialModal('stat'); };
      w.children[2].onclick = showRanking;
      w.children[3].onclick = showAnalytics;
      w.children[4].onclick = function() {
        document.documentElement.classList.toggle('cssd-dark');
        var d = document.documentElement.classList.contains('cssd-dark');
        localStorage.setItem('cssd_dark', d ? '1' : '0');
        showToast(d ? '🌙 已开启夜间护眼模式' : '☀️ 已恢复日间模式');
      };
      rinfo.appendChild(w);
    }

    var vwProj = document.getElementById('vw-projects');
    if (vwProj && !vwProj.querySelector('.cssd-moe-banner')) {
      var bn = document.createElement('div');
      bn.className = 'cssd-moe-banner';
      bn.style.cssText = 'background:linear-gradient(90deg,#eff6ff,#f0fdf4);border:1px solid #93c5fd;border-radius:10px;padding:10px 16px;margin:10px 0 14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;';
      bn.innerHTML = '<div><b style="color:#1e40af;font-size:14px;">🏅 最新收录：2026年度教育部人文社会科学研究项目·体育学立项全名单（共 108 项）</b><span style="font-size:12px;color:#475569;margin-left:8px;">规划基金 58 项 / 青年基金 50 项 · 覆盖 81 家高校</span></div>' +
        '<div style="display:flex;gap:8px;"><button type="button" class="cssd-tb-btn moe" id="bn-moe-list">📋 查看108项名单</button><button type="button" class="cssd-tb-btn" id="bn-moe-stat">📊 查看统计分析报告</button><button type="button" class="cssd-tb-btn" id="bn-moe-csv">📥 导出Excel/CSV</button></div>';
      vwProj.insertBefore(bn, vwProj.firstChild);
      bn.querySelector('#bn-moe-list').onclick = function() { showMOE2026SpecialModal('list'); };
      bn.querySelector('#bn-moe-stat').onclick = function() { showMOE2026SpecialModal('stat'); };
      bn.querySelector('#bn-moe-csv').onclick = function() { exportMOE2026CSV(); };
    }
  }

  function init() {
    if (!document.getElementById('cssd-v9-css')) {
      var st = document.createElement('style'); st.id = 'cssd-v9-css';
      st.textContent = 'body{padding-bottom:60px!important}.cssd-tb{display:inline-flex;gap:6px;margin-left:8px;flex-wrap:wrap;vertical-align:middle}.cssd-tb-btn{background:#fff;border:1px solid #cbd5e1;color:#1e293b;padding:4px 10px;border-radius:6px;font-size:12px;cursor:pointer;font-weight:500}.cssd-tb-btn:hover,.cssd-tb-btn.active{background:#2563eb;color:#fff;border-color:#2563eb}.cssd-tb-btn.moe{background:#eff6ff;color:#1d4ed8;border-color:#93c5fd;font-weight:600}.cssd-cite-btn{background:#f1f5f9;border:1px solid #cbd5e1;color:#334155;padding:2px 8px;border-radius:4px;font-size:11px;cursor:pointer}.cssd-cite-btn:hover{background:#2563eb;color:#fff;border-color:#2563eb}.cssd-fb{display:flex;justify-content:space-between;align-items:center;background:#eff6ff;border:1px dashed #93c5fd;border-radius:6px;padding:8px 12px;margin-top:12px;font-size:12px;color:#1e40af}.cssd-fb-btn{background:#2563eb;color:#fff!important;padding:3px 10px;border-radius:4px;text-decoration:none;font-size:12px}#cssd-custom-modal{position:fixed;inset:0;background:rgba(15,23,42,0.65);display:none;align-items:center;justify-content:center;z-index:100000;padding:16px}#cssd-custom-modal.active{display:flex}.cssd-c-content{background:#fff;width:100%;max-width:920px;max-height:88vh;border-radius:12px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 40px rgba(0,0,0,0.3)}.cssd-c-hd{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid #e2e8f0}.cssd-c-hd h3{margin:0;font-size:16px}.cssd-c-close{background:none;border:none;font-size:18px;cursor:pointer}.cssd-c-body{padding:16px 18px;overflow-y:auto}.cssd-c-table{width:100%;border-collapse:collapse;font-size:13px}.cssd-c-table th,.cssd-c-table td{padding:8px 10px;border:1px solid #e2e8f0;text-align:left}.cssd-c-table th{background:#f8fafc;position:sticky;top:0}#cssd-compare-dock{position:fixed;bottom:70px;right:24px;background:#0f172a;color:#fff;padding:8px 14px;border-radius:24px;display:none;align-items:center;gap:8px;z-index:9998;font-size:12px}.cssd-dock-tag{background:#334155;padding:2px 8px;border-radius:10px}.cssd-dock-tag b{cursor:pointer;margin-left:4px;color:#fca5a5}.cssd-dock-btn{background:#2563eb;color:#fff;border:none;padding:3px 10px;border-radius:12px;cursor:pointer;font-size:12px}#cssd-top{position:fixed;bottom:22px;right:24px;width:38px;height:38px;border-radius:50%;background:#2563eb;color:#fff;border:none;cursor:pointer;font-size:16px;display:none;align-items:center;justify-content:center;z-index:9997}.cssd-dark body,.cssd-dark html{background:#0b1120!important;color:#e2e8f0!important}.cssd-dark .sc,.cssd-dark .sp-person,.cssd-dark .cssd-c-content,.cssd-dark #mb{background:#1e293b!important;color:#f1f5f9!important;border-color:#334155!important}';
      document.head.appendChild(st);
    }
    if (localStorage.getItem('cssd_dark') === '1') document.documentElement.classList.add('cssd-dark');
    if (!document.getElementById('cssd-top')) {
      var tb = document.createElement('button'); tb.id = 'cssd-top'; tb.textContent = '↑'; tb.title = '回到顶部';
      tb.onclick = function() { window.scrollTo({ top: 0, behavior: 'smooth' }); };
      document.body.appendChild(tb);
      window.addEventListener('scroll', function() { tb.style.display = window.scrollY > 350 ? 'flex' : 'none'; }, { passive: true });
    }
    document.querySelectorAll('input,select').forEach(function(el, i) {
      if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', el.getAttribute('placeholder') || el.id || ('筛选_' + i));
    });

    if (!enrichDatasets()) { setTimeout(init, 120); return; }
    mountToolbars();
    new MutationObserver(function() { mountToolbars(); enhanceModal(); }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });

    window.addEventListener('keydown', function(e) {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        var q = document.getElementById('sp-scholars-q') || document.getElementById('q');
        if (q) { e.preventDefault(); q.focus(); q.select(); }
      }
      if (e.key === 'Escape') {
        var cm = document.getElementById('cssd-custom-modal'); if (cm) cm.className = '';
        var ov = document.getElementById('ov'); if (ov && ov.classList.contains('on')) ov.classList.remove('on');
      }
    });

    var p = new URLSearchParams(location.search), kw = p.get('scholar') || p.get('q');
    if (kw) setTimeout(function() { triggerSearch(kw); }, 250);
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
