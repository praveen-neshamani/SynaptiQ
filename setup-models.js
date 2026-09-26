const https = require('https');
const fs = require('fs');
const path = require('path');

const MODELS_DIR = path.join(__dirname, 'public', 'models');
const BASE_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';

const FILES = [
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-shard1',
  'face_landmark_68_tiny_model-weights_manifest.json',
  'face_landmark_68_tiny_model-shard1'
];

// Create models directory
if (!fs.existsSync(MODELS_DIR)) {
  fs.mkdirSync(MODELS_DIR, { recursive: true });
  console.log('✅ Created models directory');
}

// Download each file
let completed = 0;
FILES.forEach(file => {
  const url = `${BASE_URL}/${file}`;
  const dest = path.join(MODELS_DIR, file);

  if (fs.existsSync(dest)) {
    console.log(`⏭️  ${file} already exists`);
    completed++;
    if (completed === FILES.length) {
      console.log('\n🎉 All models ready!');
    }
    return;
  }

  console.log(`⬇️  Downloading ${file}...`);
  
  const fileStream = fs.createWriteStream(dest);
  https.get(url, response => {
    response.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`✅ Downloaded ${file}`);
      completed++;
      if (completed === FILES.length) {
        console.log('\n🎉 All models downloaded successfully!');
      }
    });
  }).on('error', err => {
    fs.unlink(dest, () => {});
    console.error(`❌ Error downloading ${file}:`, err.message);
  });
});
