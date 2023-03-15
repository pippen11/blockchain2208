// myPackage module 선언

interface Configs {
    urls: string
}

// d.ts 파일에서는 call signature만 작성해주면 된다.
declare module "myPackage" {
    function init(config: Configs): boolean;
    function exit(code: number): number;
}