import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local
dotenv.config({
  path: path.resolve(__dirname, "../.env.local"),
});

// =====================================
// Configuration
// =====================================

const API_KEY = process.env.VITE_ELEVENLABS_API_KEY;
const VOICE_ID = process.env.VITE_ELEVENLABS_VOICE_ID;

console.log("API Loaded:", API_KEY ? "YES" : "NO");
console.log("Voice Loaded:", VOICE_ID);

if (!API_KEY || !VOICE_ID) {
  console.error("❌ Missing ElevenLabs API Key or Voice ID.");
  process.exit(1);
}

// =====================================
// Voice Styles
// =====================================

const STYLE_SETTINGS = {
  celebration: {
    stability: 0.12,
    similarity_boost: 0.45,
    style: 0.75,
    use_speaker_boost: true
  },

  encouragement: {
    stability: 0.16,
    similarity_boost: 0.50,
    style: 0.65,
    use_speaker_boost: true
  },

  question: {
    stability: 0.20,
    similarity_boost: 0.55,
    style: 0.55,
    use_speaker_boost: true
  },

  emphasis: {
    stability: 0.16,
    similarity_boost: 0.50,
    style: 0.60,
    use_speaker_boost: true
  },

  thinking: {
    stability: 0.24,
    similarity_boost: 0.60,
    style: 0.35,
    use_speaker_boost: true
  },

  statement: {
    stability: 0.20,
    similarity_boost: 0.55,
    style: 0.50,
    use_speaker_boost: true
  },

  instruction: {
    stability: 0.20,
    similarity_boost: 0.55,
    style: 0.50,
    use_speaker_boost: true
  }
};

// =====================================
// Narration Phrases
// =====================================

const phrases = [

  // ---------------- Wonder ----------------

  {
    text: "Imagine two friends preparing for their school fair.",
    style: "thinking"
  },

  {
    text: "John has twelve balloons and Sarah has eighteen balloons.",
    style: "statement"
  },

  {
    text: "Can they arrange them into equal groups using the same group size?",
    style: "question"
  },

  {
    text: "Today we will discover Common Factors and Common Multiples.",
    style: "encouragement"
  },

  // ---------------- Story ----------------

  {
    text: "Welcome to the school fair.",
    style: "statement"
  },

  {
    text: "John and Sarah are preparing games and decorations.",
    style: "statement"
  },

  {
    text: "John has twelve balloons.",
    style: "statement"
  },

  {
    text: "The factors of twelve are one, two, three, four, six and twelve.",
    style: "emphasis"
  },

  {
    text: "Sarah has eighteen balloons.",
    style: "statement"
  },

  {
    text: "The factors of eighteen are one, two, three, six, nine and eighteen.",
    style: "emphasis"
  },

  {
    text: "One, two, three and six appear in both lists.",
    style: "celebration"
  },

  {
    text: "These shared numbers are called Common Factors.",
    style: "emphasis"
  },

  {
    text: "Now let's explore Common Multiples.",
    style: "statement"
  },

  {
    text: "John jumps every four minutes while Sarah jumps every six minutes.",
    style: "statement"
  },

  {
    text: "They meet after twelve minutes and twenty four minutes.",
    style: "emphasis"
  },

  {
    text: "Those meeting times are Common Multiples.",
    style: "celebration"
  },

  // ---------------- Simulation ----------------

  {
    text: "Welcome to Array Yard.",
    style: "instruction"
  },

  {
    text: "Choose a row size.",
    style: "instruction"
  },

  {
    text: "If both numbers divide equally, you found a Common Factor.",
    style: "instruction"
  },

  {
    text: "Welcome to the Venn Sort Station.",
    style: "instruction"
  },

  {
    text: "Drag each number into the correct section.",
    style: "instruction"
  },

  {
    text: "Welcome to Meeting Point Station.",
    style: "instruction"
  },

  {
    text: "Find where both number patterns meet.",
    style: "instruction"
  }

];
// =====================================
// Output Paths
// =====================================

const AUDIO_DIR = path.resolve(__dirname, "../public/assets/audio");
const MAP_FILE = path.resolve(__dirname, "../src/utils/audioMap.js");

if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

// =====================================
// Helpers
// =====================================

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .substring(0, 60);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// =====================================
// Generate Audio
// =====================================

async function generateAudio() {
  const audioMap = {};

  console.log("\n====================================");
  console.log("Generating ElevenLabs Audio...");
  console.log("====================================\n");

  for (let i = 0; i < phrases.length; i++) {
    const { text, style } = phrases[i];

    const filename = `${String(i + 1).padStart(3, "0")}_${slugify(text)}.mp3`;

    const filepath = path.join(AUDIO_DIR, filename);

    const publicPath = `/assets/audio/${filename}`;

    audioMap[text] = publicPath;

    if (fs.existsSync(filepath)) {
      console.log(`✓ Skip: ${filename}`);
      continue;
    }

    console.log(`🎤 ${i + 1}/${phrases.length}`);
    console.log(text);

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        {
          method: "POST",

          headers: {
            "xi-api-key": API_KEY,
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            text,

            model_id: "eleven_multilingual_v2",

            voice_settings:
              STYLE_SETTINGS[style] || STYLE_SETTINGS.statement
          })
        }
      );

      if (!response.ok) {
        console.log(await response.text());
        continue;
      }

      const audioBuffer = await response.arrayBuffer();

      fs.writeFileSync(
        filepath,
        Buffer.from(audioBuffer)
      );

      console.log(`✅ Saved ${filename}\n`);

      await sleep(400);

    } catch (err) {

      console.log("ERROR");
      console.log(err.message);
    }
  }

  // =====================================
  // Create audioMap.js
  // =====================================

  const output = `export const audioMap = ${JSON.stringify(
    audioMap,
    null,
    2
  )};\n`;

  fs.writeFileSync(MAP_FILE, output);

  console.log("\n====================================");
  console.log("Finished Successfully");
  console.log("====================================");
  console.log(`Audio Folder : ${AUDIO_DIR}`);
  console.log(`Audio Map    : ${MAP_FILE}`);
}

generateAudio();