const fs = require('fs');
const gulp = require('gulp');
const data = require('gulp-data');
const gulpSass = require('gulp-sass');
const nunjucks = require('gulp-nunjucks');
const rename = require('gulp-rename');
const dartSass = require('sass');

const sass = gulpSass(dartSass);

const packageFile = './package.json';
const scssSources = './src/**/*.scss';
const scssUtilsSources = './src/utils';
const cssOutput = './main.css';
const templateSource = './templates/main.user.css.njk';
const userCssOutput = './main.user.css';

function buildStyles() {
  return gulp.src(scssSources)
    .pipe(sass.sync({ includePaths: [scssUtilsSources], charset: false })
      .on('error', sass.logError))
    .pipe(gulp.dest('.'));
}

function buildUserStyles() {
  return gulp.src(templateSource)
    .pipe(data(getUserStylesData))
    .pipe(nunjucks.compile({}, { autoescape: false }))
    .pipe(rename(userCssOutput))
    .pipe(gulp.dest('.'));
}

function getUserStylesData() {
  const packageJson = JSON.parse(fs.readFileSync(packageFile));
  const mainCss = fs.readFileSync(cssOutput).toString();

  return {
    name: packageJson.userCss.name,
    namespace: packageJson.userCss.namespace,
    version: packageJson.version,
    description: packageJson.description,
    author: packageJson.author,
    license: packageJson.license,
    domain: packageJson.userCss.domain,
    main_css: mainCss,
  };
}

function clean() {
  return Promise.all([
    fs.promises.rm(cssOutput, { force: true }),
    fs.promises.rm(userCssOutput, { force: true }),
  ]);
}

function watch() {
  gulp.watch([scssSources, templateSource], exports.default);
}

exports.buildStyles = buildStyles;
exports.buildUserStyles = buildUserStyles;
exports.clean = clean;
exports.watch = watch;
exports.default = gulp.series(buildStyles, buildUserStyles);
