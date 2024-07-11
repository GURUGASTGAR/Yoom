'use client'
import { useState } from "react"
import HomeBox from "./HomeBox"
import { useRouter } from "next/navigation"
import MeetingModal from "./MeetingModal"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useToast } from "@/components/ui/use-toast"


export default function MeetingTypeList() {
    const [meetingState, setMeetingState] = useState<'isScheduilgMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    const router = useRouter();
    const { user , isLoaded } = useUser();
    const client = useStreamVideoClient();
    const [values,setValues] = useState({
      dateTime: new Date(),
      description:'',
      link:''
    })
    const [callDetails, setCallDetails] = useState<Call>()
    const { toast } = useToast();

    const createMeeting = async ()=>{
      if(!user || !client) return;
      try {
      if(!values.dateTime){
        toast({
          title: "Please select date and time",
        })
        return;
      }
      const  id = crypto.randomUUID();        
      const call = client.call('default', id);
      console.log("id: ",id)
      if(!call) throw new Error('failed to create call');

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data:{
          starts_at: startsAt,
          custom:{
            description
          }
        }
      })
          
       setCallDetails(call);
       if(!values.description) {
        router.push(`/meeting/${call.id}`)
       }
       toast({
        title: "Meeting created",
      })
      } catch (error) {
        console.log(error)
          toast({
            title: "Faled to create Meeting",
          })
      }


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
