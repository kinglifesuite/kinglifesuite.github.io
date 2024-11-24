// minify-css.js
const CleanCSS = require('clean-css');
const fs = require('fs');

const cssFiles = [
    {
        input: 'css/style.css',
        output: 'css/style.min.css'
    },
    {
        input: 'css/responsive.css',
        output: 'css/responsive.min.css'
    }
];

function minifyCSS() {
    cssFiles.forEach(file => {
        const css = fs.readFileSync(file.input, 'utf8');
        const minified = new CleanCSS({
            level: {
                1: {
                    specialComments: 0
                }
            }
        }).minify(css);

        fs.writeFileSync(file.output, minified.styles);
        
        console.log(`${file.input}:`);
        console.log(`Original size: ${css.length} bytes`);
        console.log(`Minified size: ${minified.styles.length} bytes`);
        console.log(`Saved: ${css.length - minified.styles.length} bytes\n`);
    });
}

minifyCSS();