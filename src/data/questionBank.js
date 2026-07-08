// =====================================================
// EASY LEVEL (Questions 1–15)
// =====================================================

export const easyQuestions = [

  {
    id: "easy_1",
    type: "mcq",
    difficulty: "easy",

    questionText: "Which is a common factor of 12 and 18?",

    numberA: 12,
    numberB: 18,

    factorsA: [1, 2, 3, 4, 6, 12],
    factorsB: [1, 2, 3, 6, 9, 18],
    commonFactors: [1, 2, 3, 6],

    options: ["2", "4", "9", "12"],

    correctAnswer: "2",

    hint1: "List the factors of both numbers.",
    hint2: "Look for numbers appearing in both lists.",
    explanation: "2 divides both 12 and 18 exactly."
  },

  {
    id: "easy_2",
    type: "mcq",
    difficulty: "easy",

    questionText: "Which is a common factor of 8 and 20?",

    numberA: 8,
    numberB: 20,

    factorsA: [1, 2, 4, 8],
    factorsB: [1, 2, 4, 5, 10, 20],
    commonFactors: [1, 2, 4],

    options: ["4", "5", "8", "10"],

    correctAnswer: "4",

    hint1: "Write all factors.",
    hint2: "Only numbers in both lists are common factors.",
    explanation: "4 divides both numbers evenly."
  },

  {
    id: "easy_3",
    type: "mcq",
    difficulty: "easy",

    questionText: "Which number is a common factor of 15 and 25?",

    numberA: 15,
    numberB: 25,

    factorsA: [1, 3, 5, 15],
    factorsB: [1, 5, 25],
    commonFactors: [1, 5],

    options: ["3", "5", "15", "25"],

    correctAnswer: "5",

    hint1: "Think about equal groups.",
    hint2: "Find numbers common in both factor lists.",
    explanation: "5 divides both 15 and 25."
  },

  {
    id: "easy_4",
    type: "mcq",
    difficulty: "easy",

    questionText: "Which is a common factor of 10 and 30?",

    numberA: 10,
    numberB: 30,

    factorsA: [1, 2, 5, 10],
    factorsB: [1, 2, 3, 5, 6, 10, 15, 30],
    commonFactors: [1, 2, 5, 10],

    options: ["3", "5", "6", "15"],

    correctAnswer: "5",

    hint1: "Find factors of both numbers.",
    hint2: "Compare both lists.",
    explanation: "5 divides both numbers."
  },

  {
    id: "easy_5",
    type: "mcq",
    difficulty: "easy",

    questionText: "Which is a common factor of 14 and 28?",

    numberA: 14,
    numberB: 28,

    factorsA: [1, 2, 7, 14],
    factorsB: [1, 2, 4, 7, 14, 28],
    commonFactors: [1, 2, 7, 14],

    options: ["4", "7", "28", "8"],

    correctAnswer: "7",

    hint1: "Find all factors.",
    hint2: "Choose a number in both lists.",
    explanation: "7 is a common factor."
  },

  {
    id: "easy_6",
    type: "true_false_common",
    difficulty: "easy",

    questionText: "2 is a common factor of 12 and 18.",

    options: ["True", "False"],

    correctAnswer: "True",

    hint1: "Can both numbers be divided by 2?",
    hint2: "12÷2 and 18÷2 leave no remainder.",
    explanation: "Both divide exactly by 2."
  },

  {
    id: "easy_7",
    type: "true_false_common",
    difficulty: "easy",

    questionText: "5 is a common factor of 12 and 18.",

    options: ["True", "False"],

    correctAnswer: "False",

    hint1: "Can 12 be divided by 5 exactly?",
    hint2: "12 leaves a remainder.",
    explanation: "5 is not a factor of 12."
  },

  {
    id: "easy_8",
    type: "true_false_common",
    difficulty: "easy",

    questionText: "4 is a common factor of 8 and 20.",

    options: ["True", "False"],

    correctAnswer: "True",

    hint1: "Check both divisions.",
    hint2: "Both divide by 4 exactly.",
    explanation: "4 is a common factor."
  },

  {
    id: "easy_9",
    type: "true_false_common",
    difficulty: "easy",

    questionText: "6 is a common factor of 18 and 24.",

    options: ["True", "False"],

    correctAnswer: "True",

    hint1: "Try dividing both numbers.",
    hint2: "18÷6 and 24÷6 are whole numbers.",
    explanation: "6 divides both numbers."
  },

  {
    id: "easy_10",
    type: "true_false_common",
    difficulty: "easy",

    questionText: "8 is a common factor of 16 and 24.",

    options: ["True", "False"],

    correctAnswer: "True",

    hint1: "Divide both numbers by 8.",
    hint2: "16÷8=2 and 24÷8=3.",
    explanation: "8 is common."
  },

  {
    id: "easy_11",
    type: "mcq",
    difficulty: "easy",

    questionText: "Which is a factor of BOTH 9 and 27?",

    numberA: 9,
    numberB: 27,

    factorsA: [1, 3, 9],
    factorsB: [1, 3, 9, 27],
    commonFactors: [1, 3, 9],

    options: ["2", "3", "6", "18"],

    correctAnswer: "3",

    hint1: "Write factors.",
    hint2: "Compare the lists.",
    explanation: "3 divides both."
  },

  {
    id: "easy_12",
    type: "mcq",
    difficulty: "easy",

    questionText: "Which number is a common factor of 16 and 32?",

    numberA: 16,
    numberB: 32,

    factorsA: [1, 2, 4, 8, 16],
    factorsB: [1, 2, 4, 8, 16, 32],
    commonFactors: [1, 2, 4, 8, 16],

    options: ["6", "8", "12", "24"],

    correctAnswer: "8",

    hint1: "Find factors.",
    hint2: "Look at both lists.",
    explanation: "8 divides both."
  },

  {
    id: "easy_13",
    type: "mcq",
    difficulty: "easy",

    questionText: "Which number is a common factor of 21 and 28?",

    numberA: 21,
    numberB: 28,

    factorsA: [1, 3, 7, 21],
    factorsB: [1, 2, 4, 7, 14, 28],
    commonFactors: [1, 7],

    options: ["2", "4", "7", "14"],

    correctAnswer: "7",

    hint1: "Find common factors.",
    hint2: "Only one option divides both.",
    explanation: "7 divides both."
  },

  {
    id: "easy_14",
    type: "mcq",
    difficulty: "easy",

    questionText: "Which is a common factor of 24 and 36?",

    numberA: 24,
    numberB: 36,

    factorsA: [1, 2, 3, 4, 6, 8, 12, 24],
    factorsB: [1, 2, 3, 4, 6, 9, 12, 18, 36],
    commonFactors: [1, 2, 3, 4, 6, 12],

    options: ["8", "9", "12", "18"],

    correctAnswer: "12",

    hint1: "List the factors.",
    hint2: "Compare both lists.",
    explanation: "12 divides both."
  },

  {
    id: "easy_15",
    type: "mcq",
    difficulty: "easy",

    questionText: "Which is a common factor of 18 and 30?",

    numberA: 18,
    numberB: 30,

    factorsA: [1, 2, 3, 6, 9, 18],
    factorsB: [1, 2, 3, 5, 6, 10, 15, 30],
    commonFactors: [1, 2, 3, 6],

    options: ["5", "6", "9", "15"],

    correctAnswer: "6",

    hint1: "Find factors.",
    hint2: "Look for numbers in both lists.",
    explanation: "6 divides both numbers."
  },


  // =====================================================
  // MEDIUM LEVEL (Questions 16–30)
  // =====================================================

  {
    id: "medium_16",
    type: "mcq",
    difficulty: "medium",

    questionText: "Which is the smallest common multiple of 3 and 4?",

    options: ["6", "8", "12", "24"],

    correctAnswer: "12",

    hint1: "Write the first few multiples of both numbers.",
    hint2: "Find the first number that appears in both lists.",
    explanation: "12 is the first common multiple of both 3 and 4."
  },

  {
    id: "medium_17",
    type: "mcq",
    difficulty: "medium",

    questionText: "Which is the smallest common multiple of 5 and 6?",

    options: ["20", "25", "30", "60"],

    correctAnswer: "30",

    hint1: "List multiples of 5.",
    hint2: "Compare with multiples of 6.",
    explanation: "30 is the first common multiple."
  },

  {
    id: "medium_18",
    type: "mcq",
    difficulty: "medium",

    questionText: "Which is a common multiple of 4 and 6?",

    options: ["8", "12", "16", "18"],

    correctAnswer: "12",

    hint1: "Find multiples of 4.",
    hint2: "Check which also appears in multiples of 6.",
    explanation: "12 is a common multiple."
  },

  {
    id: "medium_19",
    type: "mcq",
    difficulty: "medium",

    questionText: "Which is a common multiple of 8 and 12?",

    options: ["16", "20", "24", "32"],

    correctAnswer: "24",

    hint1: "List multiples.",
    hint2: "Find the first common value.",
    explanation: "24 is divisible by both 8 and 12."
  },

  {
    id: "medium_20",
    type: "mcq",
    difficulty: "medium",

    questionText: "Which is the least common multiple of 2 and 7?",

    options: ["7", "10", "12", "14"],

    correctAnswer: "14",

    hint1: "Think of multiples of 7.",
    hint2: "Which one is also divisible by 2?",
    explanation: "14 is the LCM."
  },

  {
    id: "medium_21",
    type: "mcq",
    difficulty: "medium",

    questionText: "Which number belongs in the COMMON part of the Venn diagram for factors of 12 and 18?",

    options: ["4", "6", "9", "12"],

    correctAnswer: "6",

    hint1: "Does the number divide both?",
    hint2: "Try dividing 12 and 18.",
    explanation: "6 divides both numbers exactly."
  },

  {
    id: "medium_22",
    type: "mcq",
    difficulty: "medium",

    questionText: "Which number belongs ONLY to the factors of 18?",

    options: ["2", "4", "9", "6"],

    correctAnswer: "9",

    hint1: "Check if it divides 12.",
    hint2: "It should divide only 18.",
    explanation: "9 is a factor of 18 but not 12."
  },

  {
    id: "medium_23",
    type: "mcq",
    difficulty: "medium",

    questionText: "Which number belongs ONLY to the factors of 12?",

    options: ["4", "6", "3", "2"],

    correctAnswer: "4",

    hint1: "Check if it divides 18.",
    hint2: "It should divide only 12.",
    explanation: "4 divides 12 but not 18."
  },

  {
    id: "medium_24",
    type: "mcq",
    difficulty: "medium",

    questionText: "Which number is NOT a common factor of 24 and 36?",

    options: ["2", "3", "8", "12"],

    correctAnswer: "8",

    hint1: "Try dividing 36.",
    hint2: "One option leaves a remainder.",
    explanation: "8 is not a factor of 36."
  },

  {
    id: "medium_25",
    type: "mcq",
    difficulty: "medium",

    questionText: "Which is the least common multiple of 4 and 5?",

    options: ["10", "15", "20", "40"],

    correctAnswer: "20",

    hint1: "Write multiples.",
    hint2: "Choose the smallest common one.",
    explanation: "20 is divisible by both."
  },

  {
    id: "medium_26",
    type: "mcq",
    difficulty: "medium",

    questionText: "Which common multiple comes first for 6 and 8?",

    options: ["12", "18", "24", "48"],

    correctAnswer: "24",

    hint1: "List multiples.",
    hint2: "Find the first common value.",
    explanation: "24 is the LCM."
  },

  {
    id: "medium_27",
    type: "mcq",
    difficulty: "medium",

    questionText: "Which number is a common multiple of 7 and 3?",

    options: ["14", "18", "21", "24"],

    correctAnswer: "21",

    hint1: "List multiples of 7.",
    hint2: "Find one divisible by 3.",
    explanation: "21 is divisible by both."
  },

  {
    id: "medium_28",
    type: "mcq",
    difficulty: "medium",

    questionText: "Which is the least common multiple of 8 and 10?",

    options: ["20", "30", "40", "80"],

    correctAnswer: "40",

    hint1: "List multiples.",
    hint2: "Find the smallest common multiple.",
    explanation: "40 is divisible by both."
  },

  {
    id: "medium_29",
    type: "mcq",
    difficulty: "medium",

    questionText: "Which number is a common multiple of 9 and 6?",

    options: ["18", "27", "30", "36"],

    correctAnswer: "18",

    hint1: "Write multiples of both numbers.",
    hint2: "Look for the first common value.",
    explanation: "18 is divisible by both 9 and 6."
  },

  {
    id: "medium_30",
    type: "mcq",
    difficulty: "medium",

    questionText: "Which number should be placed in the COMMON section for factors of 16 and 24?",

    options: ["3", "6", "8", "12"],

    correctAnswer: "8",

    hint1: "Does it divide both numbers?",
    hint2: "Try dividing 16 and 24.",
    explanation: "8 is a common factor of both numbers."
  },

  // =====================================================
  // HARD LEVEL (Questions 31–40)
  // =====================================================

  {
    id: "hard_31",
    type: "mcq",
    difficulty: "hard",

    questionText: "What is the Greatest Common Factor (GCF) of 18 and 24?",

    options: ["3", "6", "9", "12"],

    correctAnswer: "6",

    hint1: "List all factors of both numbers.",
    hint2: "Choose the greatest common factor.",
    explanation: "The common factors are 1, 2, 3 and 6. The greatest is 6."
  },

  {
    id: "hard_32",
    type: "mcq",
    difficulty: "hard",

    questionText: "Find the Greatest Common Factor (GCF) of 30 and 45.",

    options: ["5", "10", "15", "30"],

    correctAnswer: "15",

    hint1: "Find all common factors.",
    hint2: "Choose the largest one.",
    explanation: "15 is the largest factor common to both numbers."
  },

  {
    id: "hard_33",
    type: "mcq",
    difficulty: "hard",

    questionText: "Find the Greatest Common Factor (GCF) of 20 and 28.",

    options: ["2", "4", "7", "14"],

    correctAnswer: "4",

    hint1: "Write the factors of both numbers.",
    hint2: "Look for the biggest common factor.",
    explanation: "The GCF of 20 and 28 is 4."
  },

  {
    id: "hard_34",
    type: "mcq",
    difficulty: "hard",

    questionText: "What is the Greatest Common Factor (GCF) of 16 and 40?",

    options: ["2", "4", "8", "16"],

    correctAnswer: "8",

    hint1: "Find all common factors.",
    hint2: "Select the greatest one.",
    explanation: "8 is the greatest common factor."
  },

  {
    id: "hard_35",
    type: "mcq",
    difficulty: "hard",

    questionText: "Find the Greatest Common Factor (GCF) of 27 and 36.",

    options: ["3", "6", "9", "12"],

    correctAnswer: "9",

    hint1: "List the factors.",
    hint2: "Choose the greatest common one.",
    explanation: "The GCF is 9."
  },

  {
    id: "hard_36",
    type: "mcq",
    difficulty: "hard",

    questionText: "Find the Least Common Multiple (LCM) of 4 and 6.",

    options: ["10", "12", "18", "24"],

    correctAnswer: "12",

    hint1: "List multiples.",
    hint2: "Find the first common multiple.",
    explanation: "12 is the smallest common multiple."
  },

  {
    id: "hard_37",
    type: "mcq",
    difficulty: "hard",

    questionText: "Find the Least Common Multiple (LCM) of 5 and 7.",

    options: ["25", "30", "35", "70"],

    correctAnswer: "35",

    hint1: "Write multiples of both numbers.",
    hint2: "Choose the smallest common one.",
    explanation: "35 is divisible by both 5 and 7."
  },

  {
    id: "hard_38",
    type: "mcq",
    difficulty: "hard",

    questionText: "Find the Least Common Multiple (LCM) of 6 and 9.",

    options: ["12", "18", "24", "36"],

    correctAnswer: "18",

    hint1: "List multiples of 6 and 9.",
    hint2: "Find the first common multiple.",
    explanation: "18 is the LCM."
  },

  {
    id: "hard_39",
    type: "mcq",
    difficulty: "hard",

    questionText: "Find the Least Common Multiple (LCM) of 8 and 12.",

    options: ["16", "20", "24", "48"],

    correctAnswer: "24",

    hint1: "Compare the multiples of both numbers.",
    hint2: "Select the smallest common multiple.",
    explanation: "24 is the least common multiple."
  },

  {
    id: "hard_40",
    type: "mcq",
    difficulty: "hard",

    questionText: "Find the Least Common Multiple (LCM) of 9 and 12.",

    options: ["18", "24", "36", "48"],

    correctAnswer: "36",

    hint1: "List multiples carefully.",
    hint2: "Choose the first common multiple.",
    explanation: "36 is the least common multiple."
  },

  // =====================================================
  // CHALLENGE LEVEL (Questions 41–50)
  // =====================================================

  {
    id: "challenge_41",
    type: "mcq",
    difficulty: "challenge",

    questionText: "John has 20 balloons and Sarah has 30 balloons. What is the greatest number of equal groups they can make without any balloons left over?",

    options: ["5", "10", "15", "20"],

    correctAnswer: "10",

    hint1: "Think about the greatest common factor.",
    hint2: "Which number divides both 20 and 30 exactly?",
    explanation: "10 is the greatest common factor of 20 and 30."
  },

  {
    id: "challenge_42",
    type: "mcq",
    difficulty: "challenge",

    questionText: "A school has 24 red flags and 36 blue flags. The teacher wants to make identical decoration bundles using all the flags. How many flags should be in each bundle?",

    options: ["4", "6", "12", "18"],

    correctAnswer: "12",

    hint1: "Find the greatest common factor.",
    hint2: "Choose the largest number that divides both 24 and 36.",
    explanation: "12 is the greatest common factor."
  },

  {
    id: "challenge_43",
    type: "mcq",
    difficulty: "challenge",

    questionText: "Bus A arrives every 8 minutes. Bus B arrives every 12 minutes. After how many minutes will they arrive together again?",

    options: ["16", "20", "24", "48"],

    correctAnswer: "24",

    hint1: "Find the least common multiple.",
    hint2: "Write the multiples of 8 and 12.",
    explanation: "24 is the first common multiple."
  },

  {
    id: "challenge_44",
    type: "mcq",
    difficulty: "challenge",

    questionText: "Two fountains start together. One sprays every 6 minutes and the other every 9 minutes. When will they spray together again?",

    options: ["12", "18", "24", "36"],

    correctAnswer: "18",

    hint1: "Think about common multiples.",
    hint2: "Find the first multiple that both share.",
    explanation: "18 is the least common multiple."
  },

  {
    id: "challenge_45",
    type: "mcq",
    difficulty: "challenge",

    questionText: "A treasure chest has 18 gold coins and 30 silver coins. What is the greatest number of equal treasure bags that can be made?",

    options: ["3", "6", "9", "12"],

    correctAnswer: "6",

    hint1: "Find the greatest common factor.",
    hint2: "Both numbers must divide exactly.",
    explanation: "6 is the greatest common factor."
  },

  {
    id: "challenge_46",
    type: "mcq",
    difficulty: "challenge",

    questionText: "A runner completes one lap every 4 minutes. Another runner completes one lap every 10 minutes. After how many minutes will they meet at the starting point?",

    options: ["10", "20", "30", "40"],

    correctAnswer: "20",

    hint1: "Find the least common multiple.",
    hint2: "List the multiples of 4 and 10.",
    explanation: "20 is the first common multiple."
  },

  {
    id: "challenge_47",
    type: "mcq",
    difficulty: "challenge",

    questionText: "There are 16 cupcakes and 24 cookies. They must be packed into identical snack boxes without leftovers. What is the greatest number of boxes that can be made?",

    options: ["4", "6", "8", "12"],

    correctAnswer: "8",

    hint1: "Use the greatest common factor.",
    hint2: "Choose the largest number dividing both 16 and 24.",
    explanation: "8 is the GCF of 16 and 24."
  },

  {
    id: "challenge_48",
    type: "mcq",
    difficulty: "challenge",

    questionText: "The school bell rings every 15 minutes. The music bell rings every 20 minutes. When will they ring together again?",

    options: ["30", "40", "60", "80"],

    correctAnswer: "60",

    hint1: "Find the least common multiple.",
    hint2: "Compare multiples of 15 and 20.",
    explanation: "60 is the least common multiple."
  },

  {
    id: "challenge_49",
    type: "mcq",
    difficulty: "challenge",

    questionText: "Emma has 28 flowers and Liam has 42 flowers. They want to make identical bouquets using all the flowers. How many bouquets can they make?",

    options: ["7", "14", "21", "28"],

    correctAnswer: "14",

    hint1: "Think about the greatest common factor.",
    hint2: "Choose the largest number dividing both 28 and 42.",
    explanation: "14 is the greatest common factor."
  },

  {
    id: "challenge_50",
    type: "mcq",
    difficulty: "challenge",

    questionText: "🎉 Final Challenge! Two carnival rides start together. One starts every 9 minutes and the other every 12 minutes. After how many minutes will they start together again?",

    options: ["18", "24", "36", "48"],

    correctAnswer: "36",

    hint1: "This is a least common multiple problem.",
    hint2: "List the multiples of 9 and 12 until they match.",
    explanation: "36 is the first common multiple of 9 and 12. Congratulations on completing the challenge!"
  }
];
export const questionBank = easyQuestions;