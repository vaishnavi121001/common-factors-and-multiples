export const BADGES = {
  number_explorer: {
    id: 'number_explorer',
    title: 'Number Explorer',
    description: 'Completed the wonder phase',
    condition: (state) => state.phaseComplete.wonder
  },
  set_sorter: {
    id: 'set_sorter',
    title: 'Set Sorter',
    description: 'Completed all 3 simulation stations',
    condition: (state) => state.simStationsComplete.every(Boolean)
  },
  common_ground_champion: {
    id: 'common_ground_champion',
    title: 'Common Ground Champion',
    description: 'Scored over 80% on the quiz',
    condition: (state) => (state.xp > 80) // simplified condition
  },
  perfect_pair: {
    id: 'perfect_pair',
    title: 'Perfect Pair',
    description: 'Found all common factors without errors',
    condition: (state) => state.perfectPairFlag
  },
  streak_star: {
    id: 'streak_star',
    title: 'Streak Star',
    description: 'Got a streak of 5 correct answers',
    condition: (state) => state.maxStreak >= 5
  },
  full_journey: {
    id: 'full_journey',
    title: 'Full Journey',
    description: 'Completed the entire lesson',
    condition: (state) => state.phaseComplete.reflect
  },
  venn_master: {
    id: 'venn_master',
    title: 'Venn Master',
    description: 'Perfect score on Venn sorting',
    condition: (state) => state.vennSortPerfect
  },
  meeting_point_pro: {
    id: 'meeting_point_pro',
    title: 'Meeting Point Pro',
    description: 'Found 3 common multiples quickly',
    condition: (state) => state.meetingPointFound >= 3
  }
};

export function checkBadges(state) {
  const newlyUnlocked = [];
  Object.values(BADGES).forEach(badge => {
    if (!state.badges.includes(badge.id) && badge.condition(state)) {
      newlyUnlocked.push(badge.id);
    }
  });
  return newlyUnlocked;
}
