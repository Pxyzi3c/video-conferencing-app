import { VideoPreview } from '@stream-io/video-react-sdk'
import React from 'react'

function MeetingSetup() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
            <h1 className="text-2xl font-bold">Setup</h1>
            <VideoPreview />
        </div>
    )
}

export default MeetingSetup