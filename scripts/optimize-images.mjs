import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join } from 'path';

const INPUT_DIR = './cleaned';
const OUTPUT_DIR = './public/images';

const categories = {
  icons: {
    match: ['icon-plus', 'icon-minus', 'icon-share'],
    maxWidth: 256,
    quality: 85,
  },
  logos: {
    match: ['logo-'],
    maxWidth: 512,
    quality: 85,
  },
  hero: {
    match: [
      'welcome-sushi-hero', 'welcome-logo-animated',
      'sushi-counter-character', 'confetti-sushi',
      'badge-', 'group-created', 'empty-state',
      'error-sushi', 'loading-sushi', 'qr-code-frame',
      'invitation-card',
    ],
    maxWidth: 800,
    quality: 80,
  },
  patterns: {
    match: ['pattern-'],
    maxWidth: 1200,
    quality: 75,
  },
};

function getCategory(filename) {
  for (const [name, cat] of Object.entries(categories)) {
    if (cat.match.some(prefix => filename.includes(prefix))) {
      return { name, ...cat };
    }
  }
  return { name: 'hero', maxWidth: 800, quality: 80 };
}

async function optimize() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = (await readdir(INPUT_DIR)).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} PNG files to optimize\n`);

  for (const file of files) {
    const inputPath = join(INPUT_DIR, file);
    const outputName = file.replace('.png', '.webp');
    const outputPath = join(OUTPUT_DIR, outputName);
    const cat = getCategory(file);

    const info = await sharp(inputPath)
      .resize({ width: cat.maxWidth, withoutEnlargement: true })
      .webp({ quality: cat.quality })
      .toFile(outputPath);

    const inputStats = await sharp(inputPath).metadata();
    const savings = ((1 - info.size / (inputStats.size || info.size)) * 100).toFixed(1);

    console.log(
      `[${cat.name.padEnd(8)}] ${file.padEnd(35)} → ${outputName.padEnd(35)} ` +
      `${(info.size / 1024).toFixed(0).padStart(5)}KB  (${savings}% smaller)`
    );
  }

  console.log('\nDone!');
}

optimize().catch(console.error);
