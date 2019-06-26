// ==========================================================================
// Dependencies & SETTINGS
// ==========================================================================

const gulp = require('gulp');
const gutil = require('gulp-util');

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
     * Prevents Callback calling more than once
     * @type {boolean}
     */
    let isRunninig = false;

    /**
     * Example from https://github.com/webpack/docs/wiki/usage-with-gulp
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

gulp.task('watch-assets', () => gulp.watch(`${SETTINGS.path.src}/twig/**/*.twig`, gulp.series('twig')));
gulp.task('watch-twig', () => gulp.watch(`${SETTINGS.path.src}/assets/**/*`, gulp.series('assets')));

gulp.task('watch', gulp.parallel('watch-twig', 'watch-assets'));

// ==========================================================================
// BUILD
// ==========================================================================

gulp.task('build', gulp.series(
    'clean',
    'twig',
    'assets',
    'webpack',
));


gulp.task('build-watch', gulp.series(
    'build',
    'watch',
));

exports.default = IS_WATCH ? gulp.series('build-watch') : gulp.series('build');
