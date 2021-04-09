import React, { useState } from 'react'
import EmployeeForm from './EmployeeForm'
import PeopleIcon from '@material-ui/icons/People';
import PageHeader from '../../components/PageHeader';
import { makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from '../../components/useTable';
import * as employeeService from '../../services/employeeService';
import Controls from '../../components/controls/Controls';
import { Search } from "@material-ui/icons";

const useStyles = makeStyles(theme=>({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    searchInput:{
        width: '75%'
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
    const [filterFn, setFilterFn] = useState({fn:items => items});

    const { TblHead, TblContainer, TblPagination, recordsAfterPagingAndSorting } = useTable(records, headCells, filterFn);

    const handleSearch = e =>{
        let target = e.target;
        setFilterFn({
            fn: items => {
                if(target.value == "") return items;
                else return items.filter(x=>x.fullName.toLowerCase().includes(target.value.toLowerCase()));
            }
        });
    };
    
    return (
        <>
        <PageHeader
            title={'Page title'}
            subTitle={'Page description'}
            icon={<PeopleIcon />}
        ></PageHeader>
        <Paper className={classes.pageContent}>
            {/* <EmployeeForm /> */}
            <Toolbar>
                <Controls.Input 
                    label="Search employees"
                    className={classes.searchInput}
                    InputProps={{
                        startAdoinment:(<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                    onChange={handleSearch}
                />
            </Toolbar>
            <TblContainer>
                <TblHead></TblHead>
                <TableBody>
                    {recordsAfterPagingAndSorting().map(_=>(
                        <TableRow key={_.id}>
                            <TableCell>{_.fullName}</TableCell>
                            <TableCell>{_.email}</TableCell>
                            <TableCell>{_.mobile}</TableCell>
                            <TableCell>{_.department}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TblContainer>
            <TblPagination></TblPagination>
        </Paper>
        </>
    )
}
