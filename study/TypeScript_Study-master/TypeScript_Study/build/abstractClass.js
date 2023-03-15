"use strict";
class Userss {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
class Playerss extends Userss {
    sayHi(name) {
        return `Hello ${name}. My name is ${this.fullName()}`;
    }
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
