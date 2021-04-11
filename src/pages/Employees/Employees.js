import React, { useState } from 'react'
import EmployeeForm from './EmployeeForm'
import PeopleIcon from '@material-ui/icons/People';
import PageHeader from '../../components/PageHeader';
import { makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from '../../components/useTable';
import * as employeeService from '../../services/employeeService';
import Controls from '../../components/controls/Controls';
import { Search as SearchIcon, Add as AddIcon, EditOutlined as EditOutlinedIcon, Close as CloseIcon } from "@material-ui/icons";
import Popup from '../../components/Popup';
import Notification from '../../components/Notification';

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
    {id:'actions'   , label: 'Actions', disableSorting: true},
];

export default function Employees() {
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [records, setRecords] = useState(employeeService.getAllEmployees());
    const [filterFn, setFilterFn] = useState({fn:items => items});
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});

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

    const addOrEdit = (employee, resetForm) => {
        if(employee.id) employeeService.updateEmployee(employee);
        else employeeService.insertEmployee(employee);
        resetForm();
        setOpenPopup(false);
        setRecords(employeeService.getAllEmployees());
        setNotify({
            isOpen: true,
            message:'Submitted successfully',
            type:'success'
        });
    }

    const openInPopup = item =>{
        setRecordForEdit(item);
        setOpenPopup(true);
    }

    const onDelete = id=>{
        if(window.confirm('Are you sure to delete this record?')){
            employeeService.deleteEmployee(id);
            setRecords(employeeService.getAllEmployees());
            setNotify({
                isOpen: true,
                message:'Deleted successfully',
                type:'success'
            });
        }
    }

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
                    onClick={()=>{setOpenPopup(true);setRecordForEdit(null);}}
                />
            </Toolbar>
            <TblContainer>
                <TblHead></TblHead>
                <TableBody>
                    {recordsAfterPagingAndSorting().map(item=>(
                        <TableRow key={item.id}>
                            <TableCell>{item.fullName}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.mobile}</TableCell>
                            <TableCell>{item.department}</TableCell>
                            <TableCell>
                                <Controls.ActionButton
                                    color="primary"
                                    onClick={()=>{openInPopup(item)}}>
                                    <EditOutlinedIcon fontSize="small" />
                                </Controls.ActionButton>
                                <Controls.ActionButton
                                    color="secondary"
                                    onClick={()=>onDelete(item.id)}>
                                    <CloseIcon fontSize="small" />
                                </Controls.ActionButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TblContainer>
            <TblPagination></TblPagination>
        </Paper>
        <Popup title="Employee form" openPopup={openPopup} setOpenPopup={setOpenPopup}>
            <EmployeeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit}/>
        </Popup>
        <Notification 
            notify={notify}
            setNotify={setNotify}
        />
        </>
    )
}
