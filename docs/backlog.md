# Portfolio backlog and parking lot

Started Oct 7, 2026. This is where ideas wait. Nothing here is committed work until it moves to "Now".

## Rules for every entry

- Public data only. No employer data, figures or internal work, and nothing that recreates employer IP. Work-inspired ideas are rebuilt on public data and described at a high level.
- Each project lives in its own repo with a README, licence and requirements file, then gets one MDX case study (Problem, Approach, Result, Reflection).
- Label honestly with `status`: original, reproduction or refresh.
- Cadence: one new project or write-up every one to two months.
- Check dataset availability and licence before committing to an idea.
- AI ideas overlap with themes in employer work (text-to-SQL, agents, experimentation, customer data). Build them independently, on public data, with your own prompts and schemas, and no employer metrics or internal details.
- Keep AI demos free to run: use open models or a small evaluation budget, and never put a paid API key behind a public demo. Prefer bring-your-own-key, a rate-limited free tier, or a recorded walkthrough with the repo reproducible locally.

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
| P5 | **Text-to-SQL assistant over the HDB marts:** natural-language questions answered with SQL, with an evaluation set and guardrails (see A3 for the full version) | Reuses the flagship's data; shows GenAI done with evaluation, not a demo | The HDB marts | LLM API, BigQuery, Python | M |
| P6 | **Churn model with an honest evaluation:** time-based splits, calibration, a retention-campaign simulation | A familiar topic done properly | A public subscription churn dataset (check licence) | Python | M |
| P7 | **Promotion and fraud detection:** rules versus a model, with cost-aware thresholds | Public-data version of a real problem | A public card-fraud dataset | Python | S |
| P8 | **Second analytics-engineering project** on a different public Singapore dataset, for example vehicle quota premiums | Shows the HDB approach generalises | data.gov.sg (check availability) | dbt, BigQuery, Looker Studio | M |

## Refreshes of the 2018 work (`status: refresh`)

| ID | Idea | Notes |
| --- | --- | --- |
| R1 | Forecasting 2026: ETS and ARIMA against modern libraries and a pretrained forecasting model, on the HDB monthly series | Fixes the 5-week test window; proper backtesting |
| R2 | Yelp sentiment: TF-IDF baseline against embeddings and a small fine-tuned transformer, with class-level metrics | The 2018 confusion matrix already gives about 83% precision and 68% recall for 1-star |
| R3 | Box office: ordinal modelling and gradient boosting, with baselines that account for edge buckets (exact about 10%, within-one about 28%) | Resolve the 59.24% vs 59.43% inconsistency first |

## Problem spaces and datasets beyond HDB

Any AI idea below can be pointed at one of these instead of HDB. Pick a domain you can explain to a stranger in one sentence, because that is what an AI PM interview tests. All of these need a licence and availability check before you commit. Where a licence is non-commercial or share-alike, say so on the case study.

| Domain | Public data to look at | Ideas that fit |
| --- | --- | --- |
| Sport (your own interest: football, tennis) | StatsBomb open football event data; the community tennis match datasets | **Grounded match reports:** an LLM writes a recap, and you score every claim against the event data. A hallucination-rate eval you can show |
| Travel (backpacking) | OpenStreetMap, Wikivoyage | **Itinerary agent** with tool use and constraint checks (opening hours, distances, budget), judged on whether the plan is feasible |
| Company filings and finance | SEC EDGAR filings and financial statement data sets | Structured extraction (A6), RAG over filings (A1), text-to-SQL over the statement tables (A3) |
| Science and health literature | PubMed Central open-access papers | RAG with citation checking; claim extraction; evaluation of faithfulness |
| Law and policy | Open court opinions (for example CourtListener); government gazettes, parliamentary records, data.gov.sg | RAG with source-grounded answers; policy-change summaries; a risk register for a legal-adjacent feature (M6) |
| Developer tools | Public GitHub issues and pull requests; Stack Exchange data dump | Issue triage and duplicate detection; support-style QA; model-choice memo (M4) |
| Customer support | Public customer-support conversation datasets | Intent classification, a support copilot PRD (M1), A/B plan for escalation and resolution metrics (M2) |
| E-commerce and recommendations | Olist, UCI Online Retail II, MovieLens, Amazon review datasets, Yelp open dataset | Recommender with LLM reranking and offline-to-online evaluation; uplift (P3); customer 360 (P4) |
| Transport and mobility | NYC taxi trips, bike-share feeds, Singapore LTA DataMall (free key) | Demand forecasting and a forecasting-model benchmark (A9); an operations agent with tools |
| Weather, climate, energy | NOAA, Open-Meteo, public energy statistics | Forecasting with pretrained models against classical ones; anomaly detection |
| Documents and forms | Public receipt and form datasets (check licence) | Document AI: extraction from scans with confidence and a review queue |
| Encyclopaedic knowledge | Wikipedia and Wikidata dumps, page-view counts | RAG baselines; entity linking; forecasting page views |
| Public safety | City open-data incident reports (handle with care) | Only with an ethics section; connects to the NGO work. A fairness and harm assessment is part of the deliverable |

Domains close to your employer's business (grocery and retail catalogues, consumer food data) are fine if the data is public, but keep the build independent and say nothing about internal work.

## AI engineering track

What these show: you can ship an LLM system and prove it works, with evaluation, cost and latency numbers, reliability and security.

| ID | Idea | What it proves | Data and stack | Effort |
| --- | --- | --- | --- | --- |
| A1 | **RAG over public documents, with proper evaluation:** compare chunking, hybrid search and reranking using retrieval metrics (recall@k, MRR) and answer faithfulness | You can measure retrieval quality instead of eyeballing demos | Open documentation or public guidance (check licence); Python, an embedding model, a vector store | M |
| A2 | **Evals as CI:** a golden question set, an LLM judge calibrated against your own labels, and a GitHub Action that fails on quality regressions | Engineering discipline around non-deterministic systems | Reuses A1 or A3; Python, GitHub Actions | M |
| A3 | **Text-to-SQL over a warehouse (upgrades P5):** schema linking, read-only and cost-capped guardrails, and execution accuracy on about 50 labelled questions with error analysis | Applied GenAI judged by results | The HDB marts, or any tabular dataset from the domain menu (SEC statements are a good second); LLM API or open model, BigQuery or DuckDB | M |
| A4 | **MCP server for a dataset:** expose it as safe, read-only tools that any MCP client can call | Protocol-level agent tooling; small and reusable | HDB marts or another dataset; Python | S |
| A5 | **Bounded data-analyst agent:** tool use over A4 (query and chart), step limits, tracing, and a head-to-head against a single prompt | Agent design with failure analysis, not just a demo | A4; Python | M |
| A6 | **Structured extraction pipeline:** pull fields from messy public documents into BigQuery with schema validation, confidence scores and a human-review queue; report precision and recall on a labelled sample | Production-style LLM data work | Public documents (check licence); Python, BigQuery | M |
| A7 | **Prompt versus fine-tune versus classic model** on Yelp sentiment (extends R2): accuracy, cost and latency in one table | Model selection with evidence | Yelp data; Python | M |
| A8 | **Red-team the prototype:** prompt-injection and data-exfiltration tests against A1 or A5, with the defences you added and the results | Security awareness for LLM apps | Reuses A1 or A5 | S |
| A9 | **Forecasting benchmark:** pretrained time-series models against ETS and ARIMA on the HDB series (extends R1) | Honest benchmarking | HDB series; Python | M |

## AI product management track

What these show: you frame problems, define "good", make trade-offs with numbers, and plan safe launches. Each is an artifact a hiring manager can read in five minutes.

| ID | Idea | Artifact | Effort |
| --- | --- | --- | --- |
| M1 | **PRD and eval plan for an AI assistant in a domain you choose** (for example "Ask the market" over HDB, or grounded match reports): users, jobs to be done, success and guardrail metrics, quality bar, launch gates, risk register. Then test it against a prototype | PRD, eval plan, and a retrospective on what the prototype taught you | M |
| M2 | **Experiment design for an AI feature:** holdout and A/B plan, metric hierarchy (task success, groundedness, escalation, latency, cost), power analysis, and why standard playbooks break for generative features | Notebook plus write-up; this uses your experimentation strength (P2) | M |
| M3 | **Quality framework for generative output:** rubric design, labelling guidelines, inter-annotator agreement, and calibrating an LLM judge | Rubric plus a small labelled set | M |
| M4 | **Model-choice decision memo:** cost, quality and latency across models for one defined task, using real numbers from A7 | A one-page memo and a table | S |
| M5 | **Unit economics of an LLM feature:** cost per successful task, caching impact, break-even versus a human or rule-based baseline | Notebook or spreadsheet model | S |
| M6 | **Risk and responsible-AI assessment** of the prototype, including privacy and relevant Singapore guidance (check the current versions before citing) | Short risk assessment | S |
| M7 | **Public AI product teardown:** pick a public AI feature, run 50 to 100 prompts, log failures, and write the metrics and rollout plan you would set | Teardown post with a failure taxonomy | S |

## Suggested AI bundle

One storyline that covers both roles. The default below uses "Ask the market" over HDB because the data and marts already exist, but the same six steps work in any domain from the menu above. Choose a second domain if you want the portfolio to look less single-topic: sport (grounded match reports) is the most distinctive and the most personal.

1. M1: write the PRD and eval plan first.
2. A4 then A3: build the MCP server and the text-to-SQL prototype.
3. A2: add evals as CI.
4. M2: write the A/B and metrics plan for launching it.
5. A5 and A8: agent version, then red-team it.
6. M5 and M6: unit economics and risk assessment.

Each step is a standalone case study or post, so the cadence of one every month or two still holds. Do M1 before building so the PM artifact is not written in hindsight.

## Writing ideas

| Idea | Source |
| --- | --- |
| Evals before features: how to measure an LLM feature before you build it | M1, A2 |
| Where RAG errors really come from: chunking, retrieval or generation | A1 |
| Text-to-SQL: why execution accuracy is the metric, and what it misses | A3 |
| Calibrating an LLM judge against human labels | M3, A2 |
| What an LLM feature really costs: unit economics | M5 |
| A/B testing AI features: non-determinism, novelty effects and delayed feedback | M2 |
| The AI engineer to PM handoff: PRD, eval set, launch gates | M1 |
| Prompt, fine-tune or classic model: a decision with numbers | A7, M4 |
| Prompt injection against your own app: what I tried and what worked | A8 |
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
