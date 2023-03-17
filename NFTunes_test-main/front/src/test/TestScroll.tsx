import Cat1 from './cat1';
import Cat2 from './cat2';
import Cat3 from './cat3';

const TestScroll = () => {
  return(
    <>
      <div className="relative max-w-7xl h-screen m-36 snap-start flex-shrink-0 ">
        <Cat1 />
      </div>
      <div className="relative max-w-7xl h-screen m-36 snap-start flex-shrink-0">
        <Cat2 />
      </div>
      <div className="relative max-w-7xl h-screen m-36 snap-start flex-shrink-0">
        <Cat3 />
      </div>
    </>
  )
}
export default TestScroll
