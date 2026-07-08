# Technical Requirements Document (TRD)
## Common Ground — Common Factors & Common Multiples | Grade 4 Math
### Intellia SG | Global Grade 4 Mathematics Curriculum

═══════════════════════════════════════════════════════════════════════════════

## 1. TECHNICAL OVERVIEW

This document specifies the architecture, component design, state management,
data models, simulation logic, gamification implementation, audio pipeline,
and quality standards for the **"Common Ground — Common Factors and Common
Multiples"** interactive lesson module (Lesson 5.3) within Intellia's Grade 4
Math program.

The module is a **React 18 application (Vite + JSX)**, structured identically
to the reference repository `https://github.com/dsamyak/equal`, and styled to
match `https://equal-tau.vercel.app/`. It will be embedded in WordPress at:

`https://intelliasg.com/courses/grade-4-math/lessons/common-factors-and-common-multiples/`

Audio narration uses **ElevenLabs exclusively** (no browser Web Speech API
fallback), mirroring the pipeline from the reference project's audio &
narration architecture, adapted for this lesson's scripts. Where a reference
audio sample is supplied by the requester, it is used only to calibrate
pacing/tone parameters in `generate_audio.js` — the production voice remains
ElevenLabs "Alice."

═══════════════════════════════════════════════════════════════════════════════

## 2. TECHNOLOGY STACK

| Layer | Technology | Rationale |
|---|---|---|
| UI Framework | React 18 (JSX, Vite) | Matches `equal` repo structure |
| State Management | `useState` + `useReducer` | Sufficient for single-module complexity |
| Styling | CSS Modules + Tailwind | Matches existing repo CSS approach |
| Icons | Lucide React | Available in artifact environment |
| Animation | CSS keyframes + transitions | No external dependency needed |
| SVG Diagrams | Inline SVG (React) | For array grids, Venn diagrams, number lines |
| Persistence | `localStorage` | Session state, no backend needed |
| Audio (Primary) | ElevenLabs API | Premium, consistent voice (Alice) |
| Audio (Playback) | HTML5 Audio API (`new Audio()`) | Browser-native, no library needed |
| Math | Vanilla JS | No library required |
| Build Tool | Vite | Matches repo (`vite.config.js` present) |

═══════════════════════════════════════════════════════════════════════════════

## 3. PROJECT STRUCTURE (mirrors `equal` repo)

```
common-factors-multiples/
├── public/
│   ├── assets/
│   │   ├── audio/                       # Pre-generated .mp3 files (ElevenLabs)
│   │   │   ├── audio_wonder_hook_0.mp3
│   │   │   ├── audio_story_panel1_0.mp3
│   │   │   ├── audio_story_panel2_0.mp3
│   │   │   ├── audio_story_panel3_0.mp3
│   │   │   ├── audio_story_panel4_0.mp3
│   │   │   ├── audio_story_panel5_0.mp3
│   │   │   ├── audio_story_panel6_0.mp3
│   │   │   ├── audio_station_a_instruction_0.mp3
│   │   │   ├── audio_station_b_instruction_0.mp3
│   │   │   ├── audio_station_c_instruction_0.mp3
│   │   │   ├── audio_correct_0.mp3
│   │   │   ├── audio_reflect_prompt_0.mp3
│   │   │   └── ... (all phase phrases pre-generated)
│   │   └── images/
│   │       ├── mascot-idle.svg
│   │       ├── mascot-happy.svg
│   │       ├── mascot-thinking.svg
│   │       ├── mascot-celebrate.svg
│   │       └── world-map-bg.svg
├── src/
│   ├── main.jsx                          # React entry point
│   ├── App.jsx                           # Root component, global state (useReducer)
│   ├── App.css                           # Global styles (mirrors equal-tau CSS)
│   ├── components/
│   │   ├── IntroScreen.jsx               # Welcome + lesson overview + phase dot tracker
│   │   ├── ProgressMap.jsx               # 6-phase dot tracker (top bar)
│   │   ├── phases/
│   │   │   ├── WonderPhase.jsx           # Phase 1: Hook animation + ElevenLabs narration
│   │   │   ├── StoryPhase.jsx            # Phase 2: Illustrated narrative panels
│   │   │   ├── SimulatePhase.jsx         # Phase 3: Simulation station wrapper
│   │   │   ├── PlayPhase.jsx             # Phase 4: IntelliPlay™ quiz engine
│   │   │   └── ReflectPhase.jsx          # Phase 5: Journal + completion badge
│   │   ├── simulations/
│   │   │   ├── ArrayYardStation.jsx      # Station A: Equal-row array builder (2 numbers)
│   │   │   ├── VennSortStation.jsx       # Station B: Venn diagram factor sorting
│   │   │   └── MeetingPointStation.jsx   # Station C: Dual number-line multiples
│   │   ├── quiz/
│   │   │   ├── QuestionRenderer.jsx      # Polymorphic dispatcher → type-specific component
│   │   │   ├── ListCommonFactorsQ.jsx    # Q1: List/identify common factors
│   │   │   ├── PickCommonFactorQ.jsx     # Q2: MCQ — pick the common factor
│   │   │   ├── ListCommonMultiplesQ.jsx  # Q3: List/identify common multiples
│   │   │   ├── PickCommonMultipleQ.jsx   # Q4: MCQ — pick the common multiple
│   │   │   ├── GreatestCommonFactorQ.jsx # Q5: Greatest common factor (informal)
│   │   │   ├── SmallestCommonMultipleQ.jsx # Q6: Smallest common multiple (informal)
│   │   │   ├── WordProbGroupingQ.jsx     # Q7: Word problem (grouping sense)
│   │   │   ├── WordProbTimingQ.jsx       # Q8: Word problem (timing/event sense)
│   │   │   ├── TrueFalseCommonQ.jsx      # Q9: True/False common factor statement
│   │   │   ├── VennPlacementQ.jsx        # Q10: Venn diagram placement (pictorial MCQ)
│   │   │   └── HintOverlay.jsx           # Hint 1 & 2 + animated explanation after 3 fails
│   │   ├── gamification/
│   │   │   ├── XPTracker.jsx             # XP bar + floating XP animation
│   │   │   ├── StarRating.jsx            # 1–3 star rating per world
│   │   │   ├── BadgePanel.jsx            # Badge unlock toast + panel
│   │   │   ├── StreakCounter.jsx         # Fire streak counter
│   │   │   └── WorldMap.jsx              # 10-world progress map (horizontal scroll)
│   │   └── shared/
│   │       ├── Mascot.jsx                # LearnFlow robot with mood states
│   │       ├── DualListDiagram.jsx       # Reusable SVG: two factor/multiple lists with bridge
│   │       ├── VennDiagram.jsx           # Reusable SVG: two-circle Venn with draggable tiles
│   │       ├── DualNumberLine.jsx        # Reusable SVG: two tracks with glowing multiples
│   │       ├── ArrayGrid.jsx             # Reusable SVG: rectangular block array
│   │       ├── NumberPad.jsx             # Large tap-friendly digit input (0–9)
│   │       └── FeedbackOverlay.jsx       # Correct/incorrect overlay with animation
│   ├── data/
│   │   ├── questionBank.js               # 100 question objects (all types)
│   │   └── storyContent.js               # Story phase panel data (text + visuals)
│   ├── hooks/
│   │   ├── useAudio.js                   # ElevenLabs + HTML5 Audio playback hook
│   │   ├── useGameState.js               # Gamification state hook
│   │   └── useLocalStorage.js            # Session persistence hook (24hr resume)
│   └── utils/
│       ├── audioMap.js                   # AUTO-GENERATED: text → .mp3 path map
│       ├── shuffle.js                    # Fisher-Yates randomisation
│       ├── mathHelpers.js                # getFactors(), getMultiples(), getCommon()
│       ├── scoring.js                    # XP + star calculation + distractor gen
│       └── badgeEngine.js                # Badge unlock condition logic
├── scripts/
│   ├── generate_audio.js                 # Offline ElevenLabs audio pre-generation
│   ├── reference_audio/                  # Optional: requester-supplied pacing reference
│   └── clean_audio.js                    # Remove orphaned .mp3 files
├── api/
│   └── elevenlabs.js                     # ElevenLabs proxy (if server-side key needed)
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

═══════════════════════════════════════════════════════════════════════════════

## 4. APPLICATION STATE ARCHITECTURE

### 4.1 Global State (`App.jsx` — `useReducer`)

```javascript
const initialState = {
  // Navigation
  phase: 'intro', // 'intro'|'wonder'|'story'|'simulate'|'play'|'reflect'|'results'
  storyPanel: 0,  // 0–5 (6 story panels)
  currentSimStation: 0, // 0=ArrayYard, 1=VennSort, 2=MeetingPoint
  simStationsComplete: [false, false, false],
  simRound: 0,    // Round index within current station (0–3)

  // Play / Challenge phase
  questionSet: [],       // 100 shuffled Question objects
  currentQuestion: 0,    // 0–99
  currentWorld: 0,       // 0–9 (10 worlds)
  worldScores: Array(10).fill(null),
  hintsUsed: 0,
  attemptCount: 0,       // Attempts on current question (max 3)

  // Gamification
  xp: 0,
  totalStars: 0,
  streak: 0,
  maxStreak: 0,
  badges: [],            // Array of unlocked badge IDs
  vennSortPerfect: false,
  meetingPointFound: 0,

  // Session metadata
  phaseComplete: {
    wonder: false, story: false, simulate: false,
    play: false, reflect: false,
  },
  sessionId: crypto.randomUUID(),

  // Settings
  audioEnabled: true,   // ElevenLabs narration on/off
  musicEnabled: false,  // Background ambient music (off by default)
};
```

### 4.2 Reducer Action Types

```javascript
const ACTIONS = {
  SET_PHASE: 'SET_PHASE',
  NEXT_STORY_PANEL: 'NEXT_STORY_PANEL',
  ADVANCE_SIM_STATION: 'ADVANCE_SIM_STATION',
  COMPLETE_SIM_STATION: 'COMPLETE_SIM_STATION',
  NEXT_SIM_ROUND: 'NEXT_SIM_ROUND',
  LOAD_QUESTIONS: 'LOAD_QUESTIONS',
  ANSWER_CORRECT: 'ANSWER_CORRECT',
  ANSWER_INCORRECT: 'ANSWER_INCORRECT',
  USE_HINT: 'USE_HINT',
  NEXT_QUESTION: 'NEXT_QUESTION',
  UNLOCK_BADGE: 'UNLOCK_BADGE',
  COMPLETE_PHASE: 'COMPLETE_PHASE',
  TOGGLE_AUDIO: 'TOGGLE_AUDIO',
  TOGGLE_MUSIC: 'TOGGLE_MUSIC',
  RESTORE_SESSION: 'RESTORE_SESSION',
  RESET_SESSION: 'RESET_SESSION',
};
```

### 4.3 Key Reducer Logic

```javascript
// ANSWER_CORRECT dispatch
case ACTIONS.ANSWER_CORRECT: {
  const xpEarned = calcXP(state.attemptCount + 1, state.hintsUsed, state.streak);
  const newStreak = state.streak + 1;
  const worldIndex = Math.floor(state.currentQuestion / 10);
  const newWorldScore = (state.worldScores[worldIndex] || 0) + 1;
  const updatedWorldScores = [...state.worldScores];
  updatedWorldScores[worldIndex] = newWorldScore;

  return {
    ...state,
    xp: state.xp + xpEarned,
    streak: newStreak,
    maxStreak: Math.max(state.maxStreak, newStreak),
    worldScores: updatedWorldScores,
    totalStars: calcTotalStars(updatedWorldScores),
    hintsUsed: 0,
    attemptCount: 0,
  };
}

// ANSWER_INCORRECT dispatch
case ACTIONS.ANSWER_INCORRECT: {
  return {
    ...state,
    streak: 0,
    attemptCount: state.attemptCount + 1,
  };
}
```

═══════════════════════════════════════════════════════════════════════════════

## 5. QUESTION DATA MODEL

### 5.1 Question Schema

```typescript
interface Question {
  id: string;              // e.g. "Q1_003", "Q7_008"
  type: QuestionType;       // One of 10 enum values (see below)
  world: number;            // 0–9 (which world this belongs to)
  difficulty: 1 | 2 | 3;    // 1=easy(1–20), 2=medium(1–50), 3=hard(1–100)

  // Core math values
  numberA: number;
  numberB: number;
  factorsA: number[];
  factorsB: number[];
  commonFactors: number[];
  multiplesA: number[];       // first N multiples generated for display
  multiplesB: number[];
  commonMultiples: number[];  // first shared multiples within display range

  // Rendering
  questionText: string;    // Full narrated question text (ElevenLabs reads this)
  visual: VisualType;      // 'dualList' | 'venn' | 'numberLine' | 'trueFalse'

  // MCQ
  options?: (number | string)[]; // 4 MCQ options (always includes correctAnswer)

  // Hints
  hint1: string;   // Shown after 1 wrong attempt
  hint2: string;   // Shown after 2 wrong attempts (animation trigger)
  explanation: string; // Full text explanation after 3 fails (read aloud)

  // Word problems only
  characterName?: string;
  characterName2?: string;
  objectName?: string;
  contextLabel?: string; // e.g. 'fun fair', 'bake sale', 'bus route'

  // True/False only
  isTrue?: boolean;

  // Answer
  correctAnswer: number | string | number[];
}

type QuestionType =
  | 'list_common_factors'    // Q1
  | 'pick_common_factor'     // Q2
  | 'list_common_multiples'  // Q3
  | 'pick_common_multiple'   // Q4
  | 'greatest_common_factor' // Q5
  | 'smallest_common_multiple' // Q6
  | 'word_problem_grouping'  // Q7
  | 'word_problem_timing'    // Q8
  | 'true_false_common'      // Q9
  | 'venn_placement';        // Q10

type VisualType =
  | 'dualList'    // Two labeled factor/multiple lists with bridge
  | 'venn'        // Two-circle Venn diagram
  | 'numberLine'  // Dual number line with glowing points
  | 'trueFalse';  // Statement + True/False buttons
```

### 5.2 Sample Question Objects

```javascript
// Q1 — List Common Factors
{
  id: "Q1_001",
  type: "list_common_factors",
  world: 0,
  difficulty: 1,
  numberA: 12, numberB: 18,
  factorsA: [1, 2, 3, 4, 6, 12],
  factorsB: [1, 2, 3, 6, 9, 18],
  commonFactors: [1, 2, 3, 6],
  questionText: "Factors of 12 are 1, 2, 3, 4, 6, 12. Factors of 18 are 1, 2, 3, 6, 9, 18. What are the common factors?",
  visual: "dualList",
  hint1: "Look for numbers that appear in BOTH lists.",
  hint2: "Check each number one at a time: is it in list A AND list B?",
  explanation: "The common factors of 12 and 18 are 1, 2, 3, and 6 — they appear in both lists.",
  options: ["1, 2, 3, 6", "1, 2, 4, 6", "2, 3, 6, 9", "1, 3, 6, 9"],
  correctAnswer: "1, 2, 3, 6",
}

// Q7 — Word Problem (Grouping Sense)
{
  id: "Q7_004",
  type: "word_problem_grouping",
  world: 3,
  difficulty: 2,
  numberA: 24, numberB: 36,
  factorsA: [1,2,3,4,6,8,12,24],
  factorsB: [1,2,3,4,6,9,12,18,36],
  commonFactors: [1,2,3,4,6,12],
  questionText: "John has 24 pencils and Mike has 36 pencils. What is the largest group size that splits both amounts evenly?",
  visual: "dualList",
  characterName: "John",
  characterName2: "Mike",
  objectName: "pencils",
  contextLabel: "classroom supplies",
  hint1: "List the factors of 24 and the factors of 36.",
  hint2: "Which common factor is the biggest one?",
  explanation: "The greatest common factor of 24 and 36 is 12 — the largest equal group size for both.",
  options: [6, 8, 12, 18],
  correctAnswer: 12,
}

// Q8 — Word Problem (Timing/Event Sense)
{
  id: "Q8_002",
  type: "word_problem_timing",
  world: 6,
  difficulty: 2,
  numberA: 6, numberB: 8,
  multiplesA: [6,12,18,24,30,36],
  multiplesB: [8,16,24,32,40,48],
  commonMultiples: [24, 48],
  questionText: "A red light blinks every 6 seconds and a blue light blinks every 8 seconds. When do they blink together first?",
  visual: "numberLine",
  contextLabel: "traffic lights",
  hint1: "List the multiples of 6 and the multiples of 8.",
  hint2: "Find the first number that appears in both lists.",
  explanation: "The first common multiple of 6 and 8 is 24 — they blink together every 24 seconds.",
  options: [16, 20, 24, 32],
  correctAnswer: 24,
}

// Q10 — Venn Diagram Placement
{
  id: "Q10_005",
  type: "venn_placement",
  world: 8,
  difficulty: 3,
  numberA: 30, numberB: 45,
  factorsA: [1,2,3,5,6,10,15,30],
  factorsB: [1,3,5,9,15,45],
  commonFactors: [1,3,5,15],
  questionText: "Where does the number 6 belong: Only in Factors of 30, Only in Factors of 45, or Common to both?",
  visual: "venn",
  hint1: "Check if 6 divides 30 evenly, then check if it divides 45 evenly.",
  hint2: "6 divides 30 but does NOT divide 45 — so where does it go?",
  explanation: "6 is a factor of 30 but not of 45, so it belongs only in the 'Factors of 30' zone.",
  options: ["Only Factors of 30", "Only Factors of 45", "Common to both", "Neither"],
  correctAnswer: "Only Factors of 30",
}
```

═══════════════════════════════════════════════════════════════════════════════

## 6. MATH HELPER FUNCTIONS (`utils/mathHelpers.js`)

```javascript
export function getFactors(n) {
  const factors = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) factors.push(i);
  }
  return factors;
}

export function getMultiples(n, count = 8) {
  return Array.from({ length: count }, (_, i) => n * (i + 1));
}

export function getCommonFactors(a, b) {
  const factorsA = getFactors(a);
  const factorsB = new Set(getFactors(b));
  return factorsA.filter(f => factorsB.has(f));
}

export function getCommonMultiples(a, b, count = 3, searchLimit = 500) {
  const multiplesB = new Set();
  for (let m = b; m <= searchLimit; m += b) multiplesB.add(m);
  const results = [];
  for (let m = a; m <= searchLimit && results.length < count; m += a) {
    if (multiplesB.has(m)) results.push(m);
  }
  return results;
}

export function getGreatestCommonFactor(a, b) {
  const common = getCommonFactors(a, b);
  return Math.max(...common);
}

export function getSmallestCommonMultiple(a, b) {
  return getCommonMultiples(a, b, 1)[0];
}
```

═══════════════════════════════════════════════════════════════════════════════

## 7. VISUAL SVG COMPONENTS

### 7.1 `DualListDiagram.jsx` — Two Factor/Multiple Lists with Bridge

```javascript
const DualListDiagram = ({
  labelA, labelB, listA, listB, commonValues = [],
  animated = false, size = 'medium',
}) => {
  // Renders two vertical columns of chips (numbers).
  // Chips whose value is in `commonValues` are rendered in a distinct
  // gold colour and connected by a faint arc/bridge line to their
  // counterpart chip in the other column.
  // Non-common chips render in the column's base colour (blue for A,
  // teal for B).
  // `animated=true` staggers chip entrance with a 100ms delay per chip
  // and pulses the bridge line once both matching chips have appeared.
};
```

### 7.2 `VennDiagram.jsx` — Two-Circle Venn Diagram

```javascript
const VennDiagram = ({
  labelA, labelB, tiles, placements, onDrop, size = 'medium',
}) => {
  // Two overlapping circles rendered via SVG <circle> with reduced
  // opacity fill, positioned so their intersection forms the "Common" zone.
  // `tiles`: array of { value, zone: 'A'|'B'|'common'|'unplaced' }
  // Droppable regions: left-only (circle A), right-only (circle B),
  // and the lens-shaped overlap (common) — hit-testing done via
  // bounding-box + distance-from-center checks against both circle radii.
  // Correct drop → tile locks with `groupCirclePop` animation.
  // Incorrect drop → tile bounces back to tray with `shake` animation.
};
```

### 7.3 `DualNumberLine.jsx` — Two Tracks with Glowing Multiples

```javascript
const DualNumberLine = ({
  numberA, numberB, revealedSteps, foundCommon, onStep, onTapPoint,
}) => {
  // Two horizontal SVG <line> tracks, one above the other.
  // Multiples of A/B plotted as <circle> points at proportional x-offsets.
  // `revealedSteps` controls how many multiples are currently "lit"
  // (opacity + glow filter) per track, driven by a step/play control.
  // When a value exists as a lit point on both tracks, that x-position
  // pulses gold (`pulseGlow` keyframe) and becomes tappable via onTapPoint.
};
```

### 7.4 `ArrayGrid.jsx` — Equal-Row Block Array

```javascript
const ArrayGrid = ({ total, rowSize, valid, animated }) => {
  // Renders `total` unit blocks arranged into rows of `rowSize`.
  // If total % rowSize === 0 → renders a clean rectangle, `valid=true`,
  // green highlight border.
  // If not divisible → last row renders partial + leftover blocks
  // rendered separately with a "wobble" class and amber highlight.
};
```

Animation variants (shared across all diagram components):

- `animated=true` → CSS `dotCountUp` keyframe: chips/blocks appear
  one-by-one with 80–100ms delay per element
- `shake` variant → CSS `shake` keyframe applied to wrapper on wrong answer
- `bounceIn` variant → CSS `bounceIn` keyframe applied to wrapper on
  correct answer
- `pulseGlow` variant → applied to any newly-discovered common value

═══════════════════════════════════════════════════════════════════════════════

## 8. SIMULATION STATION COMPONENT SPECS

### 8.1 `ArrayYardStation.jsx` — Station A (Concrete)

**State:**
```javascript
const [pairConfig, setPairConfig] = useState(getStationARound(state.simRound));
// pairConfig: { numberA: 12, numberB: 18 }
const [selectedRowSize, setSelectedRowSize] = useState(null);
const [discoveredCommonFactors, setDiscoveredCommonFactors] = useState([]);
```

**Interaction:**
- Student selects a candidate row size (2–12) from a horizontal chip selector
- Both `ArrayGrid` components re-render with that `rowSize`
- If both grids resolve `valid=true` simultaneously, the row size is
  appended to `discoveredCommonFactors` and a "Common Factor Found!" toast fires
- Round completes once all true common factors (excluding 1, which is
  pre-filled as a freebie) have been discovered at least once

**Completion Check:**
```javascript
const targetFactors = getCommonFactors(pairConfig.numberA, pairConfig.numberB).filter(f => f !== 1);
const isRoundComplete = targetFactors.every(f => discoveredCommonFactors.includes(f));
```

**Station A Rounds (4 rounds, randomised order):**
```javascript
{ numberA: 8,  numberB: 12 } // common factors: 1, 2, 4
{ numberA: 12, numberB: 18 } // common factors: 1, 2, 3, 6
{ numberA: 15, numberB: 20 } // common factors: 1, 5
{ numberA: 24, numberB: 36 } // common factors: 1, 2, 3, 4, 6, 12
```

### 8.2 `VennSortStation.jsx` — Station B (Pictorial)

**State:**
```javascript
const [pairConfig, setPairConfig] = useState(getStationBRound(round));
const [tray, setTray] = useState(buildTileTray(pairConfig)); // includes 1-2 distractors
const [placements, setPlacements] = useState({}); // { [value]: 'A'|'B'|'common'|'unplaced' }
const [submitted, setSubmitted] = useState(false);
```

**Tile Tray Generation (`buildTileTray`):**
- Includes all factors of A, all factors of B (deduplicated), plus 1–2
  numbers that are factors of neither (distractors)
- Correct zone for each tile precomputed via `getFactors` membership checks

**Interaction:**
- Drag-and-drop (or tap-select + tap-zone fallback) places tiles into
  Venn zones
- "Check my sorting" submits; correct tiles lock with `groupCirclePop`,
  incorrect ones return to tray with `shake`
- Round-perfect tracking (`stationBPerfect`) set true if a round is
  completed with zero incorrect submissions — feeds the "Venn Master" badge

**Rounds (3 rounds per station):**
```javascript
Round 1: { numberA: 8,  numberB: 12 }  // fewer tiles
Round 2: { numberA: 18, numberB: 24 }  // more tiles, 1 distractor
Round 3: { numberA: 30, numberB: 45 }  // most tiles, 2 distractors
```

### 8.3 `MeetingPointStation.jsx` — Station C (Abstract)

**State:**
```javascript
const [pairConfig, setPairConfig] = useState(getStationCRound(round));
const [revealedSteps, setRevealedSteps] = useState({ a: 0, b: 0 });
const [foundCommon, setFoundCommon] = useState([]);
```

**Interaction:**
- "Step" button advances `revealedSteps.a` and `revealedSteps.b` by 1 each,
  revealing the next multiple on each track
- When a value is lit on both tracks, it becomes tappable; tapping it adds
  the value to `foundCommon` and narrates confirmation
- Round completes once the first common multiple (per curriculum scope) is found

**Rounds (rotated across 3 rounds):**
```javascript
Round 1: { numberA: 3, numberB: 4 } // first common multiple: 12
Round 2: { numberA: 4, numberB: 6 } // first common multiple: 12
Round 3: { numberA: 5, numberB: 6 } // first common multiple: 30
```

ElevenLabs reads the full instruction aloud when a station loads:
> "Step through the number lines. Tap the first point where both lights turn on together!"

═══════════════════════════════════════════════════════════════════════════════

## 9. AUDIO PIPELINE (ElevenLabs — Matching Reference Architecture)

### 9.1 Voice Configuration

- **Voice Name:** Alice
- **Voice ID:** `Xb7hH8MSUJpSbSDYk0k2`
- **Model:** `eleven_multilingual_v2`
- **API Key Var:** `VITE_ELEVENLABS_API_KEY` (in `.env.local`)

### 9.2 Speech Style Settings (per style type)

| Style | stability | similarity_boost | style_exaggeration |
|---|---|---|---|
| statement | 0.75 | 0.75 | 0.0 |
| instruction | 0.80 | 0.75 | 0.0 |
| question | 0.60 | 0.80 | 0.3 |
| encouragement | 0.55 | 0.85 | 0.6 |
| emphasis | 0.85 | 0.70 | 0.1 |
| thinking | 0.65 | 0.80 | 0.2 |
| celebration | 0.45 | 0.90 | 0.8 |

### 9.3 Offline Pre-generation Script (`scripts/generate_audio.js`)

```javascript
const phrases = [
  // Phase 1 — Wonder
  { text: "John's class has twelve students. Sarah's class has eighteen students.", style: 'thinking' },
  { text: "Both teachers want equal teams of the same size. What sizes work for both?", style: 'question' },
  { text: "Let us find out what common factors really means!", style: 'encouragement' },

  // Phase 2 — Story Panels
  { text: "John and Sarah are planning a school fun fair.", style: 'statement' },
  { text: "John has twelve candles for a craft table. He wants equal rows.", style: 'statement' },
  { text: "The factors of twelve are one, two, three, four, six, and twelve.", style: 'emphasis' },
  { text: "Sarah has eighteen stickers for another table. Same idea, equal rows.", style: 'statement' },
  { text: "The factors of eighteen are one, two, three, six, nine, and eighteen.", style: 'emphasis' },
  { text: "Look! One, two, three, and six appear in both lists. Those are common factors!", style: 'emphasis' },

  // Phase 3 — Simulation Instructions
  { text: "Try grouping the blocks into equal rows. Does that row size work for both yards?", style: 'instruction' },
  { text: "Drag each number into the correct circle. Where does it belong?", style: 'instruction' },
  { text: "Step through the number lines. Tap the first point where both lights turn on together!", style: 'instruction' },

  // Phase 4 — Feedback
  { text: "Yes! That's a common factor! You found something special!", style: 'celebration' },
  { text: "Not quite. Let us list the factors again.", style: 'encouragement' },
  { text: "Look closely. Which number shows up in both lists?", style: 'thinking' },

  // Phase 5 — Reflect
  { text: "What a journey today! Can you find the common factors of eight and twenty?", style: 'thinking' },
  { text: "Lesson complete! You are a Common Ground Champion!", style: 'celebration' },

  // Badge unlocks
  { text: "Badge unlocked! You are a Number Explorer!", style: 'celebration' },
  { text: "Badge unlocked! Set Sorter! You completed all three stations!", style: 'celebration' },
  { text: "Badge unlocked! Common Ground Champion! You scored over eighty percent!", style: 'celebration' },
];

// Script hits ElevenLabs API for each phrase, saves to public/assets/audio/
// Auto-generates src/utils/audioMap.js mapping text → .mp3 path
```

### 9.4 Frontend Audio Engine (`src/hooks/useAudio.js`)

```javascript
// Step 1: Check audioMap for pre-generated static asset
// Step 2: If not found + API key present → fetch from ElevenLabs dynamically
// Step 3: Cache dynamic result in elevenLabsCache (in-memory Map)
// Step 4: Play via HTML5 Audio API (new Audio(url))
// Step 5: While segment i plays → preload segment i+1 (eager preload)

const elevenLabsCache = new Map(); // In-memory; cleared on page refresh

export async function getAudioUrl(text, style = 'statement', apiKey) {
  // 1. Static map check (fastest path)
  if (audioMap[text]) return audioMap[text];

  // 2. Memory cache check
  const cacheKey = `${text}::${style}`;
  if (elevenLabsCache.has(cacheKey)) return elevenLabsCache.get(cacheKey);

  // 3. Dynamic generation (requires API key)
  if (!apiKey) return null; // Silent skip — no fallback
  const styleSettings = STYLE_SETTINGS[style] ?? STYLE_SETTINGS.statement;

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/Xb7hH8MSUJpSbSDYk0k2`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: styleSettings,
      }),
    }
  );

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  elevenLabsCache.set(cacheKey, url);
  return url;
}

export async function narrate(segments, apiKey, onSegmentStart) {
  for (let i = 0; i < segments.length; i++) {
    const { text, style } = segments[i];
    const url = await getAudioUrl(text, style, apiKey);
    if (!url) continue; // Silent skip if no audio available

    // Eager preload next segment
    if (i + 1 < segments.length) {
      getAudioUrl(segments[i + 1].text, segments[i + 1].style, apiKey);
    }

    if (onSegmentStart) onSegmentStart(i);
    await playAudio(url); // Resolves on 'ended' event
  }
}

async function playAudio(url) {
  return new Promise((resolve) => {
    const audio = new Audio(url);
    audio.onended = resolve;
    audio.onerror = resolve; // Silent fail — never block UX
    audio.play().catch(resolve);
  });
}
```

### 9.5 Audio Cleanup (`scripts/clean_audio.js`)

- Imports `audioMap.js` to determine all valid referenced `.mp3` paths
- Scans `public/assets/audio/` for all `.mp3` files
- Deletes any `.mp3` not present in `audioMap` (orphaned files)
- Run after any phrase deletion or text edit in `generate_audio.js`

### 9.6 Narration Synchronisation Rules (1:1 Parity)

**CRITICAL:** Every on-screen text string that is narrated must match
`narration.js` **EXACTLY** (same words, same punctuation, same capitalisation).

Any UI text change requires:
1. Update `generate_audio.js` phrases array
2. Re-run: `node scripts/generate_audio.js`
3. Update corresponding text in the React UI component
4. Optionally run: `node scripts/clean_audio.js`

═══════════════════════════════════════════════════════════════════════════════

## 10. RANDOMISATION ENGINE

### 10.1 Fisher-Yates Shuffle (`utils/shuffle.js`)

```javascript
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateSessionQuestions(bank) {
  const byType = {};
  bank.forEach(q => {
    if (!byType[q.type]) byType[q.type] = [];
    byType[q.type].push(q);
  });

  // Pick 10 from each type (shuffled), then shuffle the combined 100
  const selected = Object.values(byType)
    .flatMap(qs => shuffleArray(qs).slice(0, 10));

  return shuffleArray(selected);
}
```

### 10.2 MCQ Distractor Generation (`utils/scoring.js`)

```javascript
export function generateDistractors(correct, min = 1, max = 100, count = 3) {
  const distractors = new Set();
  // Strategy: near-miss factors/multiples — offsets of ±1, ±2, ±3, or
  // plausible "looks like a factor but isn't" values
  const offsets = [-3, -2, -1, 1, 2, 3];

  shuffleArray(offsets).forEach(offset => {
    const d = correct + offset;
    if (d >= min && d <= max && d !== correct && distractors.size < count)
      distractors.add(d);
  });

  // Ensure always 4 options
  while (distractors.size < count) {
    const d = correct + (distractors.size + 1);
    if (d <= max && d !== correct) distractors.add(d);
  }

  return shuffleArray([correct, ...distractors]);
}
```

### 10.3 Session Persistence (24-hour resume)

```javascript
const SESSION_KEY = 'intellia_common_factors_multiples_v1';

// On app mount: restore if within 24 hours
const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
if (saved && Date.now() - saved.timestamp < 86400000) {
  dispatch({ type: ACTIONS.RESTORE_SESSION, payload: saved });
}

// On every state change: persist progress
useEffect(() => {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    phase: state.phase,
    storyPanel: state.storyPanel,
    simStationsComplete: state.simStationsComplete,
    currentQuestion: state.currentQuestion,
    xp: state.xp,
    streak: state.streak,
    maxStreak: state.maxStreak,
    badges: state.badges,
    worldScores: state.worldScores,
    phaseComplete: state.phaseComplete,
    timestamp: Date.now(),
  }));
}, [state]);
```

═══════════════════════════════════════════════════════════════════════════════

## 11. GAMIFICATION IMPLEMENTATION

### 11.1 XP Calculation (`utils/scoring.js`)

```javascript
export function calcXP(attemptNumber, hintsUsed, streak) {
  const base = attemptNumber === 1 ? 10 : hintsUsed > 0 ? 5 : 7;
  const streakBonus = streak >= 5 ? 5 : 0;
  return base + streakBonus;
}
```

### 11.2 Star Rating (per world of 10 questions)

```javascript
export function calcStars(correct, total = 10) {
  if (correct >= 9) return 3; // Gold: ≥90%
  if (correct >= 7) return 2; // Silver: ≥70%
  if (correct >= 5) return 1; // Bronze: ≥50% (world unlock gate)
  return 0; // Try again
}

export function canUnlockWorld(worldScore) {
  return worldScore !== null && worldScore >= 5;
}

export function calcTotalStars(worldScores) {
  return worldScores.reduce((sum, ws) => sum + (ws !== null ? calcStars(ws) : 0), 0);
}
```

### 11.3 Badge Engine (`utils/badgeEngine.js`)

```javascript
export const BADGES = [
  {
    id: 'number_explorer',
    label: '🏅 Number Explorer',
    description: 'Complete Wonder and Story phases',
    condition: (s) => s.phaseComplete.wonder && s.phaseComplete.story,
  },
  {
    id: 'set_sorter',
    label: '🥈 Set Sorter',
    description: 'Complete all 3 Simulation stations',
    condition: (s) => s.simStationsComplete.every(Boolean),
  },
  {
    id: 'common_ground_champion',
    label: '🥇 Common Ground Champion',
    description: 'Score 80%+ in Play phase',
    condition: (s) => {
      const totalCorrect = s.worldScores.reduce((sum, ws) => sum + (ws || 0), 0);
      return totalCorrect >= 80;
    },
  },
  {
    id: 'perfect_pair',
    label: '💎 Perfect Pair',
    description: 'Score 10/10 in any world',
    condition: (s) => s.worldScores.some(ws => ws === 10),
  },
  {
    id: 'streak_star',
    label: '🔥 Streak Star',
    description: 'Achieve a streak of 10 consecutive correct answers',
    condition: (s) => s.maxStreak >= 10,
  },
  {
    id: 'full_journey',
    label: '🌟 Full Journey',
    description: 'Complete all 6 phases',
    condition: (s) => Object.values(s.phaseComplete).every(Boolean),
  },
  {
    id: 'venn_master',
    label: '🎯 Venn Master',
    description: 'Complete a Station B round with zero mistakes',
    condition: (s) => s.vennSortPerfect === true,
  },
  {
    id: 'meeting_point_pro',
    label: '⏱️ Meeting Point Pro',
    description: 'Find 5 common multiples correctly in Station C',
    condition: (s) => (s.meetingPointFound || 0) >= 5,
  },
];

export function checkBadges(state) {
  return BADGES
    .filter(b => !state.badges.includes(b.id) && b.condition(state))
    .map(b => b.id);
}

// Call after every state update that could unlock a badge:
const newBadges = checkBadges(newState);
if (newBadges.length > 0) {
  dispatch({ type: ACTIONS.UNLOCK_BADGE, payload: newBadges });
  newBadges.forEach(id => {
    const badge = BADGES.find(b => b.id === id);
    narrate([{ text: badge.description, style: 'celebration' }], apiKey);
  });
}
```

═══════════════════════════════════════════════════════════════════════════════

## 12. CSS ANIMATION KEYFRAMES (matching equal-tau.vercel.app style)

```css
@keyframes bounceIn {
  0%   { transform: scale(0.3); opacity: 0; }
  50%  { transform: scale(1.05); opacity: 1; }
  70%  { transform: scale(0.9); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%      { transform: translateX(-8px); }
  40%      { transform: translateX(8px); }
  60%      { transform: translateX(-6px); }
  80%      { transform: translateX(6px); }
}

@keyframes floatUp {
  0%   { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-60px) scale(1.5); opacity: 0; }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(74, 144, 217, 0.4); }
  50%      { box-shadow: 0 0 0 12px rgba(74, 144, 217, 0); }
}

@keyframes celebrate {
  0%   { transform: rotate(-5deg) scale(1); }
  25%  { transform: rotate(5deg) scale(1.1); }
  50%  { transform: rotate(-3deg) scale(1.05); }
  75%  { transform: rotate(3deg) scale(1.1); }
  100% { transform: rotate(0deg) scale(1); }
}

@keyframes slideInUp {
  from { transform: translateY(30px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

@keyframes dotCountUp {
  /* Applied to each chip/dot/block with staggered delay */
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

@keyframes groupCirclePop {
  0%   { transform: scale(0.5); opacity: 0; }
  60%  { transform: scale(1.08); }
  100% { transform: scale(1); opacity: 1; }
}

/* Stagger: each chip/block/tile gets animation-delay: (index * 120ms) */
```

═══════════════════════════════════════════════════════════════════════════════

## 13. COMPONENT PROP CONTRACTS

| Component | Props | Returns |
|---|---|---|
| `DualListDiagram` | `{ labelA, labelB, listA, listB, commonValues?, animated?, size? }` | SVG element (inline, responsive) |
| `VennDiagram` | `{ labelA, labelB, tiles, placements, onDrop, size? }` | SVG + droppable zone overlay |
| `DualNumberLine` | `{ numberA, numberB, revealedSteps, foundCommon, onStep, onTapPoint }` | SVG element (inline, responsive) |
| `ArrayGrid` | `{ total, rowSize, valid, animated }` | SVG element (inline, responsive) |
| `NumberPad` | `{ max, value, onChange, onSubmit }` | Grid of digit buttons (min 44×44px), backspace, submit |
| `Mascot` | `{ mood: 'idle'\|'happy'\|'thinking'\|'celebrating'\|'encouraging' }` | img/svg + CSS animation class mapped to mood |
| `QuestionRenderer` | `{ question: Question, onAnswer: (answer) => void, hints: number }` | Type-specific question component |
| `FeedbackOverlay` | `{ isCorrect: boolean, explanation?: string, xpEarned: number, onContinue: () => void }` | Animated modal overlay (bounceIn correct / shake wrong) |
| `WorldMap` | `{ worldScores: (number\|null)[], currentWorld: number, onSelectWorld: (i) => void }` | Horizontal scrollable world list with star ratings and lock icons |
| `BadgePanel` | `{ badges: string[], newBadgeId?: string }` | Badge grid with unlock toast animation for `newBadgeId` |

═══════════════════════════════════════════════════════════════════════════════

## 14. PERFORMANCE REQUIREMENTS

| Metric | Target |
|---|---|
| Initial load time | < 2 seconds (Vite production build) |
| Time to first meaningful paint | < 1 second |
| SVG animation frame rate | 60 fps |
| Memory usage | < 60 MB |
| Bundle size (gzipped) | < 600 KB |
| Lighthouse Performance score | ≥ 90 |
| Lighthouse Accessibility score | ≥ 90 |
| ElevenLabs pre-gen audio TTFB | 0ms (static .mp3 assets) |
| ElevenLabs dynamic audio TTFB | < 2 seconds (API latency) |

═══════════════════════════════════════════════════════════════════════════════

## 15. BROWSER & DEVICE SUPPORT

| Environment | Support Level |
|---|---|
| Chrome 110+ (desktop) | Full |
| Safari 15+ (iPad) | Full — primary classroom device |
| Firefox 110+ | Full |
| Edge 110+ | Full |
| Android Chrome | Full |
| iOS Safari 15+ | Full |
| IE 11 | Not supported |

Primary test device: iPad (768px, touch) — classroom use context.
Secondary: Desktop Chrome (1280px+).

═══════════════════════════════════════════════════════════════════════════════

## 16. QA / TESTING REQUIREMENTS

- **Math correctness:** Unit tests on `mathHelpers.js` covering
  `getFactors`, `getMultiples`, `getCommonFactors`, `getCommonMultiples`,
  `getGreatestCommonFactor`, `getSmallestCommonMultiple` against known
  fixtures (e.g. 12&18 → common factors [1,2,3,6]; 4&6 → first common
  multiple 12)
- **Randomisation coverage:** Verify all 100 questions surface across
  repeated `generateSessionQuestions` runs with no type ever below 10
  per session
- **Simulation completion logic:** Automated interaction tests confirming
  each station's completion gate fires only when curriculum-correct
  common factors/multiples are found, not on partial/incorrect discovery
- **Audio parity check:** Lint step comparing all narrated UI strings
  against `narration.js`/`audioMap.js` keys to catch drift
- **Accessibility audit:** Automated Lighthouse + manual keyboard-only
  pass through all 6 phases and all 3 simulation stations
- **Cross-device manual QA:** iPad Safari, Desktop Chrome, Android Chrome
  smoke test of full learner journey end-to-end

═══════════════════════════════════════════════════════════════════════════════

**Document Version:** 1.0 | July 2026
**Product:** Intellia — Grade 4 Math, Lesson 5.3
**Lesson Title:** Common Factors and Common Multiples
**Reference UI:** https://equal-tau.vercel.app/
**Reference Repo:** https://github.com/dsamyak/equal
**Audio Pipeline:** ElevenLabs (Alice, `Xb7hH8MSUJpSbSDYk0k2`, `eleven_multilingual_v2`)
