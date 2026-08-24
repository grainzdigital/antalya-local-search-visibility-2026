#!/usr/bin/env node
const raw = process.argv[2];
if (!raw) {
  console.error("Usage: grainz-geo-audit https://example.com");
  process.exit(1);
}
let target;
try { target = new URL(raw); } catch { console.error("Invalid URL."); process.exit(1); }

const timeout = (ms) => {
  const c = new AbortController();
  setTimeout(() => c.abort(), ms);
  return c.signal;
};
const get = async (url) => {
  try {
    const r = await fetch(url, {redirect:"follow", signal:timeout(10000), headers:{"user-agent":"GrainzGeoAudit/0.1"}});
    return {ok:r.ok, status:r.status, url:r.url, text:await r.text()};
  } catch (e) { return {ok:false, status:0, url, text:"", error:e.message}; }
};
const has = (html, re) => re.test(html);
const matches = (html, re) => [...html.matchAll(re)];

const page = await get(target.href);
if (!page.ok) {
  console.error(`Could not fetch page (status ${page.status || "network error"}).`);
  process.exit(2);
}
const html = page.text;
const tests = [];
const add = (name, pass, note="") => tests.push({name, pass:Boolean(pass), note});

add("HTTPS", page.url.startsWith("https://"));
add("Title", has(html, /<title[^>]*>\s*[^<]{2,}\s*<\/title>/i));
add("Meta description", has(html, /<meta[^>]+name=["']description["'][^>]+content=["'][^"']{20,}["']/i) || has(html, /<meta[^>]+content=["'][^"']{20,}["'][^>]+name=["']description["']/i));
add("Canonical", has(html, /<link[^>]+rel=["']canonical["']/i));
add("Viewport", has(html, /<meta[^>]+name=["']viewport["']/i));
const h1s = matches(html, /<h1\b[^>]*>/gi).length;
add("Exactly one H1", h1s === 1, `found ${h1s}`);
add("JSON-LD", has(html, /<script[^>]+type=["']application\/ld\+json["']/i));
add("Open Graph title", has(html, /<meta[^>]+property=["']og:title["']/i));
add("Open Graph description", has(html, /<meta[^>]+property=["']og:description["']/i));
add("Robots meta not noindex", !has(html, /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i));
add("hreflang (optional)", has(html, /hreflang=/i), "optional for multilingual sites");

const base = new URL(page.url);
const robots = await get(new URL("/robots.txt", base.origin).href);
const sitemap = await get(new URL("/sitemap.xml", base.origin).href);
const llms = await get(new URL("/llms.txt", base.origin).href);
add("robots.txt", robots.ok);
add("sitemap.xml", sitemap.ok);
add("llms.txt (experimental)", llms.ok, "experimental; not a Google ranking requirement");

const core = tests.filter(t => !t.name.includes("optional") && !t.name.includes("experimental"));
const score = Math.round(core.filter(t=>t.pass).length / core.length * 100);

console.log(`\nGRAINZ TECHNICAL DISCOVERABILITY AUDIT`);
console.log(`${page.url}\n`);
for (const t of tests) console.log(`${t.pass ? "✓" : "✗"} ${t.name}${t.note ? ` — ${t.note}` : ""}`);
console.log(`\nChecklist score: ${score}/100`);
console.log("This is a technical checklist, not a search-ranking score or ranking guarantee.\n");
