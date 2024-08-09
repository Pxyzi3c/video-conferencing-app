import React, { ReactNode, useState } from 'react'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { cn } from '@/lib/utils';
        
interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    children?: ReactNode;
    handleClick?: () => void;
    buttonText?: string;
    image?: string;
    buttonIcon?: string
}

const MeetingModal = ({ isOpen, onClose,  title, className, children, handleClick, buttonText, image, buttonIcon }: MeetingModalProps) => {
    return (
        <>
            <Dialog 
                header={title} 
                visible={isOpen} 
                style={{ width: '50vw' }} 
                onHide={onClose} 
                className='border-none'
            >
                <div 
                    className={cn('flex flex-col gap-6 border-none')}
                >
                    fsdf
                </div>
            </Dialog>
        </>
    )
}

export default MeetingModal