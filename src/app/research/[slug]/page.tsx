"use client";

import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import ReactMarkdown from "react-markdown";

// Article data - in a real app, this would come from a CMS or database
const articles: Record<string, {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
}> = {
  "pricing-engine-liability": {
    slug: "pricing-engine-liability",
    title: "Your Pricing Engine Isn't a System. It's a Liability.",
    description: "How rule-based pricing architectures silently erode margin, create compliance exposure, and become impossible to audit at scale.",
    tags: ["Pricing Infrastructure", "Enterprise Systems"],
    image: "/images/research/engine.png",
    author: "Bluecore Team",
    date: "2024-01-15",
    readTime: "12 min read",
    content: `
# Your Pricing Engine Isn't a System. It's a Liability.

Most pricing engines weren't designed. They accumulated.

A rule added here. A discount table bolted there. An exception carved out for one customer that became the default for forty. Five years later, nobody on the team can explain why the system outputs what it outputs — they just know not to touch it.

This is the quiet infrastructure crisis inside most mid-to-large operators. Not a bug. Not a crash. Just a pricing engine that's too fragile to optimize, too opaque to audit, and too entangled to replace cleanly.

## The Real Cost Isn't the Wrong Price

When people talk about broken pricing infrastructure, they focus on the output — the wrong price on the wrong order. That's the visible failure.

The invisible one is worse.

It's the margin you can't recapture because your system can't tell you why it priced something the way it did. It's the compliance exposure when an auditor asks for a rate justification and your answer is a spreadsheet someone built in 2019. It's the six-week delay on every pricing change because no one wants to be the person who breaks production.

Bad pricing infrastructure doesn't fail loudly. It bleeds slowly — in missed margin, in slowed ops, and in decisions that never get made because the data isn't trustworthy.

## Why the Standard Fix Makes It Worse

The instinct is to layer on top. Add a rules UI. Build a dashboard. Hire someone to manage the exceptions manually.

That approach treats the symptom. The underlying architecture — typically a rigid, statically configured rules engine with no event history, no versioning, and no auditability layer — stays exactly as it was.

What you've now built is a complicated system on top of a fragile one. More surface area. More failure modes. And still no answer when someone asks: what is this system actually doing, and why?

## What a Precision Pricing Architecture Actually Requires

There are four non-negotiables for a pricing engine that can operate at scale without becoming a liability:

1. **Event-sourced state** — Every price calculation should be a deterministic output of a logged, replayable event chain. If you can't replay the inputs and reproduce the output, you don't have a pricing engine. You have a black box.

2. **Versioned rule sets** — Rules need to be immutable once applied. Changes propagate forward, not backward. You should be able to reconstruct exactly what ruleset was active at any point in time for any transaction.

3. **Separation of policy and logic** — Business rules (what to charge) should be decoupled from calculation logic (how to compute it). This is the architectural move that makes the system configurable by operations teams without requiring an engineering deploy.

4. **Auditability at the record level** — Every output needs a traceable lineage. Not a log. A structured explanation: inputs, active rule version, modifiers applied, final output. This is what compliance looks like in practice — not a report you generate quarterly, but a property of the system itself.

## The Infrastructure Principle We Call The Calculation Ledger

At Bluecore, we refer to this architecture pattern as The Calculation Ledger — a pricing engine design where every output is a first-class record: versioned, signed, replayable, and auditable by construction.

It's not a product. It's an architectural constraint we apply from the first line of code. The result is a system that ops teams can configure, finance teams can audit, and engineering teams can extend — without anyone fearing the deployment.

The stack is Rust at the core, Kafka for event durability, and a policy layer that lives entirely outside the hot path. It's fast, it's correct, and it doesn't accumulate technical debt the way rule-table systems do.

## If This Sounds Familiar

Pricing infrastructure problems tend to get ignored until they become urgent — usually when an acquisition, a compliance audit, or a new product line forces the question.

If you're approaching that inflection point, the architecture decisions you make in the next build cycle will determine whether your pricing engine becomes a competitive advantage or the thing that slows every initiative down for the next five years.

Worth getting right the first time.
    `,
  },
  "pipeline-problem": {
    slug: "pipeline-problem",
    title: "You Don't Have a Data Problem. You Have a Pipeline Problem.",
    description: "Why the reports your finance and ops teams don't trust aren't a data quality issue — they're a backend architecture issue.",
    tags: ["Backend Architecture", "Operational Finance"],
    image: "/images/research/pipelines.png",
    author: "Bluecore Team",
    date: "2024-02-20",
    readTime: "15 min read",
    content: `
# You Don't Have a Data Problem. You Have a Pipeline Problem.

Every ops and finance leader has a version of the same complaint.

The numbers don't match. The dashboard says one thing, the export says another, and by the time someone reconciles them manually the decision it was supposed to inform has already been made on gut feel. So you hire a data analyst. You buy a BI tool. You run a data quality initiative. And six months later, the numbers still don't match.

That's because you're solving the wrong problem.

## Bad Data Doesn't Start in the Database

The instinct is to treat reporting failures as a data problem — dirty records, inconsistent formats, missing fields. So the fix targets the data layer: cleaning, normalizing, deduplicating.

It helps, temporarily. Then the same issues resurface, because the source of the problem was never the data itself.

It was the pipeline that produced it.

When backend systems write state changes without a reliable event record — when updates overwrite rather than append, when integrations push data in batches rather than in real time, when there's no authoritative source of truth for *when* something happened and *why* — the database reflects the current state of the world, but it can't reconstruct how it got there.

That gap between current state and historical truth is where reporting breaks. Every reconciliation problem, every mismatched dashboard, every "it depends how you query it" answer traces back to that gap.

## The Real Symptoms of a Pipeline Problem

You're dealing with a pipeline problem, not a data problem, if any of these are true:

**Your reports are point-in-time but your business operates in motion.** Pricing changes, status updates, adjustments — if your backend writes the new value without recording the transition, your reports can only tell you where you ended up, not what happened along the way.

**Reconciliation is a recurring job, not an exception.** If your team runs a reconciliation process on any regular cadence, that process is compensating for something the architecture should be doing automatically.

**The answer to "why did this number change" is a person, not a query.** When institutional knowledge is the only way to explain a data discrepancy, the system has failed. Explanations should live in the record, not in someone's head.

**Your integrations are the last thing anyone wants to touch.** Integration brittleness is almost always a symptom of stateless, overwrite-based data pipelines. When there's no event history, any change to an upstream system can silently corrupt downstream state with no trace of what happened.

## What a Trustworthy Pipeline Architecture Looks Like

The fix isn't a better database or a cleaner ETL job. It's an architectural decision that has to be made at the backend level, before data ever reaches a reporting layer.

Three principles define a pipeline that produces data finance and ops teams can actually trust:

**Append-only event records.** State changes are never overwrites — they're new records. The current state of anything is derived by reading the full event history. This means you can always reconstruct exactly what happened, in what order, and why. Reconciliation becomes a query, not a process.

**Explicit causality.** Every record carries a reference to the event that caused it. A price update points to the rule version that triggered it. An adjustment points to the actor and the reason code. Causality isn't inferred — it's written into the data model from day one.

**Single source of truth with derived views.** The event log is authoritative. Dashboards, reports, and analytics are derived views of that log — not separate systems maintaining their own state. When views disagree, the log is the answer. There's no version of "it depends how you query it."

## The Infrastructure Principle We Call The Truth Layer

At Bluecore, we call this design constraint The Truth Layer — a backend architecture where the event record is the system of record, and every reporting surface is a deterministic projection of it.

It's not a middleware add-on or a data warehouse strategy. It's a decision made at the schema level, enforced at the write path, and maintained across every service that touches the data. The stack we use — Rust for the core event bus, Kafka for durable event streaming, append-only persistence with projection layers for reads — isn't exotic. It's just disciplined.

The result is a system where a finance team can pull any report for any time window and trust the number. Where an auditor can ask why a record looks the way it does and get a structured answer from the system, not a person. Where ops teams stop spending Friday afternoons reconciling exports and start spending them making decisions.

## The Cost of Getting This Wrong

Pipeline problems compound. Every quarter you run on an overwrite-based architecture is another quarter of event history you'll never recover. When the audit comes, or the acquisition, or the new CFO who wants to understand the business from first principles — that missing history becomes a real liability, not a hypothetical one.

The teams that fix this proactively do it because they're scaling into a moment that demands it. The teams that fix it reactively do it because something broke publicly enough that they had no choice.

The architecture is the same either way. The timing is what changes the cost.
    `,
  },
  "nobody-builds-for-the-audit": {
    slug: "nobody-builds-for-the-audit",
    title: "Nobody Builds for the Audit. Then the Audit Arrives.",
    description: "Why compliance is always the last thing teams think about and the first thing that breaks them — and what it actually costs to fix it retroactively.",
    tags: ["Compliance Architecture", "Enterprise Infrastructure"],
    image: "/images/research/audit.png",
    author: "Bluecore Team",
    date: "2024-03-10",
    readTime: "14 min read",
    content: `
# Nobody Builds for the Audit. Then the Audit Arrives.

Here's a conversation that happens in every engineering org, usually around 11pm the night before something important:

*"Can you pull the audit trail for that transaction?"*
*"Sure — which log file?"*
*"The one that shows why it was priced that way."*
*"...We don't have that."*

Congratulations. You've just discovered that your system was never built to explain itself.

## Compliance Doesn't Fail Loudly

The reason teams keep getting here isn't negligence. It's sequencing. You build for the happy path. You build for scale. You build for speed. Compliance feels like a problem you can bolt on later — an audit layer, a reporting module, a dashboard someone requested once and never looked at again.

Then later arrives.

And the thing nobody tells you about retroactive compliance is that it's not a feature you can add. It's a rewrite. Because compliance-by-construction requires decisions at the schema level, at the write path, at the moment you define what the system records and how. Once that moment has passed, you're not adding compliance. You're reverse-engineering the history your system never kept.

The difference in cost is not marginal. We've seen "let's add an audit trail" turn into a six-month engagement that touches every service in the stack. Not because the engineering is complex. Because the data was never there to begin with.

## The Three Sentences That Expose a Non-Compliant System

You don't need an auditor to know you have a problem. You just need to ask three questions of any system you own:

**"Show me every state this record has been in and what caused each transition."** If the answer is "we'd have to dig through the logs," the system isn't compliant — it's searchable, which is not the same thing.

**"Reproduce the exact output the system generated for this input six months ago."** If you can't do that deterministically — if the answer might be different depending on what rules have changed since — you don't have an audit trail. You have a best guess.

**"Who changed this, when, and under what authorization?"** If the answer lives in a person's memory rather than a structured record, the system is one departure away from being completely unaccountable.

These aren't trick questions. They're the first three questions a serious auditor, acquirer, or regulator asks. The systems that can answer them cleanly were built that way deliberately. The ones that can't are operating on borrowed time.

## What Compliance-by-Construction Actually Looks Like

It's not a separate compliance module. It's not a middleware add-on you install after the fact. It's three architectural decisions made early, held consistently:

**Immutable event records.** Nothing is ever overwritten — every state change is a new record, and the history is the source of truth. You always know what the system said, when it said it, and what caused it to say it.

**Explicit authorization chains.** Every write carries a reference to who initiated it and under what permission. Not as a log comment. As a structured foreign key. If you can't query "show me everything this actor touched between these dates," it's not compliance. It's hope.

**Deterministic rule versioning.** Whatever logic produced an output — a price, a rate, an eligibility decision — that logic version needs to be captured alongside the output. Rules change. Systems evolve. An audit doesn't care what your current rules say. It cares what your rules said at the time.

## We Built This for Mortgages. On a Blockchain.

When we designed REFI2 — our protocol for tokenizing Canadian residential mortgages into onchain yield instruments — compliance-by-construction wasn't optional. It was the architecture.

Every NAV calculation is a deterministic, replayable event. Every eligibility gate is enforced at the protocol level via regulatory gating built into Token-2022, not layered on top as a check. Every pool entry has a Merkle-verified deposit record that any participant can independently audit without trusting us to run the query correctly.

We didn't build it this way because we're particularly noble. We built it this way because the moment you're touching institutional capital in a regulated asset class, you cannot afford to be in a position where someone asks "why did this happen" and your answer is "let me check."

The interesting thing we found: building for auditability from day one didn't slow us down. It made the system faster to reason about, faster to extend, and dramatically cheaper to verify. Compliance-by-construction turns out to be good engineering, not just good governance.

That principle transfers. It applies to pricing engines. It applies to logistics rate systems. It applies to any system where a number gets produced and someone, someday, will need to know exactly why.

## The Cost of Waiting

The teams we've seen eat this the hardest aren't the ones who neglected compliance. They're the ones who planned to get to it. The roadmap said Q3. Then Q3 became Q4. Then a new product priority landed and the compliance work got pushed again. Then the acquisition conversation started and the due diligence team asked for an audit trail and the whole process stopped cold.

The architecture debt on non-compliant systems compounds exactly like financial debt — quietly, invisibly, until the moment you need to move and discover you can't.

Build it in from the start. It's cheaper, it's faster, and someday someone is going to ask you to explain your system to them.

You want to be the team that can.
    `,
  },
  "realtime-systems-lie": {
    slug: "realtime-systems-lie",
    title: "Your Real-Time Dashboard Isn't Real-Time. It's a Confident Lie.",
    description: "Why the number on your ops dashboard can be right on average and wrong right now — and what it actually takes to build a monitoring system your team can trust when it matters.",
    tags: ["Risk Engineering", "Data Infrastructure"],
    image: "/images/research/realtime.png",
    author: "Bluecore Team",
    date: "2026-03-18",
    readTime: "16 min read",
    content: `
# Your Real-Time Dashboard Isn't Real-Time. It's a Confident Lie.

Flink's default \`allowedLateness\` is zero. That one configuration detail is responsible for more silent data loss in production pipelines than anything else we deal with, and most teams running Flink don't know it.

Here's what it means: any event that arrives after its window has already fired gets dropped. Not queued. Not flagged. Dropped, with no counter and no log entry unless you add one yourself. The dashboard keeps updating. The job is green. The aggregates are just quietly missing events, and there is no signal that this is happening.

## Event Time, Processing Time, and Why the Default Is Wrong

To understand why this happens you have to understand that Flink has two different models for time. Processing-time windows fire based on when the pipeline sees events. Event-time windows fire based on when events actually happened. The default is processing-time.

Processing-time is easy to reason about. It's also non-deterministic — restart the pipeline and you'll get different results, because the windows depend on when events arrived at the processor, not when they occurred. If you're trying to compare output across a canary deployment, or replay history after an incident, the numbers won't align. This is a fundamental property of the model, not a bug you can configure away.

Event-time processing requires watermarks. A watermark is a signal embedded in the stream that says "we believe all events with timestamp ≤ T have now arrived." Flink fires windows when the watermark passes the window boundary. There's an idle partition problem that's less obvious: watermarks are per-partition, and Flink takes the minimum across all partitions to advance the global clock. One partition with no new events holds back the watermark for the entire job. Every window stalls. No output, no error. This is in Confluent's troubleshooting guide under "why is Flink not producing results" and the fix is \`withIdleness()\` on the source operator — but you have to know to look.

Back to \`allowedLateness\`. The late-arriving events that miss their window aren't visible in any default metric. A window that captured 94% of its events looks identical to one that captured 100%. The gap tends to be correlated — if a specific upstream service was under load during a spike, its events arrive late together, and those are also the events most likely to carry signal during an incident. You find out about it from a reconciliation, not from the pipeline.

## The Exactly-Once Trap

Kafka and Flink, properly configured, do provide exactly-once processing. This is true. It's also more limited than most people understand when they decide to rely on it.

The guarantee covers the boundary between the Kafka broker and the Flink operator. When you write to an external sink — Postgres, ClickHouse, Elasticsearch, S3 — you've left the transactional boundary. Kafka's two-phase commit doesn't extend to systems that don't participate in the Kafka transaction protocol, which is most external sinks. A Flink job can produce perfectly correct, deduplicated aggregates and write them to ClickHouse, and a dashboard querying that table mid-write reads a partial result. The exactly-once guarantee ended at the write. The read is on its own.

Debezium, which most teams use to stream Postgres changes into Kafka, is at-least-once by design — not a limitation they're working on. After any unclean shutdown or connector restart, it re-reads from its last saved WAL position and replays. Duplicates land in the topic. If downstream consumers are summing or accumulating state rather than upserting on event ID, those duplicates corrupt aggregates silently. We made idempotent consumers a hard requirement on every CDC-fed pipeline after running into this on a billing integration — the discovery was a reconciliation showing inflated totals, the cause was a connector restart three weeks prior, and fixing it required retrofitting deduplication across services that were already live. Going back is worse than building it in.

Idempotent sinks matter more than upstream exactly-once guarantees for exactly this reason. The upstream pipeline will restart. Connectors will replay. Designing the sink to tolerate duplicates is the only part of the system you can actually hold constant.

## Kafka Has Its Own Ways of Lying to You

Flink gets most of the attention in these conversations, but Kafka has failure modes that are just as quiet and just as easy to miss.

The consumer lag metric during a partition rebalance is the one that catches teams off guard most often. \`records-lag-max\` stops updating while the rebalance is in progress. Producers keep writing, consumers stop processing, lag is growing — and the metric is frozen at whatever it was before the rebalance started. If your alerting is built on that metric, it sees nothing. When the rebalance completes and numbers resume, the spike you see is real but it's already late — the gap opened 10, 20, 30 seconds earlier, during the window your monitoring was blind. Rebalances also tend to happen when the cluster is under enough load that a rebalance is being triggered in the first place, so the blind spot and the actual risk are correlated.

The \`isolation.level\` default is a different category of problem — less about monitoring, more about correctness assumptions people don't realize they're making. Kafka's default is \`read_uncommitted\`. If a producer is using transactions, consumers will read messages that haven't been committed yet by default. Most teams that set up transactions on the producer side don't touch \`isolation.level\` on the consumer side because they don't know they need to. The result is dirty reads from a system they believe is transactional.

Log compaction is the third one, and it's more situational — it only bites consumers that fall significantly behind. In a compacted topic, Kafka retains only the latest record per key. Intermediate states get deleted. A consumer that's been down for a few hours and starts replaying from its last offset won't see the intermediate values — just the final state of each key as of whenever it catches up. If the consumer's logic depends on processing transitions rather than terminal states, it processes incomplete data with no indication that anything was removed. The topic looks normal. The offsets advance. The data was just never there.

## The Read Layer Has Its Own Version of This Problem

The write-path problems above are the ones that show up in pipelines. The read path has a different version of the same failure.

Replication lag between a primary and its read replicas is not a constant. On a quiet system it might be 10 milliseconds. During a write spike or routine replica maintenance it can be 30 seconds or more. The dashboard reading from the replica doesn't know it's behind. Nothing says "this data is 28 seconds old." It shows what it has.

"Eventually consistent" means replicas converge, given no new writes, at some unspecified point. It says nothing about how long convergence takes or what a reader sees during the window. A system described as real-time that reads from an eventually-consistent store is operating on a staleness assumption it can't actually verify. Most teams, when pressed, can't tell you what their current replication lag bound is — not because they haven't looked, but because the architecture was never designed to surface it.

What we push for is every projection and replica-backed view carrying an enforced staleness bound — not a cosmetic "last updated" timestamp, but an actual constraint: this view is no more than X seconds behind the write model, and if it is, it says so. Getting there usually starts with the same question: what's your current replication lag bound? Most teams don't have an answer. Once they admit that, the conversation about what to build is easier.

## What Actually Gets Fixed and When

When we come into a system that has these problems, the first conversation is usually about event-time processing — switching from processing-time windows, setting up proper watermarks, routing late events to a side output so you can actually see what's being excluded. That change has to go down to the schema and write path. You can't retrofit it cleanly into a running pipeline; you end up reprocessing history in a system that wasn't designed for replay, against records that may not have reliable event timestamps to begin with.

The idempotent consumers, the staleness contracts, the watermark idle-source config — those are all the same conversation happening at different layers. What makes them expensive after the fact isn't the engineering, it's that the system is live, people are nervous about touching it, and the original decisions were made by people who aren't around to explain them.

The usual sequence: it gets scoped, deprioritized, rescheduled. The pipeline ships. Six months later someone asks whether the aggregates can be trusted and nobody has a clean answer. At that point you're not adding correctness — you're reverse-engineering history the system never kept, in a codebase where the original context is gone.
    `,
  },
  "agent-prompt-architecture": {
    slug: "agent-prompt-architecture",
    title: "Your AI Agent Isn't Broken. Your Prompt Is an Instruction Manual Written in Crayon.",
    description: "Why multi-agent systems fail in production — and what it takes to build ones that behave like software instead of guessing like interns.",
    tags: ["Agent Infrastructure", "Systems Engineering"],
    image: "/images/research/agent-prompt.png",
    author: "Bluecore Team",
    date: "2024-04-05",
    readTime: "18 min read",
    content: `
# Your AI Agent Isn't Broken. Your Prompt Is an Instruction Manual Written in Crayon.

Everyone is shipping agents right now.

Most of them work beautifully in the demo. Then they hit production and start hallucinating tool calls, asking users to choose between Option A and Option B on decisions that should never require a human, fabricating explanations when a tool isn't available, and generally behaving like a very confident junior employee who has no idea what the approval process is.

The problem isn't the model. The model is fine.

The problem is that someone handed it a prompt written like a creative brief instead of an operations manual, then blamed the AI when it improvised.

## Prose Prompts Are Technical Debt Dressed in Markdown

The instinct when building agents is to describe intent — explain what you want the agent to do, what it should care about, how it should behave. That feels right. It's also how you get a system that technically understands its mission and has absolutely no idea what to do when the user's message doesn't match the scenario you described.

Prose prompts have no state model. They have no explicit transition logic. They have no guards against duplicate execution. They don't define what a success response looks like versus a failure response. They're optimistic about everything and defensive about nothing.

At small scale, inside a single conversation, this is tolerable. You can patch it with more prose. Add another paragraph explaining the edge case. Throw in a caveat. Hope the model infers the right behavior.

At production scale, across concurrent sessions, in a multi-agent architecture where downstream systems depend on consistent outputs — the whole thing becomes a liability. Not sometimes. Reliably.

## The Fix Isn't Better Writing. It's Better Architecture.

Think of your prompt the way you'd think of a production runbook.

A runbook doesn't describe intent. It describes states, triggers, and transitions. It specifies exactly what condition must be true before an action is taken. It defines what the output looks like when an action succeeds, and what it looks like when it fails. It tells you what to do if a precondition isn't met — not as a suggestion, but as a hard rule.

A prompt built like a runbook gives an agent the same properties a runbook gives a human operator: deterministic behavior under load, predictable handling of edge cases, and an audit trail that doesn't require someone to go spelunking through chat logs to figure out what happened.

The structure that makes this work has five components:

**States** — an explicit lifecycle your agent understands and enforces. Not "the agent knows what phase it's in" — an actual declared state machine. UNINITIALIZED → PLANNED → EXECUTABLE → EXECUTED. The agent should know what state it's in, refuse operations that aren't valid in that state, and transition cleanly when the preconditions are met.

**Triggers** — plain language phrases mapped deterministically to tools. Not fuzzy intent matching. If the user says "execute," the agent calls the execution tool. Full stop. No branching. No asking for clarification on things that aren't ambiguous.

**Guards** — explicit preconditions that block critical actions before they happen. Never create a second batch if a valid one exists. Never execute without authorization. Never skip approval state because the user sounds confident.

**Output contracts** — structured, machine-readable, consistent. Every success response includes a full identifier and a link. Every failure response includes the actual error, not a paraphrase. No truncated IDs. No "the transaction was processed successfully" without the transaction hash.

**One-click decisioning** — after every significant action, the agent sends the correct next step. Not a menu. Not Option A/B/C. The agent knows what state you're in and what comes next. It sends that button. You click it or you don't.

## Why Agents Break Exactly When You Need Them Most

There's a specific failure mode we see repeatedly in multi-agent systems: the agent performs correctly until something slightly outside its described scenarios happens, at which point it improvises.

Improvisation in a system that touches money, records, or state is not a feature. It's the thing you don't find out about until it matters.

The most common improvisations:

The agent fabricates an explanation when it can't call the right tool. It's trying to be helpful. The output sounds plausible. The output is wrong. And because it sounded plausible, nobody checked.

The agent creates a duplicate record because it wasn't told to check whether one already existed before creating a new one. Idempotency is never assumed by default — it has to be enforced by a guard.

The agent asks the user to make a technical decision they shouldn't have to make. "Would you like me to use the batch processor or execute individually?" is a question that should never reach a user. That's a routing decision. Route it in the prompt.

The agent truncates identifiers in its output. Now you have an audit trail that's almost complete, which is worse than not having one, because it creates the impression of traceability without the substance.

All of these are prompt architecture failures. All of them are preventable.

## We Built This Into REFI2's Agent Infrastructure

When we designed the agent layer for REFI2 — our protocol for tokenizing Canadian residential mortgages into onchain yield instruments — we couldn't afford any of those failure modes.

Every agent in the system operates against an explicit state machine. The NAV calculation agent doesn't estimate — it calls the oracle, quotes the result verbatim, and attaches the full on-chain reference. The compliance gating agent doesn't interpret eligibility — it checks the regulatory gate at the Token-2022 level and returns a deterministic pass/fail with the exact condition that was evaluated. The deposit verification agent doesn't summarize — it returns the Merkle proof and the explorer link. Every time. Without improvisation.

What we found in building this way: agents operating against runbook-style prompts are dramatically faster to debug, dramatically easier to extend, and produce outputs that humans and downstream systems can both consume reliably. The audit trail isn't a feature you add at the end. It's a natural output of a system that was designed to explain itself at every step.

That architecture pattern — states, triggers, guards, output contracts, one-click decisioning — isn't specific to tokenized mortgages. It applies anywhere agents are doing consequential work.

## What Production-Ready Actually Means for Agents

Production-ready isn't a vibe. It's a checklist:

Every intent resolves to a deterministic tool call, not a branching dialogue. Every critical action has a guard that verifies preconditions before execution. Every output includes a full identifier and a machine-readable success or failure contract. Every failure returns the actual error, not a sanitized summary. No action ever creates a duplicate because the system verified existence before creating.

If your current agent architecture can't pass that checklist, you don't have a production system. You have a prototype that's pretending.

The good news is that the fix is mostly architectural, not technical. The models are capable. The infrastructure exists. What's missing, in almost every case, is a prompt that treats itself as software with guarantees rather than guidance with good intentions.

Write the runbook. Declare the states. Enforce the guards. Define the contracts.

Then your agent stops guessing and starts behaving like something you'd actually trust with real work.
    `,
  },
};

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const article = articles[slug];

  useEffect(() => {
    if (!article) {
      router.push('/#research');
    }
  }, [article, router]);

  if (!article) {
    return null;
  }

  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${article.image})`,
          }}
        >
          {/* Fallback gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent" />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-raised via-raised/90 to-raised/60" />

        {/* Content */}
        <div className="relative w-full">
          <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
            <Link
              href="/#research"
              className="inline-flex items-center gap-2 text-sm text-body hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              <span>Back to Research</span>
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-mono text-accent bg-accent-glow/50 backdrop-blur-sm rounded-md border border-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-heading leading-tight mb-6">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{article.readTime}</span>
              </div>
              <span>{article.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="relative py-16 md:py-24 bg-raised">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="font-display font-bold text-3xl text-heading mt-10 mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="font-display font-bold text-2xl text-heading mt-10 mb-4">{children}</h2>,
                h3: ({ children }) => <h3 className="font-display font-semibold text-xl text-heading mt-8 mb-3">{children}</h3>,
                p: ({ children }) => <p className="text-body leading-relaxed mb-6">{children}</p>,
                strong: ({ children }) => <strong className="text-heading font-semibold">{children}</strong>,
                code: ({ children }) => <code className="font-mono text-accent bg-accent-glow/30 px-1.5 py-0.5 rounded text-sm">{children}</code>,
                ul: ({ children }) => <ul className="list-disc list-inside text-body mb-6 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside text-body mb-6 space-y-2">{children}</ol>,
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                blockquote: ({ children }) => <blockquote className="border-l-2 border-accent pl-6 my-6 text-body italic">{children}</blockquote>,
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Back to Research Link */}
          <div className="mt-16 pt-8 border-t border-edge">
            <Link
              href="/#research"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-alt transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Research</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

