// @ts-nocheck

'use client'

import React, { useState } from 'react';
import { useGetCalls } from '@/hooks/useGetCalls';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import MeetingCard from './MeetingCard';
import {
    House,
    CalendarArrowUp,
    CalendarArrowDown,
    Video,
    Plus,
    Play,
    CalendarOff
} from 'lucide-react';
import Loader from './Loader';

function CallList({ type, emptyMessage }: { type: 'previous' |'upcoming' | 'recordings', emptyMessage: string }) {
    const { previousCalls, upcomingCalls, isLoading } = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);

    const getCalls = () => {
        switch (type) {
            case 'previous':
                return previousCalls;
            case 'upcoming':
                return upcomingCalls;
            case 'recordings':
                return recordings;
            default:
                return [];
        }
    }

    const getNoCallsMessage = () => {
        switch (type) {
            case 'previous':
                return 'No Previous Calls';
            case 'upcoming':
                return 'No Upcoming Calls';
            case 'recordings':
                return 'No Recordings Found';
            default:
                return '';
        }
    }

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    if(isLoading) return <Loader />

    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
                <MeetingCard 
                    key={(meeting as Call).id}
                    icon={
                        type === 'previous'
                            ? <CalendarArrowDown />
                            : type === 'upcoming'
                                ? <CalendarArrowUp />
                                : <Video />
                    }
                    title={(meeting as Call).state.custom.description.substring(0, 26) || 'No Description'}
                    date={meeting.state.startsAt.toLocaleString() || meeting.start_time.toLocaleString()}
                    isPreviousMeeting={type === 'previous'}
                    buttonIcon1={type === 'recordings' ? <Play /> : undefined}
                    buttonText={type === 'recordings' ? 'Play' : 'Start'}
                    handleClick={type === 'recordings' ? () => router.push(`${meeting.url}`) : () => router.push(`/meeting/${meeting.id}`)}
                    link={type === 'recordings' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
                />
            )) : (
                <div className='flex flex-col justify-center items-center gap-5'>
                    <CalendarOff size={40}/>
                    <h1 className='text-center'>
                        {emptyMessage}
                    </h1>
                </div>
            )}
        </div>
    )
}

export default CallList