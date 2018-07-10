var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browsync = require('browser-sync').create(),
    reload = browsync.reload,
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    srcmaps = require('gulp-sourcemaps'),
    imgmin = require('gulp-imagemin'),
    plumber = require('gulp-plumber');

var paths = {
    html: './*.html',
    scss: 'scss/*.scss',
    js: 'js/*.js',
    img: 'img/*.*',
}


gulp.task('sass-compile', function () {
    return gulp.src(paths.scss) // Берём все .scss-файлы в папке scss
        .pipe(srcmaps.init())
        .pipe(sass({
            outputStyle: 'compact',
        })) // Magic
        .pipe(srcmaps.write()) // Добавляем sourcemaps
        .pipe(gulp.dest('docs/css/')) // Помещаем скомпилированные CSS файлы в папку /css
        .on('end', browsync.reload);
});

gulp.task('sass-build', function () {
    return gulp.src(paths.scss) // Берём все .scss-файлы в папке scss
        .pipe(sass({
            outputStyle: 'expanded',
        })) // Magic
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(gulp.dest('docs/css/')) // Помещаем скомпилированные CSS файлы в папку /css
        .on('end', browsync.reload);
});

gulp.task('imgmini', function() {
    return gulp.src(paths.img)
    .pipe(imgmin())
    .pipe(gulp.dest('docs/img/'))
});

gulp.task('cssmini', function () {
    return gulp.src('docs/css/style.css')
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(gulp.dest('docs/css'))
});

gulp.task('jsugly', function () {
    gulp.src('js/*.js')
        .pipe(gulp.dest('docs/js/'));
});

gulp.task('htmlbuild', function () {
    gulp.src(paths.html) //Выберем исходные файлы
        .pipe(rigger()) //Прогон через rigger
        .pipe(gulp.dest('docs/')) //Складываем их в папку build
        .pipe(browsync.reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('csslibs', function () {
    gulp.src('libs/**/*.*')
        .pipe(gulp.dest('docs/libs'));
});

gulp.task('browser-sync', function () {
    browsync.init([paths.html, paths.scss, paths.js], {
        server: {
            baseDir: 'docs/'
        },
        // proxy: "localhost", // Перенаправляем запросы на локальный сервер (для интеграции с CMS)
        notify: false // Отключаем уведомления от BrowserSync
    });
});

gulp.task('watch', ['browser-sync', 'htmlbuild', 'sass-compile'], function () {
    gulp.watch(paths.scss, function () {
    setTimeout(function () {
    gulp.start('sass-compile');
    }, 500);
   });
   gulp.watch(paths.html, ['htmlbuild', reload]);
   gulp.watch(paths.js, ['jsugly', reload]);
});

// gulp.task('default', ['sass-compile', 'htmlbuild', 'csslibs', 'jsugly', 'browser-sync'], function () {
//     gulp.watch(paths.scss, ['sass-compile', 'csslibs']);
//     gulp.watch(paths.html, ['htmlbuild']);
//     gulp.watch(paths.js, ['jsugly']);
// });