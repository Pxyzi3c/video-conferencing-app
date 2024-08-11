"use client"

import React, { useState } from 'react'

import MeetingRoom from '@/src/components/Meeting/Room';
import MeetingSetup from '@/src/components/Meeting/Setup';

import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/src/components/Loader';

const Meeting = ({ params: { id }}: { params: { id: string} }) => {
    const { user, isLoaded } = useUser();
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const { call, isCallLoading } = useGetCallById(id);

    if(!isLoaded || isCallLoading) return <Loader />;

    return (
        <main className="h-screen w-full">
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetupComplete ? (
                        <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
                    ): (
                        <MeetingRoom />
                    )}
                </StreamTheme>
            </StreamCall>
        </main>
    )
}

export default Meeting