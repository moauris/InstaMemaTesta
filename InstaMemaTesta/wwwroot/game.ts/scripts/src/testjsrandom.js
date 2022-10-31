"use strict";
let low = 1;
let high = 2;
let len = high - low;
let histo = new Array(len);
for (let i = 0; i < len; i++) {
    histo[i] = 0;
}
for (let i = 0; i < 100000; i++) {
    let r = getRandom(low, high);
    histo[r - low]++;
}
console.log(histo);
