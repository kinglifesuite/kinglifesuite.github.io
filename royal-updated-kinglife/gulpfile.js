const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const sharp = require('sharp');
const through2 = require('through2');
const htmlmin = require('gulp-htmlmin');

gulp.task('minify-html', () => {
  return gulp.src('index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./'));
});

// CSS minification
gulp.task('minify-css', () => {
    return gulp.src(['css/**/*.css', '!css/**/*.min.css'])
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

// JavaScript minification
gulp.task('minify-js', () => {
    return gulp.src(['js/**/*.js', '!js/**/*.min.js'])
        .pipe(terser())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'));
});

// Image optimization using sharp
gulp.task('optimize-images', () => {
    return gulp.src('image/kinglife/**/*')
        .pipe(through2.obj(async (file, enc, cb) => {
            if (file.isBuffer()) {
                try {
                    // Process only images
                    if (file.path.match(/\.(jpg|jpeg|png)$/i)) {
                        const optimized = await sharp(file.contents)
                            .resize(1200, null, { // Max width 1200px
                                withoutEnlargement: true,
                                fit: 'inside'
                            })
                            .webp({ quality: 80 }) // Convert to WebP
                            .toBuffer();
                        
                        file.contents = optimized;
                        file.path = file.path.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                    }
                    cb(null, file);
                } catch (error) {
                    console.error('Error processing:', file.path, error);
                    cb(null, file);
                }
            } else {
                cb(null, file);
            }
        }))
        .pipe(gulp.dest('dist/images'));
});

// Define default task
gulp.task('default', gulp.parallel('minify-css', 'minify-js', 'optimize-images'));