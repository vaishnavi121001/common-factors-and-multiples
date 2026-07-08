# Implementation Plan: Common Factors & Common Multiples

## Goal Description
Based on the provided TRD and PRD, this plan details the execution required to complete the "Common Ground" (Lesson 5.3) interactive math module. The foundation, state management (`useGameState`), basic navigation, utility logic, and Intro screen have already been built. This plan focuses on implementing the remaining interactive learning phases, specifically the visual simulations and the IntelliPlay gamified quiz engine.

## User Review Required
> [!IMPORTANT]
> Please review this plan. Upon your approval, I will begin building out the interactive visual components (SVG grids, Venn diagrams, number lines) and the IntelliPlay quiz engine exactly as described.

## Proposed Changes

### Phase 1: Shared Interactive Components (The Visual Foundation)
These core SVG components will be built in `src/components/shared/` so they can be reused across the Story, Simulate, and Quiz phases:
- **`ArrayGrid.jsx`**: An SVG-based block grid that visually builds equal rows based on user input, indicating remainders if a number doesn't divide evenly.
- **`VennDiagram.jsx`**: A two-circle SVG diagram supporting drag-and-drop or tap-to-place logic to sort numbers into Factor A, Factor B, or the intersection (Common Factors).
- **`DualNumberLine.jsx`**: Two parallel horizontal number lines where glowing dots indicate multiples, and overlapping multiples pulse in gold to signify a Common Multiple.
- **`DualListDiagram.jsx`**: A two-column visual representation of lists of numbers where common values are connected with sweeping SVG curves.

### Phase 2: Story Phase Completion
- Finish wiring `StoryPhase.jsx` to display the 6 sequential story panels.
- Integrate the `DualListDiagram` into panels 3 and 4 to visually demonstrate John and Sarah finding their common factors.

### Phase 3: Simulate Phase (The 3 Stations)
The `SimulatePhase.jsx` will be expanded to host three distinct tabbed interactive stations:
1. **Station A (Array Yard)**: Users use the `ArrayGrid` to test row sizes for 12 and 18 to visually discover common factors.
2. **Station B (Venn Sort)**: Users use the `VennDiagram` to drag tiles into the correct set rings to identify the greatest common factor visually.
3. **Station C (Meeting Point)**: Users step through the `DualNumberLine` to find when two lights turn on simultaneously (common multiples).

### Phase 4: Play Phase (IntelliPlay Engine)
Build the complete gamification and quiz wrapper in `PlayPhase.jsx`:
- **`QuestionRenderer.jsx`**: A polymorphic dispatch component that maps the 100 questions from `questionBank.js` to their respective UI components (e.g., `PickCommonFactorQ`, `TrueFalseCommonQ`, `VennPlacementQ`).
- **Gamification HUD**: Implement the `XPTracker` (points/stars), `StreakCounter` (fire icon that resets on mistake), and `BadgePanel` (toast popups).
- **`WorldMap.jsx`**: The horizontal scroll menu containing the 10 progression "worlds".

### Phase 5: Reflect Phase & Badge Unlocks
- Wire `ReflectPhase.jsx` to calculate final XP and show all unlocked badges.
- Finalize the `badgeEngine` checks to award "Number Explorer", "Set Sorter", and "Common Ground Champion" based on session performance.

## Verification Plan

### Automated Verification
- Verify Vite compilation completes without warnings.
- Test `mathHelpers.js` utility functions to ensure common factors and LCM calculations are perfectly accurate to prevent buggy simulations.

### Manual Verification
- Walk through the Story panels to ensure text precisely matches the ElevenLabs narration keys.
- Play test the 3 Simulation Stations to ensure hit-boxes on the Venn diagram work, and Array grids scale correctly.
- Complete 1 "World" in the Play phase to confirm XP correctly calculates and the streak multiplier increments on successive correct answers.
