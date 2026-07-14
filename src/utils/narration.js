import {
  say,
  ask,
  think,
  emphasize,
  instruct,
  celebrate
} from "./audio";

export function landingNarration() {
  return [
    celebrate("Welcome to Intellia Journey !"),
    say("Today we're going to explore Common Factors and Common Multiples."),
    emphasize("Let's begin our exciting math adventure!")
  ];
}

/* ---------------- WONDER ---------------- */

export function wonderNarration() {
  return [
    think(
      "Hmm... I wonder how we can arrange these into equal groups."
    ),

    ask(
      "Emma has 12 balloons and Liam has 18 balloons. What group sizes can both of them use without any balloons left over?"
    ),

    emphasize(
      "Let's discover Common Factors and Common Multiples together!"
    )
  ];
}

/* ---------------- STORY ---------------- */

export function getStoryNarrationPanel(index) {
  const narration = [

    // Panel 1
    [
      say(
        "John and Sarah are excited to organize their school fair. As they plan decorations, games, and balloons, they discover that arranging things into equal groups makes planning much easier. "
      ),

      say(
        "Let's join them and learn about Common Factors and Common Multiples!"
      )
    ],

    // Panel 2
    [
      say(
        "John has twelve balloons."
      ),

      emphasize(
        "He can arrange them into two groups, three groups, four groups or six groups without any balloons left."
      ),

      say(
        "These group sizes are called factors because they divide twelve exactly."
      )
    ],

    // Panel 3
    [
      say(
        "Sarah has eighteen balloons."
      ),

      emphasize(
        "She can arrange them into two rows, three rows, six rows or nine rows."
      ),

      say(
        "These are the factors of eighteen."
      )
    ],

    // Panel 4
    [
      emphasize(
        "Now let's compare both factor lists."
      ),

      celebrate(
        "One, Two, Three and Six appear in both lists."
      ),

      say(
        "These shared numbers are called Common Factors because they divide both numbers exactly."
      )
    ],

    // Panel 5
    [
      say(
        "Now let's explore Common Multiples."
      ),

      say(
        "John jumps every four minutes while Sarah jumps every six minutes."
      ),

      emphasize(
        "They meet together after twelve minutes and again after twenty four minutes."
      ),

      say(
        "Those meeting times are called Common Multiples."
      )
    ],

    // Panel 6
    [
      celebrate(
        "Amazing work!"
      ),

      say(
        "You helped John and Sarah organize their school fair successfully."
      ),

      emphasize(
        "Now you're ready to solve Common Factors and Common Multiples like a true math champion."
      )
    ]
  ];

  return narration[index] || [];
}

/* ---------------- SIMULATION ---------------- */

export function stationAIntroNarration() {
  return [
    instruct(
      "Welcome to Array Yard. Choose a row size. If both numbers can be divided equally, you have discovered a Common Factor."
    )
  ];
}

export function commonFactorFoundNarration(factor) {
  return [
    celebrate(
      `Excellent! ${factor} is a Common Factor because it divides both numbers perfectly.`
    )
  ];
}

export function notCommonFactorNarration() {
  return [
    say(
      "Good try. That row size does not divide both numbers equally. Try another one."
    )
  ];
}

export function stationBIntroNarration() {
  return [
    instruct(
      "Welcome to Venn Sort Station. Drag each number into the correct section of the Venn diagram."
    )
  ];
}

export function stationBCorrectNarration() {
  return [
    celebrate(
      "Perfect! You placed it correctly."
    )
  ];
}

export function stationBWrongNarration() {
  return [
    say(
      "Oops! That number belongs somewhere else. Try again."
    )
  ];
}

export function stationCIntroNarration() {
  return [
    instruct(
      "Welcome to Meeting Point Station. Move along the number lines and find where both patterns meet together."
    )
  ];
}

export function commonMultipleFoundNarration(number) {
  return [
    celebrate(
      `Great job! ${number} is a Common Multiple because both patterns meet here together.`
    )
  ];
}

export function notCommonMultipleNarration() {
  return [
    say(
      "Keep searching. They have not met yet."
    )
  ];
}

/* ---------------- PLAY ---------------- */

export function playIntroNarration() {
  return [
    instruct(
      "Welcome to IntelliPlay. Complete all play challenges by answering every challenge correctly."
    )
  ];
}

/* ---------------- REFLECT ---------------- */

export function reflectNarration() {
  return [
    think(
      "Fantastic work today! You learned how to find Common Factors and Common Multiples."
    ),

    ask(
      "Can you think of another pair of numbers that share common factors?"
    )
  ];
}

/* ---------------- COMPLETE ---------------- */

export function completionNarration() {
  return [
    celebrate(
      "Congratulations! You completed the entire Common Factors and Common Multiples adventure."
    ),

    celebrate(
      "You are now officially an IntelliPlay Math Champion!"
    )
  ];
}