# grainz-dataset-jsonld

Generate Google/Schema.org-friendly `Dataset` + `DataDownload` JSON-LD from a small metadata file.

```bash
node bin/grainz-dataset-jsonld.mjs examples/metadata.example.json > dataset.jsonld
```

After publishing mirrors, add GitHub/Kaggle/Hugging Face/Zenodo URLs to `sameAs`. Add the Zenodo DOI to `identifier` or a dedicated DOI field in your site implementation.
