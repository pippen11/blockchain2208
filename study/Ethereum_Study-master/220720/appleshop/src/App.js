import React from 'react';
import './App.css';
import useWeb3 from './hooks/useWeb3';
import AppleShop from './components/AppleShop';

function App() {
    const [web3, account] = useWeb3();

    if (!account) return <h1>메타마스크 연결 이후 사용해주세요</h1>;

    return (
        <div className="App">
            <h2>사과앱</h2>
            <AppleShop web3={web3} account={account} />
        </div>
    );
}

export default App;
