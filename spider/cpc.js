const http = require('http');
const Line = require('line-by-line');
const fs = require('fs');

// const r = new Line('C:\\Users\\Administrator\\Documents\\WXWork\\1688851526309603\\Cache\\File\\2017-12\\scrapy171201.txt');
const r = new Line('./re.txt');
const w = fs.createWriteStream('./sendResult.txt');

let user = "ssp", token = "5da4ce3d4290de27fb65dfcb971accce";
let count = 1;
let totalCont = 0;
let qArr = [];
let group = 1;
r.on('line', v => {
  let p = v.split('\t')[0];
  let t = {
    user,
    "url": p.startsWith('http') ? p: `http://${p}`,
    "interval": 10,
    "handler": "source",
    "timeout": 5,
    "priority": 1,
    "index": 0,
    "depth": 0,
    "force": 1
  };
  if (count ++ === 20) {
    console.log('to sleep');
    totalCont += qArr.length;
    SendReq(qArr);
    qArr.length = 0;
    qArr.push(t);
    count = 1;
    r.pause();
    setTimeout(() => {
      console.log('sleeping');
      r.resume();
    }, 1000);
  } else {
    qArr.push(t);
  }
});
r.on('end', () => {
  if (qArr.length > 0) {
    totalCont += qArr.length;
    SendReq(qArr);
  }
})
function SendReq(qArr){
  let req = http.request({
    host:'spider.audienx.com',
    port: 9527,
    method: 'POST',
    path:'/putTaskBatch'
  }, res => {
    w.write(`${res.statusCode}-${res.statusMessage}-totalCount:${totalCont}-group:${group++}\n`);
  });
  
  let d = {
    user,
    token,
    "tasks": qArr
  };

  req.write(JSON.stringify(d));
  req.on('error', err => {
    w.write(`${group++}-${err.message}\n`)
  });

  req.end();
}
