'use client'

import React, { useState } from 'react';
import { 
    Plus,
    Calendar,
    Video,
    UserRoundPlus
} from 'lucide-react';
import Card from './Card';
import { useRouter } from 'next/navigation';

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <Card 
                title="New Meeting"
                icon={<Plus />}
                description="Start an instant meeting"
                handleClick={() => setMeetingState('isJoiningMeeting')}
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
        </section>
    )
}

export default MeetingTypeList