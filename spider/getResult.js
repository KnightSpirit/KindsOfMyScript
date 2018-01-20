const http = require('http');
const Line = require('line-by-line');
const fs = require('fs');
const zlib = require('zlib');
const cheer = require('cheerio');

function ToHtml(hSource){
  return zlib.inflateSync(Buffer.from(hSource, 'base64')).toString();
}

const w = fs.createWriteStream('./zmhScrapy.txt');
const fw = fs.createWriteStream('./zmhScrapyFails.txt');
const user = "ssp", token = "5da4ce3d4290de27fb65dfcb971accce";
let handler, fetching = true;

function GetResult(fn){
  try {
    let req = http.request({
      host:'spider.audienx.com',
      port: 9527,
      method: 'GET',
      path:`/getStreamResults?user=${user}&token=${token}`
    }, res => {
      let a = '';
      res.on('data', c =>{
        a += c;
      });
      res.on('error', () => {});
  
      res.on('end', ()=>{
        let url = ''; 
        try {
          let data = JSON.parse(a);
          if (data.length > 0) {
            for (let d of data) {
              url = d.url;
              w.write(`"${d.url}"\t${d.status}\t${d.status_code}\t${d.headers["Content-Type"]}\t${d.content ? fn(ToHtml(d.content.replace('\n', ''))): ''}\n`)
              if (d.status === 'StTaskFailed') {
                fw.write(d.url + '\n');
              }
            }
          } 
        } catch(err) {
            w.write(`"${url}"\tResultError\n`)
        }
      })
    });
    req.on('error', err => {

    });
    req.end();
  } catch (error) {
    
  }
}

function TitleRule(source){
  let $ = cheer.load(source);
  let t, k, d;
  if ($('title') && $('title').html()) {
    t = $('title').html().replace(/[\n\s]/g, '');
    if (t.indexOf('&#x') >= 0) {
      t = `${unescape(t.replace(/&#x/g, '%u')).replace(/;/g, '')}`;
    }
  } else {
    t = '无Title';
  }
  if ($('meta[name=keywords]') && $('meta[name=keywords]').attr('content')) {
    k = $('meta[name=keywords]').attr('content').replace(/[\n\t]/g, '');
  } else {
    k = '无Meta keywords';
  }
  if ($('meta[name=description]') && $('meta[name=description]').attr('content')) {
    d = $('meta[name=description]').attr('content').replace(/[\n\t]/g, '');
  } else {
    d = '无Meta description';
  }
  return [t, k, d].join('\t');
}

handler = setInterval(GetResult, 1000, TitleRule);