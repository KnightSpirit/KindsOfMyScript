const g = require('gulp');
const ts = require('gulp-typescript');
const sm = require('gulp-sourcemaps');

const tsPro = ts.createProject('./tsconfig.json');

g.task('script', () => {
  const res = g.src('./src/*.tsx').pipe(sm.init()).pipe(tsPro);
  return res.js.pipe(sm.write()).pipe(g.dest('./out'));
})

g.task('watch', ['script'], () => {
  g.watch('./src/*.tsx', ['script']);
  g.watch('./src/*.ts', ['script']);
})