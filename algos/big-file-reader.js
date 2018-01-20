const fs = require('fs');
const StringDecoder = require('string_decoder').StringDecoder;
const filePath = 'D:\\EsData\\0827\\result\\match-r-00000';
const stat = fs.statSync(filePath);
const size = stat.size;
console.log(size);

const bigFileStream = fs.createReadStream(filePath);
const blockFileSize = 10 * 1024 * 1024;
const decoder = new StringDecoder('utf8');

let readSize = 0;
let fileIndex = 0;
let writeStream = fs.createWriteStream(`./bigFile/bigFile${fileIndex++}.txt`);
let lastString = '';
  
try{
  bigFileStream.on('data', (chunk) => {
    readSize += chunk.length;
    if (readSize > blockFileSize) {
      readSize = 0;
      writeStream.write(decodeBytes(chunk));
      writeStream.close();
      writeStream = fs.createWriteStream(`./bigFile/bigFile${fileIndex++}.txt`);
    } else{
      if(lastString !== '') {
        writeStream.write(decodeBytes(chunk, true));
        lastString = '';
      } else {
        writeStream.write(chunk);
      }
    }
  });
}
catch (e) {
  bigFileStream.close();
  writeStream.close();
}

function decodeBytes(chunk, last = false){
  if (last) {
    return lastString + decoder.write(chunk);
  }
  let str = decoder.write(chunk);
  let arr = str.split('\n');
  lastString = arr.pop();
  return arr.join('\n');
}





