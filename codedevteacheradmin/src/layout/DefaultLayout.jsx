import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';
import { AppContext } from '../context/AppContext';
import validateToken from '../services/users/validateToken';

const DefaultLayout = () => {

    const navigate = useNavigate();
    const { appState } = useContext(AppContext);

    const { login } = appState;
    const { authenticated } = login;

    useEffect(() => {
        if (!authenticated) {
            (async () => {
                const isAuthenticated = await validateToken();
                if (!isAuthenticated) {
                    navigate('/login');
                }
            })();
        }

    }, [authenticated]);

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <AppContent />
                </div>
                <AppFooter />
            </div>
        </div>
    );
};

export default DefaultLayout;
