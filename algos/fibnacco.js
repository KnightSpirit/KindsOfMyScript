function getFibonacci(n){
    let result = [0, 1];
    if (n < 2) return result[n];
    let fOne = 0;
    let fTwo = 1;
    let fN = 0;
    for(let i = 2; i <= n; i++){
        fN = fOne + fTwo;
        fOne = fTwo;
        fTwo = fN;
    }
    return fN;
}

let a = getFibonacci(4);
console.log(a);