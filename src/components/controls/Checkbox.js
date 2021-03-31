import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';
import React from 'react'

const convertToDefaultPara = (name, value)=>{
    debugger;
    return ({
        target:{
            name, value
        }   
    })
}

export default function Checkbox(props) {
    const {label, name, value, onChange} = props;
    return (
        <FormControl>
            <FormControlLabel
                control={<MuiCheckbox name={name} color='primary' checked={value} onChange={onChange} />} //(e)=>onChange(convertToDefaultPara(name, e.target.checked))
                label={label}/>
        </FormControl>
    )
}
