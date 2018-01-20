function merge(arr1, arr2){
  let mergedArr = [];
  let a1Index = 0, a2Index = 0;
  while(a1Index < arr1.length && a2Index < arr2.length){
    if (arr1[a1Index] > arr2[a2Index]){
      mergedArr.push(arr2[a2Index++]);
    } else {
      mergedArr.push(arr1[a1Index++]);
    }
  }

  while (a1Index < arr1.length) {
    mergedArr.push(arr1[a1Index++]);
  }

  while (a2Index < arr2.length) {
    mergedArr.push(arr2[a2Index++]);
  }
  return mergedArr;
}

function mergeSort(arr){
  if(arr.length === 1 || arr.length === 0) return arr;
  let mid = Math.floor(arr.length / 2);
  return merge(mergeSort(arr.slice(0, mid)),  mergeSort(arr.slice(mid, arr.length)));
}

let m = mergeSort([4, 2, 1, 323, 3, -1]);

console.log(m);