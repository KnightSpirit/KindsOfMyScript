const fs = require('fs');
const Line = require('line-by-line');
const path = require('path');
const folder = process.argv[2] || './checkFolder';

const targetFiles = fs.readdirSync(folder);
const wFault = fs.createWriteStream(path.join(folder, 'faults.txt'))
function* Main(){
  for(let fileName of targetFiles) {
    yield MeasureFile(fileName);
  }
}

let a = Main();

function CloseWriteHandler(w) {
  w.end();
  w.close();
}

function MeasureFile(fileName){
  console.log(fileName);
  const fileNameWithoutExt = path.basename(fileName).split('.')[0];
  const r = new Line(path.join(folder, fileName), 'utf8');
  const wRight = fs.createWriteStream(path.join(folder, fileNameWithoutExt + '.r.txt'))
  r.on('line', v => {
    let sArr = v.split('\t');
    let col7 = sArr[7];
    if ((col7 !== 'GET' && col7 !== 'POST') || sArr.length > 21) {
      wFault.write(v + '\n');
    } else{
      wRight.write(v + '\n');
    }
  })
  r.on('end', () => {
    CloseWriteHandler(wRight);
    a.next();
  });
}

a.next();