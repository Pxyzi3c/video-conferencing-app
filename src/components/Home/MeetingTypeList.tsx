'use client'

import React, { RefObject, useRef, useState } from 'react';

import { 
    Plus,
    Calendar,
    Video,
    UserRoundPlus
} from 'lucide-react';

import { Toast, ToastMessage } from 'primereact/toast';

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
            detail: message
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

            
            if(!values.description) {
                showMessage('Success!', 'Meeting created successfully!', toast, 'success');
                setTimeout(() => {
                    router.push(`/meeting/${call.id}`)
                }, 1000)
            }
            
        } catch (error) {
            console.log(error)
            showMessage('Error!', 'Failed to create meeting!', toast, 'error');
        }
    }

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
                icon={<Calendar />}
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

            <MeetingModal 
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
            <Toast ref={toast} position="top-center" />
        </section>
    )
}

export default MeetingTypeList