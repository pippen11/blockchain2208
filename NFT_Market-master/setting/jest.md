# Jest

```sh
$ npm install -D ts-jest @types/jest babel-core
$ npm install -D @babel/preset-typescript @babel/preset-env
```

**babel.config.js**

```
module.exports = {
	presets:[
		[
            '@babel/preset-env',
            {targets: {node:'current'}}
		],
		'@babel/preset-typescript'
	]
}
```

**jest.config.ts**

```
import type { Config } from '@jest/types'

const config:Config.InitialOptions = {

}
```

-   express
    https://seongsu.me/express-tdd/
