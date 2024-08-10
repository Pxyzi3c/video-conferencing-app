import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loader = () => {
    return (
        <div className='flex-center h-screen w-full'>
            <LoaderCircle />
        </div>
    )
}

export default Loader