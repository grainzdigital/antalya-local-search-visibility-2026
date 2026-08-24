# grainz-geo-audit

A zero-dependency Node.js CLI for fast technical discoverability checks.

```bash
node bin/grainz-geo-audit.mjs https://example.com
```

Checks include HTTPS, title, meta description, canonical, viewport, H1, JSON-LD, Open Graph, robots, sitemap and an explicitly **experimental** `llms.txt` check.

The output is a checklist score, **not** a ranking score and not a ranking guarantee.
