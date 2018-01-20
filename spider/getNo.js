const Line = require('line-by-line');
const fs = require('fs');

const al = new Line('./zmhScrapy1.txt');
const w = fs.createWriteStream('./re.txt');

let d = [];
let rr = [];

al.on('line', v => {
  d.push(v.split('\t')[0].replace(/"/g, ''))
});

al.on('end', () => {
  const r = new Line('C:\\Users\\Administrator\\Documents\\WXWork\\1688851526309603\\Cache\\File\\2017-12\\scrapy171208.txt');
  r.on('line', v => {
    rr.push(v);
  });

  r.on('end', () => {
    for (let a of rr) {
      if (d.indexOf(a) < 0) {
        w.write(a + '\n');
      }
    }
  })
})

process.on('uncaughtException', e => {
  console.log(e);
})