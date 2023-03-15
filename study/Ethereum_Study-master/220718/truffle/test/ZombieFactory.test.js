const ZombieFactory = artifacts.require('ZombieFactory');

describe('ZombieFactory', () => {
    let deployed;

    it('Get Deployed', async () => {
        deployed = await ZombieFactory.deployed();
        console.log(deployed);
    });

    it('_createZombie', async () => {
        const result = await deployed._createZombie('ingoo', 111111); // 상태변수 변경, send 트랜잭션
        console.log(result);

        /*
            zombies = [
                Zombie {
                    name : 'ingoo',
                    dna : 111111
                }
            ]
        */

        const arr = await deployed.zombies.call(0);
        // 스마트 컨트랙트에서는 배열 전체 혹은 객체 전체를 return 해주지 않는다.
        // 배열 전체 내용 조회 불가능, 하나씩만 가능
        console.log(arr);
        console.log(arr.name, arr.dna.toNumber()); // BN 객체일 때는 toNumber() 메소드 사용 가능
    });

    it('_generateRandomDna', async () => {
        const dna = await deployed._generateRandomDna('ingoo');
        // return 값이 uint 이기 때무네 BN 으로 나온다.
        // toNumber() 를 사용해도 값이 클 경우 에러가 날 수 있다.
        // toString() 을 사용한 다음 parseInt() 사용
        console.log(parseInt(dna.toString()));
    });

    it('createRandomZombie', async () => {
        const result = await deployed.createRandomZombie('bitkunst'); // call() 이 아니라 send() 트랜잭션
        console.log(result);

        const arr = await deployed.zombies.call(1);
        console.log(arr.name, arr.dna.toString());
    });
});
