const isTEACHER = (ROLES = []) => {

    const findIndex = ROLES.findIndex((role) => {
        return role === 'TEACHER';
    });

    if (findIndex < 0) {
        return false;
    }

    return true;

};

export default isTEACHER;
