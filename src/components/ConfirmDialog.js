import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Typography, IconButton } from '@material-ui/core';
import { NotListedLocation } from '@material-ui/icons';
import React from 'react'
import Controls from './controls/Controls';

const useStyles = makeStyles(theme => ({
    dialog:{
        padding: theme.spacing(2),
        position:'absolute',
        top:theme.spacing(5)
    },
    dialogTitle:{
        textAlign: 'center'
    },
    dialogContent:{
        textAlign: 'center'
    },
    dialogAction:{
        justifyContent:'center'
    },
    titleIcon:{
        backgroundColor:theme.palette.secondary.light,
        color:theme.palette.secondary.main,
        '&:hover':{
            backgroundColor:theme.palette.secondary.light,
            cursor:'default',
        },
        '& .MuiSvgIcon-root':{
            fontSize:'8rem'
        }

    }
})); 

export default function ConfirmDialog(props) {

    const {confirmDialog, setConfirmDialog} = props;
    const classes = useStyles();
debugger;
    return (
        <Dialog classes={{paper: classes.dialog}} open={confirmDialog.isOpen}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocation />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Controls.Button
                    text="No"
                    color="default"
                    onClick={()=>setConfirmDialog({isOpen:false})}
                />
                <Controls.Button
                    text="Yes"
                    color="secondary"
                    onClick={()=>confirmDialog.onConfirm()}
                />
            </DialogActions>
        </Dialog>
    )
}
