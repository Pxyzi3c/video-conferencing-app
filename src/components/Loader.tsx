import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loader = () => {
    return (
        <div className='animate-spin flex-center h-screen w-full'>
            <LoaderCircle size={50} />
        </div>
    )
}

export default Loader