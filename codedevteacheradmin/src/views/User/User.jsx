import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import findOneUserBy_id from '../../services/users/findOneUserBy_id';

const User = () => {
    const { UserId } = useParams();

    const { appState } = useContext(AppContext);
    const { user } = appState;
    const { userData } = user;


    useEffect(() => {

        (async () => {
            await findOneUserBy_id(UserId);
        })();


    }, []);

    // userEff
    return (
        <h1>
            User: {UserId}, UserName: {userData?.username}
        </h1>
    );
};

export default User;
