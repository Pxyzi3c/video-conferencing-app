import React, { useEffect, useState } from 'react'

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import { ArrowRightToLine } from 'lucide-react';
        
function MeetingSetup({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) {
    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

    const call = useCall();

    if (!call) {
        throw new Error('Call not found.');
    };

    useEffect(() => {
        if (isMicCamToggledOn) {
            call?.camera.enable();
            call?.microphone.enable();
        } else {
            call?.camera.disable();
            call?.microphone.disable();
        }
    }, [isMicCamToggledOn, call?.camera, call?.microphone])

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
            <h1 className="text-2xl font-bold">Setup</h1>
            <VideoPreview />
            <div className="flex h-16 items-center justify-center gap-3">
                <label className="flex items-center justify-center gap-2 font-medium">
                    <InputSwitch checked={isMicCamToggledOn} onChange={(e) => setIsMicCamToggledOn(e.value)} />
                    Join with mic and camera off
                </label>
                <DeviceSettings />
            </div>
            <Button 
                label="Join meeting"
                icon={<ArrowRightToLine />}
                className='gap-4'
                onClick={() => {
                    call.join();

                    setIsSetupComplete(true);
                }}
            />
        </div>
    )
}

export default MeetingSetup