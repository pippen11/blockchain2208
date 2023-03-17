import Image from 'next/image'
import loading_spinner from '../../../public/images/loading_spinner.gif'

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black">
      <Image src={loading_spinner} width={200} height={200}></Image>
    </div>
  )
}

export default Loading
