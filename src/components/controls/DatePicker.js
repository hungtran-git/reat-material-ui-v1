import React from 'react'
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const convertToDefaultEventPara = (name, value)=>{
    return {
        target:{
            name, value
        }
    }
}

export default function DatePicker(props) {
    const {name, label, value, onChange} = props;
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                label={label}
                name={name}
                value={value}
                onChange={date=>onChange(convertToDefaultEventPara(name, date))}
            />
        </MuiPickersUtilsProvider>
    )
}
