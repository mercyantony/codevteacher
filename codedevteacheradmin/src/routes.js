import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Teachers = React.lazy(() => import('./views/Teachers/Teachers'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/User/User'));


const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/Teachers', name: 'Teachers', element: Teachers },
    { path: '/Users', name: 'Users', element: Users },
    { path: '/User/:UserId', name: 'User', element: User },
    { path: '/forms/range', name: 'Range', element: Range },
];

export default routes;
