import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import React from 'react'

export default function Select(props) {
    const {name, label, value, onChange, error = null, options} = props;

    return (
        <FormControl variant='outlined' {...(error && {error: true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                    <MenuItem value="">None</MenuItem>
                    {
                        options.map((item, index)=>(
                            <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                        ))
                    }
            </MuiSelect>
            {error&& <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
