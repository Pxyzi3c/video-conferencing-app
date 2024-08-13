import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import React from 'react'

function EndCallButton() {
    const call = useCall();
    const router = useRouter();

    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;
    
    if(!isMeetingOwner) return null;

    return (
        <Button 
            label='End call for everyone'
            severity='danger'
            onClick={() => {
                call?.endCall();
                router.push('/');
            }}
        />
    )
}

export default EndCallButton