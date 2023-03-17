import Image from 'next/image';
import i3 from '../../public/images/i3.jpg'

const Cat3 = () => {
  return(
    <>
      <Image src={i3} layout='fill' objectFit='cover'/>
    </>
  )
}

export default Cat3
