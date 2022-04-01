const {src,dest,task,watch,series,parallel} = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const csscomb = require('gulp-csscomb');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const sortCSSmd = require('sort-css-media-queries');

const PATH = {
  scssRoot : 'assets/scss/style.scss',
  scssFiles : 'assets/scss/**/*.scss',
  scssFolder : 'assets/scss',
  cssFolder : 'assets/css',
  htmlFiles : '*.html',
  jsFiles : 'assets/js/**/*.js',
}
const PLUGINS = [autoprefixer({
  overrideBrowserslist:['last 5 versions','>1%'],
}),
mqpacker({sort: sortCSSmd})
]

function scss() {
return src(PATH.scssRoot)
.pipe(sass().on('error',sass.logError))
.pipe(postcss(PLUGINS))
.pipe(csscomb())
.pipe(dest(PATH.cssFolder))
.pipe(browserSync.stream());
}
function scssDev() {
  const devPlugins = [...PLUGINS]
  devPlugins.shift()
  return src(PATH.scssRoot,{sourceMap:true})
  .pipe(sass().on('error',sass.logError))
  .pipe(postcss(devPlugins))
  .pipe(dest(PATH.cssFolder,{sourceMap:true}))
  .pipe(browserSync.stream());
  }

function scssMin() {
  const pluginsExtended = [...PLUGINS,cssnano({preset: 'default'})]

  return src(PATH.scssRoot)
  .pipe(sass().on('error',sass.logError))
  .pipe(postcss(pluginsExtended))
  .pipe(rename({suffix:'.min'}))
  .pipe(dest(PATH.cssFolder))
 }
 
function comb() {
  return src(PATH.scssFiles)
  .pipe(csscomb())
  .pipe(dest(PATH.scssFolder))
  }

function syncInit() {
  browserSync.init({
    server: {
        baseDir: './'
    }
});
}
async function reload() {
  browserSync.reload();
}

function watchFiles() {
 syncInit()
 watch(PATH.scssFiles,scss)
 watch(PATH.htmlFiles,reload)
 watch(PATH.jsFiles,reload)
}

task('watch',watchFiles)
task('scss',series(scss,scssMin))
task('min',scssMin)
task('dev',scssDev)
task('comb',comb)



// function myfunc() {
//   return gulp.src('assets/scss/style.scss').pipe(gulp.dest('assets/css'))
//   }
//   gulp.task('mytask',myfunc)