import Image from 'next/image'
import React from 'react'

export default function Loader() {
  return (
    <div className='flex justify-center h-screen w-full'>
        <Image src='/icons/loading-circle.svg'
          alt='loading'
          width={50}
          height={50}/>
    </div>
  )
}
