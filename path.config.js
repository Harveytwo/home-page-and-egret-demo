var sourcePath = {
  basePath: 'docs/',
  html: {
    src: 'src/views/*.html',
    emit: 'views'
  },
  css: {
    src: 'src/css/*.css',
    emit: 'css'
  },
  js: {
    src: 'src/js/*.js',
    emit: 'js'
  },
  img: {
    src: 'src/img/*.{png, jpg, gif, ico}',
    emit: 'img'
  },
  lib: {
    src: 'src/lib/**/*.*',
    emit: 'lib'
  }
}

module.exports = sourcePath;
