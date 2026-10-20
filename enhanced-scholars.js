/**
 * CSSD 体育学人 - 核心增强与2026教育部社科立项全名单(108项)
 * 包含：自动合并2026教育部项目 + 拼音检索 + 60fps渲染 + 引文复制 + CSV导出 + 一键直达
 */
(function () {
  'use strict';

  // 2026年度教育部人文社会科学研究项目·体育学立项全名单 (108项)
  var MOE_2026_PROJECTS = [[88, "任振朋", "四川师范大学", "青年基金项目", "全球体育治理共同体的构建路径与中国方案研究", "体育人文社会学"], [89, "刘海东", "成都师范学院", "规划基金项目", "县域中小学实施“学生体质强健计划”的创新机制与适配路径研究", "体育教育训练学"], [90, "高野", "西安外国语大学", "规划基金项目", "家校社协同育人视域下国家级非遗“红拳”大中小学一体化传承研究", "民族传统体育学"], [1360, "丁国胜", "湖南大学", "规划基金项目", "主动健康视域下城市老旧社区公共体育空间的效能评估与靶向更新机制研究", "运动人体科学"], [1361, "刁玉翠", "苏州大学", "青年基金项目", "数智赋能小学生体育与健康核心素养情境化测评工具的开发与应用研究", "运动人体科学"], [1362, "杨安禄", "中国矿业大学（北京）", "青年基金项目", "数智赋能青少年运动习惯养成的作用机制与优化路径研究", "体育人文社会学"], [1363, "周玉兰", "浙江师范大学", "规划基金项目", "中小学生每天2小时体育活动执行难点、推进策略与干预评估研究", "体育教育训练学"], [1364, "周喆啸", "宁波大学", "规划基金项目", "多模态AI赋能下幼儿基本运动技能滞后风险早期识别与“家园协同”靶向干预的模式研究", "体育教育训练学"], [1365, "曾佳", "福州大学", "青年基金项目", "碎片化运动对久坐大学生注意网络的影响：时间窗、最佳剂量及脑机制研究", "运动人体科学"], [1366, "陈海鸥", "广东医科大学", "规划基金项目", "智慧教育背景下我国青少年运动健康风险的数字画像与预警机制研究", "运动人体科学"], [1367, "刘琳", "南京体育学院", "青年基金项目", "健康第一视域下生成式AI驱动的青少年不良体态运动矫正模式构建与实证研究", "运动人体科学"], [1368, "付常喜", "徐州工程学院", "规划基金项目", "体卫融合视域下青少年血压偏高精准运动干预的家校社协同模式构建与实证研究", "运动人体科学"], [1369, "韩一鸣", "广西师范大学", "青年基金项目", "青少年生物节律紊乱相关行为的形成机制及体卫融合干预研究", "运动人体科学"], [1370, "戴朝", "四川师范大学", "规划基金项目", "数智赋能西南民族特色村寨体文旅融合的创新机制与实践路径研究", "民族传统体育学"], [1371, "史冀龙", "厦门大学", "青年基金项目", "户外运动改善大学生抑郁症状的“情绪—认知”通路与脑网络机制研究", "运动人体科学"], [1372, "杨惠", "康复大学", "规划基金项目", "“家—校—医”协同视域下青少年脊柱侧弯数智预警与精准运动干预研究", "运动人体科学"], [1373, "周霄", "华中科技大学", "规划基金项目", "我国青少年身体功能评估体系构建、常模制定与协同治理路径研究", "运动人体科学"], [1374, "关博", "广州体育学院", "规划基金项目", "“两创”视域下岭南非遗传统体育文化的AI知识图谱构建与数字人传承创新研究", "民族传统体育学"], [1375, "白杨", "宁波职业技术大学", "规划基金项目", "县域枢纽型体育社会组织推动公共服务下沉的范式重构与机制优化研究", "体育人文社会学"], [1376, "王成", "南京大学", "规划基金项目", "体育特色城市的类型生成机制与分类治理研究", "体育人文社会学"], [1377, "谢恩礼", "南京体育学院", "规划基金项目", "数智促进我国残疾人康复健身体育高质量发展的实现机制与协同路径研究", "体育人文社会学"], [1378, "牟艳", "山东体育学院", "规划基金项目", "中国近代体育慈善文献资料整理与研究", "体育人文社会学"], [1379, "李志强", "临沂职业学院", "规划基金项目", "我国中小学健康学校建设的典型模式与推进路径研究", "运动人体科学"], [1380, "谷颖", "沈阳师范大学", "规划基金项目", "我国学龄前儿童（3—6岁）身体素养多模态评估与追踪干预研究", "体育教育训练学"], [1381, "周冲", "武汉体育学院", "青年基金项目", "银发经济视域下老年体育服务消费需求分层与精准供给研究", "运动人体科学"], [1382, "李勇", "山东体育学院", "规划基金项目", "“票根经济”视域下我国群众性体育赛事品牌培育机制与路径研究", "体育人文社会学"], [1383, "程经纬", "河南体育学院", "青年基金项目", "2型糖尿病（T2DM）患者运动功能监测与干预效果多维度评价体系构建研究", "运动人体科学"], [1384, "李慧宇", "山东财经大学", "青年基金项目", "面向VR体育动作训练的多模态感知与智能交互机制研究", "体育教育训练学"], [1385, "姜卫芬", "天津医科大学", "规划基金项目", "数智赋能大学生体质健康管理：机制构建、平台验证与路径优化研究", "运动人体科学"], [1386, "陈娟", "湖北文理学院", "青年基金项目", "具身认知视域下认知—运动双任务训练促进小学生身心健康的机制研究", "运动人体科学"], [1387, "杜兴彬", "山东华宇工学院", "规划基金项目", "社区体育公共服务“数字悬浮”的形成机理与治理策略研究", "体育人文社会学"], [1388, "石林", "成都体育学院", "青年基金项目", "“行为—认知”视角下大学生抑郁症状风险分层与精准运动干预研究", "运动人体科学"], [1389, "李燕春", "北京体育大学", "规划基金项目", "“体教融合”背景下高校肥胖学生体育课程精准化重构与实证研究", "体育教育训练学"], [1390, "武欣然", "中山大学", "青年基金项目", "基于多源数据融合的大学生运动员学业倦怠预警模型与干预策略研究", "体育教育训练学"], [1391, "张艳", "河海大学", "规划基金项目", "义务教育阶段“每天综合体育活动2小时”落实中的有效运动时间测度与提升机制研究", "体育教育训练学"], [1392, "唐芳", "安庆师范大学", "青年基金项目", "数智赋能儿童青少年体态健康动态监测与协同干预机制研究", "运动人体科学"], [1393, "韩苗苗", "山东工商学院", "青年基金项目", "赛事经济对城际消费资源的分配效应与包容性治理研究", "体育人文社会学"], [1394, "宋杨", "宁波大学", "青年基金项目", "“十五五”时期数智体育赋能老年慢病主动健康的风险预警机制与公共服务治理研究", "运动人体科学"], [1395, "赵刚", "苏州大学", "青年基金项目", "基于多模态数据融合的儿童少年基础运动技能发展评估与预测模型构建研究", "体育教育训练学"], [1396, "梁计陵", "中南大学", "青年基金项目", "多模态运动矫正儿童青少年不良体态干预模式构建与应用研究", "运动人体科学"], [1397, "王继雄", "内蒙古财经大学", "规划基金项目", "群众体育赛事促进各民族交往交流交融的机制研究", "民族传统体育学"], [1398, "吴卫兵", "上海体育大学", "规划基金项目", "青少年运动猝死多模态智能风险评估与防范应用研究", "运动人体科学"], [1399, "周俣涛", "湖南工业大学", "规划基金项目", "数字脱瘾与大学生运动行为的双向关联机制及协同促进研究", "体育人文社会学"], [1400, "徐国琴", "广州体育学院", "规划基金项目", "乡村振兴背景下农村“一老一小”代际体育康养的促进机制与干预模式研究", "体育人文社会学"], [1401, "王冠瑛", "燕山大学", "规划基金项目", "生成式人工智能嵌入体育消费场景创新的实现机制与路径研究", "体育人文社会学"], [1402, "尹剑春", "上海师范大学", "规划基金项目", "体医融合视域下青少年抑郁症状的“校—医—家”协同运动干预模式构建与实证研究", "运动人体科学"], [1403, "李紫浩", "湖南农业大学", "青年基金项目", "数智赋能社区运动健康中心效能跃升影响因素、作用机理及推进路径研究", "运动人体科学"], [1404, "罗维", "南京体育学院", "青年基金项目", "主动健康视域下数智赋能“三高”人群运动干预的多模态模型构建研究", "运动人体科学"], [1405, "谢劲", "台州学院", "规划基金项目", "数字包容视域下城乡老年人体育参与鸿沟的形成机制与治理路径研究", "运动人体科学"], [1406, "孟繁莹", "湖州师范大学", "青年基金项目", "认知参与型身体活动对手机依赖青少年执行功能的干预效果及机制研究", "运动人体科学"], [1407, "傅亮", "厦门大学", "规划基金项目", "闽籍华侨华人体育史料的搜集、整理与研究（1900—2000）", "体育人文社会学"], [1408, "李红梅", "中南民族大学", "青年基金项目", "老年慢性病人群运动依从性的障碍生成机制及多模态干预研究", "运动人体科学"], [1409, "沈培鑫", "山东体育学院", "青年基金项目", "积极老龄化视域下社区老年膝骨关节炎患者跌倒风险分层预测与数智化运动康复服务路径研究", "运动人体科学"], [1410, "马生霞", "四川师范大学", "规划基金项目", "青少年24h活动行为聚类的社会生态机制及其靶向干预策略研究", "体育人文社会学"], [1411, "贺鑫森", "江西水利电力大学", "规划基金项目", "中央苏区学校体育治理的制度逻辑与历史经验研究", "体育教育训练学"], [1412, "闫丽敏", "河南师范大学", "规划基金项目", "“两个结合”视域下奥林匹克价值观的代际传承张力与本土化实践策略研究", "体育人文社会学"], [1413, "代方梅", "湖北大学", "规划基金项目", "我国学校体育数字化场景建构的应然图景与行动路径研究", "体育教育训练学"], [1414, "李娟", "河北师范大学", "规划基金项目", "青少年运动动机的生态培育机制与身体活动精准促进研究", "体育人文社会学"], [1415, "赵飞达", "湖州师范大学", "青年基金项目", "运动技术话语具身语义编码体系构建及项群效度检验研究", "体育人文社会学"], [1416, "窦圣浩", "济宁学院", "青年基金项目", "黄河滩区村落民俗体育口述史料搜集、整理与研究", "民族传统体育学"], [1417, "郭良如", "衡阳师范学院", "规划基金项目", "“十五五”时期健康学校建设的体育资源城乡联动模式研究", "运动人体科学"], [1418, "陈静越", "韩山师范学院", "青年基金项目", "中华传统体育“走出去”的国别适应机制研究", "民族传统体育学"], [1419, "武继莹", "沈阳体育学院", "青年基金项目", "3—6岁幼儿运动智能结构模型、发展规律与体育促进路径研究", "体育教育训练学"], [1420, "欧亚", "湖南网络工程职业学院", "青年基金项目", "老旧小区嵌入式体育场地设施协同供给的理论逻辑与实现路径研究", "体育人文社会学"], [1421, "林文弢", "珠海科技学院", "规划基金项目", "体教医融合视域下小学生近视防控与学校体育活动协同推进的机制与路径研究", "体育教育训练学"], [1422, "汪君民", "淮阴师范学院", "规划基金项目", "基于多模态AI情绪识别的大学生抑郁倾向运动处方动态干预研究", "运动人体科学"], [1423, "张曜", "苏州大学", "青年基金项目", "具身正念促进大学生运动参与的驱动机制与路径研究", "体育人文社会学"], [1424, "邵坚博", "新疆理工学院", "规划基金项目", "混合现实技术和人工智能技术赋能基层裁判员训练的机制、路径与应用研究", "体育教育训练学"], [1425, "王军利", "中国矿业大学", "规划基金项目", "大学生24小时活动行为失衡的抑郁风险评估及精准干预研究", "运动人体科学"], [1426, "何敬堂", "淮南师范学院", "规划基金项目", "新中国成立以来国乒荣耀创造者集体记忆的社会建构研究", "体育人文社会学"], [1427, "唐月亮", "湖南财政经济学院", "规划基金项目", "场景创新赋能体育旅游消费潜力释放长效机制与优化策略研究", "体育人文社会学"], [1428, "周惠宣", "北京体育大学", "青年基金项目", "基于大语言模型的世居高原老年人KOA个性化运动干预研究", "运动人体科学"], [1429, "张泽英", "太原理工大学", "青年基金项目", "数智技术介入运动训练的经验与数据协同机制及路径研究", "体育教育训练学"], [1430, "范卉颖", "上海师范大学", "青年基金项目", "基于行动者网络理论的青少年体质健康多元协同网络的构建与实践研究", "运动人体科学"], [1431, "荆文", "山东师范大学", "规划基金项目", "儿童身体姿态与基本运动技能的动态互馈机制及模型构建研究", "体育教育训练学"], [1432, "董芮", "华南师范大学", "青年基金项目", "数智赋能社区老年人运动功能衰退风险识别与分层干预研究", "运动人体科学"], [1433, "温朋飞", "广州体育学院", "青年基金项目", "青少年攻击行为的跨诊断运动干预研究", "体育人文社会学"], [1434, "程林", "广东技术师范大学", "青年基金项目", "基于健康画像的碎片化运动促进农村女性产后康复模式构建及实证研究", "运动人体科学"], [1435, "程文娟", "山东青年政治学院", "青年基金项目", "体育锻炼增益升学关键期青少年学业情绪的作用机制与靶向干预研究", "体育教育训练学"], [1436, "孙中芹", "曲阜师范大学", "规划基金项目", "赛事驱动城乡文体旅融合共同体构建机制研究", "体育人文社会学"], [1437, "郭宇刚", "安阳师范学院", "规划基金项目", "殷墟甲骨文体育元素的系统考释、理论阐释与活化传承研究", "民族传统体育学"], [1438, "徐君伟", "河南财经政法大学", "规划基金项目", "基于AI赋能的乒乓球技战术诊断体系构建与应用研究", "体育人文社会学"], [1439, "李新星", "沈阳体育学院", "青年基金项目", "数智赋能老年人肌少症风险预警与传统体育干预体系的建设路径研究", "运动人体科学"], [1440, "张庆如", "苏州大学", "规划基金项目", "“城超”激活“城市文化资本”的机理与路径研究", "体育人文社会学"], [1441, "李夏雯", "上海健康医学院", "青年基金项目", "运动联合正念干预缓解阈下抑郁大学生认知情绪失调的机制与路径研究", "运动人体科学"], [1442, "耿元文", "燕山大学", "规划基金项目", "基于数字画像的大学生体质健康精准干预机制与实现路径研究", "运动人体科学"], [1443, "赵怀超", "河南大学", "青年基金项目", "中小学生体质健康监测大数据驱动的精准干预与动态评价体系构建", "运动人体科学"], [1444, "罗恒", "湘南学院", "青年基金项目", "城市社区智慧体育服务适老化的水平测度与驱动机制研究", "体育人文社会学"], [1445, "林桐", "常州工学院", "青年基金项目", "数据驱动的体育公园夜间建成环境对老年人身体活动的影响及适老化研究", "运动人体科学"], [1446, "李振", "中国石油大学（华东）", "青年基金项目", "数智赋能我国青少年有氧和力量协同发展的理论建构与应用研究", "体育人文社会学"], [1447, "郭琪", "西安工程大学", "青年基金项目", "中国式现代化视域下全民健身公共服务均等化评估与区域差异调控机制研究", "体育人文社会学"], [1448, "蔡明", "上海健康医学院", "规划基金项目", "健康生态学视角下社区老年人认知衰弱影响因素多维评估与运动营养联合干预模式实证研究", "运动人体科学"], [1449, "刘金锋", "淮南师范学院", "规划基金项目", "大型体育赛事媒介生态中的中华文化符号转译机制与传播效应研究", "体育人文社会学"], [1450, "张巧", "闽江大学", "青年基金项目", "残疾人体育公共服务供需动态适配模型构建与实证研究", "体育人文社会学"], [1451, "孙国欣", "西南交通大学", "规划基金项目", "多智能体赋能学生终身运动习惯养成的系统与实践干预研究", "体育人文社会学"], [1452, "郭洪亮", "北京体育大学", "青年基金项目", "“面向人人”班级联赛促进中小学生体育深度学习的作用机制及实现路径研究", "体育教育训练学"], [1453, "崔昌水", "西安外事学院", "规划基金项目", "乡村振兴背景下西部特岗体育教师职业承诺的影响机制与长效激励：基于“留任导向”的研究", "体育人文社会学"], [1454, "严小英", "成都师范学院", "青年基金项目", "藏羌彝走廊体育非物质文化遗产采辑与数字资源库建设研究", "民族传统体育学"], [1455, "黄华敏", "广西民族师范学院", "规划基金项目", "民族传统体育铸牢边境青少年中华民族共同体意识的心理机制与组态路径研究", "民族传统体育学"], [1456, "宋述光", "中国石油大学（华东）", "规划基金项目", "群众体育赛事赛后效应转化与基层长效治理机制研究", "体育人文社会学"], [1457, "丁洁", "河南师范大学", "规划基金项目", "城市社区体育组织服务能力的数智化动态评估与精准建设", "体育人文社会学"], [1458, "吴彰忠", "武汉体育学院", "青年基金项目", "我国运动训练本科专业布点的数量扩张与质量保障研究", "体育教育训练学"], [1459, "孙素玲", "沈阳体育学院", "规划基金项目", "地方营造与认同重建中的老工业城市群众体育赛事田野研究", "体育人文社会学"], [1460, "吴明华", "常州大学", "规划基金项目", "长三角城市边角空间体育化微更新的场景创新与治理体系研究", "体育人文社会学"], [1461, "刘超", "安徽师范大学", "青年基金项目", "数智技术赋能户外运动消费场景创新的作用机制与组态路径研究", "体育人文社会学"], [1462, "陆贝", "潍坊学院", "规划基金项目", "主动健康视域下青少年生活体育化服务体系研究", "运动人体科学"], [1463, "李一易", "山东体育学院", "青年基金项目", "扩大内需战略下居民体育消费惯性的形成机理与释放路径研究", "体育人文社会学"], [1464, "周腾军", "西南财经大学", "青年基金项目", "我国职业体育联盟交叉补贴政策失灵的制度归因与治理路径研究", "体育人文社会学"]];

  // 1. 自动合并 108 个新项目与学者至全局数据 window.S
  function mergeNewProjects(dataset) {
    if (!dataset || !Array.isArray(dataset)) return;
    var scholarMap = new Map();
    for (var i = 0; i < dataset.length; i++) {
      var s = dataset[i];
      var key = (s.n || '').trim() + '_' + (s.institution || s.s || '').trim();
      scholarMap.set(key, s);
    }

    for (var j = 0; j < MOE_2026_PROJECTS.length; j++) {
      var item = MOE_2026_PROJECTS[j];
      var code = item[0], name = item[1], unit = item[2], pType = item[3], title = item[4], disc = item[5];
      var projItem = {
        code: String(code),
        category: '教育部人文社科' + pType,
        title: title,
        unit: unit,
        year: 2026
      };

      var found = scholarMap.get(name + '_' + unit);
      if (!found) {
        found = dataset.find(function(x) {
          return x.n === name && ((x.institution || '').indexOf(unit) >= 0 || unit.indexOf(x.institution || '') >= 0);
        });
      }

      if (found) {
        if (!Array.isArray(found.fundedProjects)) found.fundedProjects = [];
        var exists = found.fundedProjects.some(function(p) { return p.title === title; });
        if (!exists) {
          found.fundedProjects.unshift(projItem);
          found.projectCount = (found.projectCount || 0) + 1;
          if (!Array.isArray(found.hats)) found.hats = [];
          if (found.hats.indexOf('2026教育部社科') < 0) found.hats.push('2026教育部社科');
        }
      } else {
        var newScholar = {
          id: 'moe2026_' + code,
          n: name,
          e: '',
          institution: unit,
          s: unit,
          dept: '体育学院',
          title: pType.indexOf('青年') >= 0 ? '青年学者' : '副教授/教授',
          dL: '体育学',
          disc: disc,
          hats: ['2026教育部社科负责人'],
          r: title,
          c: '#2563eb',
          i: name ? name[0] : '学',
          fundedProjects: [projItem],
          projectCount: 1
        };
        dataset.unshift(newScholar);
        scholarMap.set(name + '_' + unit, newScholar);
      }
    }
  }

  // 2. 拼音首字母加权检索
  function searchScholars(list, query) {
    if (!query || !query.trim()) return list.slice(0, 150);
    var q = query.trim().toLowerCase();
    var scored = [];
    for (var i = 0; i < list.length; i++) {
      var s = list[i];
      var score = 0;
      var name = (s.n || '').toLowerCase();
      var pinyin = (s.e || '').toLowerCase();
      var initials = pinyin.split(/\s+/).map(function(w) { return w[0] || ''; }).join('');
      var inst = (s.institution || s.s || '').toLowerCase();
      var disc = (s.dL || '').toLowerCase();
      var res = (s.r || '').toLowerCase();
      var hats = (Array.isArray(s.hats) ? s.hats.join(' ') : '').toLowerCase();

      if (q.indexOf('教育部') >= 0 || q.indexOf('2026') >= 0) {
        if (hats.indexOf(q) >= 0 || (s.fundedProjects && s.fundedProjects.some(function(p) { return p.category && p.category.toLowerCase().indexOf(q) >= 0; }))) {
          score += 150;
        }
      }

      if (name === q) score += 100;
      else if (name.startsWith(q)) score += 80;
      else if (name.indexOf(q) >= 0) score += 60;
      if (initials === q || initials.startsWith(q)) score += 70;
      if (inst.indexOf(q) >= 0) score += 30;
      if (disc.indexOf(q) >= 0 || res.indexOf(q) >= 0 || hats.indexOf(q) >= 0) score += 15;

      if (score > 0) scored.push({ s: s, score: score });
    }
    return scored.sort(function(a, b) { return b.score - a.score; }).slice(0, 150).map(function(x) { return x.s; });
  }

  // 3. 60fps 平滑分片渲染
  var _raf = null;
  function smoothRender(grid, scholars, renderFn, batch) {
    batch = batch || 30;
    if (_raf) cancelAnimationFrame(_raf);
    grid.innerHTML = '';
    var count = 0;
    function chunk() {
      var frag = document.createDocumentFragment();
      var end = Math.min(count + batch, scholars.length);
      for (var i = count; i < end; i++) {
        var node = renderFn(scholars[i]);
        if (node) frag.appendChild(node);
      }
      grid.appendChild(frag);
      count = end;
      if (count < scholars.length) _raf = requestAnimationFrame(chunk);
    }
    chunk();
  }

  // 4. 学术引文复制与 Toast
  function toast(msg) {
    var t = document.getElementById('cssd-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'cssd-toast';
      t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#0f172a;color:#fff;padding:8px 16px;border-radius:20px;font-size:12px;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,0.2);';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.display = 'block';
    clearTimeout(t._tm);
    t._tm = setTimeout(function() { t.style.display = 'none'; }, 2000);
  }

  window.CSSDCitation = {
    copy: function(author, title, inst, year, cat, code, type) {
      var y = year || 2026;
      var c = cat || '教育部人文社会科学研究项目';
      var cd = code ? '(项目编号: ' + code + ')' : '';
      var text = type === 'bib' 
        ? '@techreport{CSSD_' + y + ',\n  author = {' + author + '},\n  title = {' + title + '},\n  institution = {' + inst + '},\n  year = {' + y + '},\n  type = {' + c + '}\n}'
        : author + '. ' + title + '[R]. ' + inst + ', ' + y + '. ' + c + cd + '.';
      navigator.clipboard.writeText(text).then(function() { toast('已复制引文！'); }).catch(function() { prompt('请复制：', text); });
    }
  };

  // 5. 导出 Excel/CSV (UTF-8 BOM)
  function exportCSV(list) {
    if (!list || !list.length) return toast('无匹配学者可导出');
    var header = ['姓名,英文/拼音,单位,院系,职称,学科,研究方向,课题数'];
    var rows = list.map(function(s) {
      return [
        '"' + (s.n || '') + '"',
        '"' + (s.e || '') + '"',
        '"' + (s.institution || s.s || '') + '"',
        '"' + (s.dept || '') + '"',
        '"' + (s.title || '') + '"',
        '"' + (s.dL || '') + '"',
        '"' + (s.r || '').replace(/"/g, '""') + '"',
        s.projectCount || (s.fundedProjects ? s.fundedProjects.length : 0)
      ].join(',');
    });
    var blob = new Blob(['\uFEFF' + header.concat(rows).join('\n')], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'CSSD_学者名单_' + new Date().toLocaleDateString().replace(/\//g, '') + '.csv';
    a.click();
    toast('已导出 ' + list.length + ' 位学者名单');
  }

  // 6. 详情弹窗动态注入引文与勘误
  function enhanceModal() {
    var ov = document.getElementById('ov'), mb = document.getElementById('mb'), mtp = document.getElementById('mtp');
    if (!ov || !ov.classList.contains('on') || !mb) return;
    var name = mtp ? (mtp.querySelector('h2,h3,.mn,.m-name') || {}).textContent || '' : '';
    var inst = mtp ? (mtp.querySelector('.m-inst,p') || {}).textContent || '' : '';

    mb.querySelectorAll('.pj, .proj, .project, li').forEach(function(el) {
      if (el.dataset.cited) return;
      el.dataset.cited = '1';
      var title = el.querySelector('strong') ? el.querySelector('strong').textContent : el.textContent.split('\n')[0];
      var bar = document.createElement('div');
      bar.style.cssText = 'margin-top:4px;display:flex;gap:6px;';
      bar.innerHTML = '<button type="button" style="padding:2px 8px;font-size:11px;cursor:pointer;border:1px solid #cbd5e1;background:#f8fafc;border-radius:4px;">📋 复制 GB/T 7714</button><button type="button" style="padding:2px 8px;font-size:11px;cursor:pointer;border:1px solid #cbd5e1;background:#f8fafc;border-radius:4px;">BibTeX</button>';
      bar.children[0].onclick = function(e) { e.stopPropagation(); window.CSSDCitation.copy(name.trim(), title.trim(), inst.trim(), 2026, '教育部人文社科/国家社科项目', '', 'gbt'); };
      bar.children[1].onclick = function(e) { e.stopPropagation(); window.CSSDCitation.copy(name.trim(), title.trim(), inst.trim(), 2026, 'Project', '', 'bib'); };
      el.appendChild(bar);
    });

    if (!mb.querySelector('.cssd-fb')) {
      var fb = document.createElement('div');
      fb.className = 'cssd-fb';
      fb.style.cssText = 'margin-top:12px;padding:8px 12px;background:#eff6ff;border:1px dashed #93c5fd;border-radius:6px;font-size:12px;display:flex;justify-content:space-between;align-items:center;';
      var link = 'https://github.com/LEON202304/cssd-sports-scholars/issues/new?template=scholar-update.yml&title=' + encodeURIComponent('【信息更新】' + name.trim());
      fb.innerHTML = '<span>💡 发现信息变动或新增课题？</span><a href="' + link + '" target="_blank" style="color:#2563eb;font-weight:bold;text-decoration:none;">✏️ 提交勘误 / 认领</a>';
      mb.appendChild(fb);
    }
  }

  // 7. 初始化与事件监听
  function init() {
    new MutationObserver(enhanceModal).observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });

    window.addEventListener('keydown', function(e) {
      var q = document.getElementById('sp-scholars-q');
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && q) { e.preventDefault(); q.focus(); q.select(); }
      if (e.key === 'Escape') {
        var ov = document.getElementById('ov');
        if (ov && ov.classList.contains('on')) ov.classList.remove('on');
        else if (q && q.value) { q.value = ''; window.spFilterScholarsLive && window.spFilterScholarsLive(); }
      }
    });

    if (!window.S || !window.S.length) return setTimeout(init, 100);

    // 核心：自动合并 108 个 2026 教育部社科新项目
    mergeNewProjects(window.S);

    var currentList = window.S;
    var originFilter = window.spFilterScholarsLive;
    window.spFilterScholarsLive = function () {
      var q = document.getElementById('sp-scholars-q'), grid = document.getElementById('scgrid'), info = document.getElementById('rinfo'), empty = document.getElementById('scempty');
      if (!q || !grid) return originFilter && originFilter();
      var val = q.value.trim();
      currentList = val ? searchScholars(window.S, val) : window.S;

      if (info) {
        info.innerHTML = '<span>' + (val ? ('找到 ' + currentList.length + ' 位学者') : ('全部学者 (' + window.S.length + ')')) + '</span>' +
          '<button type="button" id="cssd-moe-btn" style="margin-left:8px;padding:2px 8px;font-size:11px;cursor:pointer;border-radius:4px;border:1px solid #bfdbfe;background:#eff6ff;color:#1e40af;font-weight:bold;">🏅 2026教育部社科(108项)</button>' +
          '<button type="button" id="cssd-exp" style="margin-left:6px;padding:2px 8px;font-size:11px;cursor:pointer;border-radius:4px;border:1px solid #cbd5e1;background:#fff;">📥 导出名单 (CSV)</button>';
        
        document.getElementById('cssd-exp').onclick = function() { exportCSV(currentList); };
        var moeBtn = document.getElementById('cssd-moe-btn');
        if (moeBtn) {
          moeBtn.onclick = function() {
            q.value = '2026教育部社科';
            window.spFilterScholarsLive();
            toast('已筛选 2026 年度教育部人文社科 108 项立项名单');
          };
        }
      }
      if (empty) empty.style.display = currentList.length ? 'none' : 'block';

      smoothRender(grid, currentList, function(s) {
        if (window.makeScholarCard) return window.makeScholarCard(s);
        var div = document.createElement('div');
        div.className = 'sc';
        var isMoe = s.hats && s.hats.indexOf('2026教育部社科') >= 0;
        div.innerHTML = '<div class="sc-hd"><div class="sc-av" style="background:' + (s.c || '#2563eb') + '">' + (s.i || (s.n ? s.n[0] : '')) + '</div><div class="sc-meta"><div class="sc-name">' + s.n + ' <span class="sc-title">' + (s.title || '') + '</span>' +
          (isMoe ? '<span style="font-size:10px;background:#eff6ff;color:#1e40af;padding:1px 5px;border-radius:3px;margin-left:4px;border:1px solid #bfdbfe;">2026教育部社科</span>' : '') +
          '</div><div class="sc-inst">' + (s.institution || s.s || '') + ' · ' + (s.dL || '') + '</div></div></div>' +
          (s.r ? ('<div class="sc-r">' + s.r + '</div>') : '');
        return div;
      });
    };

    var info = document.getElementById('rinfo');
    if (info && !document.getElementById('cssd-moe-btn')) {
      var moeBtn = document.createElement('button');
      moeBtn.type = 'button';
      moeBtn.id = 'cssd-moe-btn';
      moeBtn.style.cssText = 'margin-left:8px;padding:2px 8px;font-size:11px;cursor:pointer;border-radius:4px;border:1px solid #bfdbfe;background:#eff6ff;color:#1e40af;font-weight:bold;';
      moeBtn.textContent = '🏅 2026教育部社科(108项)';
      moeBtn.onclick = function() {
        var q = document.getElementById('sp-scholars-q');
        if (q) {
          q.value = '2026教育部社科';
          window.spFilterScholarsLive();
        }
      };
      info.appendChild(moeBtn);
    }
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
