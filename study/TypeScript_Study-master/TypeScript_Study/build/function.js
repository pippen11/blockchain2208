"use strict";
function userMaker(userid) {
    return {
        userid
    };
}
const nico = userMaker("nico");
nico.userpw = 1234;
console.log(nico);
const userMaker2 = (userid) => ({ userid });
const add = (a, b) => a + b;
const push = (config) => {
    if (typeof config === 'string') {
        console.log(config);
    }
    else {
        console.log(config.path, config.state);
    }
};
const multi = (a, b, c) => {
    if (c)
        return a * b * c;
    return a * b;
};
