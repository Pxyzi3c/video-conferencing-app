'use client'

import React, { useState } from 'react';

import { 
    Plus,
    Calendar,
    Video,
    UserRoundPlus
} from 'lucide-react';

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

    const createMeeting = async () => {
        console.log("DUMADAAAN NAMAN DITOO")
        if(!user || !client) return;

        try {
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
                router.push(`/meeting/${call.id}`)
            }
        } catch (error) {
            console.log(error)
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
        </section>
    )
}

export default MeetingTypeList