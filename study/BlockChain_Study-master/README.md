# 블록체인 study

# eslint, prettier

```shell
npm install -D eslint
npm install -D prettier eslint-plugin-prettier eslint-config-prettier
```

-   .eslintrc 파일 생성
-   .prettierrc 파일 생성

**.eslintrc**

```json
{
    "extends": ["plugin:prettier/recommended"]
}
```

**.prettierrc**

```json
{
    "printWidth": 120,
    "tabWidth": 4,
    "singleQuote": true,
    "trailingComma": "all",
    "semi": true
}
```

VSCode extension : Prettier - Code formatter
<br>
VSCode 설정

-   Default Formatter - Prettier
-   Format On Save - check
