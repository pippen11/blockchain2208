import { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

interface IAccount {
  account: string
}

export default function ZkSync({ account }: IAccount) {
  return(
    <div>
      <Link href = {'/testzk/[account]'} as = {`/testzk/${account}`}>
        <HelloBox>
          <h2 className = "text-green-600">어서오세요 {account} 님</h2>
        </HelloBox>
      </Link>
    </div>
  )
}

const HelloBox = styled.div`
  cursor: pointer;
`
