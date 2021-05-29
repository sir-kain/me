const { src, series, watch, parallel, dest } = require("gulp");
const rimraf = require("rimraf");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require("gulp-clean-css");
const minify = require("gulp-minify");

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
    .pipe(cleanCSS())
    .pipe(sourcemaps.write(""))
    .pipe(dest("_site/css/"));
}

function watchStyle(cb) {
  watch("css/*.scss", style);
  cb();
}

// function deleteCss(cb) {
//   rimraf("_site/css/*.scss", (err) => console.error(err));
//   cb();
// }

exports.default = style;
exports.dev = series(style, watchStyle);
