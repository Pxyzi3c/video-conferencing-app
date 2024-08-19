// @ts-nocheck

'use client'

import React, { useEffect, useRef, useState } from 'react';
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
import { Toast } from 'primereact/toast';

function CallList({ type, emptyMessage }: { type: 'previous' |'upcoming' | 'recordings', emptyMessage: string }) {
    const toast = useRef<Toast>(null);
    const { previousCalls, upcomingCalls, callRecordings,isLoading } = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);

    const showMessage = (title: string, message: string, ref: RefObject<Toast>, severity: ToastMessage['severity']) => {
        ref.current?.show({
            severity: severity,
            summary: title,
            detail: message,
            life: 3000
        })
    }

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

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()))

                const recordings = callData
                    .filter(call => call.recordings.length > 0)
                    .flatMap(call => call.recordings)
    
                setRecordings(recordings);   
            } catch (error) {
                showMessage('Try Again Later!', $(error), toast, 'error');
            }
        }

        if(type === 'recordings') fetchRecordings();
    }, [type, callRecordings])

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
                    title={(meeting as Call).state?.custom.description.substring(0, 26) || meeting.filename.substring(0, 20) || 'No Description'}
                    date={meeting.state?.startsAt.toLocaleString() || meeting.start_time.toLocaleString()}
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
            <Toast 
                ref={toast} 
                position="top-center"
            />
        </div>
    )
}

export default CallList