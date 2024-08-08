'use client'

import React from 'react'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from 'primereact/button';

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 max-sm:hidden lg:w-[264px]'>
            <div className='flex flex- flex-col gap-4'>
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route;

                    return (
                        <Link 
                            href={link.route}
                            key={link.label}
                        >
                            <Button 
                                label={link.label} 
                                icon={link.icon} 
                                className='w-full flex gap-4 py-3 px-4 items-center text-start'
                                text={!isActive}
                            />
                        </Link>
                    );
                })}
            </div>
        </section>
    )
}

export default Sidebar