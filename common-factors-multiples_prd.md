# Product Requirements Document (PRD)
## Common Ground — Common Factors & Common Multiples | Grade 4 Math
### Intellia SG | Global Grade 4 Mathematics Curriculum (aligned to Common Core / Cambridge Primary / IB PYP number strands)

═══════════════════════════════════════════════════════════════════════════════

## 1. EXECUTIVE SUMMARY

This document defines product requirements for the **"Common Ground — Common
Factors and Common Multiples"** interactive lesson module, delivered as **Lesson
5.3** within Intellia's Grade 4 Math program, following directly on from **5.1
Factors of Numbers** and **5.2 Multiples of Numbers**. The module targets Grade 4
students aged 9–10 worldwide and builds the bridge from individually finding
factors/multiples of one number to comparing two numbers and identifying what
they share — the conceptual seed for GCF (Greatest Common Factor) and LCM
(Least Common Multiple), which are formalized in later grades.

The product is a standalone web page to be hosted at:

`https://intelliasg.com/courses/grade-4-math/lessons/common-factors-and-common-multiples/`

It is built using **React (Vite + JSX, JavaScript/CSS)** and designed to
**strictly mirror** the visual and UX structure established at
**https://equal-tau.vercel.app/** and the repository **https://github.com/dsamyak/equal**.
No structural, layout, or interaction-pattern deviation from that reference is
permitted without explicit sign-off.

Audio narration uses **ElevenLabs exclusively** (Voice: Alice, Voice ID:
`Xb7hH8MSUJpSbSDYk0k2`, Model: `eleven_multilingual_v2`) with pre-generated
static `.mp3` files for all phase narrations and dynamic generation for practice
questions — matching the pipeline already used across Intellia lesson modules.
This module's script and narration cadence are recorded to match the reference
audio sample provided by the requester; any newly supplied reference audio file
should be dropped into `scripts/reference_audio/` and used as the tonal/pacing
benchmark when generating `generate_audio.js` output.

The module follows Intellia's 6-phase learner journey:

- **Phase 1 — INTRO** → Welcome screen + 5-phase progress map
- **Phase 2 — WONDER** → Curiosity hook
- **Phase 3 — STORY** → Narrative-based concept introduction
- **Phase 4 — SIMULATE** → Sandbox-style interactive simulation (3 stations)
- **Phase 5 — PLAY** → IntelliPlay™ gamified practice (100 randomised questions)
- **Phase 6 — REFLECT** → Journal / LearnFlow AI prompt + completion badge

═══════════════════════════════════════════════════════════════════════════════

## 2. PRODUCT VISION & GOALS

### Vision
To make **common factors** and **common multiples** intuitive and joyful for
9–10 year old learners anywhere in the world — building a concrete-pictorial-
abstract (CPA) bridge from "factors of one number" to "what two numbers share,"
through hands-on array-building, Venn-diagram sorting, and number-line
simulations, wrapped in an adaptive gamified challenge.

### Goals

| Goal | Metric |
|---|---|
| Learning Completion | ≥85% of students complete all 6 phases |
| Practice Engagement | ≥90% attempt at least 10 practice questions |
| Score Achievement | Average challenge score ≥75% on first attempt |
| Session Duration | Average engagement ≥18 minutes per session |
| Curriculum Alignment | 100% aligned to global Grade 4 number-strand outcomes |
| Phase Progression | ≥80% reach Play phase in a single session |
| Simulation Interaction Rate | ≥95% attempt all 3 simulation stations |

═══════════════════════════════════════════════════════════════════════════════

## 3. TARGET USERS

### Primary: Grade 4 Students (Age 9–10, global)

- Already comfortable with multiplication facts up to 9×9 and basic division
- Have just completed 5.1 (Factors of Numbers) and 5.2 (Multiples of Numbers)
- Ready to compare two numbers side-by-side rather than study one in isolation
- Respond well to visual sorting (Venn diagrams), number lines, and array grids
- Names and settings in this module are intentionally **global/neutral** —
  school, park, library, sports day, bake sale, garden — so the module works
  for any classroom in any country

### Secondary: Parents & Teachers

- Assign as classwork, homework, or intervention/enrichment
- Expect alignment with mainstream global curricula (Common Core 4.OA.4,
  Cambridge Primary Mathematics Stage 4, IB PYP Number strand)
- Monitor via phase completion indicators embedded in the lesson page

═══════════════════════════════════════════════════════════════════════════════

## 4. CURRICULUM ALIGNMENT — Global Grade 4 Mathematics

**Topic:** Common Factors and Common Multiples (Lesson 5.3)
**Programme:** Intellia Grade 4 Math — Section 5: Factors and Multiples
**Lesson URL:** `https://intelliasg.com/courses/grade-4-math/lessons/common-factors-and-common-multiples/`
**Parent Course:** `https://intelliasg.com/courses/grade-4-math/`

### Source References

- **Common Core State Standards (US), Grade 4** — 4.OA.4: *"Find all factor
  pairs for a whole number in the range 1–100... determine whether a given
  whole number in the range 1–100 is a multiple of a given one-digit number."*
- **Cambridge Primary Mathematics, Stage 4** — Number: factors and multiples,
  recognising common factors and common multiples of two numbers
- **IB PYP, Number strand** — "Numbers are equivalent, ordered, and related"
  applied through factor/multiple relationships between two quantities
- **Singapore MOE Primary Mathematics (cross-reference)** — Factors and
  Multiples chapter, common factors/multiples introduced via listing method

### Learning Objectives Covered (Lesson 5.3)

- **LO1** Recall factors and multiples of a single number (recap of 5.1/5.2)
- **LO2** List the factors of two given numbers and identify which factors
  appear in both lists (common factors)
- **LO3** List the first several multiples of two given numbers and identify
  which multiples appear in both lists (common multiples)
- **LO4** Identify the **greatest common factor** informally (largest shared
  factor) without yet naming it "GCF" formally
- **LO5** Identify the **smallest common multiple** informally (first shared
  multiple) without yet naming it "LCM" formally
- **LO6** Use a Venn diagram to sort factors of two numbers into "only A,"
  "only B," and "common to both"
- **LO7** Solve simple real-world word problems involving common
  factors/multiples (e.g. grouping evenly, events that repeat together)
- **LO8** Use correct vocabulary: "factor," "multiple," "common factor,"
  "common multiple," "shared," "in both lists"

### CPA Progression for This Lesson

- **Concrete** → Building physical-style arrays/rows for two numbers side by
  side and spotting where grouping works identically (simulated digitally)
- **Pictorial** → Venn diagrams, dual number lines with multiples marked
- **Abstract** → Listing factor pairs and multiple sequences; writing
  "Common factors of 12 and 18: 1, 2, 3, 6" and "Common multiples of 4 and 6:
  12, 24, 36..."

### Number Ranges

- **Easy:** Numbers 1–20; factors/multiples within familiar times-tables (2–5)
- **Medium:** Numbers 1–50; factors/multiples within times-tables (2–9)
- **Hard:** Numbers 1–100; includes three-shared-multiple chains and
  factor-pair reasoning without full listing

### Vocabulary Focus

"factor," "multiple," "common factor," "common multiple," "shared," "in
common," "greatest," "smallest," "list," "pair of numbers"

═══════════════════════════════════════════════════════════════════════════════

## 5. THE 6-PHASE LEARNER JOURNEY (Intellia Model)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ INTRO SCREEN → Progress Map (5-step visual tracker, top bar)               │
│ Welcome: "Hi there! Today we discover Common Factors and Multiples! 🎉"    │
│ Lesson badge shown (locked). Phase dots visible.                           │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1 — WONDER (≈ 1–2 min)                                               │
│                                                                            │
│ Hook: "John's class has 12 students. Sarah's class has 18 students.       │
│ Both teachers want to split their class into EQUAL teams of the SAME size.│
│ What team sizes work for BOTH classes?"                                   │
│                                                                            │
│ Visual: Two classroom groups animate onto screen, question marks pulse    │
│ Narration (ElevenLabs): Alice voice reads the hook warmly                 │
│ → Mascot (LearnFlow robot) appears puzzled, tilts head                    │
│ → "Let's find out what COMMON FACTORS really means!"                      │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 2 — STORY (≈ 2–3 min)                                                │
│                                                                            │
│ Narrative: John and Sarah are planning a school fun fair.                 │
│ Panel 1: "John has 12 candles for a craft table. He wants equal rows."    │
│ Panel 2: "Factors of 12: 1, 2, 3, 4, 6, 12."                              │
│ Panel 3: "Sarah has 18 stickers for another table. Same idea — equal rows."│
│ Panel 4: "Factors of 18: 1, 2, 3, 6, 9, 18."                              │
│ Panel 5: "Look! 1, 2, 3, and 6 appear in BOTH lists — common factors!"    │
│ Panel 6: "Now — buses arrive every 4 minutes, and shuttle carts every     │
│           6 minutes. When do they arrive TOGETHER? Multiples of 4: 4, 8,  │
│           12, 16, 20, 24. Multiples of 6: 6, 12, 18, 24. They meet at     │
│           12 and 24 — common multiples!"                                  │
│                                                                            │
│ → Illustrated story panels (animated slide-in), ElevenLabs narration      │
│ → Key vocabulary highlighted: "common factor," "common multiple," "shared"│
│ → Dual-list diagram introduced visually (two overlapping lists)           │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 3 — SIMULATE (≈ 6–8 min)                                             │
│                                                                            │
│ 3 Interactive Stations — student must complete all 3 to advance           │
│                                                                            │
│ Station A — "The Array Yard" (Concrete)                                   │
│ Build equal-row arrays for two numbers side by side; tap row counts that  │
│ work for BOTH numbers to reveal common factors.                          │
│                                                                            │
│ Station B — "The Sorting Circles" (Pictorial — Venn Diagram)              │
│ Drag factor tiles of Number A and Number B into a two-circle Venn diagram:│
│ "Only A," "Only B," and the overlapping "Common" zone.                   │
│                                                                            │
│ Station C — "The Meeting Point" (Abstract — Dual Number Line)             │
│ Two number lines show multiples of two numbers lighting up as they count; │
│ student taps the first point where both lines light up together.        │
│                                                                            │
│ → Mascot reacts to each completed station                                 │
│ → ElevenLabs narrates each station instruction and feedback              │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 4 — PLAY (≈ 8–10 min)                                                │
│                                                                            │
│ IntelliPlay™ Level: 100 randomised questions across 10 worlds             │
│ 10 questions per world, world unlocks at ≥6/10 correct                   │
│ Stars (1–3), XP, badges, and streak fire counter active                 │
│ → Mastery gates the world map; encouragement-first feedback              │
│ → EVERY question is freshly randomised per session — no two students     │
│   (and no two attempts) see the same exact number pair in the same order │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 5 — REFLECT (≈ 1–2 min)                                              │
│                                                                            │
│ Journal prompt: "Can you find the common factors of 8 and 20? Tell me     │
│ what you notice!"                                                        │
│ Or: LearnFlow AI chat — type/speak your understanding                    │
│ Lesson complete badge unlocks here. Summary of XP + badges shown.        │
│ → "Share with your teacher!" button (screenshot / export)                │
└────────────────────────────────────────────────────────────────────────────┘
```

═══════════════════════════════════════════════════════════════════════════════

## 6. PHASE 3 — SIMULATION DESIGN (Detailed)

### 6.1 Station A — The Array Yard (Concrete)

**Visual:**
- Two side-by-side grid yards, one labeled Number A, one labeled Number B
- Draggable unit blocks that snap into equal rows
- "Try grouping Number A's blocks into equal rows. Now try Number B's!"
  narrated by Alice (ElevenLabs)

**Interaction:**
- Student picks a row-size (2, 3, 4, 5, 6...) from a selector
- Both yards attempt to arrange their total block count into that row size
- If a yard's total divides evenly, blocks snap into a neat rectangle and
  glow green ("это a factor!"); if not, the leftover blocks wobble and
  glow amber (not a common factor for that yard)
- When a row-size works for **both** yards simultaneously, a "Common Factor
  Found!" banner animates and the value is added to a running common-factor
  list at the bottom

**Feedback:**
- Both yards divide evenly → mascot cheers, "Yes! That row size works for
  both classes — it's a common factor!" 🎉
- Only one yard divides evenly → gentle pulse + "Close — that works for one
  group but not the other. Try another row size!"

**Variants per round (randomised):**
- Round 1: Numbers 8 and 12 (common factors 1, 2, 4)
- Round 2: Numbers 12 and 18 (common factors 1, 2, 3, 6)
- Round 3: Numbers 15 and 20 (common factors 1, 5)
- Round 4: Numbers 24 and 36 (common factors 1, 2, 3, 4, 6, 12)

### 6.2 Station B — The Sorting Circles (Pictorial — Venn Diagram)

**Visual:**
- A large two-circle Venn diagram overlay, left circle labeled "Factors of A,"
  right circle labeled "Factors of B," center overlap labeled "Common"
- A tray of factor-number tiles below (all factors of both numbers, shuffled)

**Interaction:**
- Student drags each tile into the correct zone: left-only, right-only, or
  center (common to both)
- Real-time zone counter shows progress: "4 of 7 tiles placed"
- "Check my sorting" button submits; correct tiles lock in place, incorrect
  ones bounce back to the tray for another attempt

**Teaching goal:**
- Visually reinforces that "common" means *belongs to both sets*, the same
  logic that later generalises to GCF/LCM and set theory

**Distractor design:**
- Tray always includes 1–2 numbers that are factors of neither (plausible
  but incorrect, catching careless drags)

**3 rounds with increasing complexity:**
- Round 1: Small numbers (factors of 8 and 12) — fewer tiles
- Round 2: Medium numbers (factors of 18 and 24) — more tiles, one distractor
- Round 3: Larger numbers (factors of 30 and 45) — most tiles, two distractors

### 6.3 Station C — The Meeting Point (Abstract — Dual Number Line)

**Visual:**
```
Multiples of A: ●───●───●───●───●───●───●  (lights up as it counts)
Multiples of B: ●───●───●───●───●───●───●  (lights up as it counts)
```
- Two horizontal number lines stacked vertically, each marked with the first
  8–10 multiples of its number
- Play/step controls let the student advance both lines together, one
  multiple at a time

**Interaction:**
- Student taps "Step" to reveal the next multiple on each line
- When a value appears lit on **both** lines at once, student taps that
  shared point to lock in "Common Multiple Found!"
- A running list of discovered common multiples builds at the bottom:
  "Common multiples of 4 and 6: 12, 24, ..."

**Variants (rotated per round):**
- Round 1: Multiples of 3 and 4 (first common multiple: 12)
- Round 2: Multiples of 4 and 6 (first common multiple: 12)
- Round 3: Multiples of 5 and 6 (first common multiple: 30)

ElevenLabs narrates each instruction and celebrates the first shared point
found: "You found it! Twelve is a common multiple of four and six!"

═══════════════════════════════════════════════════════════════════════════════

## 7. PHASE 4 — QUESTION BANK (100 Randomised Questions)

### 7.1 Question Types (10 types × 10 questions = 100 total)

| Type | Description | Example |
|---|---|---|
| Q1 | List factors — find common factors | Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. What are the common factors? |
| Q2 | Pick the common factor (MCQ) | Which number is a common factor of 16 and 24? |
| Q3 | List multiples — find common multiples | List the first 3 common multiples of 3 and 5. |
| Q4 | Pick the common multiple (MCQ) | Which number is a common multiple of 4 and 6? |
| Q5 | Greatest common factor (informal) | What is the GREATEST common factor of 20 and 30? |
| Q6 | Smallest common multiple (informal) | What is the SMALLEST common multiple of 6 and 8? |
| Q7 | Real-world word problem (grouping) | John has 24 pencils and Mike has 36 pencils. What is the largest group size that splits both evenly? |
| Q8 | Real-world word problem (timing/events) | A red light blinks every 6 seconds, a blue light every 8 seconds. When do they blink together first? |
| Q9 | True or False | "6 is a common factor of 18 and 24." True or False? |
| Q10 | Venn diagram placement (pictorial MCQ) | Where does the number 4 belong: Only A, Only B, or Common? |

### 7.2 Question Distribution by Difficulty

| Type | Count | Easy (1–20) | Medium (1–50) | Hard (1–100) |
|---|---|---|---|---|
| Q1 | 10 | 4 | 4 | 2 |
| Q2 | 10 | 5 | 3 | 2 |
| Q3 | 10 | 4 | 4 | 2 |
| Q4 | 10 | 5 | 3 | 2 |
| Q5 | 10 | 3 | 4 | 3 |
| Q6 | 10 | 3 | 4 | 3 |
| Q7 | 10 | 3 | 4 | 3 |
| Q8 | 10 | 3 | 4 | 3 |
| Q9 | 10 | 5 | 3 | 2 |
| Q10 | 10 | 4 | 4 | 2 |
| **TOTAL** | **100** | **39** | **37** | **24** |

### 7.3 Number Ranges

- **Easy:** Numbers 1–20, well-known factor/multiple pairs (2, 3, 4, 5, 10)
- **Medium:** Numbers 1–50, pairs from times-tables 2–9
- **Hard:** Numbers 1–100, includes reverse-reasoning and multi-step problems

### 7.4 Global Names & Contexts Used in Word Problems

**Names:** John, Mike, Sarah, Maria, Chen, Aisha, Diego, Yuki, Emma, Liam,
Fatima, Carlos, Priya, Noah, Olga, Kwame

**Objects:** pencils, stickers, candles, marbles, cupcakes, chairs, balloons,
tennis balls, flowerpots, trading cards, notebooks, ribbons

**Contexts:** school fun fair, sports day, library reading corner, class
trip, bake sale, garden planting day, art class, birthday party — all
deliberately generic/global settings, not tied to any single country or
culture

### 7.5 Language Requirements

All questions use consistent, curriculum-neutral vocabulary:

- "factor," "multiple," "common factor," "common multiple"
- "greatest common factor," "smallest common multiple" (used informally,
  without requiring the GCF/LCM abbreviations to be memorised yet)
- "shared," "in both," "list," "the same for both"

Sentence structures are short, direct, and age-appropriate for 9–10 year olds.

═══════════════════════════════════════════════════════════════════════════════

## 8. GAMIFICATION DESIGN

### 8.1 Reward System

- **Stars (⭐):** Earned per 10-question world (1–3 stars based on score)
- **XP Points:** 10 XP correct first try | 7 XP second try | 5 XP with hint used
- **Streak 🔥:** Fire counter for consecutive correct answers
- **Streak Bonus:** +5 XP per correct answer when streak ≥ 5

### 8.2 Badges (Unlockable)

- 🏅 **"Number Explorer"** — Complete Wonder + Story phases
- 🥈 **"Set Sorter"** — Complete all 3 Simulation stations
- 🥇 **"Common Ground Champion"** — Score ≥80% on Play phase
- 💎 **"Perfect Pair"** — Score 10/10 in any world
- 🔥 **"Streak Star"** — Achieve a streak of 10 consecutive correct answers
- 🌟 **"Full Journey"** — Complete all 6 phases (lesson complete badge)
- 🎯 **"Venn Master"** — Sort a full round in Station B with zero mistakes
- ⏱️ **"Meeting Point Pro"** — Find 5 common multiples correctly in Station C

### 8.3 Feedback Mechanics

**✅ Correct:**
- Bounce animation on answer card + mascot happy mood
- ElevenLabs celebration audio: "Yes! That's a common factor! Amazing work!"
- XP floats up from answer card (+10 / +7 / +5)
- Streak fire counter increments

**❌ Incorrect (Attempt 1):**
- Gentle shake animation on answer card
- ElevenLabs gentle voice: "Not quite — let's list the factors again."
- Hint 1 activates: factor/multiple lists highlighted side by side

**❌ Incorrect (Attempt 2):**
- Stronger shake + Hint 2: overlapping values visually highlighted in both lists
- ElevenLabs: "Look closely — which number shows up in BOTH lists?"

**❌ Incorrect (Attempt 3):**
- Answer revealed with animated explanation (mascot explains)
- ElevenLabs: full explanation read aloud
- No score penalty — encouragement only

No negative scoring. Encouragement-first approach always.

### 8.4 World Map (IntelliPlay™ Level Progression)

- **World 1 — "Sunny Schoolyard"** (Q1–10, numbers 1–15, easy)
- **World 2 — "Bake Sale Bonanza"** (Q11–20, numbers 1–20, easy-med)
- **World 3 — "Library Lanes"** (Q21–30, numbers 1–30, medium)
- **World 4 — "Fun Fair Grounds"** (Q31–40, numbers 1–35, medium)
- **World 5 — "Garden Grid"** (Q41–50, numbers 1–40, medium-hard)
- **World 6 — "Sports Day Sprint"** (Q51–60, numbers 1–50, hard, includes reverse)
- **World 7 — "City Bus Routes"** (Q61–70, numbers 1–60, hard, word problems)
- **World 8 — "Number Tower"** (Q71–80, numbers 1–80, hard, mixed types)
- **World 9 — "Rainbow Bridge"** (Q81–90, numbers 1–90, hard, all types)
- **World 10 — "Grand Common Ground"** (Q91–100, numbers 1–100, hardest, multi-step)

Unlock gate: ≥6/10 correct (1-star minimum) required to advance to next world.
3 stars in a world unlocks a hidden "Bonus Challenge" (3 extra questions).

### 8.5 Mascot (LearnFlow AI Companion)

- **Character:** Friendly robot — "LearnFlow" (matching Intellia branding)
- **Mood States:** idle | curious | happy | thinking | celebrating | encouraging
- **Appearances:** Wonder hook, Story narration, Simulation feedback, Reflect phase
- **Reactions:** Correct answer, badge unlock, streak milestone, world completion
- **Audio:** All mascot speech via ElevenLabs Alice voice (pre-generated .mp3)

═══════════════════════════════════════════════════════════════════════════════

## 9. AUDIO & NARRATION DESIGN

### 9.1 ElevenLabs Pipeline

- **Voice Provider:** ElevenLabs (ONLY — no browser Web Speech API fallback)
- **Voice Name:** Alice (Clear, Engaging Educator)
- **Voice ID:** `Xb7hH8MSUJpSbSDYk0k2`
- **Model:** `eleven_multilingual_v2`
- **API Key Env Var:** `VITE_ELEVENLABS_API_KEY`
- **Reference Audio:** if a reference `.mp3`/`.wav` sample is supplied, it is
  stored at `scripts/reference_audio/` and used to calibrate pacing, warmth,
  and pause length for all pre-generated phrases — the reference is a style
  guide, not a swap-in voice, since the pipeline is ElevenLabs-only

### 9.2 Speech Styles Mapped to ElevenLabs Settings

| Style | stability | similarity_boost | style | Use case |
|---|---|---|---|---|
| statement | 0.75 | 0.75 | 0.0 | Story narration, instructions |
| instruction | 0.80 | 0.75 | 0.0 | Simulation station prompts |
| question | 0.60 | 0.80 | 0.3 | Practice question read-aloud |
| encouragement | 0.55 | 0.85 | 0.6 | Correct answer feedback |
| emphasis | 0.85 | 0.70 | 0.1 | Key vocabulary highlight |
| thinking | 0.65 | 0.80 | 0.2 | Mascot thinking moments |
| celebration | 0.45 | 0.90 | 0.8 | Badge unlock, world complete |

### 9.3 Pre-generated Audio Files (Offline — scripts/generate_audio.js)

All phase narration lines (Wonder, Story panels, Simulate instructions,
Reflect prompt, badge unlock messages, world completion) are pre-generated
offline and stored as static `.mp3` in `public/assets/audio/`.
`audioMap.js` is auto-generated and maps exact text strings → file paths.
The frontend checks `audioMap` first; dynamic generation only for play-phase
questions not in the map (using `elevenLabsCache` in memory).

### 9.4 Dynamic Generation

Practice questions (Phase 4) are generated dynamically if not pre-cached.
Requires `VITE_ELEVENLABS_API_KEY` in `.env.local`.
If key is absent, narration silently skipped (no browser TTS fallback).
Internal memory cache (`elevenLabsCache`) prevents re-fetching same text.

### 9.5 Segment Synchronisation

The audio engine parses narration as an array of segments (one per sentence).
While segment i plays, segment i+1 is eagerly preloaded via `getAudioUrl`.
This guarantees seamless, gap-free narration across multi-sentence scripts.
Uses HTML5 Audio API (`new Audio()`) for playback.

### 9.6 Narration Script Examples

**Phase 1 (Wonder) — style: thinking**
> "John's class has twelve students. Sarah's class has eighteen students."
> "Both teachers want equal teams of the same size. What sizes work for both?"
> "Let us find out what common factors really means!"

**Phase 2 (Story, Panel 1) — style: statement**
> "John and Sarah are planning a school fun fair."
> "John has twelve candles for a craft table. He wants equal rows."
> "The factors of twelve are one, two, three, four, six, and twelve."

**Phase 3 (Station A) — style: instruction**
> "Try grouping the blocks into equal rows. Does that row size work for both yards?"

**Phase 4 (Correct feedback) — style: celebration**
> "Yes! That's a common factor! You found something special!"

**Phase 5 (Reflect) — style: thinking**
> "What a journey today! Can you find the common factors of eight and twenty?"

═══════════════════════════════════════════════════════════════════════════════

## 10. UX & VISUAL DESIGN REQUIREMENTS

### 10.1 Visual Theme

- **Brand:** Intellia — Think. Explore. Become.
- **Reference UI:** `https://equal-tau.vercel.app/` (mirror exactly)
- **Reference Repo:** `https://github.com/dsamyak/equal`
- **Colours:** Match `equal-tau.vercel.app` exactly
  - Primary blue: consistent with existing Intellia lessons
  - Accent gold/yellow for rewards and stars
  - Soft coral/red for wrong-answer shake states
  - White card backgrounds, soft drop shadows
  - Phase band colours: distinct per phase (matching Intellia journey infographic)
- **Typography:** Rounded, playful — Nunito or Fredoka One
- **Illustrations:** Cartoon-style, globally neutral imagery (classrooms,
  parks, fun fairs, buses) — no single-country cultural markers
- **Venn/Number Diagrams:** Circular sorting zones and dual number lines
  (SVG), coloured distinctly from each other

### 10.2 Layout Structure (mirrors equal-tau.vercel.app)

- **Top Bar:** Intellia logo | Lesson title "Common Factors & Multiples" | phase dot tracker
- **Main Area:** Phase content (fills screen, responsive, smooth phase transitions)
- **Bottom Bar:** XP counter | Star count | Streak fire | Phase navigation arrows
- **Sidebar:** Hidden on mobile; shown on tablet+ as vertical phase map

### 10.3 Common Factor/Multiple Diagram Visual Components (Primary Visuals)

Used throughout all phases. Visual specs:

- **Dual-List Diagram:** two labeled columns (Factors of A / Factors of B)
  with shared values visually bridged/highlighted in the middle
- **Venn Diagram:** two overlapping circles, tiles animate into place,
  overlap zone glows when correctly filled
- **Dual Number Line:** two horizontal tracks, multiples animate in as
  glowing dots, shared points pulse gold when found
- Missing/undiscovered values shown as dashed-border placeholders with "?"

### 10.4 Accessibility

- Large tap targets (minimum 44×44px on all interactive elements)
- WCAG AA colour contrast on all text elements
- All narration via ElevenLabs (premium, consistent voice)
- Keyboard navigable (Tab + Enter for all interactions)
- No mandatory time pressure (optional timer toggle in challenge mode only)
- Drag interactions have touch-equivalent tap+tap fallback

### 10.5 Responsive Design

- **Primary:** iPad / tablet (768px+) — classroom context
- **Secondary:** Desktop browser (1024px+)
- **Tertiary:** Mobile (375px+) — stacked single-column layout

═══════════════════════════════════════════════════════════════════════════════

## 11. CONTENT REQUIREMENTS

### 11.1 Simulation Visuals

- Array grids: SVG-rendered rectangular block arrangements per yard
- Venn diagram: two overlapping circles with draggable numeric tiles
- Dual number line: SVG tracks with animated glowing points
- Object pool themes rotated per session (blocks, stickers, tiles)

### 11.2 Question Bank Coverage

- All 10 question types × 10 questions = 100 unique question objects in `questionBank.js`
- Questions randomised per session using Fisher-Yates shuffle
- No two sessions present same question order
- MCQ distractors always plausible (near-miss factors/multiples, not random noise)

### 11.3 Word Problem Format

**Grouping sense:**
> "[Name] has [total A] [objects] and [Name2] has [total B] [objects]. What
> is the largest group size that splits both amounts evenly?"

**Timing/event sense:**
> "[Event A] happens every [interval A] [unit]. [Event B] happens every
> [interval B] [unit]. When do they happen together for the first time?"

**Extended reasoning style:**
> "[Name] lists the factors of ___ and the factors of ___. Which numbers
> appear in both lists? Which is the greatest?"

### 11.4 Audio Script Parity (1:1 Strict Parity Rule)

Every on-screen text string that is narrated must match the narration.js text
exactly — same words, same punctuation. This prevents confusion for young
learners who are simultaneously listening and reading. Any UI text change
requires updating both the `generate_audio.js` phrases array and the
`narration.js` file.

═══════════════════════════════════════════════════════════════════════════════

## 12. SUCCESS CRITERIA (v1.0)

| Criterion | Target |
|---|---|
| All 100 questions randomised correctly | ✅ Required |
| All 3 simulation stations functional | ✅ Required |
| All 6 phases navigable end-to-end | ✅ Required |
| Gamification (XP, stars, 8 badges) working | ✅ Required |
| World map 10-world progression logic correct | ✅ Required |
| ElevenLabs audio plays for all phase narration | ✅ Required |
| Audio pipeline (pre-gen + dynamic) functional | ✅ Required |
| Mobile/tablet responsive layout | ✅ Required |
| Global Grade 4 syllabus outcomes 100% covered | ✅ Required |
| Loads in < 3 seconds (Vite production build) | ✅ Required |
| WCAG AA accessible | ✅ Required |
| UI matches equal-tau.vercel.app structure | ✅ Required |
| Hosted correctly at intelliasg.com lesson URL | ✅ Required |

═══════════════════════════════════════════════════════════════════════════════

## 13. OUT OF SCOPE (v1.0)

- Teacher dashboard / backend analytics
- Student login / account persistence across devices
- Multiplayer or class competition features
- Parent progress report emails
- Print worksheet generation
- Formal GCF/LCM notation and prime-factorisation methods (Grade 5/6 topic)
- Assessment against full curriculum (broader test engine)

═══════════════════════════════════════════════════════════════════════════════

**Document Version:** 1.0 | July 2026
**Product:** Intellia — Grade 4 Math, Lesson 5.3
**Lesson Title:** Common Factors and Common Multiples
**Curriculum:** Global Grade 4 Mathematics (Common Core / Cambridge Primary / IB PYP aligned)
**Reference UI:** https://equal-tau.vercel.app/
**Reference Repo:** https://github.com/dsamyak/equal
**Audio Pipeline:** ElevenLabs (Alice, `Xb7hH8MSUJpSbSDYk0k2`, `eleven_multilingual_v2`)
**Parent Course Page:** https://intelliasg.com/courses/grade-4-math/
**Lesson URL:** https://intelliasg.com/courses/grade-4-math/lessons/common-factors-and-common-multiples/
