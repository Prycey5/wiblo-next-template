#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function usage() {
  console.error('Usage: node chunk-file.js <file> [--maxTokens=<number>]');
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length === 0) {
  usage();
}

const filePath = args[0];
if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

const maxTokensArg = args.find((arg) => arg.startsWith('--maxTokens='));
const maxTokens = maxTokensArg ? parseInt(maxTokensArg.split('=')[1], 10) : 25000;
if (Number.isNaN(maxTokens) || maxTokens <= 0) {
  console.error('Invalid value for --maxTokens.');
  process.exit(1);
}

const approxCharsPerToken = 4;
const maxChars = maxTokens * approxCharsPerToken;

const parsed = path.parse(filePath);
const dir = parsed.dir || '.';
const baseName = parsed.name;
const ext = parsed.ext || '';

const partPattern = new RegExp(`^${escapeRegExp(baseName)}_part_\\d{2,}${escapeRegExp(ext)}$`);

const existing = fs.readdirSync(dir)
  .filter((file) => partPattern.test(file))
  .map((file) => path.join(dir, file));

for (const part of existing) {
  fs.unlinkSync(part);
}

const content = fs.readFileSync(filePath, 'utf8');
if (content.length <= maxChars) {
  console.log(`Skipping chunking for ${filePath} (length ${content.length} chars <= limit ${maxChars}).`);
  process.exit(0);
}

let index = 0;
for (let offset = 0; offset < content.length; offset += maxChars) {
  const chunk = content.slice(offset, offset + maxChars);
  const partName = `${baseName}_part_${String(index).padStart(2, '0')}${ext}`;
  const partPath = path.join(dir, partName);
  fs.writeFileSync(partPath, chunk, 'utf8');
  index += 1;
}

console.log(`Chunked ${filePath} into ${index} part(s) with approx ${maxTokens} token limit.`);
