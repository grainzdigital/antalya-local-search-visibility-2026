# Data Dictionary

| Field | Type | Meaning |
|---|---|---|
| `business_id` | string | Stable anonymous ID for this release |
| `sector` | string | Normalized business category used for sampling |
| `district` | string | Antalya district visible/derived at capture time |
| `rating` | number/null | Displayed public rating at capture time |
| `review_count` | integer/null | Displayed public review count at capture time |
| `address_listed` | 0/1 | Whether an address/location field was visible |
| `phone_listed` | 0/1 | Whether a phone field was visible |
| `hours_listed` | 0/1 | Whether business hours were visible |
| `price_listed` | 0/1 | Whether price/price-level information was visible |
| `captured_date` | YYYY-MM-DD | Observation date |
| `sample_type` | string | Methodological sample label |

All business identities are anonymized in the public release.
