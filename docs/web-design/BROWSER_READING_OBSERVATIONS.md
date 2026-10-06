# Browser Reading / Read-Aloud Observations

Status: Empirical notes plus implementation research; not general browser guarantees  
Initial observation window: 2026-10-04 to 2026-10-07 JST  
Research update: 2026-10-07 JST

This file separates **officially documented behavior**, **product implementation evidence**, **local observations**, and **unverified hypotheses**.

## Official baseline

Google's Chrome help states that Android Chrome can provide **"Listen to this page"** on supported pages, but explicitly notes that the feature is not available on some websites.

Google's Reading mode help likewise states that Reading mode is not available on every page.

When standard read-aloud is available, Chrome documents that playback can continue while viewing another tab and while the screen is locked.

See `SOURCES.md`.

## Implementation evidence found in this research wave

### Android "Listen to this page" / Read Aloud

Current Chromium source shows a separate page-readability decision for Android Read Aloud.

The client:
- checks whether the URL is eligible for a readability request;
- requests readability through Read Aloud hooks;
- records a server readability result;
- uses the returned readability state, supported page language, and feature availability when deciding whether a tab is readable;
- excludes some URL classes client-side, including non-HTTP(S) URLs and certain Google URLs;
- stores readability information in a client cache that current source defines on the order of one hour before expiration and re-check.

This is useful evidence about the client path, but the server-side classifier itself is not documented here. Therefore, the factors the server uses to classify a page as readable remain unknown.

### Reading Mode

Google Research has described Reading Mode content distillation that operates on accessibility-tree representations derived from page/app structure. Earlier Chromium Reader Mode documentation describes article/content distillation from rendered page structure.

Reading Mode and Android Read Aloud are related reading-accessibility features, but their eligibility/extraction paths should not be assumed to be identical.

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

## Current interpretation

### Hosting provider is not a demonstrated cause

The observations once made "GitHub Pages vs Vercel" worth testing, but current evidence does not support treating hosting provider itself as the explanation.

A hosting choice can correlate with differences in rendering architecture, timing, HTML structure, or content exposure. Those differences should be tested directly.

### Search Console / Analytics are not supported interventions

No primary source located in this research wave documents Google Search Console registration or Google Analytics setup as an eligibility requirement for Chrome Read Aloud.

Do not add or change either service solely to try to make Read Aloud appear unless new evidence supports that intervention.

### A normal multi-day waiting period is not established

No primary source located in this research wave documents a normal multi-day indexing or processing delay before Read Aloud becomes available.

Current Chromium source does show a client readability cache on the order of one hour. That means an immediate repeat can reuse a recent result, but it does **not** establish when or whether the server-side readability decision for a changed page will change.

### Reading Mode success does not imply Read Aloud success

The local tests already show pages where Reading Mode worked but Read Aloud did not. The implementation evidence also supports treating these as separate tests rather than using one as a proxy for the other.

## Better experiment design

To isolate causes:

1. Deploy the same minimal article document to two hosting providers.
2. Keep title, metadata, headings, body text, language, and navigation identical.
3. Record Chrome version, Android version, URL, date/time, Reading Mode result, and Read Aloud result.
4. Separate Reading Mode and Read Aloud outcomes.
5. When testing whether a page change alters Read Aloud classification, include a repeat after the current client cache window rather than relying only on an immediate retest.
6. Change one structural variable at a time, such as static/server-rendered HTML versus client-rendered content.
7. Test a coherent single-article layout against a page with several similarly weighted content regions.
8. Keep a known-working page as a positive control.
9. Do not infer causality from one successful or failed page.

The one-hour cache is an implementation detail and may change. Re-check current Chromium source before treating it as a fixed testing rule in the future.

## Promotion rule

A finding should move from this observation log into `PRINCIPLES.md` only when at least one of the following is true:

- it is supported by an applicable standard or official browser documentation;
- it is reproduced across controlled tests strongly enough to justify a bounded implementation rule;
- it is a general web/accessibility principle supported by authoritative or credible empirical evidence.

Otherwise, keep it here as an observation or hypothesis.
