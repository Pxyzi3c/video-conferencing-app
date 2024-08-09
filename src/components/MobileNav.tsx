'use client'

import React from 'react'

import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

import { Menu } from 'lucide-react';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';

const MobileNav = () => {
    const [visible, setVisible] = React.useState(false);
    const pathname = usePathname()

    const customerHeader = (
        <Link href='/' className='flex items-center gap-2'>
            <Image 
                src='/logo.svg' 
                alt='logo' 
                width={32} 
                height={32}>
            </Image>       
            <p className='text-[26px] font-extrabold'>Hoom</p>
        </Link>
    );

    return (
        <section className='flex sm:hidden w-full'>
            <Sidebar 
                header={customerHeader} 
                visible={visible} 
                onHide={() => setVisible(false)}
                className='w-[20rem]'
            >
                <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
                    <div className='flex h-full flex- flex-col gap-6 pt-4'>
                        {sidebarLinks.map((link) => {
                            const isActive = pathname === link.route;

                            return (
                                <Link 
                                    href={link.route}
                                    key={link.label}
                                    onClick={() => setVisible(false)}
                                >
                                    <Button 
                                        className='w-[90%] flex gap-4 py-3 px-4 items-center text-start text-lg ring-0'
                                        text={!isActive}
                                    >
                                        {link.icon}
                                        <p className='font-semibold'>{link.label}</p>
                                    </Button>
                                </Link>
                            );
                        })}
                    </div>
                </div>      
            </Sidebar>
            <Button 
                icon={<Menu />} 
                onClick={() => setVisible(true)} 
                text
            />
        </section>
    )
}

export default MobileNav