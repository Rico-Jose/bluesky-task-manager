import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    '& tbody td': {
      fontSize: 14,
    },
    '& tbody tr: hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
    '& .MuiTableCell-root': {
      padding: 10,
    },
  },
  tableRow: {
    '& .MuiTableCell-head:nth-child(n + 2)': {
      textAlign: 'center',
    },
  },
}));

export default function useTable(tasks: any, headCells: any, filterFn: any) {
  const classes = useStyles();
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  const TblContainer = (props: any) => (
    <Table className={classes.table}>{props.children}</Table>
  );

  const TblHead = () => {
    return (
      <TableHead>
        <TableRow className={classes.tableRow}>
          {headCells.map((headCell: any) => (
            <TableCell key={headCell.id}>{headCell.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handlePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={tasks.length}
      onChangePage={handlePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );

  // useEffect(() => {
  //   console.log(filterFn);
  // });

  const tasksAfterPaging = () => {
    return filterFn
      .fn(tasks)
      .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return {
    TblContainer,
    TblHead,
    TblPagination,
    tasksAfterPaging,
  };
}
