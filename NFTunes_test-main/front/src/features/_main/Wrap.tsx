import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/exhook';
import { loginAsync } from '../user/userSlice';

const Wrap = (props) => {

  const dispatch = useAppDispatch();

  const callback = (accounts: string[]) => {
    dispatch(loginAsync(accounts[0]));
  };

  useEffect(() => {
    window.ethereum?.on('accountsChanged', callback);
    return () => {
      window.ethereum?.removeListener('accountsChanged', callback);
    };
  }, []);


  const [isWheel,setIsWheel] = useState<string>('translate-y-0')
  /**
   * @param {e} e `onWheel` 마우스 조작 이벤트
   * */
  const eventWheel = (e) => {
    if (e.nativeEvent.deltaY > 0) {
      setIsWheel('-translate-y-full')
    } else {
      setIsWheel('translate-y-0')
    }
  }

  const InnerChildren = () => (
    React.Children.map(props.children,(child)=>{
      return React.cloneElement(child,{
        isWheel: isWheel
      })
    })
  )

  return (
      <div id="wrap"
        className="w-full h-full bg-black overflow-y-scroll"
        onWheel={(e)=>{eventWheel(e)}}
      >

        {<InnerChildren />}
      </div>
  )
}

export default Wrap
