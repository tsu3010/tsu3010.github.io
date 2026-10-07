# Portfolio Site: Solution Design

Oct 7, 2026 · @Sudharsan

## Overview

Rebuild the 2018 portfolio as a static Astro site at tsu3010.github.io, migrated from the old sud3010ganesh account and set up so adding a project means adding one file.

**Goals**

- Move the portfolio to the tsu3010 GitHub account without breaking existing links.
- Replace the aged Jekyll/Ruby toolchain with a modern, low-maintenance stack.
- Present work as consistent case studies: problem, approach, result, reflection.
- Launch with four case studies: the HDB resale pipeline plus three carried-forward 2018 projects.
- Make ongoing updates cheap enough to sustain a regular cadence.

**Non-goals**

- Publishing employer data, figures or internal work.
- Rewriting the 2018 analyses from scratch at launch (deferred; see Risks and open decisions).
- A blog platform with heavy CMS tooling.

## Current state

The live site at [sud3010ganesh.github.io](https://sud3010ganesh.github.io/) is a Jekyll site on the Minimal Mistakes theme, last substantively updated in 2020. The [repository](https://github.com/sud3010ganesh/sud3010ganesh.github.io) has 52 commits on `master`.

| Component | Current | Issue |
| --- | --- | --- |
| Generator | Jekyll + Minimal Mistakes (Gemfile, Rakefile) | Ruby toolchain, dated theme |
| CI | `.travis.yml` | Superseded by GitHub Actions |
| Comments | Staticman (`staticman.yml`) | Extra service to maintain |
| Repo hygiene | `.idea` folder committed | IDE files in the repo |
| Content | 5 posts (2018–2020), About, Resume | Profile still says Dyson |

Published posts: Text Analytics on Yelp Reviews, Time Series Forecasting Parts 1 and 2, Movie Box Office Revenue Prediction (all May 2018), and Building Reproducible ML Pipelines (July 2020).

## Target architecture

The site is a static Astro build, hosted free on GitHub Pages and deployed by a GitHub Actions workflow on every push to `main`.

&#91;embedded content: target architecture · build and hosting\]

Each project's code lives in its own repo; the site repo holds only the case-study pages that link to it.

| Layer | Choice | Why |
| --- | --- | --- |
| Generator | Astro with MDX content collections | Fast static output, schema-checked content, easy chart and dashboard embeds |
| Hosting | GitHub Pages (user site) | Free, same account as the code |
| CI/CD | GitHub Actions, official Pages deploy action | Replaces Travis; no extra service |
| Styling | Astro components + CSS, light/dark mode | No Ruby theme dependency |
| Comments | Giscus, optional | Runs on GitHub Discussions; replaces Staticman |

Alternatives considered: Quarto suits notebook-heavy publishing but gives less design control; upgrading Jekyll is least effort but keeps the Ruby toolchain.

## Repository migration

Transfer the old repository into tsu3010 and rename it `tsu3010.github.io`; GitHub Pages only serves a user site from a repo with exactly that name.

| Option | How | Keeps history | Old repo URL | Choose when |
| --- | --- | --- | --- | --- |
| Transfer (recommended) | Settings → Danger Zone → Transfer, then rename | Yes | Redirects to new repo | You want one continuous history |
| Mirror | `git clone --mirror`, then `git push --mirror` to a new repo | Yes | Stays as is | You want the old repo left untouched as an archive |
| Fresh start | New empty repo, old one archived | No | Stays as is | You want a clean history for the rebuild |

**Before transferring**

- [ ] Confirm tsu3010 has no existing repo named `tsu3010.github.io`.
- [ ] Sweep the repo and its history for anything not meant to be public: emails, API keys in `_config.yml`, employer material.
- [ ] Pull a local copy of `_posts`, `images` and `assets`; these hold the old figures and any surviving code.

**After transferring**

- [ ] Rebuild on a new branch, then replace `master` with the Astro site (old Jekyll source stays in history).
- [ ] Delete `.travis.yml`, `.idea`, `staticman.yml`, the Gemfile and Rakefile.
- [ ] Set Pages to deploy from GitHub Actions.

Repo transfer redirects git URLs, but GitHub Pages sites do not redirect. Link continuity is handled separately below.

## Content model

Every project is one MDX file in an Astro content collection, validated against a schema, so the home page, project index and tag pages build themselves.

**Site map**

| Page | Purpose |
| --- | --- |
| Home | Positioning statement, 3–4 featured projects, links to resume, LinkedIn, GitHub |
| Projects | All case studies, filterable by tag |
| Project page | One case study per project |
| Writing | Shorter notes and posts (optional; good for SEO) |
| About | Current role and background |
| Resume | Downloadable PDF |

**Project frontmatter schema**

| Field | Type | Example |
| --- | --- | --- |
| title | string | Singapore HDB Resale Market Pipeline |
| summary | string, one sentence | End-to-end ELT pipeline and dashboard on 228k transactions |
| date | year-month | 2026-03 |
| role | string | Solo build |
| stack | list | GCP, Terraform, BigQuery, dbt, Kestra |
| tags | list | data-engineering, analytics-engineering |
| featured | boolean | true |
| status | original / reproduction / refresh | original |
| links.code, links.demo | URL | GitHub repo, Looker Studio report |

The `status` field labels legacy work honestly: original 2018 write-up, a reproduction from post snippets, or a 2026 refresh.

**Case-study template**

1. Problem: the question and why it matters.
2. Approach: data, method, architecture.
3. Result: two or three findings, with numbers.
4. Reflection: what I would do differently now.
5. Links: code, demo, original post.

## Project inventory

Launch with four case studies; the HDB pipeline is the flagship because it is recent, public-data and end to end.

| Project | Year | Data | Method and tools | Headline result | Code today | Gap to close |
| --- | --- | --- | --- | --- | --- | --- |
| [HDB resale pipeline](https://github.com/tsu3010/hdb-resale-pipeline) | 2026 | 228,542 HDB resale records (data.gov.sg), 577 streets geocoded via OneMap | Terraform, GCS, BigQuery, dbt (24 tests), Kestra, Python, Looker Studio | Live [dashboard](https://lookerstudio.google.com/reporting/91a37d80-d099-4b13-b210-352725f59a3a) | Repo, 13 commits | Lead with 2–3 market findings; add LICENSE, description, topics |
| [Text analytics on Yelp reviews](https://sud3010ganesh.github.io/2018-05-26-yelpreviewtextanalytics/) | 2018 | 4,086 Kaggle Yelp reviews (749 one-star, 3,337 five-star) | CountVectorizer, Multinomial Naive Bayes; Python | 91.9% accuracy vs 82.0% baseline | Inline in post | Report precision, recall and F1 for the negative class |
| Classical time series forecasting ([Part 1](https://sud3010ganesh.github.io/2018-05-27-timeseriesforecasting/), [Part 2](https://sud3010ganesh.github.io/2018-05-28-timeseriesforecastingpart2/)) | 2018 | Weekly Austin temperature (182 train, 5 test weeks); monthly gold prices 1960–2017 | Holt-Winters; ARIMA(1,1,2); R forecast, fpp2 | 2.4% out-of-sample MAPE (Part 1) | Inline in posts | Merge into one study; note the 5-week test window; gold data source unnamed |
| [Movie box office revenue prediction](https://sud3010ganesh.github.io/2018-05-29-boxofficerevenueprediction/) | 2018 | \~3,800 TMDB movies, 71 engineered features | Elastic Net, Random Forest, XGBoost, ensemble; R | 27.4% exact (10 classes, \~10% chance), 59.2% within one bucket | Inline in post | Frame accuracy against chance; network features may be hard to reproduce |

The 2020 post on reproducible ML pipelines can seed the Writing section.

## Link continuity

Keep a small stub repo named `sud3010ganesh.github.io` on the old account so every old URL forwards to its new page.

- The stub holds an `index.html` plus one folder per old post, each with an `index.html` that redirects (meta refresh plus a canonical link).
- If the old repo was transferred, create the stub as a new repo on the old account after the transfer.

| Old path | New path (proposed) |
| --- | --- |
| / | tsu3010.github.io/ |
| /2018-05-26-yelpreviewtextanalytics/ | /projects/yelp-sentiment/ |
| /2018-05-27-timeseriesforecasting/ | /projects/classical-forecasting/ |
| /2018-05-28-timeseriesforecastingpart2/ | /projects/classical-forecasting/ |
| /2018-05-29-boxofficerevenueprediction/ | /projects/box-office-prediction/ |
| /2020-07-16-buildingreproduciblemlpipelines/ | /writing/reproducible-ml-pipelines/ |

Also update the links on LinkedIn, the resume and email signature to the new domain.

## Non-functional requirements

| Area | Requirement |
| --- | --- |
| Performance | Lighthouse 90+ on performance; responsive images via Astro's image pipeline |
| Accessibility | Lighthouse 90+ on accessibility; keyboard navigation, alt text, sufficient contrast |
| Theming | Light and dark mode |
| SEO and sharing | Sitemap, RSS feed, per-page Open Graph images and descriptions |
| Analytics | Plausible or Google Analytics (choice open) |
| Comments | Giscus (GitHub Discussions), or no comments |
| Domain | tsu3010.github.io at launch; custom domain optional later |
| Privacy | No employer data or internal figures; work projects rebuilt on public data or described at a high level |

## Maintenance workflow

Adding a project takes one repo and one MDX file; a push to `main` publishes it.

1. Build the project in its own repo under tsu3010, with a README, license and requirements file.
2. Host any live demo: Looker Studio for dashboards, Streamlit Community Cloud or Hugging Face Spaces for apps.
3. Add `src/content/projects/<slug>.mdx` using the case-study template.
4. Open a pull request from a `drafts` branch; the Actions build checks the schema.
5. Merge to `main`; GitHub Actions builds and deploys to Pages.

Cadence: one new project or write-up every one to two months.

## Delivery plan

Five phases, each shippable on its own; the site goes live at the end of phase 3 with the HDB case study.

1. **Migrate:** sweep history, transfer the repo to tsu3010, rename to `tsu3010.github.io`.
   - Done when: repo lives under tsu3010 and old files are backed up locally.
2. **Scaffold:** Astro project, content schema, case-study layout, GitHub Actions deploy.
   - Done when: an empty shell is live at tsu3010.github.io.
3. **Flagship:** HDB resale pipeline case study, with findings added to its Result section.
   - Done when: home page features HDB and the dashboard link works.
4. **Legacy and continuity:** migrate Yelp, forecasting and box office as case studies; build the redirect stub; update LinkedIn and resume.
   - Done when: every old URL lands on its new page.
5. **Polish and grow:** About, resume PDF, analytics, Lighthouse pass, optional custom domain; then new projects on the set cadence.

The legacy code decision (Risks and open decisions) gates whether phase 4 ships write-ups only or also runnable repos.

## Risks and open decisions

**Open decisions**

| Decision | Options | Leaning |
| --- | --- | --- |
| Legacy code (on hold) | 1. Write-ups with embedded code · 2. Reproduce runnable repos from post snippets · 3. Rebuild as a 2026 refresh | Route 2, after searching old files for originals |
| Migration method | Transfer · mirror · fresh start | Transfer |
| Static site generator | Astro · Quarto · upgraded Jekyll | Astro |
| Analytics | Plausible · Google Analytics | Open |
| Comments | Giscus · none | Open |
| Custom domain | Buy one · stay on github.io | Later |
| Reproducible ML pipelines post (2020) | Carry into Writing · drop | Carry |

**Risks**

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Old links break after the move | Dead links from LinkedIn and resume | Redirect stub with per-post pages; update profiles |
| Original 2018 code not found | No runnable repos for legacy projects | Reproduce from post snippets, labelled as reproductions |
| Reproduced results differ from 2018 numbers | Inconsistent claims | Report both; note package and data differences |
| Kaggle datasets moved or removed | Reproduction blocked | Check availability before committing to route 2 |
| Legacy metrics read weakly (27% accuracy, imbalanced accuracy) | Undersells the work | Frame against chance and add class-level metrics |
| Secrets or employer material in old history | Exposure once republished | Sweep history before transfer |
| Momentum fades after launch | Stale portfolio | Repo-per-project workflow and a set cadence |
