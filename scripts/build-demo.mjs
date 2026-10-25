import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');

await build({ root });
let html = await readFile(resolve(output, 'index.html'), 'utf8');

for (const match of [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/g)]) {
  const javascript = await readFile(resolve(output, match[1]), 'utf8');
  html = html.replace(match[0], () => `<script type="module">${javascript.replace(/<\/script/gi, '<\\/script')}</script>`);
}

for (const match of [...html.matchAll(/<link\b[^>]*\brel="stylesheet"[^>]*\bhref="([^"]+)"[^>]*>/g)]) {
  const css = await readFile(resolve(output, match[1]), 'utf8');
  html = html.replace(match[0], () => `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>`);
}

await writeFile(resolve(root, 'demo.html'), html);
console.log('Готово: demo.html. JavaScript и CSS встроены в один файл.');
