# Browser Reading / Read-Aloud Observations

Status: Empirical notes, not general browser rules  
Initial observation window: 2026-10-04 to 2026-10-07 JST

This file records observed behavior from real Chrome tests. It intentionally separates **officially documented behavior**, **local observations**, and **unverified hypotheses**.

## Official baseline

Google's Chrome help states that Android Chrome can provide **"Listen to this page"** on supported pages, but explicitly notes that the feature is not available on some websites.

Google's Reading mode help likewise states that Reading mode is not available on every page.

When standard read-aloud is available, Chrome documents that playback can continue while viewing another tab and while the screen is locked.

See `SOURCES.md`.

## Local observations

These are observations from the user's tests. They should not be generalized beyond the tested page/browser state.

| Surface | Reading mode | Read-aloud | Observation |
|---|---|---|---|
| `https://josh-temple.github.io/studio-lab-research/` | not fully logged here | worked | Chrome read-aloud was available and playback succeeded. |
| `https://josh-temple.github.io/systematic-trading-research/` | not fully logged here | worked | Chrome read-aloud was available and playback succeeded. |
| `https://github.com/Josh-Temple/kaigo-rules` | not fully logged here | worked | Chrome read-aloud was observed to work on the repository page. |
| RSVP site | worked | not established here | Reading mode was available in testing. |
| World History Lab | worked | unavailable in test | Reading mode was available, while read-aloud was not. |
| Grok Math | worked | unavailable in test | Reading mode was available, while read-aloud was not. |
| Instant Radio | unavailable in tests | unavailable in tests | At the points tested, neither mode was available. |

Additional observations:

- A source/original page could work while a copied page with similar visible content did not.
- In successful read-aloud tests, playback was observed to continue with the screen locked.
- Availability changed by page; visually similar pages did not necessarily behave the same way.

## What these observations do not establish

### Hosting provider is not yet a demonstrated cause

The current observations are compatible with a possible difference between some GitHub Pages and Vercel deployments, but they do **not** establish that deployment on Vercel prevents Reading mode or read-aloud.

Possible confounders include:

- document structure and semantic HTML
- client-side rendering behavior
- amount and placement of main text
- page metadata
- browser-side page classification
- indexing or other time-dependent browser/service behavior
- differences in the exact application structure

Treat "Vercel vs GitHub Pages" as a hypothesis only.

### Waiting or indexing is not yet demonstrated

It is possible that browser/service-side processing changes over time, but the tests so far do not establish a normal waiting period or causal indexing requirement.

Do not promise that a page will become supported after a specific number of days without additional evidence.

## Better experiment design

To isolate the cause, prefer controlled comparisons.

1. Deploy the same minimal HTML document to two hosting providers.
2. Keep title, metadata, headings, body text, and navigation identical.
3. Record Chrome version, Android version, URL, date/time, Reading mode result, and read-aloud result.
4. Repeat after fixed intervals without changing the page.
5. Change one structural variable at a time, such as SSR/static HTML vs client-rendered content.
6. Keep a known-working page as a positive control.
7. Do not infer causality from one successful or failed page.

## Promotion rule

A finding should move from this observation log into `PRINCIPLES.md` only when at least one of the following is true:

- it is supported by official browser documentation;
- it is reproduced across controlled tests strongly enough to justify a bounded implementation rule;
- it is a general web/accessibility principle supported by an authoritative source.

Otherwise, keep it here as an observation or hypothesis.
