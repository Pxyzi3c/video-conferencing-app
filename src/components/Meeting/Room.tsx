import { cn } from '@/lib/utils'
import { CallControls, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Button } from 'primereact/button';

import { LayoutList, Users } from 'lucide-react';

import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
        
type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get('personal');
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
    const [showParticipants, setShowParticipants] = useState(false);
    const [selectedLayout, setSelectedLayout] = useState(null);

    const options = [
        { 
            label: 'Grid', 
            code: 'NY'
        },
        { 
            label: 'Speaker-Left', 
            code: 'RM'
        },
        { 
            label: 'Speaker-Right', 
            code: 'LDN'
        },
    ];

    const handleLayoutChange = (option: any) => {
        const { label } = option;
        setSelectedLayout(option);
        setLayout(label.toLowerCase() as CallLayoutType);
    }

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-left':
                return <SpeakerLayout participantsBarPosition='right' />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition='left' />
        }
    }

    return (
        <section className="relative h-screen w-full overflow-hidden pt-4">
            <div className="relative flex fize-full items-center justify-center">
                <div className="flex size-full max-w-[1000px] items center">
                    <CallLayout />
                </div>
                <div className={cn('h-[calc(100vh-86px)] hidden ml-2', { 'block': showParticipants} )}>
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>

            <div className='fixed bottom-0 flex w-full items-center justify-center gap-5'>
                <CallControls />
                <CallStatsButton />
                <Dropdown 
                    value={selectedLayout} 
                    options={options} 
                    optionLabel="label"
                    placeholder="Layout"
                    dropdownIcon={<LayoutList />}
                    onChange={(e: DropdownChangeEvent) => handleLayoutChange(e.value)}
                />
                <Button 
                    icon={<Users />}
                    text
                    onClick={() => setShowParticipants((prev) => !prev)}
                />
                {!isPersonalRoom && <EndCallButton />}
            </div>
        </section>
    )
}

export default MeetingRoom