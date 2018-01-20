function distinctSortByArray(a1, a2) {
    if (a1.length === 0 || a2.length === 0) {
        return a1.concat(a2);
    }
    var i = 0, j = 0, result = [];
    while (i < a1.length && j < a2.length) {
        if (a1[i] < a2[j]) {
            result.push(a1[i++]);
        }
        else if (a1[i] === a2[j]) {
            result.push(a1[i++]);
            j++;
        }
        else {
            result.push(a2[j++]);
        }
    }
    if (i < a1.length) {
        return result.concat(a1.slice(i));
    }
    if (j < a2.length) {
        return result.concat(a2.slice(j));
    }
}
console.log(distinctSortByArray([1, 2, 3, 4, 5, 6], [1, 2, 3, 9]));
