import useWeb3 from '../../hooks/useWeb3'
import { useEffect, useState } from 'react';
import ZkSync from './ZkSync';

function Main() {
  const { web3, account, networkId } = useWeb3()
  const [userAccount,setUserAccount] = useState<string>('')

  useEffect(()=>{
    // db 에서 가져왔다고 가정함.
    setUserAccount(account)
  },[])

  return (
    <div>
      <ZkSync account={ account }/>
    </div>
  )
}

export default Main
