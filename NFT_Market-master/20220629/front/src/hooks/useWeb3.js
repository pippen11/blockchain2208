import { useEffect, useState } from 'react'
import Web3 from 'web3/dist/web3.min.js'

const useWeb3 = () => {
    const [account, setAccount] = useState(null)
    const [web3, setWeb3] = useState(null)

    const getChainId = async () => {
        const chainId = await window.ethereum.request({
            method: 'eth_chainId',
        })

        return chainId
    }

    const getRequestAccounts = async () => {
        const account = await window.ethereum.request({
            method: 'eth_requestAccounts',
        })

        return account
    }

    const addNetwork = async chainId => {
        const network = {
            chainId: chainId,
            chainName: 'ingGanache',
            rpcUrls: ['http://127.0.0.1:8545'],
            nativeCurrency: {
                name: 'Ehtereum',
                symbol: 'ETH',
                decimals: 18,
            },
        }

        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [network],
        })
    }

    useEffect(() => {
        const init = async () => {
            try {
                const targetChainId = '0x1e2a'
                const chainId = await getChainId() // 7722
                // 현재 너의메타마스크의 체인아이디가 7722 니 ? 0x1e2a
                console.log('너의 체인아이디 : ', chainId)
                if (targetChainId !== chainId) {
                    // network 를 추가하는 코드를
                    addNetwork(targetChainId)
                }
                const [account] = await getRequestAccounts()

                const web3 = new Web3(window.ethereum)
                setAccount(account)
                setWeb3(web3)
            } catch (e) {
                console.error(e.message)
            }
        }

        if (window.ethereum) {
            init()
        }
    }, [])

    return [account, web3]
}

export default useWeb3
