const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(path.join(__dirname,'../enhanced-scholars.js'),'utf8');
const begin = source.indexOf('  function downloadICS(ev) {');
const end = source.indexOf('\n  // 1.',begin);
assert(begin >= 0 && end > begin);
let lastBlob, clicks = 0, notice = '';
const context = {
  Blob, TextEncoder, Date, setTimeout() {},
  URL:{createObjectURL(blob){lastBlob=blob;return 'blob:test';},revokeObjectURL(){}},
  document:{createElement(){return {click(){clicks++;}};}},
  showToast(text){notice=text;}
};
vm.createContext(context);
vm.runInContext(source.slice(begin,end)+'\nthis.exportEvent=downloadICS;',context);
async function exportText(event){
  lastBlob=null;
  context.exportEvent(event);
  return lastBlob ? lastBlob.text() : null;
}
(async()=>{
  const fixtures=[
    [{start:'2026-11-06',end:'2026-11-08',title:'多日会议'},'20261109'],
    [{start:'2026-12-31',title:'单日会议'},'20270101'],
    [{start:'2028-02-28',end:'2028-02-29',title:'闰年会议'},'20280301']
  ];
  for(const [event,expected] of fixtures){
    const text=await exportText(event);
    assert(text.includes('DTEND;VALUE=DATE:'+expected),'Final day is included');
    assert.match(text,/UID:cssd-[a-f0-9]+@tiyuxueren\.com/);
    assert.match(text,/DTSTAMP:\d{8}T\d{6}Z/);
    assert(text.endsWith('END:VCALENDAR\r\n'));
  }
  const event={start:'2026-11-06',title:'中文会议,分会;讨论\\研究\n新议题'.repeat(8),loc:'武汉;中国',host:'学会'};
  const text=await exportText(event);
  assert(text.split('\r\n').every(line=>Buffer.byteLength(line,'utf8')<=75),'UTF-8 content lines are folded');
  const unfolded=text.replace(/\r\n[ \t]/g,'');
  assert(unfolded.includes('中文会议\\,分会\\;讨论\\\\研究\\n新议题'));
  const repeat=await exportText(event);
  assert.equal(text.match(/UID:[^\r]+/)[0],repeat.match(/UID:[^\r]+/)[0],'Repeated exports retain event identity');
  for(const invalid of [{start:'2026-02-30',title:'错误日期'},{start:'2026-11-08',end:'2026-11-06',title:'倒置日期'},{title:'无日期'}]){
    assert.equal(await exportText(invalid),null);
    assert(notice.includes('不能导出'));
  }
  console.log('PASS: multi-day, single-day, year/leap boundaries, stable UID, timestamps, escaping, UTF-8 folding and invalid-date rejection.');
})().catch(error=>{console.error(error);process.exitCode=1;});
