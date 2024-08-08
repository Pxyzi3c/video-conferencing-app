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
        <section className='hidden sm:flex sticky left-0 top-0 h-screen w-fit flex-col justify-between bg-dark-1 px-6 pt-28 pb-6 lg:w-[264px]'>
            <div className='flex flex- flex-col gap-4'>
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

                    return (
                        <Link 
                            href={link.route}
                            key={link.label}
                        >
                            <Button 
                                className='w-full flex gap-4 py-3 px-4 items-center text-start text-lg ring-0'
                                text={!isActive}
                            >
                                {link.icon}
                                <p className='text-lg font-semibold max-lg:hidden'>{link.label}</p>
                            </Button>
                        </Link>
                    );
                })}
            </div>
        </section>
    )
}

export default Sidebar