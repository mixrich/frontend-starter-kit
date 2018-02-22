'use strict';

const gulp = require('gulp');
const twig = require('gulp-twig');

/**
 * Сборка шаблонов Twig
 * @param options
 * @returns {Function}
 */
module.exports = function(options) {
        return gulp.src(options.src)
            .pipe(twig().on('error', console.log))
            .pipe(gulp.dest(options.dist));
};
