const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");

gulp.task("minify-html", () => {
  return gulp
    .src("./index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./"));
});

gulp.task("copy-all-public", () => {
    return gulp
        .src("./**")
        .pipe(gulp.dest("./public"));
});

// Define default task
gulp.task("default", gulp.parallel("minify-html", "copy-all-public"));
