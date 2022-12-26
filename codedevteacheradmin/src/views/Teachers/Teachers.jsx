import { CContainer, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React from 'react';

const Teachers = () => {
    return (
        <CContainer>
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
                            Uid
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            scope="col" vertical-align="middle"
                        >
                            Name
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            scope="col" vertical-align="middle"
                        >
                            email
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            scope="col" vertical-align="middle"
                        >
                            Actions
                        </CTableHeaderCell>

                    </CTableRow>
                </CTableHead>

                <CTableBody align="middle" vertical-align="middle">
                    <CTableRow
                        style={{
                            fontSize: 'small',
                        }}
                    >
                        <CTableDataCell>
                            1
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
                            2
                        </CTableHeaderCell>
                        <CTableDataCell>3</CTableDataCell>
                        <CTableDataCell>
                            4
                        </CTableDataCell>
                    </CTableRow>
                </CTableBody>
                {/* <AdminsTableHeader />
                <AdminsTableBody /> */}

            </CTable>
        </CContainer>
    );
};

export default Teachers;

