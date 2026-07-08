import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STYLE_SETTINGS = {
  celebration: { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question: { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis: { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking: { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};

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

const API_KEY = process.env.VITE_ELEVENLABS_API_KEY;
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const AUDIO_DIR = path.resolve(__dirname, '../public/assets/audio');
const MAP_FILE = path.resolve(__dirname, '../src/utils/audioMap.js');

if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '').substring(0, 50);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateAudio() {
  if (!API_KEY) {
    console.error("Missing VITE_ELEVENLABS_API_KEY environment variable.");
    process.exit(1);
  }

  const audioMap = {};

  for (let i = 0; i < phrases.length; i++) {
    const { text, style } = phrases[i];
    const slug = slugify(text);
    const filename = `audio_${slug}_${i}.mp3`;
    const filepath = path.join(AUDIO_DIR, filename);
    const publicPath = `/assets/audio/${filename}`;

    audioMap[text] = publicPath;

    if (fs.existsSync(filepath)) {
      console.log(`[SKIP] Already exists: ${filename}`);
      continue;
    }

    console.log(`[FETCH] Generating: ${text}`);
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: STYLE_SETTINGS[style] || STYLE_SETTINGS.statement,
        })
      });

      if (!response.ok) {
        console.error(`Failed to generate ${filename}:`, await response.text());
        continue;
      }

      const buffer = await response.arrayBuffer();
      fs.writeFileSync(filepath, Buffer.from(buffer));
      console.log(`[SUCCESS] Saved: ${filename}`);
      await sleep(500); // rate limiting
    } catch (e) {
      console.error(`Error generating ${filename}:`, e.message);
    }
  }

  // Write audioMap.js
  const mapContent = `export const audioMap = ${JSON.stringify(audioMap, null, 2)};\n`;
  fs.writeFileSync(MAP_FILE, mapContent);
  console.log(`[DONE] audioMap.js generated.`);
}

generateAudio();
