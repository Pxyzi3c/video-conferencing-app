import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Loader = () => {
    return (
        <div className="loader-container flex items-center justify-center h-screen w-full">
            <span className="sun sunshine">
            </span>
            <span className="sun flex items-center justify-center">
                <Image 
                    src='/logo.svg' 
                    alt='logo' 
                    width={32} 
                    height={32}>
                </Image>
            </span>
        </div>
    )
}

export default Loader