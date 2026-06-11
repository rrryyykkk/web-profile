import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../public/fp_profile-removebg-preview_11zon.webp');
const output800 = path.join(__dirname, '../public/fp_profile_800.webp');
const output400 = path.join(__dirname, '../public/fp_profile_400.webp');

async function resize() {
  try {
    console.log('Optimizing and resizing profile image...');
    
    // Resize to 800x800
    await sharp(inputPath)
      .resize(800, 800, { fit: 'inside' })
      .webp({ quality: 82 })
      .toFile(output800);
    console.log('Created: public/fp_profile_800.webp');

    // Resize to 400x400
    await sharp(inputPath)
      .resize(400, 400, { fit: 'inside' })
      .webp({ quality: 82 })
      .toFile(output400);
    console.log('Created: public/fp_profile_400.webp');

    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error optimizing image:', error);
  }
}

resize();
