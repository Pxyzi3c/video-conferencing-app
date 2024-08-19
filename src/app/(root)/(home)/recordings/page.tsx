import CallList from '@/src/components/CallList'
import React from 'react'

const Recordings = () => {
    return (
        <section className='flex size-full flex-col gap-10'>
            <h1 className='text-3xl font-bold'>
                Recordings
            </h1>

            <CallList 
                type="recordings" 
                emptyMessage="No Recordings Found"
            />
        </section>
    )
}

export default Recordings