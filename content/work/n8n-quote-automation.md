---
title: "AI Quote Triage and Routing with n8n"
summary: "An automated workflow that reads inbound enquiries, extracts the details, and drafts a structured quote for review."
role: "AI Automation Consultant"
year: "2026"
tags: ["n8n", "AI Automation", "Workflow Design", "Integrations"]
---

## The problem

Inbound enquiries arrived as free text — email, web form, and the occasional
forwarded WhatsApp message. Someone had to read each one, work out what was
being asked for, look up pricing, and write a quote.

It took about twenty minutes per enquiry, and it happened between other work.
Enquiries that landed on a busy afternoon sat untouched until the next morning,
by which point some had already gone elsewhere.

## What I built

An n8n workflow sitting between the inbound channels and the CRM:

- Normalises every enquiry into one shape, regardless of which channel it came
  from.
- Uses a language model to pull out the structured details — products,
  quantities, deadline, delivery location — and flags anything ambiguous rather
  than guessing at it.
- Looks up current pricing and stock, then drafts a quote from a template.
- Routes the draft to the right person, with unclear enquiries pushed to a
  review queue instead of being auto-sent.

The deliberate choice here was to stop short of sending anything automatically.
A human approves every quote before it leaves — the automation removes the
typing, not the judgement.

## The result

Time from enquiry to a quote in someone's hands went from around twenty minutes
of manual work to roughly two minutes of review. Nothing sits overnight anymore.

The ambiguity flag turned out to be the most valuable part: it surfaced that a
meaningful share of enquiries were genuinely unclear, which changed how the web
form was worded.
