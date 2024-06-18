'use client'
import { useState } from "react"
import HomeBox from "./HomeBox"
import { useRouter } from "next/navigation"
import MeetingModal from "./MeetingModal"

export default function MeetingTypeList() {
    const [meetingState, setMeetingState] = useState<'isScheduilgMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    const router = useRouter();
    const createMeeting = ()=>{

    }
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeBox 
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={()=>{
            setMeetingState('isInstantMeeting')
        }}   
        className='bg-orange-1'    
      />
      <HomeBox 
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={()=>{
            setMeetingState('isScheduilgMeeting')
        }}
        className='bg-blue-1' 
        />
      <HomeBox 
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={()=>{
            setMeetingState('isJoiningMeeting')
        }}
        className='bg-purple-1'
        />
      <HomeBox 
        img="/icons/join-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={()=>{
            router.push('/recording')
        }}
        className='bg-yellow-1'
        />
        <MeetingModal
         isOpen={meetingState === 'isInstantMeeting'}
         onClose={()=> setMeetingState(undefined)}
         title='Start an instant meeting'
         className='text=center'
         buttonText='Start Meeting'
         handleClick={createMeeting}
        />
    </section>
  )
}
