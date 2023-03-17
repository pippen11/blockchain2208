import i1 from '../../../public/images/i1.jpg';
import i2 from '../../../public/images/i2.jpg';
import i3 from '../../../public/images/i3.jpg';
import i4 from '../../../public/images/i4.jpg';
import Image from 'next/image';
import React, { FunctionComponent, useEffect, useState } from 'react';

const SlideList = () => {
  const tempArr = [i1, i4, i2, i3, i1, i2];
  const [imgWidth, setImgWidth] = useState<number>(0);
  const [slide, setSlide] = useState<number>(0);

  useEffect(() => {
    setSlide(imgWidth);
  }, [imgWidth]);

  const slideHandler = (direction) => {
    const temp = document.querySelector('#slideBox0').clientWidth;

    if (direction === 'left') {
      setImgWidth(imgWidth + temp);
    } else if (direction === 'right') setImgWidth(imgWidth - temp);
  };

  return (
    <>
      <div id="buttonWrap" className="flex justify-end">
        <div
          id="slideButton"
          onClick={() => {
            slideHandler('left');
          }}
          className="text-zinc-400 mr-5 cursor:pointer"
        >
          <span>왼쪽</span>
        </div>
        <div
          id="slideButton"
          onClick={() => {
            slideHandler('right');
          }}
          className="text-zinc-400 mr-5 cursor:pointer"
        >
          <span>오른쪽</span>
        </div>
      </div>
      <div
        id="test"
        style={{
          position: 'relative',
          border: '1px',
          height: '32rem',
          padding: '1.25rem',
          display: 'flex',
          transform: `translateX(${slide}px)`,
          transition: 'transform 0.5s ease',
        }}
      >
        {tempArr.map((v, i) => {
          return (
            <div key={i} id={`slideBox${i}`} className={` relative w-1/3 h-full shrink-0 mr-10 `}>
              <Image src={v} layout="fill" className="" />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default SlideList;
