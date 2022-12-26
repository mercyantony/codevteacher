import { API_URL } from '../../configs/constants';
import immutableSetState from '../../context/immutableSetState';


const findAllUsers = async () => {

    const tokenApi = await localStorage.getItem('CO_DEV_TEACHER_TOKEN_API');

    // eslint-disable-next-line no-useless-catch
    try {
        const findAllUsersRaw = await fetch(`${API_URL}/users/findAllUsers`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + tokenApi
            },
            body: JSON.stringify({})
        });
        const findAllUsers = await findAllUsersRaw.json();

        immutableSetState((draft) => {
            draft.users.allUsers = findAllUsers;
        });
        // return true;
    }
    catch (error) {
        return false;
    }
};

export default findAllUsers;
