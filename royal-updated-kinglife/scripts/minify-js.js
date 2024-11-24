// minify-js.js
const { minify } = require('terser');
const fs = require('fs');

const jsFiles = [
    {
        input: 'js/custom.js',
        output: 'js/custom.min.js'
    },
    // Add your vendor JS files here
];

async function minifyJS() {
    for (const file of jsFiles) {
        const code = fs.readFileSync(file.input, 'utf8');
        const result = await minify(code, {
            compress: {
                drop_console: true
            }
        });

        fs.writeFileSync(file.output, result.code);
        
        console.log(`${file.input}:`);
        console.log(`Original size: ${code.length} bytes`);
        console.log(`Minified size: ${result.code.length} bytes`);
        console.log(`Saved: ${code.length - result.code.length} bytes\n`);
    }
}

minifyJS();