var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer'); // 处理css中浏览器兼容的前缀  
var rename = require('gulp-rename'); //重命名  
var cssnano = require('gulp-cssnano'); // css的层级压缩合并
var sass = require('gulp-sass'); //sass
var babel = require('gulp-babel');
var jshint = require('gulp-jshint'); //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）  
var uglify = require('gulp-uglify'); //js压缩  
var concat = require('gulp-concat'); //合并文件  
var imagemin = require('gulp-imagemin'); //图片压缩 
var browserSync = require('browser-sync').create();
var sequence = require('gulp-sequence');
var reload = browserSync.reload;
var Config = require('./gulpfile.config.js');
//======= gulp dev 开发环境下 ===============
function dev() {
  /** 
   * HTML处理 
   */
  gulp.task('html:dev', function () {
    return gulp.src(Config.html.src).pipe(gulp.dest(Config.html.dist)).pipe(reload({
      stream: true
    }));
  });
  /** 
   * assets文件夹下的所有文件处理 
   */
  gulp.task('assets:dev', function () {
    return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist)).pipe(reload({
      stream: true
    }));
  });
  /** 
   * CSS样式处理 
   */
  gulp.task('css:dev', function () {
    return gulp.src(Config.css.src).pipe(gulp.dest(Config.css.dist)).pipe(reload({
      stream: true
    }));
  });
  /** 
   * SASS样式处理 
   */
  gulp.task('sass:dev', function () {
    return gulp.src(Config.sass.src).pipe(sass()).pipe(gulp.dest(Config.sass.dist)).pipe(reload({
      stream: true
    }));
  });
  /** 
   * js处理 
   */
  // babel 转 es6 需要注意： 使用 gulp-babel@^7.0.0 且根据提示安装 babel-core
  gulp.task('js:dev', function () {
    return gulp.src(Config.js.src).pipe(jshint('.jshintrc')).pipe(jshint.reporter('default')).pipe(babel({
      presets: ['env']
    })).pipe(gulp.dest(Config.js.dist)).pipe(reload({
      stream: true
    }));
  });
  /** 
   * 图片处理 
   */
  gulp.task('images:dev', function () {
    return gulp.src(Config.img.src).pipe(imagemin({
      optimizationLevel: 3
      , progressive: true
      , interlaced: true
    })).pipe(gulp.dest(Config.img.dist)).pipe(reload({
      stream: true
    }));
  });

  var devCb = function () {
    browserSync.init({
      server: {
        baseDir: Config.dist
      }
      , notify: false
    });
    // Watch .html files  
    gulp.watch(Config.html.src, ['html:dev']);
    // Watch .css files  
    gulp.watch(Config.css.src, ['css:dev']);
    // Watch .scss files  
    gulp.watch(Config.sass.src, ['sass:dev']);
    // Watch assets files  
    gulp.watch(Config.assets.src, ['assets:dev']);
    // Watch .js files  
    gulp.watch(Config.js.src, ['js:dev']);
    // Watch image files  
    gulp.watch(Config.img.src, ['images:dev']);
  }
  gulp.task('dev', function () {
    sequence('clean', 'html:dev', 'css:dev', 'sass:dev', 'js:dev', 'assets:dev', 'images:dev')(devCb)
  })

  const clean = require('gulp-clean');
  /**
   * 清空所选目录
   */
  gulp.task('clean', function () {
    return gulp.src(Config.dist + "*")
      .pipe(clean())
  })

}
//======= gulp dev 开发环境下 ===============
module.exports = dev;

// https://blog.csdn.net/qq_15096707/article/details/54293203