import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
    return (
        <nav className='flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
            <Link href='/' className='flex items-center gap-2'>
                <Image 
                    src='/logo.svg' 
                    alt='logo' 
                    width={32} 
                    height={32}>
                </Image>       
                <p className='text-[26px] font-extrabold hidden sm:block'>Hoom</p>
            </Link>
            <div className="flex-between gap-4">
                <SignedIn>
                    <UserButton />
                </SignedIn>

                <MobileNav />
            </div>     
        </nav>
    )
}

export default Navbar