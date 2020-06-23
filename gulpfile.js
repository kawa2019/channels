const gulp = require("gulp");
const babel = require('gulp-babel');
//const jshint = require("gulp-jshint");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const postcss = require('gulp-postcss');

const dirPath = "static";

gulp.task("sass", function () {
   return gulp.src(dirPath + "/scss/**/*.scss")
      .pipe(sourcemaps.init())
      .pipe(sass({
         outputStyle: "nested"
      }).on("error", sass.logError))
      .pipe(postcss([autoprefixer()]))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(dirPath + "/css"));
});

gulp.task('default', () =>
   gulp.src(dirPath + "/js/app.js")
      .pipe(babel({
         presets: ['@babel/env']
      }))
      .pipe(gulp.dest(dirPath + "/js/bundle"))
);

// gulp.task("jshint", function () {
//    return gulp.src(dirPath + "/**/*.js")
//       .pipe(jshint())
//       .pipe(jshint.reporter())
// });

gulp.task("watch", function () {
   gulp.watch(dirPath + "/scss/**/*.scss", gulp.series("sass"));
    gulp.watch(dirPath+"/js/app.js", gulp.series("default"));
   // gulp.watch(dirPath+"/js/**/*.js", gulp.series("jshint"));
})  