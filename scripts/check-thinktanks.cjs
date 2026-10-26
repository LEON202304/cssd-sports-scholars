/* Dependency-free checks for the homepage directory and its maintained sources. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const root = process.env.CSSD_CHECK_ROOT || path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const asset = html.match(/src="(home-thinktanks\.([a-f0-9]{8})\.js)"/);
const style = html.match(/href="(home-thinktanks\.([a-f0-9]{8})\.css)"/);
assert(asset && style, 'Directory assets must be referenced by the homepage');
for (const match of [asset, style]) {
  const bytes = fs.readFileSync(path.join(root, match[1]));
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 8), match[2], 'Asset hash must match its content');
}
const source = fs.readFileSync(path.join(root, asset[1]), 'utf8');
const data = JSON.parse(fs.readFileSync(path.join(root, 'docs/sports-thinktanks.json'), 'utf8'));
assert.equal(data.units.length, 39);
assert.equal(data.units.filter(u => u.highEnd).length, 17);
assert.equal(new Set(data.units.map(u => u.name + '|' + u.school)).size, 39);
for (const u of data.units) {
  for (const field of ['name', 'school', 'region', 'category', 'url', 'source', 'evidence']) assert(u[field], field);
  assert.equal(new URL(u.url).protocol, 'https:');
  assert.equal(new URL(u.source).protocol, 'https:');
}
function control(mode) {
  return {value: '', dataset: {mode}, hidden: false, innerHTML: '', textContent: '', events: {}, attrs: {},
    addEventListener(name, fn) { this.events[name] = fn; },
    setAttribute(name, value) { this.attrs[name] = value; }, focus() { this.focused = true; }};
}
let mounted, insertions = 0;
const controls = Object.fromEntries(['ttQuery', 'ttCategory', 'ttRows', 'ttResults', 'ttShowAll', 'ttReset'].map(id => [id, control()]));
const modes = ['all', 'high', 'other'].map(control);
const parent = {insertBefore(section) { mounted = section; insertions++; }};
const document = {readyState: 'complete', getElementById() { return mounted; },
  querySelector() { return {parentNode: parent}; },
  createElement() { return {setAttribute() {}, querySelector(sel) { return controls[sel.slice(1)]; }, querySelectorAll() { return modes; }}; }};
const context = {document, URL, window: {}};
const instrumented = source.replace('  function start(){', '  window.directoryTest={units:units,matches:matches};\n  function start(){');
vm.runInNewContext(instrumented, context);
assert.deepEqual(JSON.parse(JSON.stringify(context.window.directoryTest.units)), data.units, 'Rendered and source data must match');
const rowCount = () => (controls.ttRows.innerHTML.match(/<tr>/g) || []).length;
assert.equal(rowCount(), 12);
controls.ttShowAll.events.click();
assert.equal(rowCount(), 39);
assert.equal((controls.ttRows.innerHTML.match(/class="tt-star"/g) || []).length, 17);
assert.equal((controls.ttRows.innerHTML.match(/target="_blank" rel="noopener noreferrer"/g) || []).length, 78);
assert.equal(controls.ttShowAll.hidden, true);
modes[1].events.click();
assert(controls.ttResults.textContent.includes('匹配 17 条'));
controls.ttShowAll.events.click();
assert.equal(rowCount(), 17);
modes[2].events.click();
assert(controls.ttResults.textContent.includes('匹配 22 条'));
assert(!controls.ttRows.innerHTML.includes('class="tt-star"'));
controls.ttQuery.value = '湖北 体育产业';
controls.ttQuery.events.input();
assert.equal(rowCount(), 1);
assert(controls.ttRows.innerHTML.includes('湖北体育产业研究中心'));
controls.ttQuery.value = '不存在的智库xyz';
controls.ttQuery.events.input();
assert(controls.ttRows.innerHTML.includes('没有匹配'));
assert.equal(controls.ttShowAll.hidden, true);
controls.ttReset.events.click();
assert.equal(controls.ttQuery.value, '');
assert(controls.ttResults.textContent.includes('匹配 39 条'));
assert.equal(controls.ttQuery.focused, true);
controls.ttCategory.value = '智库联盟';
controls.ttCategory.events.change();
assert.equal(rowCount(), 1);
assert(controls.ttRows.innerHTML.includes('体育旅游高端智库联盟'));
assert(!controls.ttRows.innerHTML.includes('class="tt-star"'));
vm.runInNewContext(source, context);
assert.equal(insertions, 1);
assert(source.includes('公示') && source.includes('非全国全量清单'));
console.log('PASS: 39 records, 17 stars, asset hashes, source parity, search, filters, show-all, empty state, reset, external links, idempotent mount.');
