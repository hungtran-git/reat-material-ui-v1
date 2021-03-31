import {Grid} from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { Form, useForm } from '../../components/useForm';
import Controls from '../../components/controls/Controls';
import * as employeeService from '../../services/employeeService';

const genderItems =[
    {id: 'male', title:'Male'},
    {id: 'female', title:'Female'},
    {id: 'other', title:'Other'},
];

const initialValues = {
    id: 0,
    fullName: '',
    email:'',
    mobile:'',
    city:'',
    gender:'male',
    departmentId:'',
    hireDate: new Date(),
    isPermanent: false
};

export default function EmployeeForm() {
    const {values, setValues, handleInputChange} = useForm(initialValues);

    return (
        <Form>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                     name='fullName'
                     label='Full Name'
                     value={values.fullName}
                     onChange={handleInputChange} />
                    <Controls.Input 
                        name='email'
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange} />
                    <Controls.Input 
                        name='mobile'
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange} />
                    <Controls.Input 
                        name='city'
                        label="City"
                        value={values.city}
                        onChange={handleInputChange} />
                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        label   ='Gender'
                        name    ='gender'
                        value   ={values.gender}
                        onChange = {handleInputChange}
                        items    = {genderItems}
                     />
                     <Controls.Select 
                        label='DepartmentId'
                        name='departmentId'
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                     /> 
                     <Controls.DatePicker 
                        label='Hire date'
                        name='hireDate'
                        value={values.hireDate}
                        onChange={handleInputChange}
                     />
                    <Controls.Checkbox 
                        label='Is permanent'
                        name='isPermanent'
                        value={values.isPermanent}
                        onChange={handleInputChange}
                     /> 
                     <Controls.Button 
                        text="Submit"
                        type='submit'
                     />
                     <Controls.Button 
                        text="Reset"
                        color="default"
                     />
                </Grid>
            </Grid>
        </Form>
    )
}
