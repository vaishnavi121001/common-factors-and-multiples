import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUDIO_DIR = path.resolve(__dirname, '../public/assets/audio');
const MAP_FILE = path.resolve(__dirname, '../src/utils/audioMap.js');

async function cleanAudio() {
  if (!fs.existsSync(MAP_FILE)) {
    console.log("No audioMap.js found. Nothing to clean.");
    return;
  }

  // Use dynamic import to read the map
  const mapModule = await import(pathToFileURL(MAP_FILE).href);
  const audioMap = mapModule.audioMap || {};

  const activeFiles = new Set(Object.values(audioMap).map(p => path.basename(p)));

  if (!fs.existsSync(AUDIO_DIR)) return;

  const existingFiles = fs.readdirSync(AUDIO_DIR).filter(f => f.endsWith('.mp3'));
  let deleted = 0;

  for (const file of existingFiles) {
    if (!activeFiles.has(file)) {
      fs.unlinkSync(path.join(AUDIO_DIR, file));
      console.log(`[DELETED] Orphaned file: ${file}`);
      deleted++;
    }
  }

  console.log(`[DONE] Cleaned up ${deleted} orphaned audio files.`);
}

cleanAudio();
