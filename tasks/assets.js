'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminJpegoptim = require('imagemin-jpegoptim');
const imageminOptipng = require('imagemin-optipng');


/**
 * Копирование assets.
 * При желании копируемые файлы можно прогонять через обработчики
 * @param options
 * @returns {Function}
 */
module.exports = function(options) {
    return gulp.src(options.src)
        /* Оптимизация изображений для Google PageSpeed */
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imageminJpegoptim({
                progressive: true,
                stripAll: true,
                max: 89
            }),
            imageminOptipng({
                optimizationLevel: 1
            }),
            imagemin.svgo({
                plugins: [
                    {cleanupIDs: true}
                ]
            })
        ]))
        .pipe(gulp.dest(options.dist));
};