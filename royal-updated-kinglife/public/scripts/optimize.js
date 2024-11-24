// optimize.js
const CleanCSS = require('clean-css');
const { minify } = require('terser');
const fs = require('fs').promises;
const path = require('path');

const cssFiles = [
    { input: 'css/style.css', output: 'css/style.min.css' },
    { input: 'css/responsive.css', output: 'css/responsive.min.css' },
    { input: 'css/font-awesome.min.css', output: 'css/font-awesome.min.css' },
    { input: 'vendors/linericon/style.css', output: 'css/linericon.min.css' },
    { input: 'vendors/owl-carousel/owl.carousel.min.css', output: 'css/owl.carousel.min.css' },
    { input: 'vendors/lightbox/simpleLightbox.css', output: 'css/simpleLightbox.min.css' }
];


//<link
//  rel="stylesheet"
//  href="vendors/bootstrap-datepicker/bootstrap-datetimepicker.min.css"
///>
//<link rel="stylesheet" href="vendors/nice-select/css/nice-select.css" />

async function minifyCSS() {
    try {
        // Minify individual files
        for (const file of cssFiles) {
            const css = await fs.readFile(file.input, 'utf8');
            const minified = new CleanCSS().minify(css);
            await fs.writeFile(file.output, minified.styles);
            console.log(`Minified ${file.input}`);
        }

        // Combine and minify all CSS files
        let combinedCSS = '';
        for (const file of cssFiles) {
            const css = await fs.readFile(file.input, 'utf8');
            combinedCSS += css + '\n';
        }

        const minifiedCombined = new CleanCSS().minify(combinedCSS);
        await fs.writeFile('dist/css/combined.min.css', minifiedCombined.styles);
        console.log('Created combined CSS file');

        // Log size savings
        const originalSize = combinedCSS.length;
        const minifiedSize = minifiedCombined.styles.length;
        const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
        console.log(`Total CSS size reduction: ${savings}%`);

    } catch (err) {
        console.error('CSS minification error:', err);
    }
}

//<script src="js/jquery.validate.min.js"></script>

const jsFiles = [
  {
      input: 'vendors/nice-select/js/jquery.nice-select.js',
      output: 'dist/js/jquery.nice-select.min.js',
      priority: 1  // Required by gallery
  },
  { 
      input: 'js/stellar.js', 
      output: 'dist/js/stellar.min.js',
      priority: 2
  },
  { 
      input: 'js/popper.js', 
      output: 'dist/js/popper.min.js',
      priority: 3
  },
  {
      input: 'vendors/imagesloaded/imagesloaded.pkgd.min.js',
      output: 'dist/js/imagesloaded.min.js',
      priority: 4  // Required by gallery
  },
  { 
      input: 'vendors/isotope/isotope-min.js', 
      output: 'dist/js/isotope.min.js',
      priority: 5  // Depends on imagesloaded
  },
  { 
      input: 'vendors/owl-carousel/owl.carousel.min.js', 
      output: 'dist/js/owl.carousel.min.js',
      priority: 6
  },
  { 
      input: 'vendors/lightbox/simpleLightbox.min.js', 
      output: 'dist/js/simpleLightbox.min.js',
      priority: 7
  },
  { 
      input: 'js/custom.js', 
      output: 'dist/js/custom.min.js',
      priority: 8  // Custom code should be last
  }
];

async function minifyJS() {
  try {
      // Sort files by priority
      const sortedFiles = jsFiles.sort((a, b) => a.priority - b.priority);
      
      // Minify individual files
      let combinedJS = '';
      
      for (const file of sortedFiles) {
          try {
              const js = await fs.readFile(file.input, 'utf8');
              const minified = await minify(js, {
                  compress: {
                      drop_console: false,  // Keep console for debugging
                      dead_code: true
                  },
                  mangle: true
              });
              
              // Add to combined JS with separator
              combinedJS += `/* ${path.basename(file.input)} */\n`;
              combinedJS += minified.code + ';\n\n';  // Add semicolon and newline for safety
              
              // Save individual minified file
              await fs.writeFile(file.output, minified.code);
              console.log(`Minified ${file.input}`);
              
          } catch (err) {
              console.error(`Error processing ${file.input}:`, err);
          }
      }

      // Save combined JS file
      await fs.writeFile('dist/js/bundle.min.js', combinedJS);
      console.log('Created combined JS file');

      // Log size savings
      const originalSize = combinedJS.length;
      const minifiedSize = (await minify(combinedJS)).code.length;
      const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
      console.log(`Total JS size reduction: ${savings}%`);

  } catch (err) {
      console.error('JS minification error:', err);
  }
}

async function createDirectories() {
    try {
        await fs.mkdir('dist/css', { recursive: true });
        await fs.mkdir('dist/js', { recursive: true });
        console.log('Created dist directories');
    } catch (err) {
        console.error('Error creating directories:', err);
    }
}

async function optimize() {
    await createDirectories();
    await minifyCSS();
    await minifyJS();
}

optimize().catch(console.error);