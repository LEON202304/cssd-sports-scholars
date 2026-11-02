const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(process.env.ACADEMIC_FEED_HTML || path.join(root, 'index.html'), 'utf8');
const js = html.match(/src="(academic-feed\.[a-f0-9]+\.js)"/)[1];
const css = html.match(/href="(academic-feed\.[a-f0-9]+\.css)"/)[1];
const crypto = require('node:crypto');
for (const file of [js, css]) {
  const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex').slice(0, 8);
  assert(file.includes(hash), 'Asset fingerprint matches content');
}
const feed = require(path.join(root, js));
assert(!/src="home-(?:news|xuejie|daily)[^"]*\.js"/.test(html), 'Retired previews are not loaded');
assert(html.includes('id="vw-academicnews"'), 'Existing route remains available');
const fixture = [{kind: 'papers', data: {items: [
  {title: '体育科研论文测试标题', link: 'https://example.org/a?utm_source=x', date: '2026-10-20'},
  {title: '体育科研论文测试标题', link: 'https://mirror.example.org/a', date: '2026-10-20'},
  {title: '恶意链接测试消息标题', link: 'javascript:alert(1)'},
  {title: '测试无日期体育科研论文', link: 'https://example.org/undated'}
]}}, {kind: 'daily', data: {items: [
  {title: '同一链接重复来源标题', link: 'http://example.org/a', date: '2026-10-20'},
  {title: '体育科研项目申报通知 本网讯 正文误入标题', link: 'https://example.org/p', date: '2026-10-21'},
  {title: '体育学术会议征文通知 时间：-20日 地点：北京', link: 'https://example.org/c', date: '2026-10-22'},
  {title: '关于公示某教师赴香港参加会议相关情况的通知', link: 'https://example.org/trip', date: '2026-10-23'}
]}}];
const rows = feed.normalize(fixture);
assert.equal(rows.length, 5, 'URL and title duplicates and unsafe links removed');
assert.equal(feed.filter(rows, {cat: 'policy', q: '申报'}).length, 1);
assert.equal(feed.filter(rows, {cat: 'conference', from: '2026-10-22', to: '2026-10-22'}).length, 1);
assert.equal(feed.filter(rows, {cat: 'all', q: '不存在'}).length, 0);
assert.equal(feed.filter(rows, {cat: 'all', from: '2026-10-01'}).length, 4, 'Date filter excludes undated records');
assert.equal(rows.find(r => r.url.endsWith('/trip')).category, 'community', 'Travel notices are not calls for papers');
assert(rows.every(r => !/本网讯|时间：-/.test(r.title)));
const sources = [['news-snapshot.json','papers'],['xuejie-snapshot.json','circle'],['daily-dynamics.json','daily']].map(([file,kind])=>({kind,data:JSON.parse(fs.readFileSync(path.join(root,file),'utf8'))}));
const actual = feed.normalize(sources);
assert(actual.length > 0);
assert(actual.every(r => ['research','policy','community','conference'].includes(r.category)));
assert.equal(feed.homeLimit, 8, 'Homepage shows eight rows');
const feedSrc = fs.readFileSync(path.join(root, js), 'utf8');
assert(!feedSrc.includes('af-lead'), 'Featured lead card is not rendered');
assert(!feedSrc.includes('af-home-grid'), 'Homepage is not a two-column grid');
assert(feedSrc.includes('rows.slice(0,state.limit)'), 'First row is included up to the cap');
const sorted = feed.normalize([{kind:'daily', data:{items:[
  {title:'较早的体育科研通知标题', link:'https://example.org/old', date:'2020-01-02'},
  {title:'较新的体育科研通知标题', link:'https://example.org/new', date:'2020-06-01'},
  {title:'未来的体育学术会议通知', link:'https://example.org/future', date:'2099-01-01'}
]}}]);
assert.deepEqual(sorted.map(r => r.date), ['2020-06-01','2020-01-02','2099-01-01'], 'Source dates sort descending, with future dates after current news');
console.log('PASS: fingerprints, consolidated entry, deduplication, title cleanup, safe links, categories, search, dates and source snapshots ('+actual.length+' records).');
