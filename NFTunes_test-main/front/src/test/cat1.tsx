import Image from 'next/image';
import i1 from '../../public/images/i1.jpg'

const Cat1 = () => {
  return(
    <>
      <Image src={i1} layout='fill' objectFit='cover'/>
    </>
  )
}

export default Cat1
