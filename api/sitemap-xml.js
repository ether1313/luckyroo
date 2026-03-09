/**
 * Vercel serverless function: returns sitemap XML for Google Search Console.
 * Rewrite /sitemap.xml -> /api/sitemap-xml in vercel.json so this handles the request.
 * Keep SLUGS in sync with src/pages/casino-review/casinoData.ts LIST entries.
 */
const SITE_URL = 'https://luckyroo.win';
const SLUGS = [
  'ipay9', 'kingbet9', 'bigpay77', 'me99', 'rolex9', 'gucci9', 'pkm9',
  'mrbean9', 'micky9', 'winnie777', 'bybid9', 'queen13', 'ace96au',
];

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSitemapXml() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: `${SITE_URL}/`, changefreq: 'daily', priority: '1.0' },
    { loc: `${SITE_URL}/australia-online-casinos`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${SITE_URL}/australia-casino-bonuses`, changefreq: 'weekly', priority: '0.9' },
    ...SLUGS.map((slug) => ({
      loc: `${SITE_URL}/casino/${slug}-casino`,
      changefreq: 'weekly',
      priority: '0.8',
    })),
  ];
  const urlEntries = urls.map(
    (u) =>
      `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>
`;
}

module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.status(200).send(buildSitemapXml());
};
