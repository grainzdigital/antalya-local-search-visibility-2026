#!/usr/bin/env node
import fs from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: grainz-dataset-jsonld metadata.json");
  process.exit(1);
}
const m = JSON.parse(fs.readFileSync(file, "utf8"));
for (const key of ["name","description","url","creator","datePublished","license"]) {
  if (!m[key]) { console.error(`Missing required field: ${key}`); process.exit(2); }
}
const out = {
  "@context":"https://schema.org",
  "@type":"Dataset",
  name:m.name,
  description:m.description,
  url:m.url,
  identifier:m.identifier,
  creator:{"@type":"Organization",name:m.creator,url:m.creatorUrl},
  publisher:{"@type":"Organization",name:m.publisher || m.creator,url:m.publisherUrl || m.creatorUrl},
  datePublished:m.datePublished,
  dateModified:m.dateModified || m.datePublished,
  version:m.version,
  license:m.license,
  isAccessibleForFree:true,
  spatialCoverage:m.spatialCoverage ? {"@type":"Place","name":m.spatialCoverage} : undefined,
  temporalCoverage:m.temporalCoverage,
  keywords:m.keywords,
  sameAs:m.sameAs,
  distribution:(m.distribution || []).map(d => ({
    "@type":"DataDownload",
    encodingFormat:d.encodingFormat,
    contentUrl:d.contentUrl
  }))
};
for (const k of Object.keys(out)) if (out[k] === undefined) delete out[k];
console.log(JSON.stringify(out, null, 2));
