// ==========================================================================
// Dependencies & SETTINGS
// ==========================================================================

const gulp = require('gulp');
const gutil = require('gulp-util');
const runSequence = require('run-sequence');
const path = require('path');

const twig = require('gulp-twig');

// const browserSync = require('browser-sync').create();

const IS_WATCH = process.argv.includes('--watch');
const IS_PRODUCTION = process.argv.includes('--production');


const taskClean = require('./tasks/clean');
const taskTwig = require('./tasks/twig');
const taskAssets = require('./tasks/assets');

const webpack = require('webpack');

const webpackConfig = require(`./webpack.config.${IS_PRODUCTION ? 'prod' : 'dev'}`);

if (IS_WATCH) {
    webpackConfig.watch = true;
}

const SETTINGS = {
    path: {
        src: './src',
        dist: './dist',
    },
    server: true,
};

/**
 * Функция для ленивого вызова gulp задач.
 * @param taskName - имя задачи
 * @param path - путь до файла конфигурации задачи
 * @param options - настройки необходимый для задачи
 * @returns {Function}
 */
function lazyRequireTasks(taskName, path, options = {}) {
    gulp.task(taskName, function (callback) {
        const task = require(path).call(this, options);
        return task(callback);
    });
}

// ==========================================================================
// General tasks
// ==========================================================================

gulp.task('clean', function () {
    return taskClean({
        dist: SETTINGS.path.dist
    });
});


gulp.task('twig', function () {
    return taskTwig({
        src: SETTINGS.path.src + '/twig/*.twig',
        dist: SETTINGS.path.dist
    });
});


gulp.task('assets', function () {
    return taskAssets({
        src: SETTINGS.path.src + '/assets/**/*.*',
        dist: SETTINGS.path.dist + '/assets'
    });
});

gulp.task('webpack', function (callback) {

    /**
     * https://github.com/SBoudrias/gulp-istanbul/issues/22
     * Предоставращает вызов callback более одного раза
     * @type {boolean}
     */
    let isRunninig = false;

    /**
     * Пример использования из https://github.com/webpack/docs/wiki/usage-with-gulp
     */
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
            colors: true,
            hash: true,
            chunks: false,
            children: false,
            // modules: false
        }));
        if (!isRunninig) {
            callback();
            isRunninig = true;
        }
    });

});

// ==========================================================================
// BUILD
// ==========================================================================

gulp.task('build', function () {
    runSequence(
        'clean',
        'twig',
        'assets',
        'webpack'
    );
});

gulp.task('watch', function () {
    gulp.watch(`${SETTINGS.path.src}/assets/!**!/!*`, ['assets']);
    gulp.watch(`${SETTINGS.path.src}/twig/!**!/!*.twig`, ['twig']);
});

gulp.task('build-watch', function () {
    runSequence(
        'build',
        'watch'
    );
});


gulp.task('default', () => {
    if (IS_WATCH) {
        runSequence(
            'build-watch'
        );
    } else {
        runSequence(
            'build'
        );
    }

});



