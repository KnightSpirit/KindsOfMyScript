function longArray(arr){
  if(arr.length === 0 || arr.length === 1) return arr;
  let lengthArr = [];
  lengthArr[0] = 1;
  let max = 0, maxIndex = 0;
  for(let i = 1; i < arr.length; i++){
    if(max === 0){
      max = 1;
      maxIndex = 1;
    }
    if(arr[i] > arr[i - 1]) {
      lengthArr[i] = lengthArr[i - 1] + 1;
      if(lengthArr[i] > max){
        max = lengthArr[i];
        maxIndex = i;
      }
    }
    else {
      lengthArr[i] = 1;
    }
  }
  return arr.slice(maxIndex - max + 1, maxIndex + 1);
}

console.log(longArray([2,5,1,23,2,6,7,8,-1]));