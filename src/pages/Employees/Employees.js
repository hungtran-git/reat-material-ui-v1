import React, { useState } from 'react'
import EmployeeForm from './EmployeeForm'
import PeopleIcon from '@material-ui/icons/People';
import PageHeader from '../../components/PageHeader';
import { makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from '../../components/useTable';
import * as employeeService from '../../services/employeeService';
import Controls from '../../components/controls/Controls';
import { Search as SearchIcon, Add as AddIcon } from "@material-ui/icons";
import Popup from '../../components/Popup';

const useStyles = makeStyles(theme=>({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    searchInput:{
        width: '75%'
    },
    newButton:{
        position:'absolute',
        right: '10px'
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
    const [openPopup, setOpenPopup] = useState(false);

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
            <Toolbar>
                <Controls.Input 
                    label="Search employees"
                    className={classes.searchInput}
                    InputProps={{
                        startAdornment:(<InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>)
                    }}
                    onChange={handleSearch}
                />
                <Controls.Button 
                    text="Add new"
                    variant="outlined"
                    startIcon = {<AddIcon />}
                    className={classes.newButton}
                    onClick={()=>setOpenPopup(true)}
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
        <Popup title="Employee form" openPopup={openPopup} setOpenPopup={setOpenPopup}>
            <EmployeeForm />
        </Popup>
        </>
    )
}
