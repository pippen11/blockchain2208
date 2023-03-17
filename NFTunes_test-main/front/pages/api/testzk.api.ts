// metamask 에서 계정 받아오기

import Web3 from 'web3'

// 연결된 account 가져오는 getWeb3()
export async function getWeb3() {
  const web3 = new Web3(window.ethereum as any)

  const eth = window.ethereum as any

  const accounts = await eth.request({
    method: 'eth_requestAccounts'
  })

  return {
    accounts
  }
}
