import CallList from '@/src/components/CallList'
import React from 'react'

const Previous = () => {
    return (
        <section className='flex size-full flex-col gap-10'>
            <h1 className='text-3xl font-bold'>
                Previous
            </h1>

            <CallList 
                type="previous"
                emptyMessage="No Previous Calls"
            />
        </section>
    )
}

export default Previous