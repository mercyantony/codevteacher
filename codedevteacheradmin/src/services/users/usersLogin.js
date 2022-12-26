import { API_URL } from '../../configs/constants';
import jwt_decode from 'jwt-decode';
import _ from 'lodash';
import isTEACHER from '../../commons/isTEACHER';
import immutableSetState from '../../context/immutableSetState';


const usersLogin = async (username, password) => {

    // eslint-disable-next-line no-useless-catch
    try {
        const usersLoginRaw = await fetch(`${API_URL}/users/login`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const usersLogin = await usersLoginRaw.json();
        if (usersLogin.message == 'You Can not login to our system. Wrong username or password!') {
            throw new Error(usersLogin.message);
        }
        const token = usersLogin?.access_token;
        if (!token) {
            throw new Error('not found token');
        }
        const decoded = jwt_decode(token);
        const ROLES = decoded?.ROLES;
        const userId = decoded?.userId;
        const userName = decoded?.username;

        if (
            !userName
            || !userId
            || _.isEmpty(ROLES)
        ) {
            throw new Error('User payload is not accepted');
        }

        const isTeacher = isTEACHER(ROLES);
        if (!isTeacher) {
            // TODO: make sure portal working for TAS
            throw new Error('User is not authorized for using this portal');
        }

        immutableSetState((draft) => {
            draft.login.tokenPayload.ROLES = ROLES;
            draft.login.tokenPayload.userId = userId;
            draft.login.tokenPayload.userName = userName;
        });

        await localStorage.setItem('CO_DEV_TEACHER_TOKEN_API', token);

        return;
    }
    catch (error) {
        throw error;
    }
};

export default usersLogin;
