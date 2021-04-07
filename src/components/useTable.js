import { makeStyles, Table, TableCell, TableHead, TableRow, TablePagination } from '@material-ui/core'
import React, {useState} from 'react'

const useStyles = makeStyles(theme => ({
    table:{
        marginTop:theme.spacing(3),
        '& thead th':{
            fontWeight: '600',
            color: theme.palette.primary.main,
            backgroundColor:theme.palette.primary.light
        },
        '& tbody td':{
            fontWeight: '300'
        },
        '& tbody tr:hover':{
            backgroundColor: '#fffbf2',
            cursor: 'pointer'
        }
    }
}));

export default function useTable(records, headCells) {
    
    const classes = useStyles();

    const pages = [5, 10, 15];
    const [page,setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

    const TblContainer = props => {
        const {children} = props;
        return (
            <Table className={classes.table}>
                {children}
            </Table>
        )
    }

    const TblHead = props =>{
        return (<TableHead>
            <TableRow>
                {
                    headCells.map(headcell=>(<TableCell key={headcell.id}>{headcell.label}</TableCell>))
                }
            </TableRow>
        </TableHead>);
    }

    const handleChangePage = (event, newPage)=>{
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event)=>{
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const recordsAfterPagingAndSorting = ()=>{
        return records.slice(page*rowsPerPage, (page+1)*rowsPerPage);
    }

    const TblPagination = ()=>(<TablePagination 
        component='div'
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={records.length}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
    />);

    return {
        TblHead,
        TblContainer,
        TblPagination,
        recordsAfterPagingAndSorting
    }
}
