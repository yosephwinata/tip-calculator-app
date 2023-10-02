const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
// const purgecss = require("gulp-purgecss");

function buildStyles() {
  return (
    src("sass/**/*.scss") // Target the source
      .pipe(sass({ outputStyle: "compressed" }))
      // .pipe(purgecss({ content: ["*.html"] })) // Purge unused styles
      .pipe(dest("css")) // Compile to this destination
  );
}

// Watch for these files. Auto build if it detects changes.
function watchTask() {
  watch(["sass/**/*.scss", "*.html"], buildStyles);
}

exports.default = series(buildStyles, watchTask);
