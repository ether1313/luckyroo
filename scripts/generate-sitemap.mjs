/**
 * Generates sitemap.xml and robots.txt into the build output directory.
 * Run after build (e.g. via Vite plugin closeBundle).
 * Usage: node scripts/generate-sitemap.mjs [outDir]
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SITE_URL = 'https://www.luckyroo.win';

const outDir = process.argv[2] || resolve(ROOT, 'out');

function extractCasinoSlugs() {
  const path = resolve(ROOT, 'src/pages/casino-review/casinoData.ts');
  const content = readFileSync(path, 'utf-8');
  // Match slug: 'literal' only (LIST entries); avoids slug: string type
  const matches = content.matchAll(/\bslug:\s*'([^']+)'/g);
  return [...matches].map((m) => m[1]);
}

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function buildSitemapXml(urls) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urlEntries = urls.map(
    (u) =>
      `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${u.changefreq || 'weekly'}</changefreq>\n    <priority>${u.priority ?? '0.8'}</priority>\n  </url>`
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>
`.trimEnd() + '\n';
}

function main() {
  const slugs = extractCasinoSlugs();
  const basePath = ''; // site is at root; if you use base path, set it here

  const urls = [
    { loc: `${SITE_URL}/`, changefreq: 'daily', priority: '1.0' },
    { loc: `${SITE_URL}/australia-online-casinos`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${SITE_URL}/australia-casino-bonuses`, changefreq: 'weekly', priority: '0.9' },
    ...slugs.map((slug) => ({
      loc: `${SITE_URL}/casino/${slug}-casino`,
      changefreq: 'weekly',
      priority: '0.8',
    })),
  ];

  mkdirSync(outDir, { recursive: true });

  const sitemap = buildSitemapXml(urls);
  writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap, 'utf-8');
  console.log('Written:', resolve(outDir, 'sitemap.xml'));

  const robots = `# Lucky Roo - Australia Online Casino & Pokies Reviews
# https://www.luckyroo.win
# Auto-generated on build.

User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  writeFileSync(resolve(outDir, 'robots.txt'), robots, 'utf-8');
  console.log('Written:', resolve(outDir, 'robots.txt'));
}

main();
