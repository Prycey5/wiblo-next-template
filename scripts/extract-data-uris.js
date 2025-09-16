#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const [, , targetPath] = process.argv;

if (!targetPath) {
  console.error('Usage: node extract-data-uris.js <HTML_FILE>');
  process.exit(1);
}

if (!fs.existsSync(targetPath)) {
  console.error(`File not found: ${targetPath}`);
  process.exit(1);
}

const html = fs.readFileSync(targetPath, 'utf8');
const assetsDir = path.join(path.dirname(targetPath), 'assets');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const dataUriRegex = /data:(?<mime>[^;,\s]+)(?<params>(?:;[^;,]+)*)?,(?<data>[^"'\s]+)/g;

const extensionMap = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
  'font/woff2': 'woff2',
  'font/woff': 'woff',
  'font/ttf': 'ttf',
  'application/font-woff': 'woff',
  'application/font-woff2': 'woff2',
  'application/font-ttf': 'ttf',
  'application/x-font-ttf': 'ttf',
  'application/x-font-woff': 'woff'
};

function getExtension(mime) {
  if (extensionMap[mime]) {
    return extensionMap[mime];
  }
  const fallback = mime.split('/').pop();
  if (!fallback) {
    return 'bin';
  }
  const clean = fallback.replace(/[^a-zA-Z0-9]+/g, '-');
  return clean || 'bin';
}

function decodePercentEncodedToBuffer(data) {
  const bytes = [];
  for (let i = 0; i < data.length; i++) {
    const char = data[i];
    if (char === '%') {
      const hex = data.slice(i + 1, i + 3);
      if (/^[0-9A-Fa-f]{2}$/.test(hex)) {
        bytes.push(parseInt(hex, 16));
        i += 2;
        continue;
      }
    } else if (char === '+') {
      bytes.push(0x20);
      continue;
    }

    bytes.push(char.charCodeAt(0));
  }

  return Buffer.from(bytes);
}

function buildReplacement(relativePath) {
  if (relativePath.endsWith('.svg')) {
    return `${relativePath}`;
  }
  return relativePath;
}

const replacements = [];
const assetCache = new Map();
let match;

while ((match = dataUriRegex.exec(html)) !== null) {
  const { mime, params, data } = match.groups || {};
  if (!mime || !data) {
    continue;
  }

  let buffer;

  if (params && params.includes(';base64')) {
    const cleanData = data.replace(/\s+/g, '');
    try {
      buffer = Buffer.from(cleanData, 'base64');
    } catch (error) {
      console.warn(`Skipping invalid base64 asset for mime ${mime}`);
      continue;
    }
  } else {
    try {
      buffer = decodePercentEncodedToBuffer(data);
    } catch (error) {
      console.warn(`Skipping invalid percent-encoded asset for mime ${mime}`);
      continue;
    }
  }

  const hash = crypto.createHash('sha1').update(buffer).digest('hex').slice(0, 16);
  const ext = getExtension(mime);
  const filename = `${hash}.${ext}`;
  const relativePath = path.join('assets', filename).replace(/\\/g, '/');
  const assetPath = path.join(assetsDir, filename);

  if (!assetCache.has(hash)) {
    try {
      fs.writeFileSync(assetPath, buffer);
      assetCache.set(hash, relativePath);
    } catch (error) {
      console.error(`Failed to write asset ${assetPath}:`, error.message);
      continue;
    }
  }

  replacements.push({
    start: match.index,
    end: match.index + match[0].length,
    replacement: buildReplacement(assetCache.get(hash))
  });
}

if (!replacements.length) {
  console.log('No data URIs found to extract.');
  process.exit(0);
}

let result = '';
let lastIndex = 0;

for (const { start, end, replacement } of replacements) {
  result += html.slice(lastIndex, start) + replacement;
  lastIndex = end;
}

result += html.slice(lastIndex);

fs.writeFileSync(targetPath, result, 'utf8');

console.log(`Extracted ${assetCache.size} embedded assets to ${path.relative(process.cwd(), assetsDir)}`);
console.log(`Replaced ${replacements.length} data URI occurrence(s).`);
