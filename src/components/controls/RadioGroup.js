import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup as MuiRadioGroup } from '@material-ui/core';
import React from 'react'

export default function RadioGroup(props) {
    const {label, name, value, onChange, items} = props;
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row 
                name={name}
                value={value}
                onChange={onChange}>
                {items.map((item, index)=>(
                    <FormControlLabel key={item.id} label={item.title} value={item.id} control={<Radio />}></FormControlLabel>
                ))}
            </MuiRadioGroup>
        </FormControl>
    )
}
