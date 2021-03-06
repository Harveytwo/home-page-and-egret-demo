var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var autoprefixer = require('gulp-autoprefixer'); // 处理css中浏览器兼容的前缀  
var rename = require('gulp-rename'); //重命名  
var cssnano = require('gulp-cssnano'); // css的层级压缩合并
var sass = require('gulp-sass'); //sass
var babel = require('gulp-babel');
var jshint = require('gulp-jshint'); //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）  
var uglify = require('gulp-uglify'); //js压缩  
var concat = require('gulp-concat'); //合并文件  
var imagemin = require('gulp-imagemin'); //图片压缩 
var sequence = require('gulp-sequence');
var Config = require('./gulpfile.config.js');
//======= gulp build 打包资源 ===============
function prod() {
  /** 
   * HTML处理 
   */
  gulp.task('html', function () {
    return gulp.src(Config.html.src)
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      })).pipe(gulp.dest(Config.html.dist));
  });
  gulp.task('htmlPages', function () {
    return gulp.src(Config.htmlPages.src)
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      })).pipe(gulp.dest(Config.htmlPages.dist));
  });
  /** 
   * assets文件夹下的所有文件处理 
   */
  gulp.task('assets', function () {
    return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist));
  });
  /** 
   * CSS样式处理 
   */
  gulp.task('css', function () {
    return gulp.src(Config.css.src).pipe(autoprefixer('last 2 version')).pipe(gulp.dest(Config.css.dist)).pipe(cssnano()) //执行压缩  
      .pipe(gulp.dest(Config.css.dist));
  });
  /** 
   * SASS样式处理 
   */
  gulp.task('sass', function () {
    return gulp.src([Config.sass.src, '!./src/sass/function.scss']).pipe(sass())
    //执行压缩
    .pipe(cssnano())
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'Android >= 4.0'
      ],
      cascade: false
    })).pipe(gulp.dest(Config.sass.dist))
      .pipe(gulp.dest(Config.sass.dist));
  });
  /** 
   * js处理 
   */
  gulp.task('js', function () {
    return gulp.src(Config.js.src).pipe(babel({
      presets: ['env']
    })).pipe(uglify()).pipe(gulp.dest(Config.js.dist));
  });
  /** 
   * 合并所有js文件并做压缩处理 
   */
  gulp.task('js-concat', function () {
    return gulp.src(Config.js.src).pipe(concat(Config.js.build_name)).pipe(uglify()).pipe(gulp.dest(Config.js.dist));
  });
  /** 
   * 图片处理 
   */
  gulp.task('images', function () {
    return gulp.src(Config.img.src).pipe(imagemin({
      optimizationLevel: 3
      , progressive: true
      , interlaced: true
    })).pipe(gulp.dest(Config.img.dist));
  });
  const clean = require('gulp-clean');
  /**
   * 清空所选目录
   */
  gulp.task('clean', function () {
    return gulp.src(Config.dist + "*")
      .pipe(clean())
  })

  gulp.task('build', function (cb) {
    sequence('clean', 'html', 'htmlPages', 'css', 'sass', 'js', 'assets', 'images')(cb);
  })
  // gulp.task('build', ['clean', 'html', 'css', 'sass', 'js', 'assets', 'images']);


}
module.exports = prod;