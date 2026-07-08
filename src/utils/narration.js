import { say, ask, think, emphasize, instruct, cheer, celebrate } from './audio';

export function wonderNarration() {
  return [
    think("John's class has twelve students. Sarah's class has eighteen students."),
    ask("Both teachers want equal teams of the same size. What sizes work for both?"),
    cheer("Let us find out what common factors really means!")
  ];
}

export function getStoryNarrationPanel(panelIndex) {
  const panels = [
    [say("John and Sarah are planning a school fun fair.")],
    [say("John has twelve candles for a craft table. He wants equal rows.")],
    [emphasize("The factors of twelve are one, two, three, four, six, and twelve.")],
    [say("Sarah has eighteen stickers for another table. Same idea, equal rows.")],
    [emphasize("The factors of eighteen are one, two, three, six, nine, and eighteen.")],
    [emphasize("Look! One, two, three, and six appear in both lists. Those are common factors!")]
  ];
  return panels[panelIndex] || [];
}

export function simulateStationANarration() {
  return [
    instruct("Try grouping the blocks into equal rows. Does that row size work for both yards?")
  ];
}

export function simulateStationBNarration() {
  return [
    instruct("Drag each number into the correct circle. Where does it belong?")
  ];
}

export function simulateStationCNarration() {
  return [
    instruct("Step through the number lines. Tap the first point where both lights turn on together!")
  ];
}

export function reflectNarration() {
  return [
    think("What a journey today! Can you find the common factors of eight and twenty?")
  ];
}

export function completionNarration() {
  return [
    celebrate("Lesson complete! You are a Common Ground Champion!")
  ];
}
export function stationAIntroNarration() {
  return [
    instruct(
      "Welcome to Array Yard! Choose a row size and check whether both numbers can be arranged into equal rows. If both divide evenly, you have found a common factor."
    )
  ];
}

export function commonFactorFoundNarration(factor) {
  return [
    celebrate(
      `Amazing! ${factor} is a common factor because both numbers can be divided equally into groups of ${factor}.`
    )
  ];
}

export function notCommonFactorNarration() {
  return [
    say(
      "That row size does not work for both numbers. Try another row size."
    )
  ];
}
export function stationBIntroNarration() {
  return [
    instruct(
      "Welcome to the Venn Sort Station! Drag each number into the correct part of the Venn diagram. Numbers that are factors of both go in the middle."
    )
  ];
}

export function stationBCorrectNarration() {
  return [
    celebrate("Excellent! That number is in the correct place.")
  ];
}

export function stationBWrongNarration() {
  return [
    say("Not quite. Try placing the number in another section.")
  ];
}
export function stationCIntroNarration() {
  return [
    instruct(
      "Welcome to Meeting Point Station! Move along the number lines and find the first place where both friends meet. That is a common multiple."
    )
  ];
}

export function commonMultipleFoundNarration(number) {
  return [
    celebrate(
      `Great job! ${number} is a common multiple because both number patterns meet here.`
    )
  ];
}

export function notCommonMultipleNarration() {
  return [
    say(
      "Not yet. Keep moving until both number patterns meet at the same point."
    )
  ];
}