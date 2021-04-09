import { Dialog, DialogTitle, DialogContent, Typography, makeStyles } from '@material-ui/core';
import React from 'react'
import Controls from './controls/Controls';
import {Close as CloseIcon} from '@material-ui/icons'
console.log(CloseIcon);
const useStyle = makeStyles(theme => ({
  dialogWrapper:{
      padding: theme.spacing(2),
      position: 'absolute',
      top: theme.spacing(4)
  },
  dialogTitle:{
      paddingRight: '0px'
  }
}));

export default function Popup(props) {
    const {title, children, openPopup, setOpenPopup} = props;
    const classes = useStyle();

    return (
        <Dialog open={openPopup} classes={{paper: classes.dialogWrapper}}>
            <DialogTitle>
                <div style={{display:'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow: 1}}>{title}</Typography>
                    <Controls.ActionButton
                        color='secondary'
                        onClick={()=>setOpenPopup(false)}
                    ><CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
               {children}
            </DialogContent>
        </Dialog>
    )
}
