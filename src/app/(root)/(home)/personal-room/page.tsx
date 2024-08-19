'use client'

import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Toast, ToastMessage } from 'primereact/toast';
import React, { RefObject, useRef } from 'react'

const Table = ({ title, description }: { title: string; description: string }) => (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
        <h1 className="text-base font-medium text-sky-1">{title}:</h1>
        <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">{description}</h1>
    </div>
)

const PersonalRoom = () => {
    const toast = useRef<Toast>(null);
    const { user } = useUser();
    const meetingId = user?.id;
    const { call }  = useGetCallById(meetingId!);
    const client = useStreamVideoClient();
    const router = useRouter();

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

    const showMessage = (title: string, message: string, ref: RefObject<Toast>, severity: ToastMessage['severity']) => {
        ref.current?.show({
            severity: severity,
            summary: title,
            detail: message,
            life: 3000
        })
    }

    const startRoom = async () => {
        if(!client || !user) return;

        if(!call) {
            const newCall = client.call('default', meetingId!);

            await newCall.getOrCreate({
                data: {
                    starts_at: new Date().toISOString(),
                }
            })
        }

        router.push(`/meeting/${meetingId}?personal=true`);
    }

    return (
        <section className='flex size-full flex-col gap-10'>
            <h1 className='text-3xl font-bold'>
                Personal Room
            </h1>

            <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
                <Table 
                    title="Topic" 
                    description={`${user?.username}'s meeting room`} 
                />
                <Table 
                    title="Meeting ID" 
                    description={meetingId!}
                />
                <Table 
                    title="Invite Link" 
                    description={meetingLink}
                />
            </div>
            <div className="flex gap-5">
                <Button
                    onClick={startRoom}
                >
                    <span className='font-bold'>
                        Start Meeting
                    </span>
                </Button>
                <Button
                    onClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        showMessage('Link copied!', 'Meeting link copied!', toast, 'success');
                    }}
                    outlined
                >
                    <span className='font-bold'>
                        Copy Invitation
                    </span>
                </Button>
            </div>
            <Toast 
                ref={toast} 
                position="top-center"
            />
        </section>
    )
}

export default PersonalRoom