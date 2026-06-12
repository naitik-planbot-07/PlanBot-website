const sharp = require('sharp');
const pngToIco = require('png-to-ico');
const fs = require('fs');
const path = require('path');

const inputImagePath = path.join(__dirname, 'public', 'logo.jpeg');
const publicDir = path.join(__dirname, 'public');

async function generateFavicons() {
  try {
    console.log('Generating favicons from logo.jpeg...');
    
    // 16x16
    await sharp(inputImagePath)
      .resize(16, 16)
      .toFile(path.join(publicDir, 'favicon-16x16.png'));
      
    // 32x32
    await sharp(inputImagePath)
      .resize(32, 32)
      .toFile(path.join(publicDir, 'favicon-32x32.png'));

    // 48x48 (Google Search requirement: multiple of 48)
    await sharp(inputImagePath)
      .resize(48, 48)
      .toFile(path.join(publicDir, 'favicon-48x48.png'));

    // 96x96 (Google Search requirement: multiple of 48)
    await sharp(inputImagePath)
      .resize(96, 96)
      .toFile(path.join(publicDir, 'favicon-96x96.png'));
      
    // apple-touch-icon (180x180)
    await sharp(inputImagePath)
      .resize(180, 180)
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
      
    // android-chrome-192x192
    await sharp(inputImagePath)
      .resize(192, 192)
      .toFile(path.join(publicDir, 'android-chrome-192x192.png'));
      
    // android-chrome-512x512
    await sharp(inputImagePath)
      .resize(512, 512)
      .toFile(path.join(publicDir, 'android-chrome-512x512.png'));

    // favicon.ico
    // Use the 32x32 png to generate the ico
    const buf = await pngToIco.default(path.join(publicDir, 'favicon-32x32.png'));
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), buf);

    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();
