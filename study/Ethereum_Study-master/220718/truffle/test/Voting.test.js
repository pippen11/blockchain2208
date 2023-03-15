const Voting = artifacts.require('Voting');

// only를 붙일 경우 해당 테스트 코드만 실행됨
describe.only('Voting', () => {
    let deployed;
    let candidateList;

    it('deployed', async () => {
        deployed = await Voting.deployed();
        // console.log(deployed);
    });

    it('candidateList', async () => {
        // const candidate1 = await deployed.candidateList.call(0); // 1초
        // const candidate2 = await deployed.candidateList.call(1); // 1초
        // const candidate3 = await deployed.candidateList.call(2); // 1초
        // const candidate4 = await deployed.candidateList.call(3); // 1초
        // 총 4초 소요

        const request = [
            deployed.candidateList.call(0), // 1초
            deployed.candidateList.call(1), // 2초
            deployed.candidateList.call(2), // 3초
            deployed.candidateList.call(3), // 1초
        ];
        // 총 3초 소요

        // Promise로 반환되는 값들을 배열 안에 담는다.
        candidateList = await Promise.all(request);
        // 전부 백그라운드에 넣어놓고 완료되는 순서대로 테스트 큐에 쌓이면서 콜스택으로 넘어오게 된다.

        console.log(candidateList);
    });

    it('voteForCandidate', async () => {
        await deployed.voteForCandidate(candidateList[0]);
        await deployed.voteForCandidate(candidateList[1]);
        await deployed.voteForCandidate(candidateList[3]);
        await deployed.voteForCandidate(candidateList[2]);
        await deployed.voteForCandidate(candidateList[0]);
        await deployed.voteForCandidate(candidateList[0]);
        await deployed.voteForCandidate(candidateList[2]);
        await deployed.voteForCandidate(candidateList[0]);

        for (const candidate of candidateList) {
            let count = await deployed.totalVotesFor(candidate);
            console.log(`${candidate} : ${count}표`);
        }
    });
});
