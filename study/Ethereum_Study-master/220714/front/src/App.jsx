import React from 'react';
import useWeb3 from './hooks/useWeb3';
import Counter from './components/Counter';
import './App.css';

function App() {
    const [web3, account] = useWeb3();
    console.log('hello world App');

    if (!account) return <h1>메타마스크를 연결해주세요.</h1>;
    return (
        <div className="App">
            <h2>Account : {account}</h2>
            <Counter web3={web3} account={account} />
        </div>
    );
}

export default App;
