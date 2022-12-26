import { cilCheck, cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCol, CContainer, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import findAllUsers from '../../services/users/findAllUsers';
import isStudent from './isStudent';
import isSuperTeacher from './isSuperTeacher';
import isTA from './isTA';
import isTeacher from './isTeacher';

const Users = () => {

    const { appState } = useContext(AppContext);

    const navigate = useNavigate();

    const { users } = appState;
    const { allUsers } = users;

    useEffect(() => {
        (async () => {
            await findAllUsers();
        })();

    }, []);
    return (
        <CContainer>
            <CRow>
                <CCol>
                    Users
                </CCol>
            </CRow>
            <CTable
                striped
                hover
                responsive
                align="middle"
                small
                caption="top"
                style={{
                    textAlign: 'center'
                }}
                bordered
            >

                <CTableHead
                    align="middle"
                    vertical-align="middle"
                    className='table-success'
                    style={{
                        whiteSpace: 'nowrap'
                    }}
                >
                    <CTableRow vertical-align="middle"
                        style={{
                            fontSize: 'small'
                        }}
                    >
                        <CTableHeaderCell
                            scope="col" vertical-align="middle"
                        >
                            Row
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            scope="col" vertical-align="middle"
                        >
                            Uid
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            scope="col" vertical-align="middle"
                        >
                            UserName
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            scope="col" vertical-align="middle"
                        >
                            Is Super Teacher
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            scope="col" vertical-align="middle"
                        >
                            Is Teacher
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            scope="col" vertical-align="middle"
                        >
                            Is TA
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            scope="col" vertical-align="middle"
                        >
                            Is Student
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            scope="col" vertical-align="middle"
                        >
                            Action
                        </CTableHeaderCell>

                    </CTableRow>
                </CTableHead>

                <CTableBody align="middle" vertical-align="middle">
                    {
                        allUsers.map((user, index) => {


                            return <CTableRow
                                key={user._id}
                                style={{
                                    fontSize: 'small',
                                }}
                            >
                                <CTableDataCell>
                                    {index + 1}
                                </CTableDataCell>
                                <CTableHeaderCell
                                    scope="row"
                                    style={{
                                        width: '15px !important',
                                        fontSize: 'x-small',
                                        wordWrap: 'break-word',
                                        wordBreak: 'break-all'
                                    }}
                                >
                                    {
                                        user._id
                                    }
                                </CTableHeaderCell>
                                <CTableDataCell>
                                    {
                                        user?.username
                                    }
                                </CTableDataCell>
                                <CTableDataCell>
                                    {
                                        isSuperTeacher(user?.ROLES)
                                            ? <CIcon className='text-success' icon={cilCheck} size="lg" />
                                            : <CIcon className='text-danger' icon={cilX} size="lg" />
                                    }
                                </CTableDataCell>
                                <CTableDataCell>
                                    {
                                        isTeacher(user?.ROLES)
                                            ? <CIcon className='text-success' icon={cilCheck} size="lg" />
                                            : <CIcon className='text-danger' icon={cilX} size="lg" />
                                    }
                                </CTableDataCell>
                                <CTableDataCell>
                                    {
                                        isTA(user?.ROLES)
                                            ? <CIcon className='text-success' icon={cilCheck} size="lg" />
                                            : <CIcon className='text-danger' icon={cilX} size="lg" />
                                    }
                                </CTableDataCell>
                                <CTableDataCell>
                                    {
                                        isStudent(user?.ROLES)
                                            ? <CIcon className='text-success' icon={cilCheck} size="lg" />
                                            : <CIcon className='text-danger' icon={cilX} size="lg" />
                                    }
                                </CTableDataCell>
                                <CTableDataCell>
                                    <CButton
                                        color='secondary'

                                        onClick={()=> {
                                            navigate(`/User/${ user._id}`);
                                        }}
                                    >
                                        go to admin
                                    </CButton>
                                </CTableDataCell>
                            </CTableRow>;
                        })
                    }
                </CTableBody>

            </CTable>
        </CContainer>
    );
};

export default Users;

