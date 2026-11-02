#!/usr/bin/env node
/**
 * cache-bust.mjs — 按文件内容重算 8 位 sha256 哈希，重命名资产并更新 HTML 引用。
 *
 * 用法：
 *   node scripts/cache-bust.mjs          # 重算并改名 + 改 HTML
 *   node scripts/cache-bust.mjs --check  # 只检查，不改文件（exit 1 表示有漂移）
 *   node scripts/cache-bust.mjs --dry    # 打印计划，不落盘
 *
 * 规则：
 * - 带内容哈希的资产（immutable / 长缓存）内容变了必须换新文件名，禁止同名覆盖。
 * - portal.polish.css / home-daily.js 故意固定名 + 短缓存，本脚本不碰。
 * - 不改 portal.editorial_* / 编辑内容。
 *
 * 发布步骤见 README「缓存与发布（cache-bust）」一节。
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const DRY = process.argv.includes('--dry');

/** @type {{ pattern: RegExp, kind: string }[]} */
const HASHED = [
  { pattern: /^portal\.([0-9a-f]{8})\.js$/, kind: 'portal.js' },
  { pattern: /^portal\.([0-9a-f]{8})\.css$/, kind: 'portal.css' },
  { pattern: /^portal\.premium\.([0-9a-f]{8})\.css$/, kind: 'portal.premium.css' },
  { pattern: /^sports-scholars-data\.([0-9a-f]{8})\.js$/, kind: 'sports-scholars-data.js' },
  { pattern: /^sports-univ-catalog\.([0-9a-f]{8})\.js$/, kind: 'sports-univ-catalog.js' },
  { pattern: /^sports-cnki-data\.([0-9a-f]{8})\.js$/, kind: 'sports-cnki-data.js' },
  { pattern: /^home-news\.([0-9a-f]{8})\.js$/, kind: 'home-news.js' },
  { pattern: /^home-xuejie\.([0-9a-f]{8})\.js$/, kind: 'home-xuejie.js' },
];

/** 尚未带哈希、但 EdgeOne 可能按 portal.*.css 长缓存的固定名 → 首次纳入哈希 */
const PROMOTE = [
  { file: 'portal.premium.css', to: (h) => `portal.premium.${h}.css` },
];

const HTML_FILES = ['index.html', 'nssf2026.html', '404.html', 'redesign-home.html'];

function sha8(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex').slice(0, 8);
}

function listRootFiles() {
  return fs.readdirSync(ROOT).filter((n) => fs.statSync(path.join(ROOT, n)).isFile());
}

function rebuildName(oldName, hash) {
  return oldName.replace(/\.[0-9a-f]{8}\.(js|css)$/i, `.${hash}.$1`);
}

function main() {
  const files = listRootFiles();
  /** @type {{ from: string, to: string, kind: string }[]} */
  const renames = [];
  const seenKinds = new Set();

  for (const name of files) {
    for (const { pattern, kind } of HASHED) {
      const m = name.match(pattern);
      if (!m) continue;
      seenKinds.add(kind);
      const buf = fs.readFileSync(path.join(ROOT, name));
      const hash = sha8(buf);
      const next = rebuildName(name, hash);
      if (next !== name) {
        renames.push({ from: name, to: next, kind });
      } else {
        console.log(`ok  ${name}`);
      }
    }
  }

  for (const { file, to } of PROMOTE) {
    if (!fs.existsSync(path.join(ROOT, file))) continue;
    // 已有 hashed 版则跳过 promote
    if (files.some((n) => n.startsWith('portal.premium.') && n.endsWith('.css') && n !== file)) {
      continue;
    }
    const buf = fs.readFileSync(path.join(ROOT, file));
    const hash = sha8(buf);
    const next = to(hash);
    renames.push({ from: file, to: next, kind: 'portal.premium.css' });
  }

  if (renames.length === 0) {
    console.log('All hashed assets match content. Nothing to do.');
    process.exit(0);
  }

  console.log(CHECK || DRY ? 'Planned renames:' : 'Applying renames:');
  for (const r of renames) {
    console.log(`  ${r.from}  →  ${r.to}`);
  }

  if (CHECK) {
    console.error(`\n[check] ${renames.length} asset(s) out of sync with content hash.`);
    process.exit(1);
  }
  if (DRY) process.exit(0);

  // 避免 to 已存在冲突
  for (const r of renames) {
    const dest = path.join(ROOT, r.to);
    if (fs.existsSync(dest) && r.from !== r.to) {
      console.error(`Refusing to overwrite existing ${r.to}`);
      process.exit(1);
    }
  }

  for (const r of renames) {
    fs.renameSync(path.join(ROOT, r.from), path.join(ROOT, r.to));
  }

  const replaceMap = new Map(renames.map((r) => [r.from, r.to]));
  for (const html of HTML_FILES) {
    const p = path.join(ROOT, html);
    if (!fs.existsSync(p)) continue;
    let text = fs.readFileSync(p, 'utf8');
    let changed = false;
    for (const [from, to] of replaceMap) {
      if (text.includes(from)) {
        text = text.split(from).join(to);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(p, text);
      console.log(`updated ${html}`);
    }
  }

  console.log(`\nDone. ${renames.length} file(s) renamed. Commit both the new names and HTML together.`);
  console.log('Do NOT upload only the bytes under an old immutable filename.');
}

main();
