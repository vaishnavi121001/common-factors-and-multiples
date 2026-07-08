export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateSessionQuestions(bank) {
  // Assuming bank is an array of 100 questions with property 'type'
  const grouped = {};
  bank.forEach(q => {
    if (!grouped[q.type]) grouped[q.type] = [];
    grouped[q.type].push(q);
  });

  const session = [];
  Object.keys(grouped).forEach(type => {
    const shuffledType = shuffleArray(grouped[type]);
    session.push(shuffledType[0]); // Pick 1 of each type for a small 10-q session, or configure as needed
  });

  return shuffleArray(session);
}
