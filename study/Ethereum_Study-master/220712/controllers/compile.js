// JavaScript로 컴파일 진행하기

const solc = require('solc');
const fs = require('fs-extra');
const path = require('path');

// console.log(fs.readFileSync(path.join(__dirname, '../contracts', 'HelloWorld.sol'), 'utf8'));
// readFileSync() 인자값 : 1.파일 경로 , 2.포맷
const contractPath = path.join(__dirname, '../contracts', 'HelloWorld.sol');

/**
 * solc.compile() 인자값
 * 객체 자체가 아닌 string 형태로 들어간다.
 * 객체의 속성
 * 1. language : 어떤 언어로 작성된 것인지 (solidity 이외의 언어로도 스마트 컨트랙트 작성 가능)
 * 2. sources : 어떠한 파일로 진행할 것인지
 * 3. settings : 설정
 */
const data = JSON.stringify({
    language: 'Solidity',
    sources: {
        'HelloWorld.sol': {
            content: fs.readFileSync(contractPath, 'utf8'),
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
});

// solc.compile()은 컴파일을 진행해서 결과물을 보여주기만 할 뿐
// console.log(solc.compile(data));

class Contract {
    static compile(_filename) {
        const contractPath = path.join(__dirname, '../contracts', _filename);
        const data = JSON.stringify({
            language: 'Solidity',
            sources: {
                [_filename]: {
                    content: fs.readFileSync(contractPath, 'utf8'),
                },
            },
            settings: {
                outputSelection: {
                    '*': {
                        '*': ['*'],
                    },
                },
            },
        });

        const compiled = JSON.parse(solc.compile(data));
        console.log(compiled);

        return Contract.writeOutput(compiled); // [abi, bytecode]
    }

    static writeOutput(_compiled) {
        // console.log(_compiled.contracts['HelloWorld.sol'].HelloWorld.abi);
        // 상태 변수에 public이 붙어 있다면 getter 함수를 자동으로 만들어준다.
        console.log(_compiled.contracts);
        for (const contractFileName in _compiled.contracts) {
            // console.log(contractFileName);
            const [contractName] = contractFileName.split('.');
            const contract = _compiled.contracts[contractFileName][contractName];

            const abi = contract.abi;
            const bytecode = contract.evm.bytecode.object;
            // console.log(abi);
            // console.log(bytecode);

            const obj = {
                abi,
                bytecode,
            };
            // json 파일로 내보내기 / fs-extra 내장 모듈 사용
            // 첫번째 인자값: 경로, 두번째 인자값: 객체 내용
            const buildPath = path.join(__dirname, '../build', `${contractName}.json`);
            fs.outputJSONSync(buildPath, obj);

            return [abi, bytecode];
        }
    }
}

Contract.compile('HelloWorld.sol');

module.exports = { Contract };

// npx solc --bin --abi HelloWorld.sol
// JavaScript 코드로 구현
// const [abi, bytecode] = Contract.compile('HelloWorld.sol');

/**
 * JS로 컴파일 진행이 가능하다.
 * Truffle이 내부적으로 이렇게 돌아간다는 사실 인지.
 */
