const fs = require('fs');
module.exports = {
   IfFileExistedDeleteAndRecreate: function(path) {
      try {
        fs.accessSync(path, fs.constants.F_OK);
        fs.unlinkSync(path);
      } catch (error) {}
      return fs.createWriteStream(path);
   },

   SundaySearch: function (targetStr, patternStr) {
    if (targetStr.length < patternStr.length) return -1;
    let ind = 0, matchedCount = 0;
  
    while (matchedCount < targetStr.length) {
     if (ind === patternStr.length) return matchedCount;
     if (patternStr[ind] !== targetStr[matchedCount + ind]) {
       matchedCount += patternStr.length;
  
       if (!targetStr[matchedCount]) return -1;
       let pIndex = patternStr.indexOf(targetStr[matchedCount]);
       
       if (pIndex >= 0) {
         matchedCount -= pIndex;
         ind = 0;
       } else {
         matchedCount += 1;
       }
     } else {
       ind++;
     }
    }
    return -1;
  }
}