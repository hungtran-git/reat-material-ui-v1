import { Table, TableCell, TableHead, TableRow } from '@material-ui/core'
import React from 'react'

export default function useTable(records, headCells) {
    debugger;
    const TblContainer = props => {
        const {children} = props;
        return (
            <Table>
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

    return {
        TblHead,
        TblContainer
    }
}
