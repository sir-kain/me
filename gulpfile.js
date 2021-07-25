const { src, series, watch, dest } = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const purgecss = require("gulp-purgecss");

function style() {
  src("css/*.scss", {
    sourcemaps: true,
  })
    .pipe(sass())
    .on("error", function (error) {
      sass.logError.call(this, error);
      // return process.exit(1);
    })
    .pipe(postcss([autoprefixer()]))
    .pipe(
      purgecss({
        content: ["_site/**/*.html"], // remove unused css
      })
    )
    .pipe(cleanCSS()) // minify
    .pipe(dest("_site/css/", { sourcemaps: "." }));
}

function watchStyle(cb) {
  watch("css/*.scss", style);
  cb();
}

exports.default = style;
exports.dev = series(style, watchStyle);
