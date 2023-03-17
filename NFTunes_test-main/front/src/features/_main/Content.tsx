import Cat3 from '../../test/cat3';
import Cat2 from '../../test/cat2';
import Cat1 from '../../test/cat1';

const Content = () => {

  return (
    <div className=" flex h-full flex-col items-center justify-center snap-y snap-mandatory overflow-y-scroll">
      <div className="relative max-w-7xl w-screen h-screen m-36 snap-start flex-shrink-0 ">
        <Cat1 />
      </div>
      <div className="relative max-w-7xl w-screen h-screen m-36 snap-center flex-shrink-0">
        <Cat2 />
      </div>
      <div className="relative max-w-7xl w-screen h-screen m-36 snap-center flex-shrink-0">
        <Cat3 />
      </div>
    </div>
  )
}

export default Content
