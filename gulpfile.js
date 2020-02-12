const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');

gulp.task('clean', () => {
  return del('dist/**', { force: true });
});

gulp.task('typescript-compile', () => {
  const tsProject = ts.createProject('tsconfig.json');
  const tsResult = tsProject.src()
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('copy-static-resources', () => {
  return gulp.src('src/public/**')
    .pipe(gulp.dest('dist/public'));
});

gulp.task('copy-views', () => {
  return gulp.src('src/views/**')
    .pipe(gulp.dest('dist/views'));
});

gulp.task('default', gulp.series('clean', 'typescript-compile', 'copy-static-resources', 'copy-views'));