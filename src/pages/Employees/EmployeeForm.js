import {Grid} from '@material-ui/core';
import React from 'react'
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
    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? '': 'This field is required';
        if('email' in fieldValues)
            temp.email = /^\w+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/.test(fieldValues.email) ? '' : 'Email is not valid' ;
        if('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? '' : 'Minimum 10 numbers required';
        if('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length != 0 ? '' : 'This field is required';

        setErrors({...temp});
        return Object.values(temp).every(_=>_ == '');
    }
    const {
        values, 
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialValues, true, validate);

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(validate())
        {
            employeeService.insertEmployee(values);
            resetForm();
        }

        console.log(employeeService.getAllEmployees());
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                     name='fullName'
                     label='Full Name'
                     value={values.fullName}
                     onChange={handleInputChange} 
                     error={errors.fullName} />
                    <Controls.Input 
                        name='email'
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange} 
                        error={errors.email} />
                    <Controls.Input 
                        name='mobile'
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile} />
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
                        error={errors.departmentId}
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
                        onClick={resetForm}
                     />
                </Grid>
            </Grid>
        </Form>
    )
}
