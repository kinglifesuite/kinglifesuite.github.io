// optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageConfig = {
    inputDir: 'image/kinglife',
    outputDir: 'image/kinglife/optimized',
    sizes: {
        large: 1200,
        medium: 800,
        small: 400
    }
};

async function optimizeImages() {
    // Create output directory
    if (!fs.existsSync(imageConfig.outputDir)) {
        fs.mkdirSync(imageConfig.outputDir, { recursive: true });
    }

    const files = fs.readdirSync(imageConfig.inputDir);

    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const inputPath = path.join(imageConfig.inputDir, file);
            const fileName = path.parse(file).name;

            // Convert to WebP in different sizes
            for (const [size, width] of Object.entries(imageConfig.sizes)) {
                const outputPath = path.join(
                    imageConfig.outputDir,
                    `${fileName}-${size}.webp`
                );

                await sharp(inputPath)
                    .resize(width, null, {
                        withoutEnlargement: true
                    })
                    .webp({
                        quality: 80,
                        effort: 6
                    })
                    .toFile(outputPath);
            }

            console.log(`Optimized: ${file}`);
        }
    }
}

optimizeImages();