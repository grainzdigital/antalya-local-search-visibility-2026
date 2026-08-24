# Methodology

## Study
**Antalya Local Search Visibility Benchmark 2026**  
Capture date: **24 August 2026**

## Research question
What characteristics are common among businesses surfaced prominently in local-search style discovery for Antalya across multiple commercial sectors?

## Sample
This release contains **60 anonymized business-listing observations across 18 sectors**.

The sample is a **purposeful local-search visibility sample**. It is deliberately composed of businesses surfaced for sector-oriented local discovery queries in Antalya. It is **not**:

- a random sample of every Antalya business,
- a census,
- a causal ranking-factor study,
- a claim about Google's full index,
- a guarantee that any observed attribute improves rankings.

This distinction matters: the dataset describes a slice of **already-visible results**, so it is useful as a practical visibility benchmark, not as a citywide prevalence estimate.

## Captured fields
For each observation we recorded only analytical fields needed for the benchmark:

- sector
- district
- displayed rating
- displayed review count
- whether an address was visible
- whether a phone number was visible
- whether opening hours were visible
- whether price information was visible
- capture date

Business names, street addresses and phone numbers were intentionally removed from the public dataset.

## Missing values
One observation did not expose a usable rating/review count in the captured result. Percentage calculations involving ratings or reviews therefore use the **59 valid observations** for those fields.

## Interpretation rules
- Ratings and review counts are snapshots and can change after capture.
- Search visibility is dynamic and query/context dependent.
- The sample may over-represent businesses with strong local-search presence.
- Sector benchmarks should not be compared mechanically because review behavior differs substantially by category.
- Listing completeness is an observation, not proof of causation.

## Reproducibility
The included notebook recreates all summary statistics and charts from the CSV. The raw public release is anonymized; exact business identities are intentionally not required for replication of the published descriptive analysis.

## Version
v1.0.0 — 2026-08-24
