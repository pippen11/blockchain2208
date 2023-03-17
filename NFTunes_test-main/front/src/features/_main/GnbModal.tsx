import { useAppDispatch, useAppSelector } from '../../hooks/exhook';
import { gnbCount, handleGnb, handleScroll } from '../../modules/modalSlice';
import Top5Tab from './gnbTab/top5Tab';
import { batch } from 'react-redux';

/* -top 속성으로 화면 옮김 */
const GnbModal = () => {
  const dispatch = useAppDispatch();
  const topProperty = useAppSelector(gnbCount);

  const clickModal = () => {
    batch(() => {
      dispatch(handleGnb());
      dispatch(handleScroll());
    });
  };

  return (
    <div className={`fixed w-full h-screen bg-black z-20 ${topProperty} `}>
      <div
        id="gnb-inner"
        className="mx-auto flex justify-between max-w-7xl text-zinc-400 h-full left-0 right-auto bottom-auto"
      >
        <div id="gnb-pageTab1" className="flex flex-col w-2/5 p-12">
          <Top5Tab cate={'music'} />
        </div>
        <div id="gnb-pageTab2" className="flex flex-col w-2/5 p-12">
          <Top5Tab cate={'auction'} />
        </div>
        <div id="gnb-userTab" className=" w-1/5 p-12">
          <a
            onClick={() => {
              clickModal();
            }}
          >
            gnbTest
          </a>
        </div>
      </div>
    </div>
  );
};

export default GnbModal;
