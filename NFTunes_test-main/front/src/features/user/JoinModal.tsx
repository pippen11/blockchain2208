import { useAppSelector } from '../../hooks/exhook';
import { joinCount } from '../../modules/modalSlice';

import Join from './JoinForm';

/* -top 속성으로 화면 옮김 */
const JoinModal = () => {
  const display = useAppSelector(joinCount)

  return(
    <div className={` flex absolute items-center justify-center w-full h-full ${display} `}>
      <div className={ `w-1/2 md:max-w-md mx-auto rounded overflow-y-auto bg-gray-500 z-30 ${display} `}>
        <div id="join-inner" className="flex justify-center">
          <Join />
        </div>
      </div>
    </div>
  )
}

export default JoinModal
