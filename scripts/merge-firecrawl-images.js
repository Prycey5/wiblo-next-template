#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function usage() {
  console.error('Usage: node merge-firecrawl-images.js <monolith_html> <firecrawl_markdown>');
  process.exit(1);
}

const [, , htmlPath, markdownPath] = process.argv;

if (!htmlPath || !markdownPath) {
  usage();
}

if (!fs.existsSync(htmlPath)) {
  console.error(`HTML file not found: ${htmlPath}`);
  process.exit(1);
}

if (!fs.existsSync(markdownPath)) {
  console.error(`Markdown file not found: ${markdownPath}`);
  process.exit(1);
}

function decodeEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function normalizeAlt(str) {
  if (!str) return '';
  return decodeEntities(str)
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function ensureBackup(filePath) {
  const backupPath = `${filePath}.backup`;
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log(`Created backup: ${backupPath}`);
  }
}

const markdown = fs.readFileSync(markdownPath, 'utf8');
const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
const imageMap = new Map();

let mdMatch;
while ((mdMatch = imageRegex.exec(markdown)) !== null) {
  const altRaw = mdMatch[1].trim();
  const url = mdMatch[2].trim();
  if (!altRaw || !url) continue;
  const normalizedAlt = normalizeAlt(altRaw);
  if (!normalizedAlt) continue;
  if (!imageMap.has(normalizedAlt)) {
    imageMap.set(normalizedAlt, { url, originalAlt: altRaw });
  }
}

if (!imageMap.size) {
  console.warn('No images found in Firecrawl markdown.');
}

const html = fs.readFileSync(htmlPath, 'utf8');
const imgTagRegex = /<img\b[^>]*>/gi;
let replacedCount = 0;
let inspectedCount = 0;
const missingAlts = new Map();

const updatedHtml = html.replace(imgTagRegex, (tag) => {
  inspectedCount += 1;
  const altMatch = tag.match(/alt="([^"]*)"/i);
  if (!altMatch) return tag;

  const altValue = altMatch[1];
  const normalizedAlt = normalizeAlt(altValue);
  if (!normalizedAlt) return tag;

  const entry = imageMap.get(normalizedAlt);
  if (!entry) {
    missingAlts.set(normalizedAlt, altValue);
    return tag;
  }

  let newTag = tag;
  const newUrl = entry.url;

  if (newTag.match(/srcset="[^"]*"/i)) {
    newTag = newTag.replace(/srcset="[^"]*"/i, `srcset="${newUrl} 1x"`);
  } else {
    newTag = newTag.replace('<img', `<img srcset="${newUrl} 1x"`);
  }

  if (newTag.match(/src="[^"]*"/i)) {
    newTag = newTag.replace(/src="[^"]*"/i, `src="${newUrl}"`);
  } else {
    newTag = newTag.replace('<img', `<img src="${newUrl}"`);
  }

  replacedCount += 1;
  return newTag;
});

if (!replacedCount) {
  console.warn('No <img> tags were updated.');
} else {
  ensureBackup(htmlPath);
  fs.writeFileSync(htmlPath, updatedHtml, 'utf8');
  console.log(`Updated ${replacedCount} of ${inspectedCount} <img> tags using Firecrawl data.`);
}

if (missingAlts.size) {
  console.warn('No matching Firecrawl URL for the following alt text values:');
  for (const original of missingAlts.values()) {
    console.warn(`  - ${original}`);
  }
}
