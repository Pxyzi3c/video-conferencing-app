'use client'

import MeetingTypeList from '@/src/components/Home/MeetingTypeList';
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react'

function formatTime(date: Date) {
    return date.toLocaleTimeString('en-PH',{ hour: 'numeric', minute: 'numeric', hour12: true });
}

function formatDate(date: Date) {
    return date.toLocaleDateString('en-PH',{ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

const Home = () => {
    const now = new Date();
    const [time, setTime] = useState<string>(formatTime(now));
    const [date, setDate] = useState<string>(formatDate(now));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(formatTime(now));
            setDate(formatDate(now));
        }, 1000)

        return () => clearInterval(intervalId)
    }, [now])
    return (
        <section className='flex size-full flex-col gap-6'>
            <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
                <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
                    <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>Upcoming Meeting at: 12:30 PM</h2>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-4xl font-extrabold lg:text-7xl'>
                            {time}
                        </h1>
                        <p className='text-lg font-medium text-sky-1 lg:text-xl'>{date}</p>
                    </div>
                </div>
            </div>

            <MeetingTypeList />
        </section>
    )
}

export default Home