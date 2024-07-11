'use client'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

export default function Meeting({params}:{ params : { id : string} }) {
  
  const { user, isLoaded} = useUser();
  const [ isSetupComplete, setIsSetupComplete ] = useState(false);


  return (
    <main className='h-screen w-full'>
     <StreamCall>
      <StreamTheme>
        {!isSetupComplete? "Meeting Setup":"Meeting Room"}
      </StreamTheme>
     </StreamCall>
    </main>
  )
}
