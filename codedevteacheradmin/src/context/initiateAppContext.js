import loginObj from './subStates/loginObj';
import sideBarObj from './subStates/sideBar';
import userObj from './subStates/userObj';
import usersObj from './subStates/usersObj';

const initialAppContext = {
    sideBar: sideBarObj,
    login: loginObj,
    users: usersObj,
    user: userObj
};

export default initialAppContext;

