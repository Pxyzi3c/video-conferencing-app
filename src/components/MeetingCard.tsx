import React, { RefObject, useRef } from 'react'

import { avatarImages } from '@/constants';
import { cn } from '@/lib/utils';

import { Clipboard } from 'lucide-react';

import { Button } from 'primereact/button';
import { Toast, ToastMessage } from 'primereact/toast';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';   //Optional for grouping
        

interface MeetingCardProps {
    key: string;
    icon: JSX.Element;
    title: string;
    date: string;
    isPreviousMeeting?: boolean;
    buttonIcon1?: JSX.Element;
    buttonText?: string;
    handleClick: () => void;
    link: string;
};

const MeetingCard = ({ key, icon, title, date, isPreviousMeeting, buttonIcon1, buttonText, handleClick, link }: MeetingCardProps) => {
    const toast = useRef<Toast>(null);
    const showMessage = (title: string, message: string, ref: RefObject<Toast>, severity: ToastMessage['severity']) => {
        ref.current?.show({
            severity: severity,
            summary: title,
            detail: message,
            life: 3000
        })
    }
    
    return (
        <section className='flex min-h-[258] gap-8 w-full flex-col justify-between rounded-[14px] px-5 py-8 xl:max-w[568px] bg-dark-1'>
            <article className='flex flex-col gap-5'>
                {icon}
                <div className='flex justify-between'>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">
                            {title}
                        </h1>
                        <p className="text-base font-normal">
                            {date}
                        </p>
                    </div>
                </div>
            </article>
            <article className={cn("flex justify-center relative", {})}>
                <div className="relative flex w-full max-sm:hidden">
                    <AvatarGroup>
                    {avatarImages.map((img, index) => (
                        <Avatar 
                            image={img}
                            key={index} 
                            size="large" 
                            shape="circle" 
                        /> 
                    ))}
                        <Avatar label="+5" shape="circle" size="large"/>
                    </AvatarGroup>
                </div>
                {!isPreviousMeeting && (
                    <div className="flex gap-2">
                        <Button
                            className='ring-0 flex justify-center align-center gap-2'
                            onClick={handleClick}
                        >
                            {buttonIcon1 && (
                                <>
                                    {buttonIcon1}
                                </>
                            )}
                            <span className='font-bold'>
                                {buttonText}
                            </span>
                        </Button>
                        <Button
                            className='ring-0 flex justify-center align-center gap-2'
                            onClick={() => {
                                navigator.clipboard.writeText(link);
                                showMessage('Link copied!', 'Meeting link copied!', toast, 'success');
                            }}
                            outlined
                        >
                            <Clipboard />
                            <span className='font-bold'>
                                Copy Link
                            </span>
                        </Button>
                    </div>
                )}
            </article>
            <Toast 
                ref={toast} 
                position="top-center"
            />
        </section>
    )
}

export default MeetingCard