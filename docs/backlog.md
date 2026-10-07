# Portfolio backlog and parking lot

Started Oct 7, 2026. This is where ideas wait. Nothing here is committed work until it moves to "Now".

## Rules for every entry

- Public data only. No employer data, figures or internal work, and nothing that recreates employer IP. Work-inspired ideas are rebuilt on public data and described at a high level.
- Each project lives in its own repo with a README, licence and requirements file, then gets one MDX case study (Problem, Approach, Result, Reflection).
- Label honestly with `status`: original, reproduction or refresh.
- Cadence: one new project or write-up every one to two months.
- Check dataset availability and licence before committing to an idea.

## Now and next (site and flagship)

| Item | Why | Effort |
| --- | --- | --- |
| Phase 4a: migrate Yelp, forecasting (Parts 1 and 2 merged), box office and the 2020 post | Closes the dead window; old URLs land on real pages | M |
| Retarget the redirect stub to final URLs (`--mode final`) | Removes the extra hop | S |
| Public resume PDF (no employer figures, no phone or email) | The Resume page is empty until then | S |
| HDB repo hygiene: README data span (says 1990; data is Jan 2017 to Apr 2026), personal dataset name, LICENSE, description, topics, default branch | First thing a visitor sees from the case study | S |
| Decisions: analytics provider, Giscus or none, custom domain | Deferred; none block anything | S |
| Lighthouse CI check on pull requests (90+ performance and accessibility) | Keeps the quality bar without manual runs | S |

## Project ideas

Effort: S is a weekend, M is 2 to 3 weeks of evenings, L is a month or more.

| ID | Idea | Why it strengthens the portfolio | Public data (verify) | Stack | Effort |
| --- | --- | --- | --- | --- | --- |
| P1 | **HDB phase 2:** incremental scheduled loads, MRT and school proximity, a simple price forecast | Extends the flagship; the README already lists all three as future work | Same sources plus OneMap and data.gov.sg | Python, BigQuery, dbt, Kestra or GitHub Actions | M |
| P2 | **Experimentation toolkit:** power and sample size, sequential testing, variance reduction (CUPED), with a written guide to common pitfalls | Experimentation is the strongest theme in your experience and is absent from the site | A public A/B test dataset, for example the Criteo uplift data or a mobile-game A/B dataset | Python | M |
| P3 | **Marketing incrementality and uplift modelling:** who actually changes behaviour because of a campaign | Shows causal thinking beyond prediction | Criteo uplift dataset, Hillstrom email dataset | Python, causal ML libraries | M |
| P4 | **Customer 360 pipeline:** Airflow, dbt and a small feature store, then segmentation and lifetime value | Pairs data engineering with customer analytics | An e-commerce dataset such as Olist or UCI Online Retail II | Airflow, dbt, BigQuery or DuckDB, Python | L |
| P5 | **Text-to-SQL assistant over the HDB marts:** natural-language questions answered with SQL, with an evaluation set and guardrails | Reuses the flagship's data; shows GenAI done with evaluation, not a demo | The HDB marts | LLM API, BigQuery, Python | M |
| P6 | **Churn model with an honest evaluation:** time-based splits, calibration, a retention-campaign simulation | A familiar topic done properly | A public subscription churn dataset (check licence) | Python | M |
| P7 | **Promotion and fraud detection:** rules versus a model, with cost-aware thresholds | Public-data version of a real problem | A public card-fraud dataset | Python | S |
| P8 | **Second analytics-engineering project** on a different public Singapore dataset, for example vehicle quota premiums | Shows the HDB approach generalises | data.gov.sg (check availability) | dbt, BigQuery, Looker Studio | M |

## Refreshes of the 2018 work (`status: refresh`)

| ID | Idea | Notes |
| --- | --- | --- |
| R1 | Forecasting 2026: ETS and ARIMA against modern libraries and a pretrained forecasting model, on the HDB monthly series | Fixes the 5-week test window; proper backtesting |
| R2 | Yelp sentiment: TF-IDF baseline against embeddings and a small fine-tuned transformer, with class-level metrics | The 2018 confusion matrix already gives about 83% precision and 68% recall for 1-star |
| R3 | Box office: ordinal modelling and gradient boosting, with baselines that account for edge buckets (exact about 10%, within-one about 28%) | Resolve the 59.24% vs 59.43% inconsistency first |

## Writing ideas

| Idea | Source |
| --- | --- |
| Exact versus approximate medians in BigQuery, and why the HDB findings use averages | Today's HDB findings work |
| What I would change in the HDB pipeline | The HDB Reflection, expanded |
| Pitfalls in A/B testing | P2 spin-off |
| Writing a metric tree and KPI definitions people actually use | Generic, no employer detail |
| Building this portfolio with Astro, Actions and a redirect stub | This project |

## Parked, with reasons

| Idea | Why parked |
| --- | --- |
| Multi-agent trend-to-campaign prototype | Too close to employer work. Revisit only as a clearly different, public-data project, after checking with yourself on IP. |
| Anything needing paid APIs or compute | Keeps hosting and running costs at zero |
| Dashboards without a pipeline behind them | Weaker signal than the end-to-end case studies |

## Suggested order

1. Finish Phase 4 and the public resume (closes the open loops).
2. P1, because it is cheap and strengthens the flagship.
3. P2 or P3, to add the experimentation story.
4. P5, to show applied GenAI on data you already own.
5. Refreshes R1 to R3 as quick wins between larger projects.

## Template for a new entry

```
ID: P?
Idea:
Why it helps the portfolio:
Public data (licence, availability checked?):
Stack:
Effort (S/M/L):
Status label (original / reproduction / refresh):
Definition of done (repo, README, licence, case study):
```
