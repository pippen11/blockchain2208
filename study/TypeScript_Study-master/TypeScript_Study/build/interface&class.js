"use strict";
class Player2 {
    constructor(firstName, lastName, health) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.health = health;
    }
    sayHi(name) {
        return `Hello ${name}. My name is ${this.fullName()}`;
    }
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
function makeHuman(human) {
    return "hi";
}
makeHuman({
    health: 10
});
