const { exec, spawn, spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');
const myEvent = new EventEmitter();

let gStart = 0, allComms = [];

myEvent.on('download', (com) => {
    let coms = com.split('/');
    console.log('正在下载:' + [coms[coms.length - 3],coms[coms.length - 2],coms[coms.length - 1]].join('/'));
    ExecCommand(coms);
})

myEvent.on('passCom', (length) => {
  if (gStart === allComms.length) return;
  if (length === 1) {
    myEvent.emit('download', allComms[gStart++]);
  } else {
    for (let ind = 0; ind < length; ind++) {
      if (gStart === allComms.length) return;
      myEvent.emit('download', allComms[gStart++]);
    }
  }
})

function CreateDownloadCommand(dateString, folderName, fileName) {
    return `bce bos cp 'bos:/router-output/pt_day=${dateString}/${folderName}/${fileName}' - | hadoop fs -put - '/user/ssp/hive/store/SspData/${dateString}/${folderName}${fileName}'`;
}

function ExecSyncCommand(command, args) {
    let result = spawnSync(command, args);
    console.log(command, args);
    if (result.status !== 0){
      WriteError(result.stderr.toString());
      return {result: false};
    }
    return {result: true, content: result.stdout.toString()};
}
function WriteError(message) {
  let errorFilePath = `./erro${new Date().toLocaleString().split(' ')[0].replace(/-/g, '')}.log`;
  fs.appendFileSync(errorFilePath, message + '\n');
}

function CheckFileNeat(dateString) {
  let bceFolder = `bos:/router-output/pt_days=${dateString}/`;
  let folders = ExecSyncCommand('bce', ['bos', 'ls', bceFolder]);
  let targetFolders = folders.content.split('\n').map(v => v.split(/\s+/)[2]).filter(v => v);
  let result = ExecSyncCommand('hadoop', ['fs', '-mkdir', `/user/ssp/hive/SspData/${dateString}/dev_host`, `/user/ssp/hive/SspData/${dateString}/rou_ip`, `/user/ssp/hive/SspData/${dateString}/ts_log`]);
  if (!result.result) {
     ExecSyncCommand('hadoop', ['fs', '-rmr', `/user/ssp/hive/SspData/${dateString}`]);
     ExecSyncCommand('hadoop', ['fs', '-mkdir', `/user/ssp/hive/SspData/${dateString}/`, `/user/ssp/hive/SspData/${dateString}/dev_host`, `/user/ssp/hive/SspData/${dateString}/rou_ip`, `/user/ssp/hive/SspData/${dateString}/ts_log`]);

  }
  for (let folderName of targetFolders) {
    let bceFilesFolder = `bos:/router-output/pt_days=${dateString}/${folderName}`;
    let bFilesOutput = ExecSyncCommand('bce', ['bos', 'ls', bceFilesFolder]);
    let bFileNames = bFilesOutput.content.split('\n').map(v => v.split(/\s+/)[5]).filter(v => v && v !== '_SUCCESS');
    for (let n of bFileNames) {
      allComms.push(CreateDownloadCommand(dateString, folderName, n));
    }
  }
  myEvent.emit('passCom', 10);

}

function ExecCommand(com){
   console.log('exec ' + com);
   exec(com, (err, sto, sti) => {
       if (err){
         WriteError(err.message);
       }
       myEvent.emit('passCom', 1);
   })
}

CheckFileNeat(process.argv[2]);
