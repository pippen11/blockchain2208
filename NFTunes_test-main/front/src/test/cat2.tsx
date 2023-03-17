import Image from 'next/image';
import i2 from '../../public/images/i2.jpg'

const Cat2 = () => {
  return(
    <>
      <Image src={i2} layout='fill' objectFit='cover'/>
    </>
  )
}

export default Cat2
