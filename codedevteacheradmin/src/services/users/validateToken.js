import { API_URL } from '../../configs/constants';
import immutableSetState from '../../context/immutableSetState';


const validateToken = async () => {

    const tokenApi = await localStorage.getItem('CO_DEV_TEACHER_TOKEN_API');

    // eslint-disable-next-line no-useless-catch
    try {
        const validateTokenRaw = await fetch(`${API_URL}/users/validateToken`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + tokenApi
            },
            body: JSON.stringify({})
        });
        const validateToken = await validateTokenRaw.json();
        if (validateToken.message != 'OK') {
            throw new Error(validateToken.message);
        }

        immutableSetState((draft) => {
            draft.login.authenticated = true;
        });
        return true;
    }
    catch (error) {
        return false;
    }
};

export default validateToken;
