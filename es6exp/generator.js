function* EnumArray(){
  let a = [1,2,3,4,5];
  for (let aa = 1; aa <= a.length; aa++) {
    yield a[aa - 1];
  }
}

let e = EnumArray();
let a = e.next();
while(!a.done){
  console.log(a.value);
  a = e.next();
};

