import CallList from '@/src/components/CallList'
import React from 'react'

const Upcoming = () => {
    return (
        <section className='flex size-full flex-col gap-10'>
            <h1 className='text-3xl font-bold'>
                Upcoming
            </h1>

            <CallList 
                type="upcoming"
                emptyMessage="No Upcoming Calls"
            />
        </section>
    )
}

export default Upcoming