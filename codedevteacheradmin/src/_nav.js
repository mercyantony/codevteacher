import React from 'react';
import CIcon from '@coreui/icons-react';
import {
    cilGroup,
    cilSpeedometer,
    cilUserPlus,
} from '@coreui/icons';
import { CNavItem } from '@coreui/react';

const _nav = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        badge: {
            color: 'info',
            text: 'NEW',
        },
    },
    {
        component: CNavItem,
        name: 'Users',
        to: '/Users',
        icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Teachers',
        to: '/Teachers',
        icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    },
];

export default _nav;
