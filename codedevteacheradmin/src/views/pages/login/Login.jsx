import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilLockUnlocked, cilUser } from '@coreui/icons';
import { AppContext } from '../../../context/AppContext';
import immutableSetState from '../../../context/immutableSetState';
import usersLogin from '../../../services/users/usersLogin';
import validateToken from '../../../services/users/validateToken';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { appState } = useContext(AppContext);

    const navigate = useNavigate();

    const { login } = appState;
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm>
                                        <h1>Login</h1>
                                        <p className="text-medium-emphasis">Sign In to your account</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Username"
                                                autoComplete="username"
                                                value={login?.username}
                                                onChange={(event) => {
                                                    const newUserName = event.target.value;
                                                    immutableSetState((draft) => {
                                                        draft.login.username = newUserName;
                                                    });
                                                }}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type={
                                                    login?.showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                value={login?.password}
                                                onChange={(event) => {
                                                    const newPassword = event.target.value;
                                                    immutableSetState((draft) => {
                                                        draft.login.password = newPassword;
                                                    });
                                                }}
                                            />
                                            <CButton
                                                onClick={() => {
                                                    immutableSetState((draft) => {
                                                        draft.login.showPassword = !draft.login.showPassword;
                                                    });
                                                }}
                                            >
                                                {
                                                    login?.showPassword
                                                        ? <CIcon
                                                            icon={cilLockUnlocked}
                                                            size='sm'
                                                        />
                                                        : <CIcon
                                                            icon={cilLockLocked}
                                                            size='sm'
                                                        />
                                                }
                                                {/* {
                                                    !login?.showPassword
                                                        ? 'show'
                                                        : 'hide'
                                                } */}
                                            </CButton>
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton
                                                    color="primary" className="px-4"
                                                    onClick={async () => {
                                                        await usersLogin(login?.username, login?.password);
                                                        const isAuthenticated = await validateToken();
                                                        if (isAuthenticated) {
                                                            navigate('/');
                                                        }
                                                    }}
                                                >
                                                    Login
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0">
                                                    Forgot password?
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                        <Link to="/register">
                                            <CButton color="primary" className="mt-3" active tabIndex={-1}>
                                                Register Now!
                                            </CButton>
                                        </Link>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default Login;
