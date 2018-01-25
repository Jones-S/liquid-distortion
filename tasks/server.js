import gulp from 'gulp'
import Browser from 'browser-sync'
import webpack from 'webpack'
import browserSync from 'browser-sync'

import { config as webpackConfig } from './webpack'

const browser = Browser.create()
const bundler = webpack(webpackConfig)

export function server() {

    let config = {
        server: 'dist',
    }

    browser.init(config)

    gulp.watch('dist/*.js').on('change', () => browser.reload())

    gulp.src("src/**/*.html")
      .pipe(gulp.dest("dist"))
      .pipe(browserSync.reload({
        stream: true
      }))

    // Compile SASS files
    gulp.task("sass", function() {
      gulp.src("src/scss/**/*.scss")
          .pipe(sass({
            includePaths: bourbon,
            includePaths: neat
          }))
          .pipe(gulp.dest("dist/css"))
          .pipe(browserSync.reload({
            stream: true
          }))
    });

    // Copy html files to dist directory
    gulp.task("copy_html", function() {
      gulp.src("src/**/*.html")
          .pipe(gulp.dest("dist"))
          .pipe(browserSync.reload({
            stream: true
          }))
    });

    // Live reload anytime a file changes
    gulp.task("watch", ["sass", "copy_html"], function() {
      gulp.watch("src/scss/**/*.scss", ["sass"]);
      gulp.watch("src/**/*.html", ["copy_html"]);
    });

}






// Following instructions from https://css-tricks.com/combine-webpack-gulp-4/



// const gulp = require("gulp");
// const browserSync = require("browser-sync");
// const sass = require("gulp-sass");
// const bourbon = require("node-bourbon").includePaths;
// const neat = require("node-neat").includePaths;
// const plumber = require('gulp-plumber');
// const sourcemaps = require('gulp-sourcemaps');
// const notify = require('gulp-notify');
// const concat = require('gulp-concat');

// function onError(err) {
//     notify({ message: 'Oh Boy. Error.' });
//     console.log("ERROR:    ------     " + err);
// }

// // Compiles all gulp tasks
// gulp.task("default", ["sass"]);

// // Live reload anytime a file changes
// gulp.task("watch", ["browserSync", "sass", "concat_js", "copy_html"], function() {
//   gulp.watch("src/scss/**/*.scss", ["sass"]);
//   gulp.watch("src/js/**/*.js", ["concat_js"]);
//   gulp.watch("src/**/*.html", ["copy_html"]);
// });

// // Spin up a server
// gulp.task("browserSync", function() {
//   browserSync({
//     server: {
//       baseDir: "dist"
//     }
//   })
// });

// // Compile SASS files
// gulp.task("sass", function() {
//   gulp.src("src/scss/**/*.scss")
//       .pipe(sass({
//         includePaths: bourbon,
//         includePaths: neat
//       }))
//       .pipe(gulp.dest("dist/css"))
//       .pipe(browserSync.reload({
//         stream: true
//       }))
// });

// // Copy html files to dist directory
// gulp.task("copy_html", function() {
//   gulp.src("src/**/*.html")
//       .pipe(gulp.dest("dist"))
//       .pipe(browserSync.reload({
//         stream: true
//       }))
// });

// // concat gulp task
// gulp.task('concat_js', function() {
//   gulp.src("src/js/**/*.js")
//     .pipe(plumber({
//             errorHandler: onError
//         }))
//     .pipe(sourcemaps.init())
//     .pipe(concat('main.js'))
//     .pipe(sourcemaps.write('maps'))
//     .pipe(gulp.dest('dist/js'))
//     .pipe(notify({ message: 'Concatenate task completed' }));
// });
