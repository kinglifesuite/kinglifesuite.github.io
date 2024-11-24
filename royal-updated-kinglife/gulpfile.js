const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");

gulp.task("minify-html", () => {
  return gulp
    .src("index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./"));
});

// Define default task
gulp.task("default", gulp.parallel("minify-html"));
