"use strict";
class Students {
    constructor(firstName, lastName, nickname) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
    }
}
const web7722 = new Students("ingoo", "JJang", "ing");
class Users {
    constructor(firstName, lastName, nickname) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
class Players extends Users {
    getNickName() {
        console.log(this.nickname);
    }
}
const ingooJJang = new Players("ingoo", "JJang", "ing");
