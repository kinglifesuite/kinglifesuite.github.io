// scripts/convert-to-webp.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'image/kinglife';
const outputDir = 'dist/images';

async function convertToWebP() {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs.readdirSync(inputDir);
    
    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);
            
            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath);
            
            console.log(`Converted ${file} to WebP`);
        }
    }
}

convertToWebP();