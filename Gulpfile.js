"use strict";

var gulp = require("gulp"),
	browserSync = require("browser-sync"),
	sass = require("gulp-sass"),
	bourbon = require("node-bourbon").includePaths,
	neat = require("node-neat").includePaths;

// Compiles all gulp tasks
gulp.task("default", ["sass"]);

// Live reload anytime a file changes
gulp.task("watch", ["browserSync", "sass", "copy_html"], function() {
  gulp.watch("src/scss/**/*.scss", ["sass"]);
	gulp.watch("src/**/*.html", ["copy_html"]);
});

// Spin up a server
gulp.task("browserSync", function() {
	browserSync({
		server: {
			baseDir: "dist"
		}
	})
});

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
