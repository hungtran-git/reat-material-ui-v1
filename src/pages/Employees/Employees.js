import React from 'react'
import EmployeeForm from './EmployeeForm'
import PeopleIcon from '@material-ui/icons/People';
import PageHeader from '../../components/PageHeader';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    }
}));

export default function Employees() {
    const classes = useStyles();

    return (
        <>
        <PageHeader
            title={'Page title'}
            subTitle={'Page description'}
            icon={<PeopleIcon />}
        ></PageHeader>
        <Paper className={classes.pageContent}>
            <EmployeeForm />
        </Paper>
        </>
    )
}
