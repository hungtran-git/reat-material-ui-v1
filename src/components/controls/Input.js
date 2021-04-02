import { TextField } from '@material-ui/core';
import React from 'react'

export default function Input(props) {
    const {label, name, value, error = null, onChange} = props;
    return (
        <TextField 
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...(error&&{error:true, helperText:error})}
        ></TextField>
    )
}
