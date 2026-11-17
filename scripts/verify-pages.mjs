import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const output = "dist/client";
const base = "/screenshot-to-sight-3456/";
const routes = ["", "nossa-casa", "marcas", "colecoes", "expositores", "contato"];
for (const route of routes) {
  const html = readFileSync(`${output}/${route ? `${route}/` : ""}index.html`, "utf8");
  assert.match(html, /name="robots" content="noindex, nofollow"/, `${route}: noindex`);
  assert.match(html, /PROTÓTIPO PRIVADO · NÃO OFICIAL/, `${route}: prototype notice`);
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    assert.ok(url.startsWith(base), `${route}: resource outside project base: ${url}`);
    const local = decodeURIComponent(url.slice(base.length));
    assert.ok(
      existsSync(`${output}/${local || "index.html"}`) ||
        existsSync(`${output}/${local}/index.html`),
      `${route}: missing resource: ${url}`,
    );
  }
}
assert.ok(existsSync(`${output}/.nojekyll`));
assert.match(readFileSync(`${output}/robots.txt`, "utf8"), /User-agent: \*\s+Disallow: \//);
console.log("Pages verified: 6 routes, local links/assets, noindex and prototype notice.");
