const Line = require('line-by-line');
const fs = require('fs');
const moment = require('moment');
const r = new Line(process.argv[2]);
const w = fs.createWriteStream(process.argv[3]);
let level = [50, 100, 150, 200];
w.write(`RouteDevKey\t当月实际浏览日志数\t在线日期\t在线/可在线\t可在线天数\t${level.map(v => `每日日志访问量标准:${v}`).join('\t')}\t${level.map(v => `实际访问量比值:${v}`).join('\t')}\t常驻设备\n`);
let d = {}, ckey = {key: '', value: ''}, first = true, key = '', totalCount, firstDate, EndOfDateNumber,
    firstDateNumber, shouldOnlineDays, onlinePercent, oPercentFormat, originCount, actualDay;

r.on('line', v => {
  let [count, dev, rou, city, dt] = v.split('\t');
  count = parseInt(count);
  dt = parseInt(dt);
  let dkey = `${dev}-${rou}-${city}`;
  if (!first) {
    if (ckey.key === dkey) {
      let deviceInfo = ckey.value;
      deviceInfo[0] += count;
      deviceInfo[1].push(dt);
      ckey.value = deviceInfo;
    } else {
      ckey.value[1].sort();
      totalCount = ckey.value[0];
      firstDate = ckey.value[1][0].toString();
      EndOfDateNumber = moment(firstDate).endOf('month').date();
      firstDateNumber = moment(firstDate).date();
      shouldOnlineDays = firstDateNumber === 1 ?  EndOfDateNumber : EndOfDateNumber - firstDateNumber + 1;
      onlinePercent = ckey.value[1].length / shouldOnlineDays;
      oPercentFormat = (onlinePercent * 100).toFixed(2);
      shouldHitCount = level.map(v => (v * EndOfDateNumber * onlinePercent).toFixed(0));
      WriteFile();
      ckey.key = dkey;
      ckey.value = [count, [dt]];
    }
  } else {
    first = false;
    ckey.key = dkey;
    ckey.value = [count, [dt]];
  }
})

function WriteFile(){
  w.write(`${ckey.key}\t${ckey.value.join('\t')}\t${oPercentFormat}%\t${shouldOnlineDays}\t${shouldHitCount.join('\t')}\t${shouldHitCount.map(v => totalCount / v > 1 ? 1: 0).join('\t')}\t${(onlinePercent >= 0.25 && totalCount >= shouldHitCount[1]) ? '常驻': '非常驻'} \n`);
}
r.on('end', () => {
  WriteFile();
});
