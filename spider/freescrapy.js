const http = require('https');
const icon = require('iconv-lite');
const cheerio = require('cheerio');
const fs = require('fs');
const line = require('line-by-line');
const { URL } = require('url');

// try {
//   fs.accessSync('./r');
//   fs.unlinkSync('./r');
// } catch (error) {
// }


module.exports = function FreeScrapy(fileName) {
  const w = fs.createWriteStream(fileName + 'we.txt');
  let r = new line(fileName);
  let extractFunc = WeChatArticleNew;
  r.on('line', v => {
    if (v.startsWith('http')) {
      Run(`${v.split('\t')[0]}`, extractFunc);
    } else {
      Run(`https://${v.split('\t')[0]}`, extractFunc);
    }
      
    if (totalCount++ === 5) {
      r.pause();
    }
  });
  
  let recordCount = 1;
  let totalCount = 1;
  function writeRecord(url, extractArr, redirectUrl) {
    let content = extractArr.map(v => {
      if (v.indexOf('&#x') >= 0) {
        return `"${unescape(v.replace(/&#x/g, '%u')).replace(/;/g, '') || ''}"`;
      } else {
        return `"${unescape(v) || ''}"`;
      }
    }).join(',');
    w.write(`"${url}", ${content}\n`);
    if (--totalCount === 1) {
      r.resume();
    }
  }
  
  function Run(url, ruleFn, redirectUrl, outContent) {
    try {
      let urlObject = new URL(redirectUrl || url);
      MeasureRequest(urlObject, ruleFn, redirectUrl);
    } catch (error) {
      writeRecord(url, [error.message.replace('\n', ' ')]);
    }
  }

  function MeasureRequest(urlObject, ruleFn, redirectUrl){
    let req = http.request({
      host: redirectUrl || urlObject.host,
      path: urlObject.pathname + urlObject.search + urlObject.hash,
      method: 'GET',
      encoding: 'utf8',
      headers: {
        'Content-Type': 'text/html',
      }
    }, res => {
      if (MeasureStateCode(res.statusCode, urlObject, res.headers, ruleFn)){
        let c = '';
        res.on('data', chunk => {
          c += chunk;
        });
    
        res.on('end', () => {
          writeRecord(urlObject.href, ruleFn(c, urlObject), redirectUrl);
        });
      }
    });
    req.on('error', err => {
      writeRecord(urlObject.href, ["访问不到站点"]);
    });
    req.end();
  }
  
  function MeasureStateCode(code, url, headers, fn){
    switch(true){
      case code >= 200 && code <= 299:
        return true;
      case code >= 300 && code <= 399:
        try {
          if (headers['location'].startsWith('http')){
            let un = new URL(headers['location']);
            Run(url.href, fn, un.href);
          } else {
            let un = new URL(url.protocol + '//' + url.host + headers['location']);
            Run(url.href, fn, un.href);
          }
        }
        catch(error) {
          writeRecord(url.href, ['URL错误']);
        }
        return false;
      case code >= 400:
        writeRecord(url.href, [`httpCode: ${code}`]);
        return false;
      default:
        return false;
    }
  }
  
  function TitleRule(source){
    let $ = cheerio.load(source);
    let t = $('title').html() || '无Title';
    let k = $('meta[name=keywords]').attr('content') || '无Meta keywords';
    let d = $('meta[name="description"]').attr('content') || '无Meta description';
    return [t, k, d];
  }
  
  function WeChatArticle(source, url){
    let $ = cheerio.load(source);
    let t = $('[x-weixin-history-title]').attr('x-weixin-history-title') || '无Title';
    let a = $('[x-weixin-history-title]').attr('x-weixin-history-source') || '无公众号ID';
    t = t.includes(',') ? t.replace(',', ''): t;
    a = a.includes(',') ? a.replace(',', ''): a;
    if (t !== '无Title'){
      let aID = /biz=(.+?)&/g.exec(url.href)[1];
      let acID = /mid=(.+?)&/g.exec(url.href)[1];
      return [t, a, aID, acID];
    }
    return [t, a];
  }

  function WeChatArticleNew(source, url) {
    let $ = cheerio.load(source);
    let t = $('.rich_media_title').text().replace(/\n/g, '').trim() || '无Title';
    let a = $('#post-user').text().replace(/\n/g, '').trim() || '无公众号ID';
    t = t.includes(',') ? t.replace(',', ''): t;
    a = a.includes(',') ? a.replace(',', ''): a;
    if (t !== '无Title'){
      let aID = /biz=(.+?)&/g.exec(url.href) ?  /biz=(.+?)&/g.exec(url.href)[1] : '';
      let acID = /mid=(.+?)&/g.exec(url.href) ? /mid=(.+?)&/g.exec(url.href)[1] : '';
      return [t, a, aID, acID];
    }
    return [t, a];
  }
}

