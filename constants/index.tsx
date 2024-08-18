import React, { useEffect, useState } from 'react';

import { 
    House,
    CalendarArrowUp,
    CalendarArrowDown,
    Video,
    Plus
} from 'lucide-react';

export const sidebarLinks = [
    {
        label: 'Home',
        route: '/',
        icon: <House />,
    },
    {
        label: 'Upcoming',
        route: '/upcoming',
        icon: <CalendarArrowUp />,
    },
    {
        label: 'Previous',
        route: '/previous',
        icon: <CalendarArrowDown />,
    },
    {
        label: 'Recordings',
        route: '/recordings',
        icon: <Video />,
    },
    {
        label: 'Personal Room',
        route: '/personal-room',
        icon: <Plus />,
    },
]

export const avatarImages = [
    'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
    'https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png',
    'https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png',
    'https://primefaces.org/cdn/primereact/images/avatar/ionibowcher.png',
    'https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png',
]