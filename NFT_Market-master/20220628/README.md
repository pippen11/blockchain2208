nodejs web3

test - javscript -> typescript

jest

```sh
$ npm init -y
$ npm install -D jest
```

**package.json**

```json
"scripts":{
    "test": "jest"
}
```

**jest.config.js**

```js
const config = {
    verbose: true,
    testMatch: ['<rootDir>/**/*.test.js'],
}

module.exports = config
```

**web3.test.js**

```js
describe('web3 테스트코드', () => {
    it('테스트', () => {
        console.log('hello world')
    })
})
```

npm run test

```sh
npm install web3
npm install ethereumjs-tx
```
