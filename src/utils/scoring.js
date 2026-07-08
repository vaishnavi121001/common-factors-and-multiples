export function calcXP(attemptNumber, hintsUsed, streak) {
  let base = 10;
  if (attemptNumber === 2) base = 7;
  if (attemptNumber >= 3) base = 5;
  
  base -= (hintsUsed * 2);
  if (base < 2) base = 2; // minimum XP

  const streakBonus = streak > 2 ? (streak - 2) * 2 : 0;
  return base + streakBonus;
}

export function generateDistractors(correct, min, max, count) {
  const distractors = new Set();
  while (distractors.size < count) {
    const val = Math.floor(Math.random() * (max - min + 1)) + min;
    if (val !== correct) {
      distractors.add(val);
    }
  }
  return Array.from(distractors);
}

export function calcStars(correctCount, total = 10) {
  const pct = correctCount / total;
  if (pct >= 0.9) return 3;
  if (pct >= 0.7) return 2;
  if (pct >= 0.5) return 1;
  return 0;
}

export function canUnlockWorld(worldScore) {
  return worldScore !== null && worldScore >= 1; // At least 1 star to progress
}

export function calcTotalStars(worldScores) {
  return worldScores.reduce((acc, score) => acc + (score || 0), 0);
}
