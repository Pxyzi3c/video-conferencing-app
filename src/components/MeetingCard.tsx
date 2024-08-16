import React from 'react'

interface MeetingCardProps {
    key: string;
    icon: JSX.Element;
    title: string;
    date: Date;
    isPreviousMeeting: boolean;
    buttonIcon1: JSX.Element;
    buttonText: string;
    handleClick: () => void;
    link: string;
};

const MeetingCard = ({ key, icon, title, date, isPreviousMeeting, buttonIcon1, buttonText, handleClick, link }: MeetingCardProps) => {
    return (
        <div>
            
        </div>
    )
}

export default MeetingCard