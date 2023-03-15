"use strict";
const superPrint = (arr) => {
    arr.forEach(v => console.log(v));
};
superPrint([1, 2, 3, 4]);
superPrint([true, false, true]);
superPrint(["hi", "hello", "bye"]);
superPrint([1, 2, true, false, "hello"]);
const superPrint2 = (arr) => arr[0];
const aa = superPrint2([1, 2, "hi", true]);
const superPrint3 = (arr) => arr[0];
const bb = superPrint3([1, 2, 3], "xx");
const dev = {
    name: 'bitkunst',
    extraInfo: {
        favFood: 'chicken'
    }
};
let nums = [1, 2, 3];
