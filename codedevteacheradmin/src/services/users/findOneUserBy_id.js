import { API_URL } from '../../configs/constants';
import immutableSetState from '../../context/immutableSetState';


const findOneUserBy_id = async (stirng_id) => {

    const tokenApi = await localStorage.getItem('CO_DEV_TEACHER_TOKEN_API');

    // eslint-disable-next-line no-useless-catch
    try {
        const findOneUserBy_idRaw = await fetch(`${API_URL}/users/findOneUserBy_id`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + tokenApi
            },
            body: JSON.stringify({
                stirng_id
            })
        });
        const findOneUserBy_id = await findOneUserBy_idRaw.json();

        immutableSetState((draft) => {
            draft.user.userData = findOneUserBy_id;
        });
        // return true;
    }
    catch (error) {
        return false;
    }
};

export default findOneUserBy_id;
