import React, { ReactNode, useState } from 'react'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
        
interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    children?: ReactNode;
    handleClick?: () => void;
    buttonText?: string;
    image?: ReactNode;
    buttonIcon?: ReactNode;
}

const MeetingModal = ({ isOpen, onClose,  title, className, children, handleClick, buttonText, image, buttonIcon }: MeetingModalProps) => {
    return (
        <>
            <Dialog 
                header={title} 
                visible={isOpen} 
                onHide={onClose} 
                className='w-[80vw] md:w-[50vw] lg:w-[30vw] border-none'
            >
                <div 
                    className={cn('flex flex-col gap-6 border-none')}
                >
                    <div className="flex flex-col gap-6">
                        {image && (
                            <div className="flex justify-center">
                                {image}
                            </div>
                        )}
                        {children}
                        <Button
                            className='ring-0 flex justify-center align-center gap-2'
                            onClick={handleClick}
                        >
                            {buttonIcon}
                            <span className='font-bold'>
                                {buttonText || 'Schedule Meeting'}
                            </span>
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default MeetingModal