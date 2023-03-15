"use strict";
class LocalStorage {
    constructor() {
        this.storage = {};
    }
    set(key, value) {
        this.storage[key] = value;
    }
    remove(key) {
        delete this.storage[key];
    }
    get(key) {
        return this.storage[key];
    }
    clear() {
        this.storage = {};
    }
}
const stringsStorage = new LocalStorage();
stringsStorage.get("key");
stringsStorage.set("hello", "how are you");
const booleansStorage = new LocalStorage();
booleansStorage.get("key");
booleansStorage.set("hello", true);
