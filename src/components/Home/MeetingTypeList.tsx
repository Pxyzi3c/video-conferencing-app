'use client'

import React, { RefObject, useRef, useState } from 'react';

import { 
    Plus,
    CalendarClock ,
    Video,
    UserRoundPlus,
    Clipboard,
    CalendarCheck
} from 'lucide-react';

import { Toast, ToastMessage } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
        
import Card from './Card';
import MeetingModal from './MeetingModal';

import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''        
    })
    const [callDetails, setCallDetails] = useState<Call>();
    const toast = useRef<Toast>(null);

    const showMessage = (title: string, message: string, ref: RefObject<Toast>, severity: ToastMessage['severity']) => {
        ref.current?.show({
            severity: severity,
            summary: title,
            detail: message,
            life: 3000
        })
    }

    const createMeeting = async () => {
        if(!user || !client) return;

        try {
            if(!values.dateTime) {
                showMessage('Warning!', 'Please select a date and a time!', toast, 'warn');
                return;
            }

            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if(!call) throw new Error('Failed to create call');

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant meeting';
        
            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setCallDetails(call);

            
            showMessage('Success!', 'Meeting created successfully!', toast, 'success');
            
            if(!values.description) {
                setTimeout(() => {
                    router.push(`/meeting/${call.id}`)
                }, 1000)
            }
            
        } catch (error) {
            console.log(error)
            showMessage('Error!', 'Failed to create meeting!', toast, 'error');
        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <Card 
                title="New Meeting"
                icon={<Plus />}
                description="Start an instant meeting"
                handleClick={() => setMeetingState('isInstantMeeting')}
                color="bg-orange-1"
            />
            <Card 
                title="Schedule Meeting"
                icon={<CalendarClock  />}
                description="Plan your meeting"
                handleClick={() => setMeetingState('isScheduleMeeting')}
                color="bg-blue-1"
            />
            <Card 
                title="View Recordings"
                icon={<Video />}
                description="Check out your recordings"
                handleClick={() => router.push('/recordings')}
                color="bg-purple-1"
            />
            <Card 
                title="Join Meeting"
                icon={<UserRoundPlus />}
                description="Via invitation link"
                handleClick={() => setMeetingState('isJoiningMeeting')}
                color="bg-yellow-1"
            />

            {!callDetails ? (
                <MeetingModal 
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Create Meeting"
                    className="text-center"
                    buttonText="Schedule Meeting"
                    handleClick={createMeeting}
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description">Description</label>
                        <InputTextarea 
                            id="description" 
                            aria-describedby="description-help"
                            onChange={(e) => {
                                setValues({ ...values, description: e.target.value })
                            }} 
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description">Select Date and Time</label>
                        <Calendar 
                            id="buttondisplay" 
                            value={values.dateTime} 
                            onChange={(e) => {
                                setValues({ ...values, dateTime: e.value! })
                            }} 
                            showIcon 
                            dateFormat={'MM d, yy'}
                            showTime
                            hourFormat="12"
                        />
                    </div>
                </MeetingModal>
            ): (
                <MeetingModal 
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title=""
                    className="text-center"
                    buttonText="Copy Meeting Link"
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        showMessage('Link copied!', 'Meeting link copied!', toast, 'success');
                    }}
                    image={<CalendarCheck size={72} className='text-blue-1' />}
                    buttonIcon={<Clipboard />}
                >
                        <h1 className='text-center text-2xl font-extrabold lg:text-7xl'>
                            Meeting Created
                        </h1>
                </MeetingModal>
            )}
            <MeetingModal 
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
            <Toast 
                ref={toast} 
                position="top-center"
            />
        </section>
    )
}

export default MeetingTypeList