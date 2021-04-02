import React, { useState } from 'react'
import EmployeeForm from './EmployeeForm'
import PeopleIcon from '@material-ui/icons/People';
import PageHeader from '../../components/PageHeader';
import { makeStyles, Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import useTable from '../../components/useTable';
import * as employeeService from '../../services/employeeService';

const useStyles = makeStyles(theme=>({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    }
}));

const headCells = [
    {id:'fullName'  , label: 'FullName'},
    {id:'email'     , label: 'Email'},
    {id:'mobile'    , label: 'Mobile'},
    {id:'department', label: 'Department'},
];

export default function Employees() {
    const classes = useStyles();
    const [records, setRecords] = useState(employeeService.getAllEmployees());
    const { TblHead, TblContainer } = useTable(records, headCells);

    return (
        <>
        <PageHeader
            title={'Page title'}
            subTitle={'Page description'}
            icon={<PeopleIcon />}
        ></PageHeader>
        <Paper className={classes.pageContent}>
            {/* <EmployeeForm /> */}
            <TblContainer>
                <TblHead></TblHead>
                <TableBody>
                    {records.map(_=>(
                        <TableRow key={_.id}>
                            <TableCell>{_.fullName}</TableCell>
                            <TableCell>{_.email}</TableCell>
                            <TableCell>{_.mobile}</TableCell>
                            <TableCell>{_.department}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TblContainer>
        </Paper>
        </>
    )
}
